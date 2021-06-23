require("dotenv").config()
const { NONAME } = require("dns")
const express = require('express')
const cors = require("cors")
const app = express()
const db = require("./db")


app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Homepage here')
})

// Blog routes
app.get('/api/blog', async (req, res) => {
    
    try {
        const results = await db.query('SELECT * FROM blog')
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                blog: results.rows
            }
        })
    } catch (err) {
        res.send(err)
    }
})

// Get subset of rows
app.get('/api/blog/peek/:count', async (req, res) => {
    
    try {
        const results = await db.query("SELECT * FROM blog LIMIT $1",
        [req.params.count])
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data: {
                blog: results.rows
            }
        })
    } catch (err) {
        res.send(err)
    }
})

app.post('/api/blog', async (req, res) => {
    //Create new blog entry here
    try {
        const result = await db.query("INSERT INTO blog (title, category, content) values ($1, $2, $3) returning *", 
        [req.body.title, req.body.category, req.body.content])

        if(result.rows.length > 0) {
            res.status(201).json({
                status: "success",
                data: {
                    blog: result.rows[0]
                }
            })
        } else {
            res.status(204).json()
        }

    } catch (err) {
        res.send(err)
    }
})

app.put('/api/blog/:id', async (res, req) => {
    //Modify blog entry here
    try {
        const result = await db.query("UPDATE blog SET title=$1, category=$2, content=$3 WHERE id=$4 returning *", 
        [req.body.title, req.body.category, req.body.content, req.params.id])

        if(result.rows.length > 0) {
            res.status(200).json({
                status: "success",
                data: {
                    blog: result.rows[0]
                }
            })
        } else {
            res.status(204).json()
        }

    } catch (err) {
        res.send(err)
    }
})

app.get('/api/blog/:id', async (req, res) => {
    //Show blog content here
    try {
        const result = await db.query("SELECT * FROM blog WHERE id=$1", [req.params.id])

        if(result.rows.length > 0) {
            res.status(200).json({
                status: "success",
                data: {
                    blog: result.rows
                }
            })
        } else {
            res.status(204).json()
        }

    } catch (err) {
        res.send(err)
    }
})

app.delete('/api/blog/:id', async (req, res) => {
    try {
        const result = await db.query("DELETE FROM blog WHERE id=$1", [req.params.id])

        if(result.rows.length > 0) {
            res.status(204).json({
                status: "success",
            })
        } else {
            res.status(204).json()
        }

    } catch (err) {
        res.send(err)
    }
})

// Project/Git routes
app.get('/api/projects', (req, res) => {
    res.send('Git projects here')
})

const port = process.env.PORT
app.listen(port, () => {
    console.log(`server is up, listening on port ${port}`)
})