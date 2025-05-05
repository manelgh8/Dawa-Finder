// Pharmacy functionality
export function initPharmacyMap() {
  // Get map container
  const mapContainer = document.getElementById('pharmacy-map');
  const pharmacyList = document.getElementById('pharmacy-list');
  const locationInput = document.getElementById('location-input');
  const getLocationBtn = document.getElementById('get-location-btn');
  
  if (!mapContainer) return;
  
  // Load map (in a real app, this would use a mapping API like Google Maps or Leaflet)
  loadMap(mapContainer);
  
  // Load pharmacy list
  if (pharmacyList) {
    loadPharmacies(pharmacyList);
  }
  
  // Handle location input
  if (locationInput) {
    locationInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        searchLocation(locationInput.value);
      }
    });
  }
  
  // Handle get current location button
  if (getLocationBtn) {
    getLocationBtn.addEventListener('click', () => {
      getCurrentLocation();
    });
  }
}

// Function to load map (simulation)
function loadMap(container) {
  console.log('Loading pharmacy map');
  
  // In a real app, this would initialize a mapping API
  // For this demo, we'll show a placeholder
  
  // Clear placeholder
  container.innerHTML = '';
  
  // Create a simple map visualization
  const mapDiv = document.createElement('div');
  mapDiv.className = 'map-visual';
  mapDiv.innerHTML = `
    <div class="map-overlay">
      <div class="map-center-pin">
        <i class="fas fa-map-pin"></i>
      </div>
      <div class="map-pharmacy-pins">
        ${mockPharmacies.map((pharmacy, index) => `
          <div class="map-pin" style="top: ${20 + (index * 15)}%; left: ${20 + (index * 15)}%;" data-id="${pharmacy.id}">
            <i class="fas fa-store"></i>
            <span class="pin-label">${pharmacy.name}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  container.appendChild(mapDiv);
  
  // Add map styles if not already present
  if (!document.querySelector('#map-styles')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'map-styles';
    styleElement.textContent = `
      .map-visual {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: var(--color-gray-200);
        background-image: 
          linear-gradient(var(--color-gray-300) 1px, transparent 1px),
          linear-gradient(90deg, var(--color-gray-300) 1px, transparent 1px);
        background-size: 20px 20px;
        overflow: hidden;
        border-radius: var(--border-radius-lg);
      }
      
      .map-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      
      .map-center-pin {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 2rem;
        color: var(--color-error);
        animation: pulse 2s infinite;
      }
      
      .map-pin {
        position: absolute;
        transform: translate(-50%, -50%);
        cursor: pointer;
        z-index: var(--z-10);
      }
      
      .map-pin i {
        font-size: 1.5rem;
        color: var(--color-primary);
        transition: all 0.3s ease;
      }
      
      .map-pin:hover i {
        color: var(--color-primary-dark);
        transform: scale(1.2);
      }
      
      .pin-label {
        position: absolute;
        top: -30px;
        left: 50%;
        transform: translateX(-50%);
        background-color: var(--color-white);
        color: var(--color-secondary);
        padding: 2px 8px;
        border-radius: var(--border-radius-sm);
        font-size: var(--font-size-sm);
        white-space: nowrap;
        opacity: 0;
        transition: opacity 0.3s ease;
        box-shadow: var(--shadow-sm);
      }
      
      .map-pin:hover .pin-label {
        opacity: 1;
      }
    `;
    document.head.appendChild(styleElement);
  }
  
  // Add pin click events
  const pins = container.querySelectorAll('.map-pin');
  pins.forEach(pin => {
    pin.addEventListener('click', () => {
      const id = parseInt(pin.getAttribute('data-id'));
      const pharmacy = mockPharmacies.find(p => p.id === id);
      
      if (pharmacy) {
        showPharmacyDetails(pharmacy);
      }
    });
  });
}

// Function to load pharmacies list
function loadPharmacies(container) {
  console.log('Loading pharmacy list');
  
  // In a real app, this would fetch data from an API
  // For this demo, we'll use mock data
  
  // Clear existing content
  container.innerHTML = '';
  
  // Create pharmacy cards
  mockPharmacies.forEach((pharmacy, index) => {
    const pharmacyCard = createPharmacyCard(pharmacy, index);
    container.appendChild(pharmacyCard);
    
    // Add class after a small delay to trigger animation
    setTimeout(() => {
      pharmacyCard.classList.add('animated');
    }, 50 * index);
  });
}

