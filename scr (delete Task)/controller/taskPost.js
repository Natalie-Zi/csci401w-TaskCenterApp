const { addTaskDB, checkViewPermission, getCalendarIDByName, getTasksForCalendar  } = require('../util/addTaskQueries');
const { deleteTaskDB, getTaskIDByTitle } = require('../util/deleteQueries')
const { isCalendarOwnedByUser, isCalendarSharedWithUser} = require('../util/shareCalendar');

const addTask = async (req, res) => {
    try {
        const { taskTitle, dueDate, dueTime, calendarName } = req.body;
        // Debug: Log the content of req.body
        console.log('                       ');
        console.log('Request Body:', req.body);

        // Get the UserID from the session
        const loggedInUserID = req.session.userId;

        // Ensure the user is logged in
        if (!loggedInUserID) {
            console.log('User not logged in.');
            return res.status(401).json({ message: 'User not logged in.' });
        }

        // Retrieve calendar ID associated with the calendar name
        const calendarID = await getCalendarIDByName(calendarName);
        console.log('Calendar ID retrieved:', calendarID);

        // Check if the logged-in user owns the calendar or has edit permisson
        const ownedByUser = await isCalendarOwnedByUser(loggedInUserID, calendarName);
        const sharedWithUser = await isCalendarSharedWithUser(loggedInUserID, calendarID);

        // If the calendar is not owned by the user and has no edit permisson
        if (!ownedByUser && !sharedWithUser) {
            return res.status(403).json({ message: 'Unauthorized. Calendar not accessible.' });
        }

        const hasviewPermission = await checkViewPermission(loggedInUserID, calendarID);
        if (hasviewPermission) {
            return res.status(403).json({ message: 'Unauthorized. Not allowed to add task because only have View permission.' });
        }

        // Use the retrieved calendarID and loggedInUserID to add the task to the database
        const result = await addTaskDB(taskTitle, dueDate, dueTime, calendarID, loggedInUserID);

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
        // Debug: Log the content of req.body
        console.log('                      ');
        console.log('Request Body:', req.body);

        // Get the UserID from the session
        const loggedInUserID = req.session.userId;

        // Ensure the user is logged in
        if (!loggedInUserID) {
            console.log('User not logged in.');
            return res.status(401).json({ message: 'User not logged in.' });
        }

        // Retrieve calendar ID associated with the calendar name
        const calendarID = await getCalendarIDByName(calendarName);

        // Retrieve Task ID by the name of Task 
        const TaskID = await getTaskIDByTitle(taskTitle);

       // Check if the logged-in user owns the calendar or it's shared with them
       const ownedByUser = await isCalendarOwnedByUser(loggedInUserID, calendarName);
       const sharedWithUser = await isCalendarSharedWithUser(loggedInUserID, calendarID);

       // If the calendar is not owned by the user and not shared with them
       if (!ownedByUser && !sharedWithUser) {
           return res.status(403).json({ message: 'Unauthorized. Calendar not accessible.' });
       }

       const hasviewPermission = await checkViewPermission(loggedInUserID, calendarID);
        if (hasviewPermission) {
            return res.status(403).json({ message: 'Unauthorized. Not allowed to add task because only have View permission.' });
        }

        // Use the retrieved calendarID and loggedInUserID to delete the task from the database
        const deleteTask = await deleteTaskDB(TaskID, calendarID);

        res.status(200).json({ deleteTask });
        console.log('Tasks successfully deleted', deleteTask);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Export the route handler as a function
module.exports = {
    addTask,
    getTaskInformation, 
    deleteTask
};
