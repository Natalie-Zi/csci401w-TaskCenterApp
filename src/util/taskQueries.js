// Import the database connection
const pool = require('./database');

// Function to delete a task from calendar
const removeTask = async (userID, taskID) => {
    try {
        // SQL query to delete a task based on TaskID and UserID
        const sql = 'DELETE FROM Task WHERE UserID = ? AND TaskID = ?';
        const [rows] = await connection.execute(sql, [userID, taskID]);
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
};

// Function to retrieve a task ID by name from the Task table
const retrieveTaskIDByName = async (title, userID) => {
    try {
         // SQL query selects TaskID from Task table based on Title and CreatedByUserID
        const sql = 'SELECT TaskID FROM Task WHERE Title = ? AND CreatedByUserID = ?';
        const [rows] = await connection.execute(sql, [title, userID]);
        if (rows.length === 1) {
             // If a task with the title and user ID is found, return the TaskID
            return rows[0].TaskID;
        }
    } catch (error) {
        console.error('Error retrieving task ID:', error);
        throw error;
    }
};

// Function to display the tasks of the user. 
const displayTask = async (calendarID, createdByUserID) => {
    try {
         // SQL query to retrieve tasks based on CalendarID and CreatedByUserID
        const sql = 'SELECT Title, DateDue, TimeDue FROM Task WHERE CalendarID = ? AND CreatedByUserID = ?';
        const [rows, fields] = await pool.execute(sql, [calendarID, createdByUserID]);
        return rows;
      } catch (error) {
        throw error;
      }
};

const addTask = async (title, dateDue, timeDue, calendarID, createdByUserID) => {
    try {
        // SQL query to insert a new task
        const sql = 'INSERT INTO Task (Title, DateDue, TimeDue, CalendarID, CreatedByUserID) VALUES (?, ?, ?, ?, ?)';
        const [result] = await pool.execute(sql, [title, dateDue, timeDue, calendarID, createdByUserID]);
        return result;
    } catch (error) {
        throw error;
    }
};


// Function to edit a task in the Task table
const editTaskDB = async (updatedTitle, updatedDateDue, updatedTimeDue, taskID, userID ) => {
    try {
        // SQL query to update a task based on TaskID and UserID
        const sql = 'UPDATE Task SET Title = ?, DateDue = ?, TimeDue = ? WHERE TaskID = ? AND UserID = ? ';
        const [rows] = await connection.execute(sql, [updatedTitle, updatedDateDue, updatedTimeDue, taskID, userID]);
    } catch (error) {
        console.error('Error editing task:', error);
        throw error;
    }
};

// Export both functions
module.exports = {
    removeTask: removeTask, 
    editTaskDB: editTaskDB, 
    addTask: addTask, 
    displayTask: displayTask, 
    retrieveTaskIDByName: retrieveTaskIDByName
};
