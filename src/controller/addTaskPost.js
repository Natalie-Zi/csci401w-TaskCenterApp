const { addTaskDB } = require('../util/taskQueries');
const { retrieveCalendarIDByName } = require('../util/addCalendar');

// Define route to handle adding a task.
const addTask = async (req, res) => {
    try {
        const {taskName, taskDate, taskTime} = req.body;

        // Get the UserID from the session
        const loggedInUserID = req.session.userId;
        const calendarName = req.session.calendarName;

        // Ensure the user is logged in
        if (!loggedInUserID) {
            console.log('User not logged in.');
            return res.status(401).json({ message: 'User not logged in.' });
        }

        // Check if the calendar name is provided in the user input
        if (!calendarName) {
            console.log('Calendar name not provided.');
            return res.status(400).json({ message: 'Calendar name not provided.' });
        }

        // You need to obtain the CalendarID based on the calendarName
        // You can use a function like retrieveCalendarIDByName from your utility functions
        const calendarID = await retrieveCalendarIDByName(loggedInUserID, calendarName);

        // Use the userID (of the currently logged-in user) and calendarID to add the task to the database
        const result = await addTaskDB(taskName, taskDate, taskTime, calendarID, loggedInUserID);

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
