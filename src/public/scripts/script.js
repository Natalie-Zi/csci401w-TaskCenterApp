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
