document.addEventListener('DOMContentLoaded', function() {
    let calendars = {
        "My Calendar": {} // Default calendar
    };
    let currentCalendar = "My Calendar";
    let editingTask = null;

    // DOM Elements
    const calendarNameDisplay = document.getElementById('currentCalendarName');
    const calendarSelect = document.getElementById('calendarSelect');
    const createCalendarBtn = document.getElementById('createCalendarBtn');
    const deleteCalendarBtn = document.getElementById('deleteCalendarBtn');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const addTaskModal = document.getElementById('addTaskModal');
    const closeBtn = document.querySelector('.close');
    const taskList = document.getElementById('taskList');
    const monthYear = document.querySelector('.tc-month-year');
    const prevMonthBtn = document.querySelector('.tc-prev-month');
    const nextMonthBtn = document.querySelector('.tc-next-month');
    const daysContainer = document.querySelector('.tc-days');
    
    // Variables to track the current display month and year
    let displayMonth = new Date().getMonth();
    let displayYear = new Date().getFullYear();
    
    const calendarList = document.getElementById('calendarList'); // Assume this is the <ul> or <ol> element for calendar names

    // Function to sort tasks by date and then by time
    const sortTasks = (tasks) => {
        return tasks.sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.time}`);
            const dateB = new Date(`${b.date}T${b.time}`);
            return dateA - dateB;
        });
    };

    // Function to update the calendar title with the current calendar name and month
    const updateCalendarTitle = () => {
        calendarNameDisplay.textContent = currentCalendar;
        monthYear.textContent = new Date(displayYear, displayMonth).toLocaleString('default', { month: 'long', year: 'numeric' });
    };

    // Function to update the list of tasks in the sidebar
    const updateTaskList = () => {
        taskList.innerHTML = '';
        Object.keys(calendars[currentCalendar]).sort().forEach(date => {
            calendars[currentCalendar][date] = sortTasks(calendars[currentCalendar][date]);
            calendars[currentCalendar][date].forEach((task, index) => {
                const listItem = document.createElement('li');
                listItem.classList.add('task-item');
    
                const taskInfo = document.createElement('div');
                taskInfo.classList.add('task-info');
                // Format the time from 24-hour to 12-hour format
                const timeString = new Date(`1970-01-01T${task.time}Z`).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                });
                taskInfo.textContent = `${task.name} - ${date} at ${timeString}`; // Updated to use timeString
                listItem.appendChild(taskInfo);
    
                const taskActions = document.createElement('div');
                taskActions.classList.add('task-actions');
    
                const editBtn = document.createElement('button');
                editBtn.textContent = 'Edit';
                editBtn.classList.add('edit-button');
                editBtn.addEventListener('click', () => editTask(date, index));
                taskActions.appendChild(editBtn);
    
                const removeBtn = document.createElement('button');
                removeBtn.textContent = 'Remove';
                removeBtn.classList.add('remove-button');
                removeBtn.addEventListener('click', () => removeTask(date, index));
                taskActions.appendChild(removeBtn);
    
                listItem.appendChild(taskActions);
                taskList.appendChild(listItem);
            });
        });
    };
    
    // Function to show the task modal for adding or editing tasks
    const openTaskModal = (task = null) => {
        if (task) {
            // Prefill form if editing
            document.getElementById('taskName').value = task.name;
            document.getElementById('taskDate').value = task.date;
            document.getElementById('taskTime').value = task.time; // Assume this is already in 24-hour format
            editingTask = task;
        } else {
            // Reset form if adding new task
            document.getElementById('taskName').value = '';
            document.getElementById('taskDate').value = '';
            document.getElementById('taskTime').value = '';
            editingTask = null;
        }
        addTaskModal.style.display = 'block';
    };

    // Function to close the task modal
    const closeTaskModal = () => {
        addTaskModal.style.display = 'none';
    };

    // Function to add a new task to the current calendar
    const addTask = (name, date, time) => {
        const newTask = { name, date, time };
        if (!calendars[currentCalendar][date]) {
            calendars[currentCalendar][date] = [];
        }
        calendars[currentCalendar][date].push(newTask);
        updateTaskList();
        generateCalendar(); // Call to update the calendar display
    };

    // Function to start editing a task
    const editTask = (date, index) => {
        const task = calendars[currentCalendar][date][index];
        openTaskModal(task);
        // Assign current task as editing task
        editingTask = { date, index };
    };

    // Function to remove a task from the current calendar
    const removeTask = (date, index) => {
        // Get the task name for confirmation message
        const taskName = calendars[currentCalendar][date][index].name;
        const isConfirmed = confirm(`Are you sure you want to remove the task "${taskName}"?`);
        if (isConfirmed) {
            // Proceed with the removal if the user confirmed
            calendars[currentCalendar][date].splice(index, 1);
            if (calendars[currentCalendar][date].length === 0) {
                delete calendars[currentCalendar][date];
            }
            updateTaskList();
            generateCalendar(); // Call to update the calendar display
        }
    };
    
    // Function to generate the calendar view for the current month
    const generateCalendar = () => {
        daysContainer.innerHTML = '';
        const firstDayOfMonth = new Date(displayYear, displayMonth, 1).getDay();
        const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();

        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('tc-day', 'empty');
            daysContainer.appendChild(emptyCell);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('tc-day');
            dayCell.textContent = i;

            const dateStr = `${displayYear}-${String(displayMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            if (calendars[currentCalendar][dateStr] && calendars[currentCalendar][dateStr].length > 0) {
                dayCell.classList.add('with-task');
            }

            daysContainer.appendChild(dayCell);
        }
    };
    
    // Function to update the options in the calendar selection dropdown
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
            deleteCalendarBtn.style.display = currentCalendar !== "My Calendar" ? 'block' : 'none';
        } catch (error) {
            console.error('Error updating calendar select options:', error);
        }
    };

    // Delete calendar functionality
    deleteCalendarBtn.addEventListener('click', () => {
        if (currentCalendar !== "My Calendar") {
            const confirmDeletion = confirm(`Are you sure you want to delete the calendar: ${currentCalendar}?`);
            if (confirmDeletion) {
                delete calendars[currentCalendar];
                currentCalendar = "My Calendar"; // Revert to main calendar
                updateCalendarSelectOptions();
                updateCalendarTitle();
                updateTaskList();
                generateCalendar();
            }
        } else {
            alert("Cannot delete the main calendar!");
        }
    });

