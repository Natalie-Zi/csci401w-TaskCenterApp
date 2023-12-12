// Import the database connection
const pool = require('../config/database');

// Function to add a new task to the database
const addTaskDB = async (title, dateDue, timeDue, calendarID, createdByUserID) => {
    try {
        const sql = 'INSERT INTO Task (Title, DateDue, TimeDue, CalendarID, CreatedByUserID) VALUES (?, ?, ?, ?, ?)';
        const [rows] = await pool.execute(sql, [title, dateDue, timeDue, calendarID, createdByUserID]);
        return rows;
    } catch (error) {
        throw error;
    }
};

const checkViewPermission = async (userID, calendarID) => {
    try {
        // SQL query to check if the user has Edit permission for the calendar shared with them
        const sql = 'SELECT * FROM UserSharing WHERE SharedWithID = ? AND CalendarID = ? AND PermissionLevel = "View"';
        const [rows] = await pool.execute(sql, [userID, calendarID]);
        
        // Check if there are rows returned (indicating Edit permission)
        return rows.length > 0;
    } catch (error) {
        throw error;
    }
};

const getCalendarIDByName = async (calendarName) => {
    try {
         const sql = 'SELECT CalendarID FROM Calendars WHERE CalendarName = ?';
         const [rows] = await pool.execute(sql, [calendarName]);
         if (rows.length === 1) {
            return rows[0].CalendarID; 
         }
    } catch (error) {
        console.error('Error retrieve calendarID by calendarName:', error);
        throw error;
    }
};

const getTasksForCalendar = async (calendarID) => {
    try {
        // Retrieve tasks for the specified calendar that are owned by the logged-in user
        const sql = 'SELECT * FROM Task WHERE CalendarID = ? ';
        const [rows] = await pool.execute(sql, [calendarID]);
        // Return the tasks associated with the calendar for the logged-in user
        return rows;
    } catch (error) {
        throw error;
    }
};

// Export both functions
module.exports = {    
    addTaskDB,
    checkViewPermission,
    getCalendarIDByName,
    getTasksForCalendar

};