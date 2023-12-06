const { addTaskDB } = require('../util/addTask');

// Define route to handle adding a task.
const addTask = async (req, res) => {
    try {
        const { taskName, dueDate, dueTime, calendarName } = req.body;

        // Get the UserID from the session
        const loggedInUserID = req.session.userId;

        // Ensure the user is logged in
        if (!loggedInUserID) {
            console.log('User not logged in.');
            return res.status(401).json({ message: 'User not logged in.' });
        }

        // You need to obtain the CalendarID based on the calendarName
        // You can use a function like retrieveCalendarIDByName from your utility functions
        const calendarID = await retrieveCalendarIDByName(loggedInUserID, calendarName);

        // Use the userID (of the currently logged-in user) and calendarID to add the task to the database
        const result = await addTaskDB(taskName, dueDate, dueTime, calendarID, loggedInUserID);

        console.log('Task added successfully.');
        res.status(201).json({ message: 'Task added successfully.', data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Export the route handler as a function
module.exports = {
    addTask: addTask,
};
