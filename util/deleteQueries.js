
// Import the database connection
const pool = require('../config/database');

const deleteCalendar = async (calendarID, userID) => {
    try {
        // SQL delete query to remove the calendar based on CalendarID and UserID
        const sql = 'DELETE FROM Calendars WHERE CalendarID = ? AND UserID = ?';
        const [result] = await pool.execute(sql, [calendarID, userID]);
        return result;
    } catch (error) {
        throw error;
    }
};

const deleteTaskDB = async (taskID, calendarID) => {
    try {
        // SQL delete query to remove tasks based on TaskID and CalendarID
        const sql = 'DELETE FROM Task WHERE TaskID = ? AND CalendarID = ?';
        const [result] = await pool.execute(sql, [taskID, calendarID]);
        return result;
    } catch (error) {
        throw error;
    }
};

const getTaskIDByTitle = async (title) => {
    try {
        // SQL select query to retrieve TaskID based on Title
        const sql = 'SELECT TaskID FROM Task WHERE Title = ?';
        const [result] = await pool.execute(sql, [title]);
        if (result.length === 1) {
            return result[0].TaskID; 
        }
    } catch (error) {
        throw error;
    }
};

// Export the deleteCalendar function
module.exports = {
    deleteCalendar,
    deleteTaskDB,
    getTaskIDByTitle
};



