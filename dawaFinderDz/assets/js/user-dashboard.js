document.addEventListener('DOMContentLoaded', function() {
    // Initialize the dashboard
    initializeDashboard();
    
    // Load user data
    loadUserData();
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize forms
    initializeForms();
});

function initializeDashboard() {
    // Load initial data for all sections
    loadFavorites();
    loadReviews();
    loadCharityPosts();
    loadNotifications();
}

function loadUserData() {
    // In a real app, this would fetch user data from the API
    const userData = JSON.parse(localStorage.getItem('pharmafind_user'));
    
    if (userData) {
        document.getElementById('user-name').textContent = userData.name || 'User';
        document.getElementById('profile-name').value = userData.name || '';
        document.getElementById('profile-email').value = userData.email || '';
        document.getElementById('profile-phone').value = userData.phone || '';
    } else {
        // Redirect to login if no user data is found
        window.location.href = 'login.html';
    }
}

function initializeNavigation() {
    const navItems = document.querySelectorAll('.dashboard-nav-item');
    const sections = document.querySelectorAll('.dashboard-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items and sections
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked item and corresponding section
            this.classList.add('active');
            const sectionId = this.getAttribute('data-section') + '-section';
            document.getElementById(sectionId).classList.add('active');
        });
    });
    
    // Initialize logout button
    document.getElementById('logout-button').addEventListener('click', function(e) {
        e.preventDefault();
        handleLogout();
    });
}

function initializeForms() {
    // Profile form
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleProfileUpdate(this);
        });
    }
    
    // Settings form
    const settingsForm = document.getElementById('settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSettingsUpdate(this);
        });
    }
    
    // Delete account button
    const deleteAccountBtn = document.getElementById('delete-account');
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', function() {
            handleDeleteAccount();
        });
    }
}

function loadFavorites() {
    const favoritesGrid = document.getElementById('favorites-grid');
    
    // In a real app, this would fetch favorites from the API
    // For demo purposes, we'll use mock data
    const favorites = [
        {
            id: 1,
            name: 'Paracetamol',
            image: 'assets/images/med-paracetamol.jpg',
            laboratory: 'Saidal',
            price: 120,
            inStock: true
        },
        // Add more favorites...
    ];
    
    if (favoritesGrid) {
        favoritesGrid.innerHTML = '';
        
        favorites.forEach(medication => {
            const medicationCard = document.createElement('div');
            medicationCard.classList.add('medication-card');
            medicationCard.innerHTML = `
                <div class="medication-image">
                    <img src="${medication.image}" alt="${medication.name}">
                </div>
                <div class="medication-info">
                    <h3 class="medication-name">${medication.name}</h3>
                    <div class="medication-lab">By ${medication.laboratory}</div>
                    <div class="medication-meta">
                        <div class="medication-price">${formatCurrency(medication.price)}</div>
                        <div class="medication-status ${medication.inStock ? '' : 'out-of-stock'}">
                            ${medication.inStock ? 'In Stock' : 'Out of Stock'}
                        </div>
                    </div>
                </div>
                <button class="remove-favorite" data-id="${medication.id}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            
            favoritesGrid.appendChild(medicationCard);
        });
        
        // Add event listeners for remove buttons
        const removeButtons = document.querySelectorAll('.remove-favorite');
        removeButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const medicationId = this.getAttribute('data-id');
                removeFavorite(medicationId);
            });
        });
    }
}

function loadReviews() {
    const reviewsList = document.getElementById('user-reviews-list');
    
    // In a real app, this would fetch reviews from the API
    // For demo purposes, we'll use mock data
    const reviews = [
        {
            id: 1,
            medicationName: 'Paracetamol',
            medicationImage: 'assets/images/med-paracetamol.jpg',
            rating: 5,
            title: 'Very effective',
            content: 'Works great for headaches and fever.',
            date: '2024-02-10'
        },
        // Add more reviews...
    ];
    
    if (reviewsList) {
        reviewsList.innerHTML = '';
        
        reviews.forEach(review => {
            const reviewCard = document.createElement('div');
            reviewCard.classList.add('review-card');
            reviewCard.innerHTML = `
                <div class="review-header">
                    <div class="review-medication">
                        <img src="${review.medicationImage}" alt="${review.medicationName}">
                        <h4>${review.medicationName}</h4>
                    </div>
                    <div class="review-rating">
                        ${getStarRating(review.rating)}
                    </div>
                </div>
                <h4 class="review-title">${review.title}</h4>
                <p class="review-content">${review.content}</p>
                <div class="review-footer">
                    <span class="review-date">${formatDate(review.date)}</span>
                    <button class="btn btn-danger btn-sm" onclick="deleteReview(${review.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            `;
            
            reviewsList.appendChild(reviewCard);
        });
    }
}

