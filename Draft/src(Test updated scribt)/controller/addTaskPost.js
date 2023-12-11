const { addTaskDB, checkEditPermission } = require('../util/taskQueries');
const { retrieveCalendarIDByName, isCalendarOwnedByUser, isCalendarSharedWithUser } = require('../util/shareCalendar');

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

// Define route to handle get information for calendarName
const getTaskInformation = async (req, res) => {
    try {
        const { calendarName } = req.body;

        // Get the UserID from the session
        const loggedInUserID = req.session.userId;

        // Ensure the user is logged in
        if (!loggedInUserID) {
            console.log('User not logged in.');
            return res.status(401).json({ message: 'User not logged in.' });
        }

        // Retrieve calendar ID associated with the calendar name for the logged-in user
        const calendarID = await retrieveCalendarIDByName(loggedInUserID, calendarName);

        if (!calendarID) {
            return res.status(404).json({ message: 'Calendar not found.' });
        }

        // Check if the logged-in user owns the calendar or it's shared with them
        const ownedByUser = await isCalendarOwnedByUser(loggedInUserID, calendarName);
        const sharedWithUser = await isCalendarSharedWithUser(loggedInUserID, calendarID);

        // If the calendar is not owned by the user and not shared with them
        if (!ownedByUser && !sharedWithUser) {
            return res.status(403).json({ message: 'Unauthorized. Calendar not accessible.' });
        }

        // Retrieve tasks associated with the calendar for the logged-in user
        const tasks = await retrieveTasksForCalendar(loggedInUserID, calendarID);

        res.status(200).json({ message: 'Tasks retrieved successfully.', tasks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Export the route handler as a function
module.exports = {
    addTask: addTask,
    getTaskInformation: getTaskInformation
};
