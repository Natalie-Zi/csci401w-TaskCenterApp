// Import the database connection
const pool = require('./database');

// Function will create a new user in the database.
const createUser = async (username, email, userPassword) => {
    try {
        // SQL insert into UserRegistration in columns Username, Email, UserPassword
        const sql = 'INSERT INTO UserRegistration (Username, Email, UserPassword) VALUES (?, ?, ?)';
        const [result] = await pool.execute(sql, [username, email, userPassword]);
        // Will return newly created UserID from the database after successful insert
        return { userID: result.insertId };
    } catch (error) {
        throw error;
    }
};

// Function will check the user's login credentials.
const loginDB = async (email, userPassword) => {
    try {
        // SQL query selects UserID and Username from UserRegistration table based on Email and UserPassword
        const sql = 'SELECT UserID, Username FROM UserRegistration WHERE Email = ? AND UserPassword = ?';
        const [result] = await pool.execute(sql, [email, userPassword]);
        // Returning the result of the query
        return result;
    } catch (error) {
        throw error;
    }
};

// Function to check if the username is already in the database
const isUsernameAvailable = async (username) => {
    try {
        // SQL query selects all columns from UserRegistration based on username
        const sql = 'SELECT * FROM UserRegistration WHERE Username = ?';
        const [result] = await pool.execute(sql, [username]);
        // Return true if the username is available (no matching records found)
        return result.length === 0;
    } catch (error) {
        throw error;
    }
};

// Function will check whether the email already exists in the database.
const isEmailAvaliable = async (email) => {
    try {
        // SQL query selects all columns from UserRegistration based on email
        const sql = 'SELECT * FROM UserRegistration WHERE Email = ?';
        const [result] = await pool.execute(sql, [email]);
        // Return true if the username is available (no matching records found)
        return result.length === 0;  
    } catch (error) {
        throw error;
    }
};

// Function will create a default calendar for new users.
const defaultCalendar = async (userID, calendarName = 'My Calendar') => {
    try {
        // SQL query to insert a new calendar for new user. 
        const sql = 'INSERT INTO Calendars (CalendarName, UserID) VALUES (?, ?)';
        const [result] = await pool.execute(sql, [calendarName, userID]);
        // Return the ID of the newly inserted calendar
        return result.insertId;
    } catch (error) {
        throw error;
    }
};

// Export the functions
module.exports = {
    createUser,
    loginDB, 
    isUsernameAvailable, 
    isEmailAvaliable, 
    defaultCalendar
};