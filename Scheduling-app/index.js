const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');

// Import your database functions
const createUser = require('./util/dbFunctions');

const app = express();
const port = process.env.PORT || 3001;

// Middleware to parse the request body as JSON
app.use(bodyParser.json());

// View engine setup
app.set('view engine', 'ejs');

// Define routes
app.get('/homepage', (req, res) => {
    res.render('index.ejs');
});

app.get('/login', (req, res) => {
    res.render('login.ejs');
});

app.get('/register', (req, res) => {
    res.render('register.ejs');
});

// Handle POST request for creating an account
app.post('/create-account', async (req, res) => {
    try {
        // Retrieve data from the request body
        const { username, email, password } = req.body;

        // Use your database functions to save the user data
        const result = await createUser(username, email, password);

        // Send a response back to the client
        res.status(201).json({ message: 'Account created successfully', data: result });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// End routes
app.get('/test', (req, res) => {
    res.status(200).json({ data: "True" });
});

// app configuration
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
