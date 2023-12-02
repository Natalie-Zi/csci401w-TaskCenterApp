// Import the database connection
const pool = require('./database');

// Function to add a new calednar to  the database
const addCalendarDB = async (calendarName, userID) => {
    try {
        // SQL insert into new calendar based on CalendarName and UserID 
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
        // SQL query selects all columns from Calendars table based on UserID and CalendarName
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
         // SQL query selects CalendarName based on UserID
        const sql = 'SELECT CalendarName FROM Calendars WHERE UserID = ?';
        const [rows, fields] = await pool.execute(sql, [userID]);

        // Extracts the CalendarName only from each row and returns an array of calendar names
        return rows.map(row => row.CalendarName);
    } catch (error) {
        throw error;
    }
};

const removeCalendar = async (userID, calendarID) => {
    try {
        // SQL query will removes from Calendar from  Calendars Table. 
        const sql = 'DELETE FROM Calendars WHERE UserID = ? AND CalendarName = ?';
        const [rows, fields] = await pool.execute(sql, [userID, calendarID]);
        return rows.affectedRows > 0; // Returns true if a calendar was removed for the user
    } catch (error) {
        throw error;
    }
};

const retrieveCalendarIDByName = async (userID, calendarName) => {
    try {
        // SQL query selects CalendarID from Calendars table based on UserID and CalendarName
        const sql = 'SELECT CalendarID FROM Calendars WHERE UserID = ? AND CalendarName = ?';
        const [rows, fields] = await pool.execute(sql, [userID, calendarName]);
        if (results.length === 1) {
            return rows[0].CalendarID; 
        } else {
            return null; 
        }
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