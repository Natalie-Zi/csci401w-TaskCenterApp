// Import the database functions
const { removeCalendar, isCalendarNameAvailable, retrieveCalendarIDByName } = require('../util/addCalendar');

// Define route to handle delete calendar from the database
const deleteCalendar = async (req, res) => {
    try {
        const { calendarName } = req.body;

        // Get the UserID from the session
        const loggedInUserID = req.session.userId;

        // Ensure the user is logged in
        // Check cookie maxage works 
        if (!loggedInUserID) {
            console.log('User not logged in.');
            return res.status(401).json({ message: 'User not logged in.' });
        }

        // Check if the calendar exists
        const CalendarNameAvailable = await isCalendarNameAvailable(loggedInUserID, calendarName);

        if (CalendarNameAvailable) {
            return res.status(400).json({ message: 'A calendar with that name does not exist.' });
        }

        // Get CalendarID from name
        const calendarID = await retrieveCalendarIDByName(calendarName);

        // Use the UserID (of the currently logged-in user) to delete the calendar from the database
        const result = await removeCalendar(loggedInUserID, calendarID);

        console.log('Calendar deleted successfully.');
        res.status(201).json({ message: 'Calendar deleted successfully.', data: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
};

// Export the route handler as a function
module.exports = {
    deleteCalendar: deleteCalendar,
};