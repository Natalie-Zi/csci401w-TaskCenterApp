const { addCalendarDB, isCalendarNameAvailable, retrieveCalendarNames  } = require('../util/addCalendar');

// Define route to handle the add calendar feature.
const addCalendar = async (req, res) => {
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
  
      const CalendarNameAvailable = await isCalendarNameAvailable(loggedInUserID, calendarName);
  
      if (!CalendarNameAvailable) {
          return res.status(400).json({ message: 'Calendar already exists. Try adding another name' });
      }
      
      // Use the userID (of the currently logged-in user) to add the calendar to the database
      const result = await addCalendarDB(calendarName, loggedInUserID);
  
      console.log('Calendar added successfully.');
      res.status(201).json({ message: 'Calendar added successfully.', data: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
};
  
// Define route to handle getting Calendar Names associated with the logged-in user. 
const getCalendarNames = async (req, res) => {
  try {
    // Get the UserID from the session
    const loggedInUserID = req.session.userId; 

    // Ensure the user is logged in and Checks cookie maxage works 
    if (!loggedInUserID) {
      console.log('User not logged in.');
      return res.status(401).json({ message: 'User not logged in.' });
    }

    // Retrieve calendar names associated with the logged-in user
    const calendarNames = await retrieveCalendarNames(loggedInUserID);

    // Send the retrieved calendar names as a response
    res.status(200).json({ calendarNames });
  } catch (error){
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}




// Export the route handler as a function
module.exports = {
  addCalendar: addCalendar,
  getCalendarNames: getCalendarNames
};