// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        initializeMobileMenu();
    }

    // Initialize language selector
    initializeLanguageSelector();

    // Initialize password toggle
    initializePasswordToggle();

    // Initialize tabs
    initializeTabs();
});

function initializeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const body = document.body;

    // Create mobile menu
    const mobileNav = document.createElement('div');
    mobileNav.classList.add('mobile-nav');

    // Get the logo and nav items
    const logo = document.querySelector('.logo').cloneNode(true);
    const navItems = document.querySelector('.main-nav').cloneNode(true);

    // Create mobile menu structure
    const mobileNavHeader = document.createElement('div');
    mobileNavHeader.classList.add('mobile-nav-header');

    const closeButton = document.createElement('button');
    closeButton.classList.add('mobile-nav-close');
    closeButton.innerHTML = '&times;';

    mobileNavHeader.appendChild(logo);
    mobileNavHeader.appendChild(closeButton);

    mobileNav.appendChild(mobileNavHeader);
    mobileNav.appendChild(navItems);

    // Add auth buttons
    const navRight = document.querySelector('.nav-right');
    if (navRight) {
        const mobileNavFooter = document.createElement('div');
        mobileNavFooter.classList.add('mobile-nav-footer');

        const languageSelector = navRight.querySelector('.language-selector')?.cloneNode(true);
        const authButtons = Array.from(navRight.querySelectorAll('a')).map(a => a.cloneNode(true));

        if (languageSelector) {
            mobileNavFooter.appendChild(languageSelector);
        }

        authButtons.forEach(button => {
            mobileNavFooter.appendChild(button);
        });

        mobileNav.appendChild(mobileNavFooter);
    }

    // Add to body
    body.appendChild(mobileNav);

    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', function() {
        mobileNav.classList.add('active');
        body.style.overflow = 'hidden';
    });

    closeButton.addEventListener('click', function() {
        mobileNav.classList.remove('active');
        body.style.overflow = '';
    });

    // Close menu when clicking on a link
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            body.style.overflow = '';
        });
    });
}

function initializeLanguageSelector() {
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            const selectedLanguage = this.value;
            // In a real app, this would trigger a language change
            console.log('Language changed to:', selectedLanguage);
            
            // Display notification for demo purposes
            showNotification(`Language changed to ${getLanguageName(selectedLanguage)}`);
        });
    }
}

function getLanguageName(code) {
    const languages = {
        'en': 'English',
        'fr': 'French',
        'ar': 'Arabic'
    };
    return languages[code] || code;
}

function initializePasswordToggle() {
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const passwordInput = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
}

function initializeTabs() {
    const tabButtons = document.querySelectorAll('[data-tab]');
    
    if (tabButtons.length) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                const tabContent = document.getElementById(tabId);
                const tabContainer = this.closest('.auth-tabs, .tabs-navigation');
                const tabContents = document.querySelectorAll('.tab-content');
                
                // Remove active class from all tabs and contents
                tabContainer.querySelectorAll('[data-tab]').forEach(tab => {
                    tab.classList.remove('active');
                });
                
                tabContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                // Add active class to clicked tab and its content
                this.classList.add('active');
                tabContent.classList.add('active');
            });
        });
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    
    if (!notification) {
        // Create notification element if it doesn't exist
        const notifElement = document.createElement('div');
        notifElement.id = 'notification';
        notifElement.classList.add('notification');
        
        const notifContent = document.createElement('div');
        notifContent.classList.add('notification-content');
        
        const icon = document.createElement('i');
        icon.classList.add('fas');
        
        if (type === 'success') {
            icon.classList.add('fa-check-circle');
        } else if (type === 'error') {
            icon.classList.add('fa-exclamation-circle');
        } else if (type === 'warning') {
            icon.classList.add('fa-exclamation-triangle');
        } else if (type === 'info') {
            icon.classList.add('fa-info-circle');
        }
        
        const messageElement = document.createElement('p');
        messageElement.id = 'notification-message';
        messageElement.textContent = message;
        
        notifContent.appendChild(icon);
        notifContent.appendChild(messageElement);
        notifElement.appendChild(notifContent);
        
        document.body.appendChild(notifElement);
        
        setTimeout(() => {
            notifElement.classList.add('active');
        }, 10);
        
        setTimeout(() => {
            notifElement.classList.remove('active');
            setTimeout(() => {
                notifElement.remove();
            }, 300);
        }, 3000);
    } else {
        // Update existing notification
        const messageElement = notification.querySelector('#notification-message');
        messageElement.textContent = message;
        
        const icon = notification.querySelector('i');
        icon.className = 'fas';
        
        if (type === 'success') {
            icon.classList.add('fa-check-circle');
        } else if (type === 'error') {
            icon.classList.add('fa-exclamation-circle');
        } else if (type === 'warning') {
            icon.classList.add('fa-exclamation-triangle');
        } else if (type === 'info') {
            icon.classList.add('fa-info-circle');
        }
        
        notification.classList.add('active');
        
        setTimeout(() => {
            notification.classList.remove('active');
        }, 3000);
    }
}

// Get URL parameters
function getUrlParams() {
    const params = {};
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    
    for (const [key, value] of urlParams.entries()) {
        params[key] = value;
    }
    
    return params;
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('fr-DZ', {
        style: 'currency',
        currency: 'DZD',
        minimumFractionDigits: 0
    }).format(amount);
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }).format(date);
}

// Get distance text
function getDistanceText(meters) {
    if (meters < 1000) {
        return `${meters.toFixed(0)} m`;
    } else {
        return `${(meters / 1000).toFixed(1)} km`;
    }
}

// Truncate text
function truncateText(text, length) {
    if (text.length <= length) {
        return text;
    }
    return text.substring(0, length) + '...';
}