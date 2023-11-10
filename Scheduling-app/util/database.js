// Import the mysql2 library
const mysql2 = require('mysql2');

// Import the database configuration from config.json
const config = require('../config/config.json');

// Create a MySQL database connection pool using the configuration
const pool = mysql2.createPool({
  host: config.host,         // Database host
  user: config.user,         // Database user
  database: config.database, // Database name
  password: config.password  // Database password
});

// Attempt to get a connection from the pool to test the connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to the database'); // Successful database connection
    connection.release(); // Release the connection back to the pool
  }
});

// Export the connection pool as a promise-based pool
module.exports = pool.promise();