document.addEventListener('DOMContentLoaded', function() {
    let tasks = {};
    let displayMonth = new Date().getMonth();
    let displayYear = new Date().getFullYear();

    const addTaskBtn = document.getElementById('addTaskBtn');
    const addTaskModal = document.getElementById('addTaskModal');
    const closeBtn = document.querySelector('.close');
    const monthYearLabel = document.querySelector('.tc-month-year');
    const daysContainer = document.querySelector('.tc-days');
    const prevMonthBtn = document.querySelector('.tc-prev-month');
    const nextMonthBtn = document.querySelector('.tc-next-month');
    
    addTaskBtn.addEventListener('click', function() {
        addTaskModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', function() {
        addTaskModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === addTaskModal) {
            addTaskModal.style.display = 'none';
        }
    });

    document.getElementById('addTaskForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const taskName = document.getElementById('taskName').value;
        const taskDate = document.getElementById('taskDate').value;
        const taskTime = document.getElementById('taskTime').value; // Keep it in 24-hour format for sorting
        const dateTime = `${taskDate}T${taskTime}:00`;

        if (!tasks[taskDate]) {
            tasks[taskDate] = [];
        }
        tasks[taskDate].push({ name: taskName, dateTime: dateTime });

        document.getElementById('taskName').value = '';
        document.getElementById('taskDate').value = '';
        document.getElementById('taskTime').value = '';
        addTaskModal.style.display = 'none';

        updateTaskList();
        generateCalendar(displayMonth, displayYear);
    });

    function updateTaskList() {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
        
        const taskArray = Object.entries(tasks).flatMap(([date, taskObjs]) =>
            taskObjs.map(task => ({ date, ...task }))
        );

        taskArray.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));

        taskArray.forEach(task => {
            const listItem = document.createElement('li');
            const taskDateTime = new Date(task.dateTime);
            const formattedTime = formatTime(taskDateTime.getHours(), taskDateTime.getMinutes());
            listItem.textContent = `${task.name} - due by ${task.date} ${formattedTime}`;
            taskList.appendChild(listItem);
        });
    }

    function formatTime(hours, minutes) {
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // Convert 0 (midnight) to 12
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}:${minutes} ${ampm}`;
    }

    function daysInMonth(month, year) {
        return new Date(year, month + 1, 0).getDate();
    }

    function getFirstDayOfMonth(month, year) {
        return new Date(year, month, 1).getDay();
    }

    function generateCalendar(month, year) {
        daysContainer.innerHTML = '';
        monthYearLabel.textContent = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });

        const firstDay = getFirstDayOfMonth(month, year);
        const days = daysInMonth(month, year);

        for (let i = 0; i < firstDay; i++) {
            daysContainer.innerHTML += '<div class="tc-day empty"></div>';
        }

        for (let i = 1; i <= days; i++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            let dayClass = 'tc-day';
            if (tasks[dateStr]) {
                dayClass += ' with-task';
            }
            daysContainer.innerHTML += `<div class="${dayClass}" data-date="${dateStr}">${i}</div>`;
        }
    }

    function changeMonth(step) {
        displayMonth += step;

        if (displayMonth > 11) {
            displayMonth = 0;
            displayYear++;
        } else if (displayMonth < 0) {
            displayMonth = 11;
            displayYear--;
        }

        generateCalendar(displayMonth, displayYear);
    }

    prevMonthBtn.addEventListener('click', () => changeMonth(-1));
    nextMonthBtn.addEventListener('click', () => changeMonth(1));

    generateCalendar(displayMonth, displayYear);
});
