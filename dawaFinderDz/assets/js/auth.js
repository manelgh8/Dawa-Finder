document.addEventListener('DOMContentLoaded', function() {
    // Initialize the authentication pages
    initializeAuthForms();
    
    // Initialize password strength meter
    initializePasswordStrength();
});

function initializeAuthForms() {
    // Login form handling
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const email = this.querySelector('#email').value;
            const password = this.querySelector('#password').value;
            const rememberMe = this.querySelector('#remember-me')?.checked;
            
            // Validate form
            const errorElement = document.getElementById('login-error');
            
            if (!email) {
                showFormError(errorElement, 'Please enter your email address.');
                return;
            }
            
            if (!password) {
                showFormError(errorElement, 'Please enter your password.');
                return;
            }
            
            // In a real app, this would be an API call to authenticate the user
            // For demo purposes, we'll simulate a successful login
            simulateLogin(email, 'user');
        });
    }
    
    // User registration form handling
    const userRegisterForm = document.getElementById('user-register-form');
    if (userRegisterForm) {
        userRegisterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const name = this.querySelector('#user-name').value;
            const email = this.querySelector('#user-email').value;
            const phone = this.querySelector('#user-phone').value;
            const password = this.querySelector('#user-password').value;
            const passwordConfirm = this.querySelector('#user-password-confirm').value;
            const termsAccepted = this.querySelector('#user-terms')?.checked;
            
            // Validate form
            const errorElement = document.getElementById('user-register-error');
            
            if (!name) {
                showFormError(errorElement, 'Please enter your full name.');
                return;
            }
            
            if (!email) {
                showFormError(errorElement, 'Please enter your email address.');
                return;
            }
            
            if (!phone) {
                showFormError(errorElement, 'Please enter your phone number.');
                return;
            }
            
            if (!password) {
                showFormError(errorElement, 'Please enter a password.');
                return;
            }
            
            if (password !== passwordConfirm) {
                showFormError(errorElement, 'Passwords do not match.');
                return;
            }
            
            if (!termsAccepted) {
                showFormError(errorElement, 'You must accept the Terms of Service and Privacy Policy.');
                return;
            }
            
            // In a real app, this would be an API call to register the user
            // For demo purposes, we'll simulate a successful registration
            simulateRegistration(email, 'user');
        });
    }
    
    // Pharmacy registration form handling
    const pharmacyRegisterForm = document.getElementById('pharmacy-register-form');
    if (pharmacyRegisterForm) {
        pharmacyRegisterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const pharmacyName = this.querySelector('#pharmacy-name').value;
            const ownerName = this.querySelector('#pharmacy-owner').value;
            const email = this.querySelector('#pharmacy-email').value;
            const phone = this.querySelector('#pharmacy-phone').value;
            const address = this.querySelector('#pharmacy-address').value;
            const license = this.querySelector('#pharmacy-license').value;
            const password = this.querySelector('#pharmacy-password').value;
            const passwordConfirm = this.querySelector('#pharmacy-password-confirm').value;
            const termsAccepted = this.querySelector('#pharmacy-terms')?.checked;
            
            // Validate form
            const errorElement = document.getElementById('pharmacy-register-error');
            
            if (!pharmacyName) {
                showFormError(errorElement, 'Please enter the pharmacy name.');
                return;
            }
            
            if (!ownerName) {
                showFormError(errorElement, 'Please enter the owner\'s name.');
                return;
            }
            
            if (!email) {
                showFormError(errorElement, 'Please enter an email address.');
                return;
            }
            
            if (!phone) {
                showFormError(errorElement, 'Please enter a phone number.');
                return;
            }
            
            if (!address) {
                showFormError(errorElement, 'Please enter the pharmacy address.');
                return;
            }
            
            if (!license) {
                showFormError(errorElement, 'Please enter the pharmacy license number.');
                return;
            }
            
            if (!password) {
                showFormError(errorElement, 'Please enter a password.');
                return;
            }
            
            if (password !== passwordConfirm) {
                showFormError(errorElement, 'Passwords do not match.');
                return;
            }
            
            if (!termsAccepted) {
                showFormError(errorElement, 'You must accept the Terms of Service and Privacy Policy.');
                return;
            }
            
            // In a real app, this would be an API call to register the pharmacy
            // For demo purposes, we'll simulate a successful registration pending approval
            simulatePharmacyRegistration(email);
        });
    }
}

