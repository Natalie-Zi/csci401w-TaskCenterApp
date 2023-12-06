// Import the database connection
const pool = require('./database');

// Function to delete a task from calendar
const removeTask = async (taskId) => {
    try {
        const sql = 'DELETE FROM Task WHERE TaskID = ?';
        const [rows] = await connection.execute(sql, [taskId]);
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
};

// Function to edit a task in the Task table
const editTaskDB = async (taskId, updatedTitle, updatedDateDue, updatedTimeDue) => {
    try {
        const sql = 'UPDATE Task SET Title = ?, DateDue = ?, TimeDue = ? WHERE TaskID = ?';
        const [rows] = await connection.execute(sql, [updatedTitle, updatedDateDue, updatedTimeDue, taskId]);
    } catch (error) {
        console.error('Error editing task:', error);
        throw error;
    }
};

// Function to retrieve a task ID by name from the Task table
const retrieveTaskIDByName = async (title, userID) => {
    try {
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


// Export both functions
module.exports = {
    removeTask: removeTask, 
    editTaskDB: editTaskDB, 
    retrieveTaskIDByName: retrieveTaskIDByName
};
