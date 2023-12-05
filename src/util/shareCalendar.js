// Import the database connection
const pool = require('./database');

// Function to share a calendar with another user.
const shareCalendarDB = async (userID, calendarID, sharedWithID, permissionLevel) => {
    try {
         // SQL insert into UserSharing based on UserID, CalendarID, SharedWithID and  PermissionLevel. 
        const sql = "INSERT INTO UserSharing (UserID, CalendarID, SharedWithID, PermissionLevel) VALUES (?, ?, ?, ?)";
        const [rows] = await pool.execute(sql, [userID, calendarID, sharedWithID, permissionLevel]);
        return rows;
    } catch (error) {
        console.error('Error sharing calendar:', error);
        throw error;
    }
};

// Function to check the is Calendar Owned By User
const isCalendarOwnedByUser = async (userID, calendarName) => {
    try {
        const sql = 'SELECT CalendarID FROM Calendars WHERE UserID = ? AND CalendarName = ?';
        const [rows] = await pool.execute(sql, [userID, calendarName]);

        // Check if there's a match for the provided UserID and CalendarName
        return rows.length > 0;
    } catch (error) {
        throw error;
    }
};

const retrieveUserIDByEmail = async (email) => {
    try {
        // SQL query selects UserID from UserRegistration table based on Email
        const sql = 'SELECT UserID FROM UserRegistration WHERE Email = ?';
        const [rows] = await pool.execute(sql, [email]);
        if (rows.length === 1) {
            return rows[0].UserID;
        }
    } catch (error) {
        console.error('Error retrieve UserID by email:', error);
        throw error;
    }
};

const retrieveCalendarIDByName = async (userID, calendarName) => {
    try {
         // SQL query selects CalendarName based on UserID and calendarName
         const sql = 'SELECT CalendarID FROM Calendars WHERE UserID = ? and CalendarName = ? ';
         const [rows] = await pool.execute(sql, [userID, calendarName]);
         if (rows.length === 1) {
            return rows[0].CalendarID; 
         }
    } catch (error) {
        console.error('Error retrieve calendarID by calendarName:', error);
        throw error;
    }
};

const checkEditPermission = async (userID, calendarID) => {
    try {
        // SQL query to check if the user has Edit permission for the calendar
        const sql = 'SELECT * FROM UserSharing WHERE UserID = ? AND CalendarID = ? AND PermissionLevel = "Edit"';
        const [rows] = await pool.execute(sql, [userID, calendarID]);
        
        // Check if there are rows returned (indicating Edit permission)
        return rows.length > 0;
    } catch (error) {
        throw error;
    }
};

// Export Functions 
module.exports = {
    shareCalendarDB: shareCalendarDB, 
    isCalendarOwnedByUser: isCalendarOwnedByUser, 
    retrieveUserIDByEmail: retrieveUserIDByEmail,
    retrieveCalendarIDByName: retrieveCalendarIDByName,
    checkEditPermission: checkEditPermission 
}