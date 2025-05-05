document.addEventListener('DOMContentLoaded', function() {
    // Initialize the dashboard
    initializeDashboard();
    
    // Load pharmacy data
    loadPharmacyData();
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize forms and modals
    initializeForms();
    initializeModals();
});

function initializeDashboard() {
    // Load initial data for all sections
    loadInventory();
    loadOrders();
    loadStatistics();
    generateWorkingHours();
}

function loadPharmacyData() {
    // In a real app, this would fetch pharmacy data from the API
    const userData = JSON.parse(localStorage.getItem('pharmafind_user'));
    
    if (userData && userData.role === 'pharmacy') {
        document.getElementById('pharmacy-name').textContent = userData.pharmacyName || 'Pharmacy Name';
        document.getElementById('pharmacy-profile-name').value = userData.pharmacyName || '';
        document.getElementById('pharmacy-owner-name').value = userData.ownerName || '';
        document.getElementById('pharmacy-license').value = userData.licenseNumber || '';
        document.getElementById('pharmacy-address').value = userData.address || '';
        document.getElementById('pharmacy-phone').value = userData.phone || '';
        document.getElementById('pharmacy-email').value = userData.email || '';
    } else {
        // Redirect to login if no pharmacy data is found
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
    // Pharmacy profile form
    const profileForm = document.getElementById('pharmacy-profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleProfileUpdate(this);
        });
    }
    
    // Settings form
    const settingsForm = document.getElementById('pharmacy-settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSettingsUpdate(this);
        });
    }
    
    // Add medication form
    const addMedicationForm = document.getElementById('add-medication-form');
    if (addMedicationForm) {
        addMedicationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleAddMedication(this);
        });
    }
}

function initializeModals() {
    // Add medication modal
    const addMedicationBtn = document.getElementById('add-medication');
    const addMedicationModal = document.getElementById('add-medication-modal');
    const modalClose = addMedicationModal?.querySelector('.modal-close');
    
    if (addMedicationBtn && addMedicationModal) {
        addMedicationBtn.addEventListener('click', function() {
            addMedicationModal.classList.add('active');
        });
        
        modalClose.addEventListener('click', function() {
            addMedicationModal.classList.remove('active');
        });
        
        // Close modal when clicking outside
        addMedicationModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    }
}

function generateWorkingHours() {
    const container = document.querySelector('.working-hours-grid');
    
    if (!container) return;
    
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    container.innerHTML = days.map(day => `
        <div class="working-hours-row">
            <span class="day-name">${day}</span>
            <div class="hours-input">
                <input type="time" name="${day.toLowerCase()}_open" value="09:00">
                <span>to</span>
                <input type="time" name="${day.toLowerCase()}_close" value="18:00">
                <label>
                    <input type="checkbox" name="${day.toLowerCase()}_closed" value="1">
                    Closed
                </label>
            </div>
        </div>
    `).join('');
    
    // Add event listeners for closed checkboxes
    container.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const timeInputs = this.closest('.hours-input').querySelectorAll('input[type="time"]');
            timeInputs.forEach(input => {
                input.disabled = this.checked;
            });
        });
    });
}

function loadInventory() {
    const inventoryTable = document.getElementById('inventory-table-body');
    
    // In a real app, this would fetch inventory data from the API
    // For demo purposes, we'll use mock data
    const inventory = [
        {
            id: 1,
            name: 'Paracetamol',
            category: 'Pain Relief',
            stock: 150,
            price: 120,
            status: 'in-stock'
        },
        {
            id: 2,
            name: 'Amoxicillin',
            category: 'Antibiotics',
            stock: 5,
            price: 450,
            status: 'low-stock'
        },
        {
            id: 3,
            name: 'Omeprazole',
            category: 'Gastrointestinal',
            stock: 0,
            price: 320,
            status: 'out-of-stock'
        }
    ];
    
    if (inventoryTable) {
        inventoryTable.innerHTML = '';
        
        inventory.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <div class="medication-info">
                        <span class="medication-name">${item.name}</span>
                    </div>
                </td>
                <td>${item.category}</td>
                <td>${item.stock}</td>
                <td>${formatCurrency(item.price)}</td>
                <td>
                    <span class="stock-status ${item.status}">
                        ${formatStockStatus(item.status)}
                    </span>
                </td>
                <td class="actions-cell">
                    <button class="action-btn action-btn-edit" onclick="editInventoryItem(${item.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn action-btn-delete" onclick="deleteInventoryItem(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            
            inventoryTable.appendChild(row);
        });
    }
    
    // Initialize inventory filters
    initializeInventoryFilters();
}

