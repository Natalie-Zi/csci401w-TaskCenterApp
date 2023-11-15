// Import the database functions
const { createUser, isUsernameAvaliable, isEmailAvaliable } = require('../util/dbFunctions');

// Define the route handler for creating a user account
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

// Export the route handler as a function
module.exports = {
    createAccount: createAccount,
};
