const { shareCalendarDB, retrieveCalendarIDByName, isCalendarOwnedByUser, retrieveUserIDByEmail } = require('../util/shareCalendar');

const shareCalendar = async (req, res) => {
  try {
    const { calendarName, email, permission } = req.body;

    // Get the UserID from the session
    const loggedInUserID = req.session.userId;

    // Ensure that the user is logged in and checks cookie maxage functions.
    if (!loggedInUserID) {
      console.log('User not logged in.');
      return res.status(401).json({ message: 'User not logged in.' });
    }

    // Retrieve the UserID of the user to whom the calendar will be shared
    const sharedUserID = await retrieveUserIDByEmail(email);

    // Retrieve the CalendarID based on the calendar name and logged-in user ID
    const CalendarIDByName = await retrieveCalendarIDByName(loggedInUserID, calendarName);
    

    // Check if the logged-in user owns the calendar
    const OwnedByUser = await isCalendarOwnedByUser(loggedInUserID, calendarName);

    if (!sharedUserID) {
      console.log('User with provided email does not exist.');
      return res.status(404).json({ message: 'User not found.' });
    }

    if (OwnedByUser) {
      console.log('User permission accepted');

      // Share the calendar if the logged-in user is the owner
      const result = await shareCalendarDB(loggedInUserID, CalendarIDByName, sharedUserID, permission);
      console.log(`Calendar ${calendarName} authenticated successfully.`);


      return res.status(201).json({ message: 'Calendar successfully shared.', data: result });
    } else {
      console.log('Permission denied. User is not the owner or lacks editing permissions.');
      return res.status(403).json({ message: 'Permission denied. User lacks necessary permissions.' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  shareCalendar
};
