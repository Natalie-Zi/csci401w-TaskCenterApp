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

const login = async (email, userPassword) => {
    try {
        // Perform your authentication logic, e.g., querying the database
        const sql = 'SELECT * FROM UserRegistration WHERE Email = ? AND UserPassword = ?';
        const [rows, fields] = await pool.execute(sql, [email, userPassword]);
    }
    catch (error) {
        throw error;
    }
};

/// Function to check if the username is already in the database
const isUsernameAvaliable = async (username) => {
    try {
        const sql = 'SELECT * FROM UserRegistration WHERE Username = ?';
        const [rows, fields] = await pool.execute(sql, [username]);
        // Return true if the username is available
        return rows.length === 0; 
    } catch (error) {
        throw error;
    }
};

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

// Export both functions
module.exports = {
    createUser: createUser,
    isUsernameAvaliable: isUsernameAvaliable,
    isEmailAvaliable: isEmailAvaliable,
    login: login
};
