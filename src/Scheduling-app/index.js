const express = require('express');
const path = require('path');

const app = express();

 // Corrected the variable name 'ports' to 'port'
const port = process.env.PORT || 3001;

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
//End routes 

app.get('/test', (req, res) => {
    //res.respons('register.ejs'); 
    res.status(200).json({ data: "True" });
});

// app configuration 
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});