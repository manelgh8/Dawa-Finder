// Modal functionality
export function initModals() {
  // Get modal elements
  const loginBtn = document.querySelector('#login-btn');
  const registerBtn = document.querySelector('#register-btn');
  const ctaRegisterBtn = document.querySelector('#cta-register-btn');
  const ctaPharmacyBtn = document.querySelector('#cta-pharmacy-btn');
  const loginModal = document.querySelector('#login-modal');
  const registerModal = document.querySelector('#register-modal');
  const switchToRegister = document.querySelector('#switch-to-register');
  const switchToLogin = document.querySelector('#switch-to-login');
  const closeBtns = document.querySelectorAll('.modal-close');
  const loginForm = document.querySelector('#login-form');
  const registerForm = document.querySelector('#register-form');
  const passwordToggles = document.querySelectorAll('.password-toggle');
  
  // Open login modal
  if (loginBtn && loginModal) {
    loginBtn.addEventListener('click', () => {
      openModal(loginModal);
    });
  }
  
  // Open register modal
  if (registerBtn && registerModal) {
    registerBtn.addEventListener('click', () => {
      openModal(registerModal);
    });
  }
  
  // Open register modal from CTA
  if (ctaRegisterBtn && registerModal) {
    ctaRegisterBtn.addEventListener('click', () => {
      openModal(registerModal);
    });
  }
  
  // Open pharmacy register modal (would be a different modal in a real app)
  if (ctaPharmacyBtn) {
    ctaPharmacyBtn.addEventListener('click', () => {
      const event = new CustomEvent('showNotification', {
        detail: {
          type: 'info',
          title: 'Pharmacy Registration',
          message: 'Pharmacy registration will be available soon.'
        }
      });
      document.dispatchEvent(event);
    });
  }
  
  // Switch between login and register modals
  if (switchToRegister) {
    switchToRegister.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal(loginModal);
      setTimeout(() => {
        openModal(registerModal);
      }, 300);
    });
  }
  
  if (switchToLogin) {
    switchToLogin.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal(registerModal);
      setTimeout(() => {
        openModal(loginModal);
      }, 300);
    });
  }
  
  // Close modals with close button
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-container');
      closeModal(modal);
    });
  });
  
  // Close modals when clicking outside
  document.addEventListener('click', (e) => {
    const modalContainers = document.querySelectorAll('.modal-container.show');
    modalContainers.forEach(container => {
      if (e.target === container) {
        closeModal(container);
      }
    });
  });
  
  // Close modals with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modalContainers = document.querySelectorAll('.modal-container.show');
      modalContainers.forEach(container => {
        closeModal(container);
      });
    }
  });
  
  // Handle login form submission
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = document.querySelector('#login-email').value;
      const password = document.querySelector('#login-password').value;
      const rememberMe = document.querySelector('#remember-me')?.checked;
      
      // In a real app, this would call an authentication API
      console.log('Login attempt:', { email, password, rememberMe });
      
      // Simulate login success
      simulateLogin(email);
      
      // Close modal
      closeModal(loginModal);
    });
  }
  
  // Handle register form submission
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.querySelector('#register-name').value;
      const email = document.querySelector('#register-email').value;
      const password = document.querySelector('#register-password').value;
      const confirmPassword = document.querySelector('#register-confirm-password').value;
      const termsAccepted = document.querySelector('#terms-checkbox')?.checked;
      
      // Validate passwords match
      if (password !== confirmPassword) {
        const event = new CustomEvent('showNotification', {
          detail: {
            type: 'error',
            title: 'Registration Error',
            message: 'Passwords do not match.'
          }
        });
        document.dispatchEvent(event);
        return;
      }
      
      // In a real app, this would call a registration API
      console.log('Registration attempt:', { name, email, password, termsAccepted });
      
      // Simulate registration success
      simulateRegistration(name, email);
      
      // Close modal
      closeModal(registerModal);
    });
  }
  
  // Toggle password visibility
  passwordToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const input = toggle.previousElementSibling;
      const icon = toggle.querySelector('i');
      
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      }
    });
  });
}

// Helper functions
function openModal(modal) {
  if (!modal) return;
  modal.classList.add('show');
  document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove('show');
  document.body.style.overflow = ''; // Restore scrolling
}

function simulateLogin(email) {
  // This is a simulation - in a real app, this would handle auth tokens, etc.
  const event = new CustomEvent('showNotification', {
    detail: {
      type: 'success',
      title: 'Login Successful',
      message: `Welcome back! You are now logged in as ${email}.`
    }
  });
  document.dispatchEvent(event);
  
  // Update UI for logged in state
  updateLoggedInUI(email);
}

function simulateRegistration(name, email) {
  // This is a simulation - in a real app, this would create a user account
  const event = new CustomEvent('showNotification', {
    detail: {
      type: 'success',
      title: 'Registration Successful',
      message: `Welcome to PharmaFind-DZ, ${name}! Your account has been created.`
    }
  });
  document.dispatchEvent(event);
  
  // Update UI for logged in state
  updateLoggedInUI(email);
}

function updateLoggedInUI(email) {
  // Update navigation buttons
  const loginBtn = document.querySelector('#login-btn');
  const registerBtn = document.querySelector('#register-btn');
  
  if (loginBtn && registerBtn) {
    // Hide login/register buttons
    loginBtn.style.display = 'none';
    registerBtn.style.display = 'none';
    
    // Create user menu
    const navActions = document.querySelector('.nav-actions');
    
    if (navActions) {
      const userMenu = document.createElement('div');
      userMenu.className = 'user-menu';
      userMenu.innerHTML = `
        <button class="user-menu-btn">
          <i class="fas fa-user-circle"></i>
          <span>${email.split('@')[0]}</span>
          <i class="fas fa-chevron-down"></i>
        </button>
        <div class="user-dropdown">
          <a href="profile.html"><i class="fas fa-user"></i> My Profile</a>
          <a href="favorites.html"><i class="fas fa-heart"></i> Favorites</a>
          <a href="settings.html"><i class="fas fa-cog"></i> Settings</a>
          <a href="#" id="logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</a>
        </div>
      `;
      
      navActions.insertBefore(userMenu, navActions.firstChild);
      
      // Add user menu functionality
      const userMenuBtn = userMenu.querySelector('.user-menu-btn');
      const userDropdown = userMenu.querySelector('.user-dropdown');
      
      userMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdown.classList.toggle('show');
      });
      
      // Handle logout
      const logoutBtn = userMenu.querySelector('#logout-btn');
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove user menu
        userMenu.remove();
        
        // Show login/register buttons
        loginBtn.style.display = '';
        registerBtn.style.display = '';
        
        // Show logout notification
        const event = new CustomEvent('showNotification', {
          detail: {
            type: 'info',
            title: 'Logged Out',
            message: 'You have been successfully logged out.'
          }
        });
        document.dispatchEvent(event);
      });
      
      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.user-menu')) {
          userDropdown.classList.remove('show');
        }
      });
    }
  }
}