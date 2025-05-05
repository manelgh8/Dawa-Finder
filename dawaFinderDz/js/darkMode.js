// Dark mode functionality
export function initDarkMode() {
  // Check user preference for dark mode
  checkDarkModePreference();
  
  // Add dark mode toggle to the navbar (not in the original HTML)
  addDarkModeToggle();
}

// Function to check user preference for dark mode
function checkDarkModePreference() {
  // Check localStorage
  const darkModeEnabled = localStorage.getItem('pharmafind-dark-mode') === 'true';
  
  // Check system preference
  const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Apply dark mode if either local storage setting or system preference indicates dark mode
  if (darkModeEnabled || (prefersDarkMode && localStorage.getItem('pharmafind-dark-mode') === null)) {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
  
  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only apply if user hasn't set a preference
    if (localStorage.getItem('pharmafind-dark-mode') === null) {
      if (e.matches) {
        enableDarkMode();
      } else {
        disableDarkMode();
      }
    }
  });
}

// Function to add dark mode toggle
function addDarkModeToggle() {
  const navActions = document.querySelector('.nav-actions');
  
  if (!navActions) return;
  
  // Create dark mode toggle
  const darkModeToggle = document.createElement('button');
  darkModeToggle.className = 'dark-mode-toggle';
  darkModeToggle.id = 'dark-mode-toggle';
  darkModeToggle.innerHTML = `
    <i class="fas fa-moon"></i>
  `;
  
  // Add toggle before language selector
  const langSelector = navActions.querySelector('.language-selector');
  if (langSelector) {
    navActions.insertBefore(darkModeToggle, langSelector);
  } else {
    navActions.appendChild(darkModeToggle);
  }
  
  // Add dark mode toggle styles
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    .dark-mode-toggle {
      padding: var(--spacing-2);
      border-radius: 50%;
      background-color: var(--color-gray-100);
      color: var(--color-gray-700);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .dark-mode-toggle:hover {
      background-color: var(--color-gray-200);
    }
    
    body.dark-mode .dark-mode-toggle {
      background-color: var(--color-gray-700);
      color: var(--color-white);
    }
    
    body.dark-mode .dark-mode-toggle:hover {
      background-color: var(--color-gray-600);
    }
  `;
  document.head.appendChild(styleElement);
  
  // Check if dark mode is currently enabled
  const isDarkMode = document.body.classList.contains('dark-mode');
  updateDarkModeToggle(isDarkMode);
  
  // Add toggle event
  darkModeToggle.addEventListener('click', () => {
    const isDarkModeEnabled = document.body.classList.contains('dark-mode');
    
    if (isDarkModeEnabled) {
      disableDarkMode();
    } else {
      enableDarkMode();
    }
  });
}

// Function to enable dark mode
function enableDarkMode() {
  document.body.classList.add('dark-mode');
  localStorage.setItem('pharmafind-dark-mode', 'true');
  updateDarkModeToggle(true);
}

// Function to disable dark mode
function disableDarkMode() {
  document.body.classList.remove('dark-mode');
  localStorage.setItem('pharmafind-dark-mode', 'false');
  updateDarkModeToggle(false);
}

// Function to update dark mode toggle icon
function updateDarkModeToggle(isDarkMode) {
  const toggle = document.getElementById('dark-mode-toggle');
  
  if (!toggle) return;
  
  if (isDarkMode) {
    toggle.innerHTML = `<i class="fas fa-sun"></i>`;
  } else {
    toggle.innerHTML = `<i class="fas fa-moon"></i>`;
  }
}

// Apply dark mode styles
const darkModeStyles = document.createElement('style');
darkModeStyles.textContent = `
  body.dark-mode {
    --color-white: #1A1A1A;
    --color-black: #FFFFFF;
    --color-gray-100: #333333;
    --color-gray-200: #444444;
    --color-gray-300: #555555;
    --color-gray-400: #666666;
    --color-gray-500: #777777;
    --color-gray-600: #999999;
    --color-gray-700: #BBBBBB;
    --color-gray-800: #DDDDDD;
    --color-gray-900: #EEEEEE;
    
    --color-primary-light: #4FCECB;
    
    background-color: var(--color-white);
    color: var(--color-gray-900);
  }
  
  body.dark-mode .header {
    background-color: rgba(26, 26, 26, 0.9);
  }
  
  body.dark-mode .logo-text {
    color: var(--color-gray-900);
  }
  
  body.dark-mode .hero {
    background: linear-gradient(135deg, rgba(12,184,182,0.2) 0%, rgba(29,53,87,0.2) 100%);
  }
  
  body.dark-mode .card,
  body.dark-mode .feature-card,
  body.dark-mode .medication-card,
  body.dark-mode .pharmacy-card,
  body.dark-mode .donation-card {
    background-color: var(--color-gray-100);
  }
  
  body.dark-mode .donation-type {
    background-color: var(--color-primary);
  }
  
  body.dark-mode .form-divider span {
    background-color: var(--color-gray-100);
  }
  
  body.dark-mode .modal {
    background-color: var(--color-gray-100);
  }
  
  body.dark-mode .footer {
    background-color: #0F0F0F;
  }
  
  body.dark-mode .notification {
    background-color: var(--color-gray-100);
  }
  
  body.dark-mode .search-input,
  body.dark-mode .form-group input,
  body.dark-mode .form-group select,
  body.dark-mode .form-group textarea {
    background-color: var(--color-gray-100);
    color: var(--color-gray-800);
    border-color: var(--color-gray-400);
  }
  
  body.dark-mode .search-input::placeholder,
  body.dark-mode .form-group input::placeholder,
  body.dark-mode .form-group textarea::placeholder {
    color: var(--color-gray-600);
  }
  
  body.dark-mode .map-visual {
    background-color: var(--color-gray-300);
    background-image: 
      linear-gradient(var(--color-gray-400) 1px, transparent 1px),
      linear-gradient(90deg, var(--color-gray-400) 1px, transparent 1px);
  }
`;
document.head.appendChild(darkModeStyles);