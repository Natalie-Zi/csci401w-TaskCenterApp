const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');

// Import your post function
const postController = require('./controller/postController');

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
// End routes

// Handle POST request for creating an account
app.post('/create-account', postController.createAccount);

// app configuration
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
