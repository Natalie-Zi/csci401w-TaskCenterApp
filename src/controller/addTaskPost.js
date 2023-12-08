const { addTaskDB, checkEditPermission } = require('../util/taskQueries');
const { retrieveCalendarIDByName, isCalendarOwnedByUser } = require('../util/shareCalendar');

// Define route to handle adding a task.
const addTask = async (req, res) => {
    try {
        const { taskTitle, dueDate, dueTime, calendarName } = req.body;

        // Debug: Log the content of req.body
        console.log('Request Body:', req.body);

        // Get the UserID from the session
        const loggedInUserID = req.session.userId;

        // Ensure the user is logged in
        if (!loggedInUserID) {
            console.log('User not logged in.');
            return res.status(401).json({ message: 'User not logged in.' });
        }

        // Retrieve the CalendarID based on the calendar name and logged-in user ID
        const CalendarIDByName = await retrieveCalendarIDByName(loggedInUserID, calendarName);

        console.log('Calendar ID retrieved:', CalendarIDByName);

        // Check if the logged-in user owns the calendar
        const ownedByUser = await isCalendarOwnedByUser(loggedInUserID, calendarName);

        console.log('Owned by user:', ownedByUser);

        // Check if the user has edit permission for the calendar
        const hasEditPermission = await checkEditPermission(loggedInUserID, CalendarIDByName);

        console.log('Has edit permission:', hasEditPermission);

        // Check if the user has edit permission or owns the calendar
        if (!hasEditPermission && !ownedByUser) {
            return res.status(403).json({ message: 'Unauthorized. You do not have permission to add tasks to this calendar.' });
        }

        // Use the retrieved calendarID and loggedInUserID to add the task to the database
        const result = await addTaskDB(taskTitle, dueDate, dueTime, CalendarIDByName, loggedInUserID);

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
