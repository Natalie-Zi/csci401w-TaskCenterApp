// Import the database connection
const pool = require('./database');

// Function to create a new user in the database
const createUser = async (username, email, userPassword) => {
    try {
        const sql = 'INSERT INTO UserRegistration (Username, Email, UserPassword) VALUES (?, ?, ?)';
        const [rows, fields] = await pool.execute(sql, [username, email, userPassword]);
        return rows;
    } catch (error) {
        throw error;
    }
};

// Function to check the user login credentials.
const loginDB = async (email, userPassword) => {
    try {
         // SQL query to retrieve user ID and username based on email and password
        const sql = 'SELECT UserID, Username FROM UserRegistration WHERE Email = ? AND UserPassword = ?';
        const [rows, fields] = await pool.execute(sql, [email, userPassword]);
        return rows;
    } catch (error) {
        throw error;
    }
};

/// Function to check if the username is already in the database
async function isUsernameAvaliable(username) {
    try {
        const sql = 'SELECT * FROM UserRegistration WHERE Username = ?';
        const [rows, fields] = await pool.execute(sql, [username]);
        // Return true if the username is available
        return rows.length === 0;
    } catch (error) {
        throw error;
    }
}

// Function to check if the email is already in the database
const isEmailAvaliable = async (email) => {
    try {
        const sql = 'SELECT * FROM UserRegistration WHERE Email = ?';
        const [rows, fields] = await pool.execute(sql, [email]);
        // Return true if the email is already used
        return rows.length === 0;  
    } catch (error) {
        throw error;
    }
};

// Function to create a new user in the database
const addCalendaQuery = async (calendarName, userID) => {
    try {
        const sql = 'INSERT INTO Calendars (CalendarName, UserID) VALUES (?, ?)';
        const [rows, fields] = await pool.execute(sql, [calendarName, userID])
        return rows;
    } catch (error) {
        throw error;
    }
};

// Export both functions
module.exports = {
    createUser: createUser,
    isUsernameAvaliable: isUsernameAvaliable,
    isEmailAvaliable: isEmailAvaliable,
    loginDB: loginDB, 
    addCalendaQuery: addCalendaQuery

};