// Event listener for creating a new calendar
createCalendarBtn.addEventListener('click', async () => {
    const newCalendarName = prompt('Enter new calendar name:');
        try {
             // Make HTTP request to the server
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
                    alert(`Error: ${responseData.message}`);
                }
            }
        } catch (error) {
            console.error('Error adding calendar:', error);
            alert('Error adding calendar. Please try again.');
        }
    });

    // Event listener for the add task button
    addTaskBtn.addEventListener('click', () => openTaskModal());

    // Event listener for the close button of the task modal
    closeBtn.addEventListener('click', closeTaskModal);

    // Event listener for the task form submission
    document.getElementById('addTaskForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const taskName = document.getElementById('taskName').value;
        const taskDate = document.getElementById('taskDate').value;
        const taskTime = document.getElementById('taskTime').value;

        if (editingTask) {
            removeTask(editingTask.date, editingTask.index);
        }

        addTask(taskName, taskDate, taskTime);
        closeTaskModal();
    });

    // Event listener for previous month navigation
    prevMonthBtn.addEventListener('click', () => {
        displayMonth--;
        if (displayMonth < 0) {
            displayMonth = 11;
            displayYear--;
        }
        updateCalendarTitle();
        generateCalendar();
    });

    // Event listener for next month navigation
    nextMonthBtn.addEventListener('click', () => {
        displayMonth++;
        if (displayMonth > 11) {
            displayMonth = 0;
            displayYear++;
        }
        updateCalendarTitle();
        generateCalendar();
    });

    // Event listener for changing the selected calendar
    calendarSelect.addEventListener('change', () => {
        currentCalendar = calendarSelect.value;
        deleteCalendarBtn.style.display = currentCalendar !== "My Calendar" ? 'block' : 'none';
        updateCalendarTitle();
        updateTaskList();
        generateCalendar();
    });

    // Initialize the calendar
    updateCalendarTitle();
    updateTaskList();
    generateCalendar();

    // Initial call to update the select options to ensure correct delete button visibility
    updateCalendarSelectOptions();
});