function loadOrders() {
    const ordersList = document.getElementById('pharmacy-orders');
    
    // In a real app, this would fetch orders from the API
    // For demo purposes, we'll use mock data
    const orders = [
        {
            id: 1,
            customerName: 'Ahmed Benali',
            medications: [
                { name: 'Paracetamol', quantity: 2 },
                { name: 'Vitamin C', quantity: 1 }
            ],
            status: 'pending',
            date: '2024-02-14T09:30:00'
        }
    ];
    
    if (ordersList) {
        ordersList.innerHTML = '';
        
        orders.forEach(order => {
            const orderCard = document.createElement('div');
            orderCard.classList.add('order-card');
            orderCard.innerHTML = `
                <div class="order-header">
                    <div class="order-info">
                        <h4>Order #${order.id}</h4>
                        <span class="order-date">${formatDate(order.date)}</span>
                    </div>
                    <span class="order-status ${order.status}">${formatOrderStatus(order.status)}</span>
                </div>
                <div class="order-customer">
                    <i class="fas fa-user"></i>
                    <span>${order.customerName}</span>
                </div>
                <div class="order-medications">
                    ${order.medications.map(med => `
                        <div class="order-medication">
                            <span class="medication-name">${med.name}</span>
                            <span class="medication-quantity">x${med.quantity}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="order-actions">
                    <button class="btn btn-primary btn-sm" onclick="processOrder(${order.id})">
                        Process Order
                    </button>
                    <button class="btn btn-outline btn-sm" onclick="viewOrderDetails(${order.id})">
                        View Details
                    </button>
                </div>
            `;
            
            ordersList.appendChild(orderCard);
        });
    }
}

function loadStatistics() {
    // In a real app, this would fetch statistics from the API
    // For demo purposes, we'll use mock data
    const statistics = {
        totalMedications: 245,
        lowStockItems: 12,
        monthlyVisitors: 1500,
        averageRating: 4.5
    };
    
    // Update statistics cards
    document.getElementById('total-medications').textContent = statistics.totalMedications;
    document.getElementById('low-stock-count').textContent = statistics.lowStockItems;
    document.getElementById('monthly-visitors').textContent = statistics.monthlyVisitors;
    document.getElementById('average-rating').textContent = statistics.averageRating.toFixed(1);
    
    // In a real app, we would also initialize charts here
}

function initializeInventoryFilters() {
    const searchInput = document.getElementById('inventory-search');
    const categoryFilter = document.getElementById('inventory-category-filter');
    const stockFilter = document.getElementById('inventory-stock-filter');
    
    // Add event listeners
    [searchInput, categoryFilter, stockFilter].forEach(filter => {
        if (filter) {
            filter.addEventListener('change', filterInventory);
            if (filter.type === 'text') {
                filter.addEventListener('keyup', filterInventory);
            }
        }
    });
}

// Form Handlers
function handleProfileUpdate(form) {
    const formData = new FormData(form);
    
    // In a real app, this would be an API call
    // For demo purposes, we'll just show a success message
    showNotification('Pharmacy profile updated successfully', 'success');
}

function handleSettingsUpdate(form) {
    const formData = new FormData(form);
    
    // In a real app, this would be an API call
    // For demo purposes, we'll just show a success message
    showNotification('Settings saved successfully', 'success');
}

function handleAddMedication(form) {
    const formData = new FormData(form);
    
    // In a real app, this would be an API call
    // For demo purposes, we'll just show a success message and close the modal
    showNotification('Medication added successfully', 'success');
    document.getElementById('add-medication-modal').classList.remove('active');
    form.reset();
    
    // Reload inventory
    loadInventory();
}

// Action Handlers
function editInventoryItem(itemId) {
    // In a real app, this would open a modal with the item details
    showNotification('Edit functionality coming soon', 'info');
}

function deleteInventoryItem(itemId) {
    if (confirm('Are you sure you want to delete this item?')) {
        // In a real app, this would be an API call
        // For demo purposes, we'll just remove the row and show a success message
        const row = document.querySelector(`tr [onclick="deleteInventoryItem(${itemId})"]`).closest('tr');
        row.remove();
        showNotification('Item deleted successfully', 'success');
    }
}

function processOrder(orderId) {
    // In a real app, this would open a modal for order processing
    showNotification('Order processing functionality coming soon', 'info');
}

function viewOrderDetails(orderId) {
    // In a real app, this would open a modal with order details
    showNotification('Order details functionality coming soon', 'info');
}

// Helper Functions
function formatStockStatus(status) {
    const statusMap = {
        'in-stock': 'In Stock',
        'low-stock': 'Low Stock',
        'out-of-stock': 'Out of Stock'
    };
    return statusMap[status] || status;
}

function formatOrder

Status(status) {
    const statusMap = {
        'pending': 'Pending',
        'processing': 'Processing',
        'completed': 'Completed',
        'cancelled': 'Cancelled'
    };
    return statusMap[status] || status;
}

function filterInventory() {
    // In a real app, this would make an API call with the filter parameters
    showNotification('Filtering functionality coming soon', 'info');
}

function handleLogout() {
    // In a real app, this would also invalidate the session/token
    localStorage.removeItem('pharmafind_user');
    window.location.href = 'login.html';
}