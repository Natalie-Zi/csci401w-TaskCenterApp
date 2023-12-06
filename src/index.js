const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;

// Import the post function
const postController = require('./controller/postController');
const AddCalPost = require('./controller/AddCalPost');
const shareCalPost = require('./controller/shareCalPost');
const taskPost = require('./controller/addTaskPost'); // Add this line to import taskPost

// Session middleware
app.use(session({
    secret: 'some secret', 
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day in milliseconds
    saveUninitialized: false,
    resave: false,
}));

// Middleware to parse the request body as JSON
app.use(bodyParser.json());

// View engine setup
app.set('view engine', 'ejs');

// Define routes ----- Start --------
app.route('/login')
    .get((req, res) => {
        // Use the same route for rendering the login page and processing the login.
        res.render('login.ejs');
    })
    .post(postController.login);
    
app.get('/register', (req, res) => {
    res.render('register.ejs');
});

app.get('/calendar', (req, res) => {
    // Home page 
    res.render('calendar.ejs');
});

app.get('/logout', (req, res) => {
    // Destroy the session
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            res.redirect('/login');
            // Print to console that the user ID has logout
             console.log(`User has succesfully logout.`);
        }
    });
});
// Define routes ----- ENDS --------

// Handle POST request for creating an account
app.post('/create-account', postController.createAccount);
app.post('/add-Calendar', AddCalPost.addCalendar);

app.post('/get-CalendarName', AddCalPost.getCalendarNames);
app.post('/share-Calendar', shareCalPost.shareCalendar);

app.post('/add-task', taskPost.addTask);

// app configuration
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});