// Function to create a pharmacy card
function createPharmacyCard(pharmacy, index) {
  const card = document.createElement('div');
  card.className = 'pharmacy-card staggered-item';
  
  card.innerHTML = `
    <div class="pharmacy-header">
      <h3 class="pharmacy-name">${pharmacy.name}</h3>
      <span class="pharmacy-status ${pharmacy.isOpen ? 'open' : 'closed'}">${pharmacy.isOpen ? 'Open Now' : 'Closed'}</span>
    </div>
    <div class="pharmacy-content">
      <div class="pharmacy-info">
        <p class="pharmacy-address">
          <i class="fas fa-map-marker-alt"></i>
          ${pharmacy.address}
        </p>
        <p class="pharmacy-hours">
          <i class="fas fa-clock"></i>
          ${pharmacy.hours}
        </p>
        <p class="pharmacy-phone">
          <i class="fas fa-phone"></i>
          ${pharmacy.phone}
        </p>
        <p class="pharmacy-distance">
          <i class="fas fa-route"></i>
          ${pharmacy.distance} km away
        </p>
      </div>
      <div class="pharmacy-actions">
        <button class="btn tertiary-btn btn-sm get-directions-btn" data-id="${pharmacy.id}">
          <i class="fas fa-directions"></i> Directions
        </button>
        <button class="btn primary-btn btn-sm view-pharmacy-btn" data-id="${pharmacy.id}">
          <i class="fas fa-store"></i> View Details
        </button>
      </div>
    </div>
  `;
  
  // Add card styles if not already present
  if (!document.querySelector('#pharmacy-card-styles')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'pharmacy-card-styles';
    styleElement.textContent = `
      .pharmacy-card {
        background-color: var(--color-white);
        border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow-md);
        overflow: hidden;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        margin-bottom: var(--spacing-4);
      }
      
      .pharmacy-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-lg);
      }
      
      .pharmacy-header {
        padding: var(--spacing-4);
        background-color: var(--color-secondary-light);
        color: var(--color-white);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .pharmacy-name {
        margin-bottom: 0;
        font-size: var(--font-size-lg);
      }
      
      .pharmacy-status {
        padding: 4px 8px;
        border-radius: var(--border-radius-pill);
        font-size: var(--font-size-sm);
        font-weight: 600;
      }
      
      .pharmacy-status.open {
        background-color: var(--color-success);
      }
      
      .pharmacy-status.closed {
        background-color: var(--color-error);
      }
      
      .pharmacy-content {
        padding: var(--spacing-4);
      }
      
      .pharmacy-info {
        margin-bottom: var(--spacing-4);
      }
      
      .pharmacy-info p {
        display: flex;
        align-items: center;
        gap: var(--spacing-2);
        margin-bottom: var(--spacing-2);
        color: var(--color-gray-700);
      }
      
      .pharmacy-info i {
        color: var(--color-primary);
        width: 16px;
      }
      
      .pharmacy-actions {
        display: flex;
        gap: var(--spacing-2);
      }
    `;
    document.head.appendChild(styleElement);
  }
  
  // Add event listeners
  const directionsBtn = card.querySelector('.get-directions-btn');
  const viewBtn = card.querySelector('.view-pharmacy-btn');
  
  if (directionsBtn) {
    directionsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      getDirections(pharmacy);
    });
  }
  
  if (viewBtn) {
    viewBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showPharmacyDetails(pharmacy);
    });
  }
  
  // Add click event to entire card
  card.addEventListener('click', () => {
    showPharmacyDetails(pharmacy);
  });
  
  return card;
}

