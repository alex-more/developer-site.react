require("dotenv").config()
const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Homepage here')
})

// Blog routes
app.get('/api/blog', (req, res) => {
    res.send('Blog page here')
})

app.post('/api/blog', (req, res) => {
    //Create new blog entry here
    res.status(201).json({
        data: "dummy"
    })
})

app.put('/api/blog/:id', (res, req) => {
    //Modify blog entry here
    res.status(200).json({
        data: "dummy"
    })
})

app.get('/api/blog/:id', (req, res) => {
    //Show blog content here
    res.status(200).json({
        data: "dummy"
    })
})

app.delete('/api/blog/:id', (req, res) => {
    res.status(204).json({
        data: "none"
    })
})

// Project/Git routes
app.get('/api/projects', (req, res) => {
    res.send('Git projects here')
})

const port = process.env.PORT
app.listen(port, () => {
    console.log(`server is up, listening on port ${port}`)
})