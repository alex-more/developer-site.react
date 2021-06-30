require("dotenv").config()
const { NONAME } = require("dns")
const express = require('express')
const cors = require("cors")
const app = express()
const db = require("./db")
const bcrypt = require('bcrypt')

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Homepage here')
})

// TODO: Implement login system

// TODO: Improve layout with bootstrap and other CSS rules

// TODO: Complete README

// Blog routes
app.get('/api/blog', async (req, res) => {
    
    try {
        const results = await db.query('SELECT * FROM blog ORDER BY post_date DESC')
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

        res.status(201).json({
            status: "success",
            data: {
                blogPost: result.rows[0]
            }
        });

    } catch (err) {
        res.send(err)
    }
})

app.put('/api/blog/:id', async (req, res) => {
    //Modify blog entry here
    try {
        const result = await db.query("UPDATE blog SET title=$1, category=$2, content=$3 WHERE id=$4 returning *", 
        [req.body.title, req.body.category, req.body.content, req.params.id])

        res.status(200).json({
            status: "success",
            data: {
                blogPost: result.rows[0]
            }
        })

    } catch (err) {
        console.log(err)
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
                    blogPost: result.rows[0]
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
app.get('/api/projects', async (req, res) => {
    res.send('Git projects here')
})

// Create user if no user yet
app.post('/api/users', async (req, res) => {
    // 1. Check if a user exists in DB already
    const userCount = await db.query('SELECT COUNT(*) FROM users')

    // 2. If not, then create user based on contents of .env
    let username = process.env.CUSER;
    let password = process.env.CPASSWORD;

    // Hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10)

    // 3. Store that user in DB
    if(userCount.rows[0].count == 0) {
        await db.query("INSERT INTO users (Username, Password) values ($1, $2) returning *", 
        [username, hashedPassword])
    }

    res.status(200);
})

// Login route
app.post('/api/login', async (req, res) => {
    // 1. Send JSON body (React form needs to put it in request)
    // with credentials (user and password)
    // 2. Validate credentials with bcrypt
    let validCredentials = false;
    try {
        const pass = await db.query('SELECT password FROM users WHERE username=$1', 
        [req.body.username])

        if (pass.rows[0].password == null) {
            return res.status(400).send('Cannot find user')
        }

        console.log("username: success")

        if(await bcrypt.compare(req.body.password, pass.rows[0].password)) {
            validCredentials = true;
            console.log("password: success")
        }

        // 3. Generate a JWT (see video on jsonwebtoken)
        if (validCredentials) {

        }
    } catch (err) {
        res.status(500).send();
    }

    res.status(200).json();
})

const port = process.env.PORT
app.listen(port, () => {
    console.log(`server is up, listening on port ${port}`)
})