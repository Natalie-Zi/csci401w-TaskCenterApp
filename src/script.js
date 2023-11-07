document.addEventListener('DOMContentLoaded', function() {
    
    // Login page functionality
    const loginButton = document.getElementById('login-button');
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');

    // Sign up page functionality
    const signupButton = document.getElementById('signup-button');
    const fullNameInput = document.getElementById('full-name-input');
    const signupEmailInput = document.getElementById('signup-email-input');
    const signupPasswordInput = document.getElementById('signup-password-input');
    const confirmPasswordInput = document.getElementById('confirm-password-input');
    
    loginButton.addEventListener('click', function() {
        if(emailInput.value === "" || passwordInput.value === "") {
            alert("Please fill in both email and password fields.");
            return;
        }
        // TODO: Add your authentication logic here
        console.log("Logged in with email: " + emailInput.value);
    });
    
    // Toggle between School and Work calendars
    let calendars = document.querySelectorAll('.calendar');
    calendars.forEach(calendar => {
        calendar.addEventListener('click', function() {
            calendars.forEach(c => c.classList.remove('active'));
            calendar.classList.add('active');
        });
    });

    // Add a new task
    let addTaskButton = document.querySelector('.task-calendars button');
    addTaskButton.addEventListener('click', function() {
        let taskName = prompt('Enter task name:');
        let taskTime = prompt('Enter task time (e.g., "3:00 p.m."):');
        if (taskName && taskTime) {
            let newTask = document.createElement('div');
            newTask.className = 'task';
            newTask.innerHTML = `${taskName} <span>${taskTime}</span>`;
            let overviewSection = document.querySelector('.overview');
            overviewSection.appendChild(newTask);
        }
    });

    // Display task details when a task is clicked
    document.querySelector('.overview').addEventListener('click', function(event) {
        if (event.target.className === 'task' || event.target.parentElement.className === 'task') {
            let taskDetailsSection = document.querySelector('.task-details');
            taskDetailsSection.innerHTML = '';
            
            let taskName = event.target.className === 'task' ? event.target : event.target.parentElement;
            let taskDetails = document.createElement('p');
            taskDetails.innerText = `Task Name: ${taskName.textContent}`;
            taskDetailsSection.appendChild(taskDetails);
        }
    });

    signupButton.addEventListener('click', function() {
        if(fullNameInput.value === "" || signupEmailInput.value === "" || signupPasswordInput.value === "" || confirmPasswordInput.value === "") {
            alert("Please fill in all fields.");
            return;
        }
    
        if(signupPasswordInput.value !== confirmPasswordInput.value) {
            alert("Passwords do not match!");
            return;
        }
            
    // TODO: Add your sign-up logic here
    console.log("Signed up with email: " + signupEmailInput.value);
    });   
});
