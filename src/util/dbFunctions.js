// Import the database connection
const pool = require('./database');

// Function to create a new user in the database
const createUser = async (username, email, userPassword) => {
    try {
        // SQL query to insert a new user into the UserRegistration table
        const sql = 'INSERT INTO UserRegistration (Username, Email, UserPassword) VALUES (?, ?, ?)';
        
        // Execute the SQL query using the database connection pool
        const [rows, fields] = await pool.execute(sql, [username, email, userPassword]);
        
        // Return the result of the database operation
        return rows;
    } catch (error) {
        // Throw an error if an exception occurs during the database operation
        throw error;
    }
};

// Function to authenticate a user based on email and password
const loginDB = async (email, userPassword) => {
    try {
        // SQL query to retrieve user information based on email and password
        const sql = 'SELECT * FROM UserRegistration WHERE Email = ? AND UserPassword = ?';
        
        // Execute the SQL query using the database connection pool
        const [rows, fields] = await pool.execute(sql, [email, userPassword]);
        
        // Return the result of the database operation
        return rows;
    }
    catch (error) {
        // Throw an error if an exception occurs during the database operation
        throw error;
    }
};

// Function to check if the username is already in the database
async function isUsernameAvailable(username) {
    try {
        // SQL query to check the availability of a username
        const sql = 'SELECT * FROM UserRegistration WHERE Username = ?';
        
        // Execute the SQL query using the database connection pool
        const [rows, fields] = await pool.execute(sql, [username]);
        
        // Return true if the username is available (not in use)
        return rows.length === 0;
    } catch (error) {
        // Throw an error if an exception occurs during the database operation
        throw error;
    }
}

// Function to check if the email is already in the database
const isEmailAvailable = async (email) => {
    try {
        // SQL query to check the availability of an email
        const sql = 'SELECT * FROM UserRegistration WHERE Email = ?';
        
        // Execute the SQL query using the database connection pool
        const [rows, fields] = await pool.execute(sql, [email]);
        
        // Return true if the email is available (not in use)
        return rows.length === 0;  
    } catch (error) {
        // Throw an error if an exception occurs during the database operation
        throw error;
    }
};

// Export both functions for use in other modules
module.exports = {
    createUser: createUser,
    isUsernameAvailable: isUsernameAvailable,
    isEmailAvailable: isEmailAvailable,
    loginDB: loginDB
};
