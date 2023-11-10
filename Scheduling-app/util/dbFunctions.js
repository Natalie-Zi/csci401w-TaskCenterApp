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

module.exports = createUser;
