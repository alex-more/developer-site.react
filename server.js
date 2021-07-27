require("dotenv").config()
const { NONAME } = require("dns")
const express = require('express')
const cors = require("cors")
const app = express()
const db = require("./db")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const { request } = require("http")
const https = require("https")

app.use(cors())
app.use(express.json())

const username = 'alex-more' // For github readme api call

// For Github API calls
let gitOptions = {
    host: 'api.github.com',
    path: '/users/' + username + '/repos',
    method: 'GET',
    headers: {'user-agent': 'node.js'}
}

// For Readme API calls
let readmeOptions = {
    method: 'GET',
    headers: {'user-agent': 'node.js'}
}

app.get('/', (req, res) => {
    res.send('Homepage here')
})

// Check if user is logged in
app.get('/api/blog/admin/authenticate', verifyToken, (req, res) => {
    if(req.valid == false) {
        return res.status(200).json({ status: "failure" });
    }
        
    res.status(200).json({ status: "success" });
})

// Github API Request to list all repos of user
app.get('/api/github/:user', (req, res) => {
    
    let request = https.request(gitOptions, function(response) {
        let body = '';
        response.on("data", function(chunk){
            body += chunk.toString('utf8');
        })
        response.on("end", function(){
            parsedBody = JSON.parse(body)
            res.status(200).json(parsedBody)
        })
    })
    request.end();
})

// Github API Request for readme of specific repo
app.get('/api/readme/:repo', (req, res) => {

    let request = https.request(`https://raw.githubusercontent.com/${username}/${req.params.repo}/master/README.md`, 
    readmeOptions, function(response) {
        
        let body = '';
        response.on("data", function(chunk){
            body += chunk.toString('utf8');
        })
        response.on("end", function(){
            res.status(200).json({
                data: body
            })
        })
    })
    request.end();
})

// Blog routes
app.get('/api/blog', async (req, res) => {
    console.log("GET Request inbound")
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

//Create new blog entry
app.post('/api/blog', verifyToken, async (req, res) => {
    if(req.valid == false) {
        return res.status(401);
    }

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

//Modify blog entry
app.put('/api/blog/:id', verifyToken, async (req, res) => {
    if(req.valid == false) {
        return res.status(401)
    }
    
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

// Show full blog entry
app.get('/api/blog/:id', async (req, res) => {
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

// Delete blog entry
app.delete('/api/blog/:id', verifyToken, async (req, res) => {
    if(req.valid == false) {
        return res.status(401);
    }
    
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
    try {
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
    } catch (err) {
        res.status(400);
    }
})

// Login route
app.post('/api/login', async (req, res) => {
    // 1. Validate credentials with bcrypt
    try {
        let validCredentials = false;
        const pass = await db.query('SELECT password FROM users WHERE username=$1', 
        [req.body.username])

        if (pass.rowCount == 0) {
            return res.status(200).json({ accessToken: 'invalid_token' })
        }

        if(await bcrypt.compare(req.body.password, pass.rows[0].password)) {
            validCredentials = true;
        } else {
            return res.status(200).json({ accessToken: 'invalid_token' })
        }

        // 2. Generate a jsonwebtoken
        if (validCredentials) {
            const user = { name: req.body.username }
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20h' })
            res.status(200).json({ accessToken })
        }

    } catch (err) {
        res.status(500).send();
    }
})

// Authenticates a Json Web Token
function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    req.valid = false;

    if(token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) {
            return res.sendStatus(403);
        } else {
            req.valid = true;
            next();
        }
    })
}

const port = process.env.PORT
app.listen(port, () => {
    console.log(`server is up, listening on port ${port}`)
})