function loadCharityPosts() {
    const charityPosts = document.getElementById('user-charity-posts');
    
    // In a real app, this would fetch charity posts from the API
    // For demo purposes, we'll use mock data
    const posts = [
        {
            id: 1,
            title: 'Unused Antibiotics',
            type: 'donation',
            medicationName: 'Amoxicillin',
            description: 'Unopened package, expires in 6 months',
            status: 'available',
            date: '2024-02-01'
        },
        // Add more posts...
    ];
    
    if (charityPosts) {
        charityPosts.innerHTML = '';
        
        posts.forEach(post => {
            const postCard = document.createElement('div');
            postCard.classList.add('charity-post-card');
            postCard.innerHTML = `
                <div class="charity-post-header">
                    <span class="post-type ${post.type}">${post.type === 'donation' ? 'Donation' : 'Request'}</span>
                    <span class="post-status ${post.status}">${post.status}</span>
                </div>
                <h4 class="post-title">${post.title}</h4>
                <p class="post-medication">${post.medicationName}</p>
                <p class="post-description">${post.description}</p>
                <div class="post-footer">
                    <span class="post-date">${formatDate(post.date)}</span>
                    <div class="post-actions">
                        <button class="btn btn-primary btn-sm" onclick="editCharityPost(${post.id})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-danger btn-sm" onclick="deleteCharityPost(${post.id})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            `;
            
            charityPosts.appendChild(postCard);
        });
    }
    
    // Initialize create post button
    const createPostBtn = document.getElementById('create-charity-post');
    if (createPostBtn) {
        createPostBtn.addEventListener('click', function() {
            showCreateCharityPostModal();
        });
    }
}

function loadNotifications() {
    const notificationsList = document.getElementById('user-notifications');
    
    // In a real app, this would fetch notifications from the API
    // For demo purposes, we'll use mock data
    const notifications = [
        {
            id: 1,
            type: 'medication',
            message: 'Paracetamol is now available at Pharmacy Central',
            date: '2024-02-14T10:30:00',
            read: false
        },
        // Add more notifications...
    ];
    
    if (notificationsList) {
        notificationsList.innerHTML = '';
        
        notifications.forEach(notification => {
            const notificationItem = document.createElement('div');
            notificationItem.classList.add('notification-item');
            if (!notification.read) {
                notificationItem.classList.add('unread');
            }
            
            notificationItem.innerHTML = `
                <div class="notification-icon">
                    ${getNotificationIcon(notification.type)}
                </div>
                <div class="notification-content">
                    <p>${notification.message}</p>
                    <span class="notification-time">${formatTimeAgo(notification.date)}</span>
                </div>
                <button class="notification-action" onclick="markNotificationRead(${notification.id})">
                    <i class="fas fa-check"></i>
                </button>
            `;
            
            notificationsList.appendChild(notificationItem);
        });
    }
}

// Helper Functions
function getStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

function getNotificationIcon(type) {
    const icons = {
        medication: '<i class="fas fa-pills"></i>',
        review: '<i class="fas fa-star"></i>',
        charity: '<i class="fas fa-hand-holding-heart"></i>',
        system: '<i class="fas fa-info-circle"></i>'
    };
    return icons[type] || icons.system;
}

function formatTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;
    
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (minutes < 60) {
        return `${minutes} minutes ago`;
    } else if (hours < 24) {
        return `${hours} hours ago`;
    } else {
        return `${days} days ago`;
    }
}

// Form Handlers
function handleProfileUpdate(form) {
    const formData = new FormData(form);
    
    // In a real app, this would be an API call
    // For demo purposes, we'll just show a success message
    showNotification('Profile updated successfully', 'success');
}

function handleSettingsUpdate(form) {
    const formData = new FormData(form);
    
    // In a real app, this would be an API call
    // For demo purposes, we'll just show a success message
    showNotification('Settings saved successfully', 'success');
}

function handleDeleteAccount() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        // In a real app, this would be an API call
        // For demo purposes, we'll just redirect to the home page
        localStorage.removeItem('pharmafind_user');
        window.location.href = 'index.html';
    }
}

function handleLogout() {
    // In a real app, this would also invalidate the session/token
    localStorage.removeItem('pharmafind_user');
    window.location.href = 'login.html';
}

// Action Handlers
function removeFavorite(medicationId) {
    // In a real app, this would be an API call
    // For demo purposes, we'll just remove the card and show a success message
    const card = document.querySelector(`.medication-card [data-id="${medicationId}"]`).closest('.medication-card');
    card.remove();
    showNotification('Medication removed from favorites', 'success');
}

function deleteReview(reviewId) {
    if (confirm('Are you sure you want to delete this review?')) {
        // In a real app, this would be an API call
        // For demo purposes, we'll just remove the card and show a success message
        const card = document.querySelector(`.review-card [onclick="deleteReview(${reviewId})"]`).closest('.review-card');
        card.remove();
        showNotification('Review deleted successfully', 'success');
    }
}

function editCharityPost(postId) {
    // In a real app, this would open a modal with the post details for editing
    showNotification('Edit functionality coming soon', 'info');
}

function deleteCharityPost(postId) {
    if (confirm('Are you sure you want to delete this charity post?')) {
        // In a real app, this would be an API call
        // For demo purposes, we'll just remove the card and show a success message
        const card = document.querySelector(`.charity-post-card [onclick="deleteCharityPost(${postId})"]`).closest('.charity-post-card');
        card.remove();
        showNotification('Charity post deleted successfully', 'success');
    }
}

function markNotificationRead(notificationId) {
    // In a real app, this would be an API call
    // For demo purposes, we'll just update the UI
    const notification = document.querySelector(`.notification-item [onclick="markNotificationRead(${notificationId})"]`).closest('.notification-item');
    notification.classList.remove('unread');
    showNotification('Notification marked as read', 'success');
}