// Function to search for a location
function searchLocation(location) {
  console.log(`Searching for location: ${location}`);
  
  if (!location || location.trim() === '') {
    const event = new CustomEvent('showNotification', {
      detail: {
        type: 'warning',
        title: 'Location Error',
        message: 'Please enter a location.'
      }
    });
    document.dispatchEvent(event);
    return;
  }
  
  // In a real app, this would use a geocoding API
  // For this demo, we'll show a notification
  
  const event = new CustomEvent('showNotification', {
    detail: {
      type: 'info',
      title: 'Searching',
      message: `Finding pharmacies near "${location}"...`
    }
  });
  document.dispatchEvent(event);
  
  // Simulate API call delay
  setTimeout(() => {
    // Update map
    const mapContainer = document.getElementById('pharmacy-map');
    if (mapContainer) {
      loadMap(mapContainer);
    }
    
    // Update pharmacy list
    const pharmacyList = document.getElementById('pharmacy-list');
    if (pharmacyList) {
      loadPharmacies(pharmacyList);
    }
    
    // Show success notification
    const successEvent = new CustomEvent('showNotification', {
      detail: {
        type: 'success',
        title: 'Pharmacies Found',
        message: `Found ${mockPharmacies.length} pharmacies near "${location}".`
      }
    });
    document.dispatchEvent(successEvent);
  }, 1500);
}

// Function to get current location
function getCurrentLocation() {
  // In a real app, this would use the Geolocation API
  // For this demo, we'll simulate it
  
  const event = new CustomEvent('showNotification', {
    detail: {
      type: 'info',
      title: 'Getting Location',
      message: 'Finding your current location...'
    }
  });
  document.dispatchEvent(event);
  
  // Simulate delay
  setTimeout(() => {
    // Update location input
    const locationInput = document.getElementById('location-input');
    if (locationInput) {
      locationInput.value = 'Algiers City Center';
    }
    
    // Search with this location
    searchLocation('Algiers City Center');
  }, 1500);
}

