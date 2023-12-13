const { addTaskDB, getCalendarIDByName, getTasksForCalendar, isTaskNameAvailable, checkViewPermission } = require('../util/addTaskQueries');
const { deleteTaskDB } = require('../util/deleteQueries')
const { retrieveCalendarIDByName, isCalendarOwnedByUser, isCalendarSharedWithUser } = require('../util/shareCalendar');

const addTask = async (req, res) => {
    try {
        const { taskTitle, dueDate, dueTime, calendarName } = req.body;

        // Retrieve calendar ID associated with the calendar name
        const calendarID = await getCalendarIDByName(calendarName);
        console.log('Calendar ID retrieved:', calendarID);

        // Get the UserID from the session
        const loggedInUserID = req.session.userId;

        // Ensure the user is logged in
        if (!loggedInUserID) {
            console.log('User not logged in.');
            return res.status(401).json({ message: 'User not logged in.' });
        }

        const taskNameAvailable = await isTaskNameAvailable(taskTitle, calendarID);

        if (!taskNameAvailable) {
            return res.status(400).json({ message: 'Task already exists. Try adding another name' });
        }

        // Check if the logged-in user owns the calendar or has edit permission
        const ownedByUser = await isCalendarOwnedByUser(loggedInUserID, calendarID);
        const sharedWithUser = await isCalendarSharedWithUser(loggedInUserID, calendarID);

        // If the calendar is not owned by the user and has no edit permission
        if (!ownedByUser || !sharedWithUser) {
            return res.status(403).json({ message: 'Unauthorized. Calendar not accessible.' });
        }

        const hasViewPermission = await checkViewPermission(loggedInUserID, calendarID);

        if (hasViewPermission) {
            return res.status(403).json({ message: 'Unauthorized. Not allowed to add task because only have View permission.' });
        }

        const result = await addTaskDB(taskTitle, dueDate, dueTime, calendarID, loggedInUserID);
if (result){
        console.log('Task added successfully.');
        res.status(201).json({ message: 'Task added successfully.', data: result });
}
else
res.status(401).json({ message: 'Task failed to add.', data: result });

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

        // Retrieve calendar ID associated with the calendar name
        const calendarID = await getCalendarIDByName(calendarName);

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
        const tasks = await getTasksForCalendar(calendarID);

        res.status(200).json({ tasks });
        console.log('Tasks retrieved successfully for', calendarName);
        console.log(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { taskTitle, calendarName } = req.body;
        const loggedInUserID = req.session.userId;

        // Ensure the user is logged in
        if (!loggedInUserID) {
            console.log('User not logged in.');
            return res.status(401).json({ message: 'User not logged in.' });
        }

        console.log('Task Title:', taskTitle);
        console.log('Logged In UserID:', loggedInUserID);

        // Retrieve the CalendarID based on the calendar name and logged-in user ID
        const calendarID = await retrieveCalendarIDByName(loggedInUserID, calendarName);

        console.log('Calendar ID retrieved:', calendarID);

        // Check if the logged-in user owns the calendar
        const ownedByUser = await isCalendarOwnedByUser(loggedInUserID, calendarName);

        console.log('Owned by user:', ownedByUser);

        // Check if the user has edit permission for the calendar
        const hasViewPermission = await checkViewPermission(loggedInUserID, calendarID);

        console.log('Has edit permission:', hasViewPermission);


        // Check if the user has edit permission or owns the calendar
        if (hasViewPermission || !ownedByUser) {
            return res.status(403).json({ message: 'Unauthorized. You do not have permission to delete this task' });
        }

        // Use the retrieved calendarID and loggedInUserID to delete the task from the database
        const deleted = await deleteTaskDB(taskTitle);

        res.status(200).json({ deleted });
        console.log('Task deleted successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Export the route handler as a function
module.exports = {
    addTask: addTask,
    getTaskInformation: getTaskInformation,
    deleteTask: deleteTask
};
