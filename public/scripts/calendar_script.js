document.addEventListener('DOMContentLoaded', function() {
    // Calendars data structure
    let calendars = {
        "My calendar": {} // Default calendar
    };
    let sharedCalendars = {
        "Shared Calendar 1": {} // Example shared calendar
    };
    let currentCalendar = "My calendar";
    let editingTask = null;

    // DOM Elements
    const calendarNameDisplay = document.getElementById('currentCalendarName');
    const calendarSelect = document.getElementById('calendarSelect');
    const sharedCalendarSelect = document.getElementById('sharedCalendarSelect');
    const createCalendarBtn = document.getElementById('createCalendarBtn');
    const deleteCalendarBtn = document.getElementById('deleteCalendarBtn');
    const addSharedCalendarBtn = document.getElementById('addSharedCalendarBtn');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const addTaskModal = document.getElementById('addTaskModal');
    const closeBtn = document.querySelector('.close');
    const taskList = document.getElementById('taskList');
    const monthYear = document.querySelector('.tc-month-year');
    const prevMonthBtn = document.querySelector('.tc-prev-month');
    const nextMonthBtn = document.querySelector('.tc-next-month');
    const daysContainer = document.querySelector('.tc-days');

    // Month and Year for calendar
    let displayMonth = new Date().getMonth();
    let displayYear = new Date().getFullYear();

    // Update calendar title
    const updateCalendarTitle = () => {
        calendarNameDisplay.textContent = currentCalendar;
        monthYear.textContent = new Date(displayYear, displayMonth).toLocaleString('default', { month: 'long', year: 'numeric' });
    };

     // Function to format time from 24-hour to 12-hour format
     const formatTime = (time) => {
        const [hours, minutes, seconds] = time.split(':');
        let formattedHours, period;

        if (hours >= 12) {
            formattedHours = hours - 12
            period = 'PM'
        }
        else {
            formattedHours = hours
            period = 'AM'
        }
        return `${formattedHours}:${minutes} ${period}`;
    };


    // Update tasks list
    const updateTaskList = async () => {
        try {
            const calendarName = getCurrentCalendar();
    
            const response = await fetch('/get-Task-Information', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ calendarName })
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch task information');
            }
    
            const { tasks } = await response.json();
    
            // Clear the task list
            taskList.innerHTML = '';
    
            // Populate the task list with the fetched tasks
            tasks.forEach(task => {
                const listItem = document.createElement('li');
    
                // Access and format the task data with your actual field names
                const taskTitle = task.Title;
                const dueDate = new Date(task.DateDue).toLocaleDateString();
                const TimeDue = task.TimeDue;
                const formattedTime = formatTime(TimeDue);
    
                // Construct the text content for the list item
                listItem.textContent = `${taskTitle} - ${dueDate} ${formattedTime}`;
    
                // Append the list item to the task list
                taskList.appendChild(listItem);
            });
        } catch (error) {
            console.error('Error updating task list:', error);
            // Handle errors or show an error message to the user
        }
    };

    deleteTaskBtn.addEventListener('click', async () => {
        const taskName = prompt('Enter the name of the task to delete: ');
    
        if (taskName) {
            const confirmDelete = confirm(`Are you sure you want to delete the task "${taskName}"?`);
            
            if (confirmDelete) {
                try {
                    const calendarName = getCurrentCalendar();
                    const response = await fetch('/deleteTask', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            taskTitle: taskName,
                            calendarName
                        }),
                    });
    
                    if (response.ok) {
                        const responseData = await response.json();
                        console.log('Task deleted:', responseData);
                        
                        // Update UI or perform any necessary actions after deletion
                        // For example, update the task list or refresh the view
                        updateTaskList();
                        generateCalendar();
    
                        alert(`Task "${taskName}" deleted successfully!`);
                    } else {
                        const errorMessage = await response.text();
                        alert(`Failed to delete task: ${errorMessage}`);
                    }
                } catch (error) {
                    console.error('Error deleting task:', error);
                    alert('Error deleting task. Please try again.');
                }
            }
        } else {
            alert('Please enter a valid task name.');
        }
    });
    

    // Generate the calendar view
    const generateCalendar = () => {
        daysContainer.innerHTML = '';
        const firstDayOfMonth = new Date(displayYear, displayMonth, 1).getDay();
        const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();

        for (let i = 0; i < firstDayOfMonth; i++) {
            daysContainer.appendChild(document.createElement('div'));
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dayCell = document.createElement('div');
            dayCell.textContent = i;
            daysContainer.appendChild(dayCell);
        }
    };

    // Update the options in the calendar selection dropdown
    const updateCalendarSelectOptions = async () => {
        try {
            // Make a POST request to fetch calendar names
            const response = await fetch('/get-CalendarName', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // No data is passed by the frontend for this request
                body: JSON.stringify({ /*        */ })
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch calendar names');
            }
    
            const { calendarNames } = await response.json();
    
            // Clear the existing options in the calendar selection dropdown
            calendarSelect.innerHTML = '';
    
            // Populate the calendar selection dropdown with the fetched calendar names
            calendarNames.forEach(calendarName => {
                const option = document.createElement('option');
                option.value = calendarName;
                option.textContent = calendarName;
                calendarSelect.appendChild(option);
            });
    
            // Update the display of the deleteCalendarBtn based on the currentCalendar
            deleteCalendarBtn.style.display = currentCalendar !== "My calendar" ? 'block' : 'none';
        } catch (error) {
            console.error('Error updating calendar select options:', error);
        }
    };

    // Update the options in the calendar selection dropdown
    const updateSharedCalendarSelectOptions = async () => {
        try {
            // Make a POST request to fetch calendar names
            const response = await fetch('/get-SharedCalNames', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // No data is passed by the frontend for this request
                body: JSON.stringify({})
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch calendar names');
            }
    
            const { sharedCalendarNames } = await response.json();
    
            // Clear the existing options in the calendar selection dropdown
            sharedCalendarSelect.innerHTML = '';
    
            // Populate the shared calendar selection dropdown with the fetched calendar names
            sharedCalendarNames.forEach(calendarName => {
                const option = document.createElement('option');
                option.value = calendarName;
                option.textContent = calendarName;
                sharedCalendarSelect.appendChild(option);
            });
        } catch (error) {
            // Handle errors here, for example:
            console.error('Error updating shared calendar options:', error);
        }
    };

    const addTask = async (taskTitle, dueDate, dueTime) => {
        const calendarName = getCurrentCalendar();
    
        try {
            const response = await fetch('/add-task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    taskTitle,
                    dueDate,
                    dueTime,
                    calendarName
                }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to add task');
            }
    
            const responseData = await response.json();
            console.log('Task added:', responseData);
    
            // Update the UI after adding the task
            updateTaskList();
            generateCalendar();
    
            // Show alert upon successful addition of the task
            alert(`Task "${taskTitle}" successfully added to "${calendarName}"!`);
        } catch (error) {
            console.error('Error adding task:', error);
            // Handle errors or show an error message to the user
        }
    };
        
    
    // Event listeners for calendar navigation, task modal, task form submission, etc.
    prevMonthBtn.addEventListener('click', () => {
        displayMonth--;
        if (displayMonth < 0) {
            displayMonth = 11;
            displayYear--;
        }
        updateCalendarTitle();
        generateCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        displayMonth++;
        if (displayMonth > 11) {
            displayMonth = 0;
            displayYear++;
        }
        updateCalendarTitle();
        generateCalendar();
    });

    calendarSelect.addEventListener('change', async () => {
        const newCalendar = calendarSelect.value;
        if (currentCalendar !== newCalendar) {
              // Update only if the selected calendar has changed
            currentCalendar = newCalendar;
            updateCalendarTitle();
            clearTaskList(); // Clear the task list before updating
            await updateTaskList(); // Wait for the task list to update before generating the calendar
            generateCalendar();
        }
    });
    
    sharedCalendarSelect.addEventListener('change', async () => {
        const newSharedCalendar = sharedCalendarSelect.value;
        if (currentCalendar !== newSharedCalendar) {
              // Update only if the selected calendar has changed
            currentCalendar = newSharedCalendar;
            updateCalendarTitle();
            clearTaskList(); // Clear the task list before updating
            await updateTaskList(); // Wait for the task list to update before generating the calendar
            generateCalendar();
        }
    });
    
    const clearTaskList = () => {
        taskList.innerHTML = '';
    };
    
    createCalendarBtn.addEventListener('click', async () => {
        const newCalendarName = prompt('Enter new calendar name:');
        
        if (!newCalendarName) {
            return; 
        }

        try {
            const response = await fetch('/add-Calendar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ calendarName: newCalendarName }),
            });

            const responseData = await response.json();

            if (response.ok) {
                alert(responseData.message);
                calendars[newCalendarName] = {}; 
                currentCalendar = newCalendarName;
                updateCalendarSelectOptions();
                calendarSelect.value = newCalendarName;
                updateCalendarTitle();
                updateTaskList();
                generateCalendar();
            } else {
                if (response.status === 400 && responseData.message === 'Calendar already exists. Try adding another name') {
                    alert(responseData.message);
                } else {
                    handleError(responseData.message);
                }
            }
        } catch (error) {
            console.error('Error adding calendar:', error);
            alert('Error adding calendar. Please try again.');
        }
    });

    function handleError(errorMessage) {
        console.error(errorMessage);
        alert(`Error: ${errorMessage}`);
    }
    
    deleteCalendarBtn.addEventListener('click', () => {
        if (currentCalendar !== "My calendar") {
            delete calendars[currentCalendar];
            currentCalendar = "My calendar";
            updateCalendarSelectOptions();
            updateCalendarTitle();
            updateTaskList();
            generateCalendar();
        }
    });

    shareCalendarBtn.addEventListener('click', async () => {
        const email = prompt('Enter the email to share the calendar with:');
        // Check if the user clicked Cancel on the prompt
        if (email === null || email === undefined) {
            return;
        }
    
        const calendarName = prompt('Enter the name of the calendar to share');
        // Check if the user clicked Cancel on the prompt
        if (calendarName === null || calendarName === undefined) {
            return;
        }
    
        if (calendarName === 'My calendar') {
            alert(`Calendar named "My calendar" can't be shared with other users!`);
            return;
        }
    
        const permission = prompt('Enter the permission level (View or Edit):');
        // Check if the user clicked Cancel on the prompt
        if (permission === null || permission === undefined) {
            return;
        }
    
        const permissionLower = permission.toLowerCase();
        if (permissionLower === 'view' || permissionLower === 'edit') {
            if (email && permission && calendarName) {
                try {
                    const response = await fetch('/share-calendar', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            calendarName,
                            email,
                            permission
                        }),
                    });
    
                    const responseData = await response.json();
    
                    if (response.ok) {
                        alert(`Calendar shared with ${email} successfully!`);
                        console.log(responseData);
    
                        // Adding the shared calendar to the object if it doesn't exist
                        if (!sharedCalendars[calendarName]) {
                            sharedCalendars[calendarName] = {};
                            updateSharedCalendarSelectOptions();
                        }
                    } else {
                        alert(`Error: ${responseData.message}`);
                    }
                } catch (error) {
                    console.error('Error sharing calendar:', error);
                    alert('Error sharing calendar. Please try again.');
                }
            }
        } else {
            alert('Please enter a valid permission level ("view" or "Edit").');
        }
    });
    
    // Will reset the form fields
    function resetTaskForm() {
        document.getElementById('addTaskForm').reset();
    }
    
    // Get the name of the current calendar
    const getCurrentCalendar = () => {
        return currentCalendar;
    };
    
    addTaskBtn.addEventListener('click', () => {
        resetTaskForm(); 
        addTaskModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        addTaskModal.style.display = 'none';
    });
    
    // Event listener for the task form submission
    document.getElementById('addTaskForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const taskName = document.getElementById('taskName').value;
        const taskDate = document.getElementById('taskDate').value;
        const taskTime = document.getElementById('taskTime').value;

        addTask(taskName, taskDate, taskTime); // Call addTask without passing calendarName
        updateTaskList();
        addTaskModal.style.display = 'none';
    });

    // Initialize the calendar and task list
    updateCalendarTitle();
    updateTaskList();
    generateCalendar();
    updateCalendarSelectOptions();
    updateSharedCalendarSelectOptions();
});