// Function to show pharmacy details
function showPharmacyDetails(pharmacy) {
  console.log(`Showing details for pharmacy: ${pharmacy.name}`);
  
  // In a real app, this would open a detailed view or modal
  // For this demo, we'll create a modal on the fly
  
  // Create modal HTML
  const modalHTML = `
    <div class="modal-container" id="pharmacy-details-modal">
      <div class="modal pharmacy-modal">
        <div class="modal-header">
          <h2>${pharmacy.name}</h2>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="pharmacy-modal-content">
            <div class="pharmacy-modal-image">
              <img src="${pharmacy.image}" alt="${pharmacy.name}">
              <span class="pharmacy-status ${pharmacy.isOpen ? 'open' : 'closed'}">${pharmacy.isOpen ? 'Open Now' : 'Closed'}</span>
            </div>
            <div class="pharmacy-modal-info">
              <div class="info-group">
                <h3>Contact Information</h3>
                <p><i class="fas fa-map-marker-alt"></i> <strong>Address:</strong> ${pharmacy.address}</p>
                <p><i class="fas fa-phone"></i> <strong>Phone:</strong> ${pharmacy.phone}</p>
                <p><i class="fas fa-clock"></i> <strong>Hours:</strong> ${pharmacy.hours}</p>
                <p><i class="fas fa-route"></i> <strong>Distance:</strong> ${pharmacy.distance} km away</p>
              </div>
              
              ${pharmacy.description ? `
                <div class="info-group">
                  <h3>About</h3>
                  <p>${pharmacy.description}</p>
                </div>
              ` : ''}
              
              <div class="info-group">
                <h3>Available Services</h3>
                <ul class="services-list">
                  ${pharmacy.services.map(service => `<li><i class="fas fa-check-circle"></i> ${service}</li>`).join('')}
                </ul>
              </div>
              
              <div class="info-group">
                <h3>In Stock Medications</h3>
                <div class="stock-list">
                  ${pharmacy.inStock.map(item => `
                    <div class="stock-item">
                      <span>${item.name}</span>
                      <span class="stock-status ${item.quantity > 5 ? 'in-stock' : 'low-stock'}">${item.quantity > 5 ? 'In Stock' : 'Low Stock'}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
          
          <div class="pharmacy-modal-actions">
            <button class="btn secondary-btn get-directions-btn" data-id="${pharmacy.id}">
              <i class="fas fa-directions"></i> Get Directions
            </button>
            <button class="btn tertiary-btn call-pharmacy-btn" data-id="${pharmacy.id}">
              <i class="fas fa-phone"></i> Call Pharmacy
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Add modal to document
  const modalElement = document.createElement('div');
  modalElement.innerHTML = modalHTML;
  document.body.appendChild(modalElement.firstElementChild);
  
  // Get modal elements
  const modal = document.getElementById('pharmacy-details-modal');
  const closeBtn = modal.querySelector('.modal-close');
  const directionsBtn = modal.querySelector('.get-directions-btn');
  const callBtn = modal.querySelector('.call-pharmacy-btn');
  
  // Add modal styles if not already present
  if (!document.querySelector('#pharmacy-modal-styles')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'pharmacy-modal-styles';
    styleElement.textContent = `
      .pharmacy-modal {
        max-width: 800px;
      }
      
      .pharmacy-modal-content {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-6);
      }
      
      @media (min-width: 768px) {
        .pharmacy-modal-content {
          flex-direction: row;
        }
      }
      
      .pharmacy-modal-image {
        position: relative;
        flex: 0 0 40%;
      }
      
      .pharmacy-modal-image img {
        width: 100%;
        border-radius: var(--border-radius-md);
      }
      
      .pharmacy-modal-image .pharmacy-status {
        position: absolute;
        top: 10px;
        right: 10px;
      }
      
      .pharmacy-modal-info {
        flex: 1;
      }
      
      .info-group {
        margin-bottom: var(--spacing-4);
      }
      
      .info-group h3 {
        color: var(--color-secondary);
        font-size: var(--font-size-lg);
        margin-bottom: var(--spacing-2);
      }
      
      .info-group p {
        margin-bottom: var(--spacing-2);
        display: flex;
        align-items: center;
        gap: var(--spacing-2);
      }
      
      .info-group i {
        color: var(--color-primary);
        width: 16px;
      }
      
      .services-list {
        list-style-type: none;
      }
      
      .services-list li {
        margin-bottom: var(--spacing-2);
        display: flex;
        align-items: center;
        gap: var(--spacing-2);
      }
      
      .services-list i {
        color: var(--color-success);
      }
      
      .stock-list {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-2);
      }
      
      .stock-item {
        display: flex;
        justify-content: space-between;
        padding: var(--spacing-2);
        background-color: var(--color-gray-100);
        border-radius: var(--border-radius-sm);
      }
      
      .stock-status {
        font-weight: 600;
        font-size: var(--font-size-sm);
        padding: 2px 8px;
        border-radius: var(--border-radius-pill);
      }
      
      .stock-status.in-stock {
        background-color: var(--color-success);
        color: var(--color-white);
      }
      
      .stock-status.low-stock {
        background-color: var(--color-warning);
        color: var(--color-gray-900);
      }
      
      .pharmacy-modal-actions {
        display: flex;
        gap: var(--spacing-4);
        margin-top: var(--spacing-6);
      }
      
      @media (max-width: 768px) {
        .pharmacy-modal-actions {
          flex-direction: column;
        }
      }
    `;
    document.head.appendChild(styleElement);
  }
  
  // Show modal
  setTimeout(() => {
    modal.classList.add('show');
  }, 50);
  
  // Close modal events
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.remove();
    }, 300);
  });
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
      setTimeout(() => {
        modal.remove();
      }, 300);
    }
  });
  
  // Get directions to this pharmacy
  if (directionsBtn) {
    directionsBtn.addEventListener('click', () => {
      modal.classList.remove('show');
      setTimeout(() => {
        modal.remove();
        getDirections(pharmacy);
      }, 300);
    });
  }
  
  // Call this pharmacy
  if (callBtn) {
    callBtn.addEventListener('click', () => {
      callPharmacy(pharmacy);
    });
  }
}

// Function to get directions to a pharmacy
function getDirections(pharmacy) {
  console.log(`Getting directions to pharmacy: ${pharmacy.name}`);
  
  // In a real app, this would open a map with directions
  // For this demo, we'll show a notification
  
  const event = new CustomEvent('showNotification', {
    detail: {
      type: 'info',
      title: 'Directions',
      message: `Getting directions to ${pharmacy.name} at ${pharmacy.address}.`
    }
  });
  document.dispatchEvent(event);
}

// Function to call a pharmacy
function callPharmacy(pharmacy) {
  console.log(`Calling pharmacy: ${pharmacy.name} at ${pharmacy.phone}`);
  
  // In a real app, this would initiate a call or copy the number
  // For this demo, we'll show a notification
  
  const event = new CustomEvent('showNotification', {
    detail: {
      type: 'info',
      title: 'Call Pharmacy',
      message: `Calling ${pharmacy.name} at ${pharmacy.phone}.`
    }
  });
  document.dispatchEvent(event);
}

