// Notifications functionality
export function initNotifications() {
  // Listen for notification events
  document.addEventListener('showNotification', (e) => {
    if (e.detail) {
      showNotification(e.detail.type, e.detail.title, e.detail.message);
    }
  });
}

// Function to show a notification
export function showNotification(type, title, message) {
  const notificationContainer = document.getElementById('notification-container');
  if (!notificationContainer) return;
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type} show`;
  
  // Set notification icon based on type
  let icon;
  switch (type) {
    case 'success':
      icon = 'fas fa-check-circle';
      break;
    case 'error':
      icon = 'fas fa-exclamation-circle';
      break;
    case 'warning':
      icon = 'fas fa-exclamation-triangle';
      break;
    case 'info':
    default:
      icon = 'fas fa-info-circle';
      break;
  }
  
  // Create notification content
  notification.innerHTML = `
    <div class="notification-icon">
      <i class="${icon}"></i>
    </div>
    <div class="notification-content">
      <h3 class="notification-title">${title}</h3>
      <p class="notification-message">${message}</p>
    </div>
    <div class="notification-close">&times;</div>
  `;
  
  // Add notification to container
  notificationContainer.appendChild(notification);
  
  // Remove notification after 5 seconds
  const timeout = setTimeout(() => {
    notification.classList.remove('show');
    notification.classList.add('hide');
    setTimeout(() => {
      notification.remove();
    }, 500);
  }, 5000);
  
  // Close notification on click
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    clearTimeout(timeout);
    notification.classList.remove('show');
    notification.classList.add('hide');
    setTimeout(() => {
      notification.remove();
    }, 500);
  });
}