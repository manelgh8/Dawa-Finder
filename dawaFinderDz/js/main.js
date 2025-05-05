// Main JavaScript File
import { initNavigation } from './navigation.js';
import { initModals } from './modals.js';
import { initSearch } from './search.js';
import { initPharmacyMap } from './pharmacy.js';
import { initMedications } from './medications.js';
import { initNotifications } from './notifications.js';
import { initCharity } from './charity.js';
import { initAuth } from './auth.js';
import { initDarkMode } from './darkMode.js';
import { initScrollAnimations } from './animations.js';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('PharmaFind-DZ application initialized');

  // Create necessary folders and assets
  createFolders();
  
  // Initialize all modules
  initNavigation();
  initModals();
  initSearch();
  initPharmacyMap();
  initMedications();
  initNotifications();
  initCharity();
  initAuth();
  initDarkMode();
  initScrollAnimations();
  
  // Show welcome notification
  showWelcomeNotification();
});

// Function to create all necessary folders and ensure assets are available
function createFolders() {
  // This function is for simulation purposes in the real world
  // In a production environment, these would be part of the project structure
  console.log('Creating necessary folders and assets');
  
  // Create logo SVG element
  const logoSvg = document.createElement('div');
  logoSvg.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" style="display:none;">
      <circle cx="20" cy="20" r="20" fill="#0CB8B6"/>
      <path d="M20,8c-6.63,0-12,5.37-12,12s5.37,12,12,12s12-5.37,12-12S26.63,8,20,8z M20,28c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8 S24.41,28,20,28z" fill="white"/>
      <path d="M20,15c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S22.76,15,20,15z" fill="white"/>
      <path d="M24,20h-8" stroke="#0CB8B6" stroke-width="2" stroke-linecap="round"/>
      <path d="M20,16v8" stroke="#0CB8B6" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `;
  document.body.appendChild(logoSvg);
}

// Function to show welcome notification
function showWelcomeNotification() {
  const notificationContainer = document.getElementById('notification-container');
  if (!notificationContainer) return;
  
  const notification = document.createElement('div');
  notification.className = 'notification info show';
  notification.innerHTML = `
    <div class="notification-icon">
      <i class="fas fa-info-circle"></i>
    </div>
    <div class="notification-content">
      <h3 class="notification-title">Welcome to PharmaFind-DZ</h3>
      <p class="notification-message">Find medications, locate pharmacies, and connect with healthcare resources all in one place.</p>
    </div>
    <div class="notification-close">&times;</div>
  `;
  
  notificationContainer.appendChild(notification);
  
  // Remove notification after 5 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    notification.classList.add('hide');
    setTimeout(() => {
      notification.remove();
    }, 500);
  }, 5000);
  
  // Close notification on click
  notification.querySelector('.notification-close').addEventListener('click', () => {
    notification.classList.remove('show');
    notification.classList.add('hide');
    setTimeout(() => {
      notification.remove();
    }, 500);
  });
}

// Export any functions needed in other modules
export { showWelcomeNotification };