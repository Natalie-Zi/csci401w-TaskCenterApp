// Import the database functions
const { createUser, isUsernameAvaliable, isEmailAvaliable, loginDB,  } = require('../util/dbFunctions');
const { removeTask, editTaskDB, addTask, displayEditTask, retrieveTaskIDByName} = require('../util/taskQueries');

// Define route to handle the create a user account
const createAccount = async (req, res) => {
    try {
        // Retrieve data from the request body
        const { username, email, password } = req.body;

        const usernameAvailable = await isUsernameAvaliable(username);

        if (!usernameAvailable) {
            return res.status(400).json({ message: 'Username is not available' });
        }

        const emailAvailable = await isEmailAvaliable(email);

        if (!emailAvailable) {
            return res.status(400).json({ message: 'Email is not available' });
        }

        // Use your database functions to save the user data
        const result = await createUser(username, email, password);

        // Send a response back to the client
        res.status(201).json({ message: 'Account created successfully', data: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Define route to handle to check user credentials. 
const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await loginDB(email, password);
  
      if (user.length > 0) {
        // User authentication successful
        console.log(`User ${user[0].Username} authenticated successfully.`);
  
        // Store user ID in the session
        req.session.userId = user[0].UserID;

        // Print to console that the user ID is saved in the session
        console.log(`User ID ${req.session.userId} is saved in the session.`);
  
        res.status(200).json({ message: 'Login successful', user: user[0] });
      } else {
        // User not found or invalid credentials
        res.status(401).json({ message: 'Invalid email or password.' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
};

// Define route to handle the edit task info. 
const editTask = async (req, res) => {
  try {
    const { title, dueDate, dueTume } = req.body;

    // Get the UserID from the session
    const loggedInUserID = req.session.userId;

 

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//  Define route to handle getting task info  based on taskID.  
const showEditingTask = async (req, res) => {
  try {
      const { taskID, calendarID } = req.body;
      
      const loggedInUserID = req.session.userId;

      if (!loggedInUserID) {
          console.log('User not logged in.');
          return res.status(401).json({ message: 'User not logged in.' });
      }

      // Retrieve task details associated with the logged-in user, CalendarID, and TaskID
      const taskDetails = await displayEditTask(calendarID, taskID, loggedInUserID);

      // Send the retrieved task details as a response
      res.status(200).json({ taskDetails });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
};


const displayTask = async (req, res) => {
  try {

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Define route to handle the delete task from the database. 
const deleteTask = async (req, res) => {
  try {


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Export the route handler as a function
module.exports = {
  createAccount: createAccount,
  login: login,
  editTask: editTask, 
  showEditingTask: showEditingTask, 
  deleteTask: deleteTask,
};
