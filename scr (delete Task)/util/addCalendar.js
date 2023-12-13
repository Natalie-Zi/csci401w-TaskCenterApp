// Import the database connection
const pool = require('../config/database');

// Function to add a new calednar to  the database
const addCalendarDB = async (calendarName, userID) => {
    try {
        // SQL insert into new calendar based on CalendarName and UserID 
        const sql = 'INSERT INTO Calendars (CalendarName, UserID) VALUES (?, ?)';
        const [rows] = await pool.execute(sql, [calendarName, userID])
        return rows;
    } catch (error) {
        throw error;
    }
};

// Function to check if the calendar name is already in use for the current user
const isCalendarNameAvailable = async (userId, calendarName) => {
    try {
        // SQL query selects all columns from Calendars table based on UserID and CalendarName
        const sql = 'SELECT * FROM Calendars WHERE UserID = ? AND CalendarName = ?';
        const [rows] = await pool.execute(sql, [userId, calendarName]);
        // Return true if the calendar name is available (not used) for the current user
        return rows.length === 0;  
    } catch (error) {
        throw error;
    }
};

const retrieveCalendarNames = async (userID) => {
    try {
         // SQL query selects CalendarName based on UserID
        const sql = 'SELECT CalendarName FROM Calendars WHERE UserID = ?';
        const [rows] = await pool.execute(sql, [userID]);

        // Extracts the CalendarName only from each row and returns an array of calendar names
        return rows.map(row => row.CalendarName);
    } catch (error) {
        throw error;
    }
};

// Export both functions
module.exports = {    
    addCalendarDB,
    isCalendarNameAvailable,
    retrieveCalendarNames,

};