function initializePasswordStrength() {
    const passwordInputs = document.querySelectorAll('#user-password, #pharmacy-password');
    
    passwordInputs.forEach(input => {
        if (!input) return;
        
        const meterFill = input.closest('.form-group')?.querySelector('.strength-meter-fill');
        const strengthText = input.closest('.form-group')?.querySelector('.strength-text span');
        
        if (!meterFill || !strengthText) return;
        
        input.addEventListener('input', function() {
            const password = this.value;
            const strength = calculatePasswordStrength(password);
            
            // Update strength meter
            meterFill.setAttribute('data-strength', strength);
            
            // Update strength text
            if (strength === 0) {
                strengthText.textContent = 'Empty';
            } else if (strength === 1) {
                strengthText.textContent = 'Weak';
            } else if (strength === 2) {
                strengthText.textContent = 'Fair';
            } else if (strength === 3) {
                strengthText.textContent = 'Good';
            } else {
                strengthText.textContent = 'Strong';
            }
        });
    });
}

function calculatePasswordStrength(password) {
    if (!password) return 0;
    
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 1;
    
    // Contains lowercase and uppercase
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
    
    // Contains numbers
    if (/[0-9]/.test(password)) strength += 1;
    
    // Contains special characters
    if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
    
    return strength;
}

function showFormError(element, message) {
    if (!element) return;
    
    element.textContent = message;
    element.style.display = 'block';
    
    // Hide error after 5 seconds
    setTimeout(() => {
        element.style.display = 'none';
    }, 5000);
}

function simulateLogin(email, userType) {
    // In a real app, this would store the user session and redirect to the appropriate page
    
    // Show loading state (we could add a loading spinner in a real app)
    const loginButton = document.querySelector('#login-form button[type="submit"]');
    if (loginButton) {
        loginButton.textContent = 'Logging in...';
        loginButton.disabled = true;
    }
    
    // Simulate API delay
    setTimeout(() => {
        // Store user data in localStorage (in a real app, this would use cookies or session storage)
        localStorage.setItem('pharmafind_user', JSON.stringify({
            email: email,
            type: userType,
            loggedIn: true
        }));
        
        // Redirect to the appropriate page
        if (userType === 'user') {
            window.location.href = 'user-dashboard.html';
        } else if (userType === 'pharmacy') {
            window.location.href = 'pharmacy-dashboard.html';
        } else if (userType === 'admin') {
            window.location.href = 'admin-dashboard.html';
        }
    }, 1500);
}

function simulateRegistration(email, userType) {
    // In a real app, this would create the user account and log them in
    
    // Show loading state
    const registerButton = document.querySelector('#user-register-form button[type="submit"]');
    if (registerButton) {
        registerButton.textContent = 'Creating Account...';
        registerButton.disabled = true;
    }
    
    // Simulate API delay
    setTimeout(() => {
        // Store user data and simulate login
        simulateLogin(email, userType);
    }, 2000);
}

function simulatePharmacyRegistration(email) {
    // In a real app, this would create a pharmacy account pending approval
    
    // Show loading state
    const registerButton = document.querySelector('#pharmacy-register-form button[type="submit"]');
    if (registerButton) {
        registerButton.textContent = 'Submitting...';
        registerButton.disabled = true;
    }
    
    // Simulate API delay
    setTimeout(() => {
        // Show success message and redirect
        alert('Your pharmacy registration has been submitted for verification. You will be notified once your account is approved.');
        window.location.href = 'index.html';
    }, 2000);
}