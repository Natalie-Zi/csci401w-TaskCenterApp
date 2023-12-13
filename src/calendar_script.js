document.addEventListener('DOMContentLoaded', function() {
    // Calendars data structure
    let calendars = {
        "My Calendar": {} // Default calendar
    };
    let sharedCalendars = {
        "Shared Calendar 1": {} // Example shared calendar
    };
    let currentCalendar = "My Calendar";
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

    // Update tasks list
    const updateTaskList = () => {
        taskList.innerHTML = '';
        Object.keys(calendars[currentCalendar]).sort().forEach(date => {
            calendars[currentCalendar][date].forEach((task, index) => {
                const listItem = document.createElement('li');
                listItem.textContent = `${task.name} - ${date}`;
                taskList.appendChild(listItem);
            });
        });
    };

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
    const updateCalendarSelectOptions = () => {
        calendarSelect.innerHTML = '';
        for (let calendarName in calendars) {
            const option = document.createElement('option');
            option.value = calendarName;
            option.textContent = calendarName;
            calendarSelect.appendChild(option);
        }
        deleteCalendarBtn.style.display = currentCalendar !== "My Calendar" ? 'block' : 'none';
    };

    // Update the options in the shared calendar selection dropdown
    const updateSharedCalendarSelectOptions = () => {
        sharedCalendarSelect.innerHTML = '';
        for (let calendarName in sharedCalendars) {
            const option = document.createElement('option');
            option.value = calendarName;
            option.textContent = calendarName;
            sharedCalendarSelect.appendChild(option);
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

    calendarSelect.addEventListener('change', () => {
        currentCalendar = calendarSelect.value;
        updateCalendarTitle();
        updateTaskList();
        generateCalendar();
    });

    sharedCalendarSelect.addEventListener('change', () => {
        // Logic for handling shared calendar selection
        currentCalendar = sharedCalendarSelect.value;
        updateCalendarTitle();
        updateTaskList();
        generateCalendar()
    });

    createCalendarBtn.addEventListener('click', () => {
        const newCalendarName = prompt('Enter new calendar name:');
        if (newCalendarName && !calendars[newCalendarName]) {
            calendars[newCalendarName] = {};
            currentCalendar = newCalendarName;
            updateCalendarSelectOptions();
            updateCalendarTitle();
            updateTaskList();
            generateCalendar();
        }
    });

    deleteCalendarBtn.addEventListener('click', () => {
        if (currentCalendar !== "My Calendar") {
            delete calendars[currentCalendar];
            currentCalendar = "My Calendar";
            updateCalendarSelectOptions();
            updateCalendarTitle();
            updateTaskList();
            generateCalendar();
        }
    });

    addSharedCalendarBtn.addEventListener('click', () => {
        const newSharedCalendarName = prompt('Enter shared calendar name:');
        if (newSharedCalendarName && !sharedCalendars[newSharedCalendarName]) {
            sharedCalendars[newSharedCalendarName] = {};
            updateSharedCalendarSelectOptions();
        }
    });

    addTaskBtn.addEventListener('click', () => {
        addTaskModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        addTaskModal.style.display = 'none';
    });

    document.getElementById('addTaskForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const taskName = document.getElementById('taskName').value;
        const taskDate = document.getElementById('taskDate').value;
        const taskTime = document.getElementById('taskTime').value;

        if (!calendars[currentCalendar][taskDate]) {
            calendars[currentCalendar][taskDate] = [];
        }
        calendars[currentCalendar][taskDate].push({ name: taskName, time: taskTime });

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

