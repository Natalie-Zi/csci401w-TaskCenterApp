// Import the database connection
const pool = require('./database');

// Function to add a new calednar to  the database
const addCalendarDB = async (calendarName, userID) => {
    try {
        const sql = 'INSERT INTO Calendars (CalendarName, UserID) VALUES (?, ?)';
        const [rows, fields] = await pool.execute(sql, [calendarName, userID])
        return rows;
    } catch (error) {
        throw error;
    }
};

// Function to check if the calendar name is already in use for the current user
const isCalendarNameAvailable = async (userId, calendarName) => {
    try {
        const sql = 'SELECT * FROM Calendars WHERE UserID = ? AND CalendarName = ?';
        const [rows, fields] = await pool.execute(sql, [userId, calendarName]);
        // Return true if the calendar name is available (not used) for the current user
        return rows.length === 0;  
    } catch (error) {
        throw error;
    }
};

const retrieveCalendarNames = async (userID) => {
    try {
         // SQL query to select CalendarName based on UserID
        const sql = 'SELECT CalendarName FROM Calendars WHERE UserID = ?';
        const [rows, fields] = await pool.execute(sql, [userID]);

        // Extracts the CalendarName only from each row and returns an array of calendar names
        return rows.map(row => row.CalendarName);
    } catch (error) {
        throw error;
    }
};

// Export both functions
module.exports = {    
    addCalendarDB: addCalendarDB,
    isCalendarNameAvailable: isCalendarNameAvailable,
    retrieveCalendarNames: retrieveCalendarNames,
};