// Mock pharmacies data
const mockPharmacies = [
  {
    id: 1,
    name: 'Central Pharmacy',
    address: '15 Rue Didouche Mourad, Algiers',
    phone: '+213 21 XX XX XX',
    hours: 'Mon-Sat: 8AM-10PM, Sun: 9AM-6PM',
    distance: 0.8,
    isOpen: true,
    coordinates: { lat: 36.77, lng: 3.05 },
    image: 'https://images.pexels.com/photos/5699516/pexels-photo-5699516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'A well-established pharmacy serving the community for over 25 years with a wide range of medications and healthcare products.',
    services: [
      '24/7 Emergency Service',
      'Prescription Refills',
      'Health Consultations',
      'Blood Pressure Monitoring',
      'Free Delivery'
    ],
    inStock: [
      { name: 'Paracetamol 500mg', quantity: 120 },
      { name: 'Amoxicillin 500mg', quantity: 85 },
      { name: 'Aspirin 100mg', quantity: 200 },
      { name: 'Metformin 850mg', quantity: 45 },
      { name: 'Omeprazole 20mg', quantity: 3 }
    ]
  },
  {
    id: 2,
    name: 'El Djazair Pharmacy',
    address: '42 Boulevard Mohamed V, Algiers',
    phone: '+213 21 XX XX XX',
    hours: 'Mon-Fri: 8AM-8PM, Sat-Sun: 9AM-5PM',
    distance: 1.5,
    isOpen: true,
    coordinates: { lat: 36.76, lng: 3.06 },
    image: 'https://images.pexels.com/photos/2280551/pexels-photo-2280551.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Modern pharmacy with a focus on customer service and a comprehensive range of medications, supplements, and healthcare products.',
    services: [
      'Prescription Refills',
      'Health Consultations',
      'Diabetes Management',
      'Medication Management',
      'Vaccination Services'
    ],
    inStock: [
      { name: 'Paracetamol 500mg', quantity: 75 },
      { name: 'Amoxicillin 500mg', quantity: 120 },
      { name: 'Aspirin 100mg', quantity: 4 },
      { name: 'Ciprofloxacin 500mg', quantity: 60 },
      { name: 'Omeprazole 20mg', quantity: 25 }
    ]
  },
  {
    id: 3,
    name: 'Méditerranée Pharmacy',
    address: '78 Rue Ahmed Zabana, Oran',
    phone: '+213 41 XX XX XX',
    hours: 'Mon-Sat: 9AM-7PM, Sun: Closed',
    distance: 2.3,
    isOpen: false,
    coordinates: { lat: 35.70, lng: -0.64 },
    image: 'https://images.pexels.com/photos/5699514/pexels-photo-5699514.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Family-owned pharmacy serving the community with personalized care and a wide selection of medications and health products.',
    services: [
      'Prescription Refills',
      'Health Consultations',
      'Home Delivery',
      'Medication Reviews',
      'First Aid Supplies'
    ],
    inStock: [
      { name: 'Paracetamol 500mg', quantity: 50 },
      { name: 'Metformin 850mg', quantity: 3 },
      { name: 'Ciprofloxacin 500mg', quantity: 40 },
      { name: 'Omeprazole 20mg', quantity: 15 },
      { name: 'Aspirin 100mg', quantity: 80 }
    ]
  },
  {
    id: 4,
    name: 'Al Amal Pharmacy',
    address: '25 Rue des Frères Bouadou, Constantine',
    phone: '+213 31 XX XX XX',
    hours: 'Mon-Fri: 8:30AM-9PM, Sat-Sun: 10AM-6PM',
    distance: 3.7,
    isOpen: true,
    coordinates: { lat: 36.35, lng: 6.61 },
    image: 'https://images.pexels.com/photos/5699500/pexels-photo-5699500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'A trusted pharmacy providing a comprehensive range of healthcare services and products to meet the needs of the community.',
    services: [
      'Prescription Refills',
      'Health Screenings',
      'Medication Counseling',
      'Wellness Products',
      'Online Refill Requests'
    ],
    inStock: [
      { name: 'Paracetamol 500mg', quantity: 100 },
      { name: 'Amoxicillin 500mg', quantity: 2 },
      { name: 'Aspirin 100mg', quantity: 150 },
      { name: 'Metformin 850mg', quantity: 30 },
      { name: 'Ciprofloxacin 500mg', quantity: 25 }
    ]
  }
];