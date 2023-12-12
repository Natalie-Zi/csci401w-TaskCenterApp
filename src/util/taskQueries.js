// Import the database connection
const pool = require('./database');

// Function to add a new task to the database
const addTaskDB = async (title, dateDue, timeDue, calendarID, createdByUserID) => {
    try {
        const sql = 'INSERT INTO Task (Title, DateDue, TimeDue, CalendarID, CreatedByUserID) VALUES (?, ?, ?, ?, ?)';
        const [rows, fields] = await pool.execute(sql, [title, dateDue, timeDue, calendarID, createdByUserID]);
        return rows;
    } catch (error) {
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

const isTaskOwnedByUser = async (userID, TaskID) => {
    try {
        // Select TaskID where the TaskID matches the provided ID and is created by the specified user
        const sql = 'SELECT TaskID FROM Task WHERE TaskID = ? AND CreatedByUserID = ?';
        const [rows] = await pool.execute(sql, [TaskID, userID]);

        // Check if there's a match for the provided TaskID and UserID
        return rows.length > 0;
    } catch (error) {
        throw error;
    }
};

const deleteTaskDB = async (TaskID) => {
    try {
        // SQL query to delete a task based on TaskID
        const sql = 'DELETE FROM Task WHERE TaskID = ?';
        const [rows] = await pool.execute(sql, [TaskID]);

        // Log the SQL query and parameters
        console.log('SQL Query:', sql, 'Parameters:', [TaskID]);

        // Optionally, you can check if any rows were affected
        if (rows.affectedRows !== 1) {
            console.warn('No task deleted. TaskID not found.');
        }

        // Return a success message or other relevant information
        return { success: true, message: 'Task deleted successfully.' };
    } catch (error) {
        console.error('Error deleting task:', error);

        // Log the error or throw it again for better error tracking
        throw error;
    }
};

const displayEditTask = async (calendarID, TaskID, createdByUserID) => {
    try {
        // SQL query to get tasks based on CalendarID, TaskID, and CreatedByUserID
        const sql = 'SELECT Title, DateDue, TimeDue FROM Task WHERE CalendarID = ? AND TaskID = ? AND CreatedByUserID = ?';
        const [rows, fields] = await pool.execute(sql, [calendarID, TaskID, createdByUserID]);
        return rows;
    } catch (error) {
        throw error;
    }
};

// Function to edit a task in the Task table
const editTaskDB = async (updatedTitle, updatedDateDue, updatedTimeDue, TaskID, userID ) => {
    try {
        // SQL query to update a task based on TaskID and UserID
        const sql = 'UPDATE Task SET Title = ?, DateDue = ?, TimeDue = ? WHERE TaskID = ? AND UserID = ? ';
        const [rows] = await connection.execute(sql, [updatedTitle, updatedDateDue, updatedTimeDue, TaskID, userID]);
    } catch (error) {
        console.error('Error editing task:', error);
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

const getUserPermissionLevel = async (userID, calendarID) => {
    try {
        const sql = 'SELECT PermissionLevel FROM UserSharing WHERE UserID = ? AND CalendarID = ?';
        const [rows] = await pool.execute(sql, [userID, calendarID]);
        if (rows.length > 0) {
            return rows[0].PermissionLevel;
        } 
    } catch (error) {
        throw error;
    }
};

const retrieveTasksForCalendar = async (loggedInUserID, calendarID) => {
    try {
        // Retrieve tasks for the specified calendar that are owned by the logged-in user
        const sql = 'SELECT * FROM Task WHERE CalendarID = ? AND CreatedByUserID = ?';
        const [rows] = await pool.execute(sql, [calendarID, loggedInUserID]);
        // Return the tasks associated with the calendar for the logged-in user
        return rows;
    } catch (error) {
        throw error;
    }
};

// Function to retrieve a task ID by title and user ID
const retrieveTaskIDByTitle = async (taskTitle, userID) => {
    try {
        // SQL query selects TaskID from Task table based on Title and CreatedByUserID
        const sql = 'SELECT TaskID FROM Task WHERE Title = ? AND CreatedByUserID = ?';
        const [rows] = await pool.execute(sql, [taskTitle, userID]);

        // If a task with the title and user ID is found, return the TaskID
        if (rows.length === 1) {
            return rows[0].TaskID;
        }
        
    } catch (error) {
        console.error('Error retrieving task ID by title:', error);
        throw error;
    }
};

// Export both functions
module.exports = {   
    addTaskDB: addTaskDB, 
    retrieveTaskIDByName: retrieveTaskIDByName, 
    isTaskOwnedByUser: isTaskOwnedByUser, 
    deleteTaskDB: deleteTaskDB,
    displayEditTask: displayEditTask,  
    editTaskDB: editTaskDB,

    checkEditPermission,
    getUserPermissionLevel,
    retrieveTasksForCalendar,

    retrieveTaskIDByTitle : retrieveTaskIDByTitle


};