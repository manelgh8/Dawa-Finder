// Authentication functionality
export function initAuth() {
  // This would handle authentication in a real app
  // For this demo, we'll just set up some simulated functionality
  
  // Check if user is already logged in (via localStorage)
  checkLoggedInStatus();
}

// Function to check if user is already logged in
function checkLoggedInStatus() {
  const user = JSON.parse(localStorage.getItem('pharmafind-user'));
  
  if (user) {
    console.log('User is already logged in:', user);
    
    // Update UI for logged in state
    updateLoggedInUI(user);
  }
}

// Function to update UI for logged in state
function updateLoggedInUI(user) {
  // Update navigation buttons
  const loginBtn = document.querySelector('#login-btn');
  const registerBtn = document.querySelector('#register-btn');
  
  if (loginBtn && registerBtn) {
    // Hide login/register buttons
    loginBtn.style.display = 'none';
    registerBtn.style.display = 'none';
    
    // Create user menu
    const navActions = document.querySelector('.nav-actions');
    
    if (navActions && !document.querySelector('.user-menu')) {
      const userMenu = document.createElement('div');
      userMenu.className = 'user-menu';
      userMenu.innerHTML = `
        <button class="user-menu-btn">
          <i class="fas fa-user-circle"></i>
          <span>${user.name || user.email.split('@')[0]}</span>
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
      
      // Add user menu styles if not already present
      if (!document.querySelector('#user-menu-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'user-menu-styles';
        styleElement.textContent = `
          .user-menu {
            position: relative;
          }
          
          .user-menu-btn {
            display: flex;
            align-items: center;
            gap: var(--spacing-2);
            padding: var(--spacing-2) var(--spacing-4);
            border-radius: var(--border-radius-md);
            background-color: var(--color-primary-light);
            color: var(--color-white);
            transition: all 0.3s ease;
          }
          
          .user-menu-btn:hover {
            background-color: var(--color-primary);
          }
          
          .user-dropdown {
            position: absolute;
            top: 100%;
            right: 0;
            width: 200px;
            background-color: var(--color-white);
            border-radius: var(--border-radius-md);
            box-shadow: var(--shadow-lg);
            overflow: hidden;
            z-index: var(--z-30);
            display: none;
          }
          
          .user-dropdown.show {
            display: block;
          }
          
          .user-dropdown a {
            display: flex;
            align-items: center;
            gap: var(--spacing-2);
            padding: var(--spacing-3) var(--spacing-4);
            color: var(--color-gray-700);
            transition: all 0.2s ease;
          }
          
          .user-dropdown a:hover {
            background-color: var(--color-gray-100);
            color: var(--color-primary);
          }
          
          .user-dropdown a i {
            width: 16px;
          }
        `;
        document.head.appendChild(styleElement);
      }
      
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
        
        // Clear user data
        localStorage.removeItem('pharmafind-user');
        
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

// Export functions that might be needed in other modules
export { updateLoggedInUI };