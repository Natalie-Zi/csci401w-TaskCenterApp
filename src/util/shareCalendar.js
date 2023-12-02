// Import the database connection
const pool = require('./database');

// Function to share a calendar with another user.
const shareCalendarDB = async (calendarID, sharedWithID, userID) => {
    try {
        const sql = "INSERT INTO UserSharing (CalendarID, SharedWithID, UserID) VALUES (?, ?, ?)";
        await connection.execute(sql, [calendarID, sharedWithID, userID]);
    } catch (error) {
        throw error;
    }
};

// Function to get the calendar ID by name. 
// Note: Should be use when asking user 'Enter the Calendar Name you want to share: 
const retrieveCalendarIDByName = async (calendarName, userID) =>{
    try {
        const sql = 'SELECT CalendarID FROM Calendars WHERE CalendarName = ? AND UserID = ?';
        const [results] = await connection.execute(sql, [calendarName, userID]);
        if (results.length === 1) {
            return results[0].CalendarID;
        }
        return null;
    }  catch (err) {
        console.error(err);
        return null;
    }
}

// Function to check if a user is the owner of a calendar.
// Note: Should be use to check if the calendar being shared is owned by the user login
const isCalendarOwnedByUser = async (calendarID, userID) => {
    try {
        const sql = 'SELECT COUNT(*) FROM Calendars WHERE CalendarID = ? AND UserID = ?';
        const [results] = await connection.execute(sql, [calendarID, userID]);
        // Check if the count of rows is greater than 0, showing the ownership of Calendars.
        return results[0]['COUNT(*)'] > 0; 
    } catch (error) {
        throw error;
    }
};

/* Note: Get User ID by Email: 
  The user enters the email address of the person they want to share the calendar with. 
  The share calendar post should use the retrieveUserIDByEmail function 
  to retrieve the user ID associated with that email. */
  const retrieveUserIDByEmail = async (email) => {
    try {
        const sql = 'SELECT UserID FROM UserRegistration WHERE Email = ?';
        const [results] = await connection.execute(sql, [email]);
        if (results.length === 1) {
            return results[0].UserID; 
        }
        console.log(`User not found for email: ${email}`);
        return null;
    } catch (error) {
        throw error;
    }
};

// Export both functions
module.exports = {
    shareCalendarDB: shareCalendarDB,
    retrieveCalendarIDByName: retrieveCalendarIDByName,
    isCalendarOwnedByUser: isCalendarOwnedByUser,
    retrieveUserIDByEmail:retrieveUserIDByEmail
};
