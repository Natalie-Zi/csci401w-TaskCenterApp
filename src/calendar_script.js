document.addEventListener('DOMContentLoaded', function() {
    let tasks = {}; // Object to store tasks by date
    let displayMonth = new Date().getMonth(); // Current displayed month
    let displayYear = new Date().getFullYear(); // Current displayed year
    let editingTask = null; // Store task being edited

    // DOM element references
    const addTaskBtn = document.getElementById('addTaskBtn');
    const addTaskModal = document.getElementById('addTaskModal');
    const closeBtn = document.querySelector('.close');
    const monthYearLabel = document.querySelector('.tc-month-year');
    const daysContainer = document.querySelector('.tc-days');
    const prevMonthBtn = document.querySelector('.tc-prev-month');
    const nextMonthBtn = document.querySelector('.tc-next-month');
    
    // Event listener to open the task modal for new tasks
    addTaskBtn.addEventListener('click', function() {
        editingTask = null; // Reset editing task
        openTaskModal();
    });

    // Event listener to close the task modal
    closeBtn.addEventListener('click', function() {
        addTaskModal.style.display = 'none';
    });

    // Event listener to close the modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === addTaskModal) {
            addTaskModal.style.display = 'none';
        }
    });

    // Event listener for task form submission
    document.getElementById('addTaskForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const taskName = document.getElementById('taskName').value;
        const taskDate = document.getElementById('taskDate').value;
        const taskTime = document.getElementById('taskTime').value;
        const dateTime = `${taskDate}T${taskTime}:00`;

        if (editingTask) {
            // Update existing task
            tasks[editingTask.date][editingTask.index] = { name: taskName, dateTime: dateTime };
        } else {
            // Add new task
            if (!tasks[taskDate]) {
                tasks[taskDate] = [];
            }
            tasks[taskDate].push({ name: taskName, dateTime: dateTime });
        }

        // Clear form fields, hide modal, and update UI
        document.getElementById('taskName').value = '';
        document.getElementById('taskDate').value = '';
        document.getElementById('taskTime').value = '';
        addTaskModal.style.display = 'none';
        updateTaskList();
        generateCalendar(displayMonth, displayYear);
    });

    // Function to update the task list UI
    function updateTaskList() {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
        Object.entries(tasks).forEach(([date, taskObjs]) => {
            taskObjs.forEach((task, index) => {
                const listItem = document.createElement('li');
                listItem.textContent = `${task.name} - due by ${date} ${formatTime(task.dateTime)}`;

                // Edit button
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.onclick = () => editTask(date, index);

                // Remove button
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remove';
                removeButton.onclick = () => removeTask(date, index);

                listItem.appendChild(editButton);
                listItem.appendChild(removeButton);
                taskList.appendChild(listItem);
            });
        });
    }

    // Function to open the task modal for adding/editing tasks
    function openTaskModal() {
        if (editingTask) {
            // If editing, pre-fill the form with the task's current data
            const { name, dateTime } = tasks[editingTask.date][editingTask.index];
            const [date, time] = dateTime.split('T');
            document.getElementById('taskName').value = name;
            document.getElementById('taskDate').value = date;
            document.getElementById('taskTime').value = time.slice(0, 5);
        } else {
            // If adding, clear the form
            document.getElementById('taskName').value = '';
            document.getElementById('taskDate').value = '';
            document.getElementById('taskTime').value = '';
        }
        addTaskModal.style.display = 'block'; // Show the modal
    }

    // Function to edit a task
    function editTask(date, index) {
        editingTask = { date, index }; // Set the current task being edited
        openTaskModal(); // Open the modal for editing
    }

    // Function to remove a task
    function removeTask(date, index) {
        tasks[date].splice(index, 1); // Remove the task from the array
        if (tasks[date].length === 0) delete tasks[date]; // Clean up empty date entries
        updateTaskList(); // Update the UI
        generateCalendar(displayMonth, displayYear); // Refresh the calendar
    }

    // Function to format dateTime string to a readable format
    function formatTime(dateTime) {
        const [datePart, timePart] = dateTime.split('T');
        const [hours, minutes] = timePart.split(':');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        return `${formattedHours}:${minutes} ${ampm}`;
    }

    // Function to get the number of days in the specified month and year
    function daysInMonth(month, year) {
        return new Date(year, month + 1, 0).getDate();
    }

    // Function to get the first day of the specified month and year
    function getFirstDayOfMonth(month, year) {
        return new Date(year, month, 1).getDay();
    }

    // Function to generate the calendar UI for the specified month and year
    function generateCalendar(month, year) {
        daysContainer.innerHTML = ''; // Clear the calendar
        monthYearLabel.textContent = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' }); // Set the month and year label

        const firstDay = getFirstDayOfMonth(month, year);
        const days = daysInMonth(month, year);

        // Create blank days for alignment
        for (let i = 0; i < firstDay; i++) {
            daysContainer.innerHTML += '<div class="tc-day empty"></div>';
        }

        // Populate the calendar with day numbers
        for (let i = 1; i <= days; i++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            let dayClass = 'tc-day';
            if (tasks[dateStr]) {
                dayClass += ' with-task'; // Highlight days with tasks
            }
            daysContainer.innerHTML += `<div class="${dayClass}" data-date="${dateStr}">${i}</div>`;
        }
    }

    // Function to change the displayed month and update the calendar UI
    function changeMonth(step) {
        displayMonth += step;

        // Handle year rollover
        if (displayMonth > 11) {
            displayMonth = 0;
            displayYear++;
        } else if (displayMonth < 0) {
            displayMonth = 11;
            displayYear--;
        }

        generateCalendar(displayMonth, displayYear); // Regenerate the calendar with the new month
    }

    // Attach event listeners to navigation arrows for month switching
    prevMonthBtn.addEventListener('click', () => changeMonth(-1)); // Previous month
    nextMonthBtn.addEventListener('click', () => changeMonth(1)); // Next month

    // Generate the initial calendar view
    generateCalendar(displayMonth, displayYear);
});
