// Search functionality
export function initSearch() {
  // Get search elements
  const heroSearchInput = document.querySelector('#hero-search-input');
  const heroSearchBtn = document.querySelector('#hero-search-btn');
  const findMedsBtn = document.querySelector('#find-meds-btn');
  const findPharmacyBtn = document.querySelector('#find-pharmacy-btn');
  
  // Handle hero search
  if (heroSearchInput && heroSearchBtn) {
    heroSearchBtn.addEventListener('click', () => {
      performSearch(heroSearchInput.value);
    });
    
    heroSearchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        performSearch(heroSearchInput.value);
      }
    });
  }
  
  // Handle medication search button
  if (findMedsBtn) {
    findMedsBtn.addEventListener('click', () => {
      if (heroSearchInput) {
        heroSearchInput.focus();
        heroSearchInput.setAttribute('placeholder', 'Search for medications...');
      } else {
        // Navigate to medications page
        simulateNavigation('medications.html');
      }
    });
  }
  
  // Handle pharmacy search button
  if (findPharmacyBtn) {
    findPharmacyBtn.addEventListener('click', () => {
      if (heroSearchInput) {
        heroSearchInput.focus();
        heroSearchInput.setAttribute('placeholder', 'Search for pharmacies...');
      } else {
        // Navigate to pharmacies page
        simulateNavigation('pharmacies.html');
      }
    });
  }
  
  // Handle medication filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active filter
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Filter medications
      const filter = btn.getAttribute('data-filter');
      filterMedications(filter);
    });
  });
}

// Function to perform search
function performSearch(query) {
  if (!query || query.trim() === '') {
    const event = new CustomEvent('showNotification', {
      detail: {
        type: 'warning',
        title: 'Search Error',
        message: 'Please enter a search term.'
      }
    });
    document.dispatchEvent(event);
    return;
  }
  
  console.log(`Searching for: ${query}`);
  
  // In a real app, this would query a database
  // For this demo, we'll simulate search results
  
  // Determine if searching for medications or pharmacies
  const searchType = determineSearchType(query);
  
  if (searchType === 'medication') {
    simulateSearchResults(query, medicationsMockData);
  } else {
    simulateSearchResults(query, pharmaciesMockData);
  }
}

// Function to determine search type
function determineSearchType(query) {
  // Simple heuristic - in a real app, this would be more sophisticated
  const medicationKeywords = ['pill', 'medicine', 'drug', 'tablet', 'capsule', 'syrup', 'antibiotic'];
  const pharmacyKeywords = ['pharmacy', 'drugstore', 'chemist', 'store', 'shop'];
  
  query = query.toLowerCase();
  
  for (const keyword of medicationKeywords) {
    if (query.includes(keyword)) {
      return 'medication';
    }
  }
  
  for (const keyword of pharmacyKeywords) {
    if (query.includes(keyword)) {
      return 'pharmacy';
    }
  }
  
  // Default to medication search
  return 'medication';
}

// Function to simulate search results
function simulateSearchResults(query, mockData) {
  // Filter mock data based on query
  const results = mockData.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase()) ||
    (item.description && item.description.toLowerCase().includes(query.toLowerCase()))
  );
  
  console.log(`Found ${results.length} results for "${query}"`);
  
  // In a real app, this would update the UI with results
  // For this demo, we'll show a notification
  
  if (results.length > 0) {
    const resultType = mockData === medicationsMockData ? 'medication' : 'pharmacy';
    const event = new CustomEvent('showNotification', {
      detail: {
        type: 'success',
        title: 'Search Results',
        message: `Found ${results.length} ${resultType}${results.length === 1 ? '' : 's'} for "${query}".`
      }
    });
    document.dispatchEvent(event);
    
    // Update medications grid or pharmacy list
    if (resultType === 'medication') {
      updateMedicationsGrid(results);
    } else {
      updatePharmacyList(results);
    }
    
    // Scroll to relevant section
    const targetSection = document.getElementById(resultType === 'medication' ? 'medications' : 'pharmacies');
    if (targetSection) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = targetSection.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  } else {
    const event = new CustomEvent('showNotification', {
      detail: {
        type: 'warning',
        title: 'No Results',
        message: `No results found for "${query}". Please try a different search term.`
      }
    });
    document.dispatchEvent(event);
  }
}

// Function to filter medications
function filterMedications(filter) {
  console.log(`Filtering medications by: ${filter}`);
  
  // In a real app, this would query a database
  // For this demo, we'll use mock data
  
  let filteredMedications;
  
  if (filter === 'all') {
    filteredMedications = medicationsMockData;
  } else {
    filteredMedications = medicationsMockData.filter(med => med.category === filter);
  }
  
  updateMedicationsGrid(filteredMedications);
}

// Function to update medications grid
function updateMedicationsGrid(medications) {
  const medicationsGrid = document.getElementById('medications-grid');
  if (!medicationsGrid) return;
  
  medicationsGrid.innerHTML = '';
  
  if (medications.length === 0) {
    medicationsGrid.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search"></i>
        <p>No medications found.</p>
      </div>
    `;
    return;
  }
  
  medications.forEach((medication, index) => {
    const medicationCard = document.createElement('div');
    medicationCard.className = 'medication-card staggered-item';
    medicationCard.style.animationDelay = `${index * 0.1}s`;
    
    medicationCard.innerHTML = `
      <div class="medication-image">
        <img src="${medication.image}" alt="${medication.name}">
        ${medication.prescription ? '<span class="prescription-badge">Rx</span>' : ''}
      </div>
      <div class="medication-content">
        <h3 class="medication-name">${medication.name}</h3>
        <p class="medication-manufacturer">${medication.manufacturer}</p>
        <div class="medication-details">
          <span class="medication-category">${medication.category}</span>
          <span class="medication-price">${medication.price} DZD</span>
        </div>
        <div class="medication-actions">
          <button class="btn tertiary-btn btn-sm">
            <i class="fas fa-info-circle"></i> Details
          </button>
          <button class="btn primary-btn btn-sm">
            <i class="fas fa-map-marker-alt"></i> Find
          </button>
        </div>
      </div>
    `;
    
    medicationsGrid.appendChild(medicationCard);
    
    // Add class after a small delay to trigger animation
    setTimeout(() => {
      medicationCard.classList.add('animated');
    }, 50);
    
    // Add click event to medication card
    medicationCard.addEventListener('click', () => {
      console.log(`Medication clicked: ${medication.name}`);
      // In a real app, this would open a medication details page
    });
  });
  
  // Add CSS for medication cards if not already present
  if (!document.querySelector('#medication-card-styles')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'medication-card-styles';
    styleElement.textContent = `
      .medication-card {
        background-color: var(--color-white);
        border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow-md);
        overflow: hidden;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      
      .medication-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-lg);
      }
      
      .medication-image {
        position: relative;
        height: 160px;
        overflow: hidden;
      }
      
      .medication-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .prescription-badge {
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 4px 8px;
        background-color: var(--color-error);
        color: var(--color-white);
        font-size: var(--font-size-sm);
        font-weight: 600;
        border-radius: var(--border-radius-sm);
      }
      
      .medication-content {
        padding: var(--spacing-4);
      }
      
      .medication-name {
        font-size: var(--font-size-lg);
        margin-bottom: var(--spacing-2);
      }
      
      .medication-manufacturer {
        color: var(--color-gray-600);
        font-size: var(--font-size-sm);
        margin-bottom: var(--spacing-3);
      }
      
      .medication-details {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: var(--spacing-3);
      }
      
      .medication-category {
        background-color: var(--color-gray-200);
        color: var(--color-gray-700);
        padding: 2px 8px;
        border-radius: var(--border-radius-pill);
        font-size: var(--font-size-sm);
      }
      
      .medication-price {
        font-weight: 600;
        color: var(--color-primary);
      }
      
      .medication-actions {
        display: flex;
        gap: var(--spacing-2);
      }
      
      .btn-sm {
        padding: var(--spacing-2) var(--spacing-3);
        font-size: var(--font-size-sm);
      }
      
      .no-results {
        grid-column: 1 / -1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: var(--spacing-8);
        color: var(--color-gray-500);
        text-align: center;
      }
      
      .no-results i {
        font-size: var(--font-size-4xl);
        margin-bottom: var(--spacing-4);
      }
    `;
    document.head.appendChild(styleElement);
  }
}

// Function to update pharmacy list
function updatePharmacyList(pharmacies) {
  const pharmacyList = document.getElementById('pharmacy-list');
  if (!pharmacyList) return;
  
  pharmacyList.innerHTML = '';
  
  if (pharmacies.length === 0) {
    pharmacyList.innerHTML = `
      <div class="no-results">
        <i class="fas fa-store-slash"></i>
        <p>No pharmacies found.</p>
      </div>
    `;
    return;
  }
  
  pharmacies.forEach((pharmacy, index) => {
    const pharmacyCard = document.createElement('div');
    pharmacyCard.className = 'pharmacy-card staggered-item';
    pharmacyCard.style.animationDelay = `${index * 0.1}s`;
    
    pharmacyCard.innerHTML = `
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
          <button class="btn tertiary-btn btn-sm">
            <i class="fas fa-directions"></i> Directions
          </button>
          <button class="btn primary-btn btn-sm">
            <i class="fas fa-external-link-alt"></i> View
          </button>
        </div>
      </div>
    `;
    
    pharmacyList.appendChild(pharmacyCard);
    
    // Add class after a small delay to trigger animation
    setTimeout(() => {
      pharmacyCard.classList.add('animated');
    }, 50);
    
    // Add click event to pharmacy card
    pharmacyCard.addEventListener('click', () => {
      console.log(`Pharmacy clicked: ${pharmacy.name}`);
      // In a real app, this would open a pharmacy details page
    });
  });
  
  // Add CSS for pharmacy cards if not already present
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
        padding: 2px 8px;
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
}

// Function to simulate navigation
function simulateNavigation(url) {
  console.log(`Navigating to: ${url}`);
  
  // In a real app, this would change the window location
  // For this demo, we'll show a notification
  
  const event = new CustomEvent('showNotification', {
    detail: {
      type: 'info',
      title: 'Navigation',
      message: `Navigating to ${url}`
    }
  });
  document.dispatchEvent(event);
}

// Mock data for medications
const medicationsMockData = [
  {
    id: 1,
    name: 'Paracetamol 500mg',
    manufacturer: 'Biopharm',
    category: 'otc',
    price: 120,
    prescription: false,
    image: 'https://images.pexels.com/photos/159211/headache-pain-pills-medication-159211.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Pain reliever and fever reducer'
  },
  {
    id: 2,
    name: 'Amoxicillin 500mg',
    manufacturer: 'Saidal',
    category: 'antibiotics',
    price: 280,
    prescription: true,
    image: 'https://images.pexels.com/photos/139398/himalayas-tibet-plateau-china-medicine-139398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Antibiotic used to treat bacterial infections'
  },
  {
    id: 3,
    name: 'Aspirin 100mg',
    manufacturer: 'Pharmal',
    category: 'otc',
    price: 150,
    prescription: false,
    image: 'https://images.pexels.com/photos/2820144/pexels-photo-2820144.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Blood thinner that prevents clot formation'
  },
  {
    id: 4,
    name: 'Metformin 850mg',
    manufacturer: 'Inpha-Médis',
    category: 'chronic',
    price: 320,
    prescription: true,
    image: 'https://images.pexels.com/photos/208512/pexels-photo-208512.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Oral diabetes medicine that helps control blood sugar levels'
  },
  {
    id: 5,
    name: 'Omeprazole 20mg',
    manufacturer: 'Pharmalliance',
    category: 'prescription',
    price: 240,
    prescription: true,
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Reduces stomach acid production'
  },
  {
    id: 6,
    name: 'Ciprofloxacin 500mg',
    manufacturer: 'Biopharm',
    category: 'antibiotics',
    price: 350,
    prescription: true,
    image: 'https://images.pexels.com/photos/3683098/pexels-photo-3683098.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Antibiotic to treat various bacterial infections'
  }
];

// Mock data for pharmacies
const pharmaciesMockData = [
  {
    id: 1,
    name: 'Central Pharmacy',
    address: '15 Rue Didouche Mourad, Algiers',
    phone: '+213 21 XX XX XX',
    distance: 0.8,
    isOpen: true,
    coordinates: { lat: 36.77, lng: 3.05 }
  },
  {
    id: 2,
    name: 'El Djazair Pharmacy',
    address: '42 Boulevard Mohamed V, Algiers',
    phone: '+213 21 XX XX XX',
    distance: 1.5,
    isOpen: true,
    coordinates: { lat: 36.76, lng: 3.06 }
  },
  {
    id: 3,
    name: 'Méditerranée Pharmacy',
    address: '78 Rue Ahmed Zabana, Oran',
    phone: '+213 41 XX XX XX',
    distance: 2.3,
    isOpen: false,
    coordinates: { lat: 35.70, lng: -0.64 }
  },
  {
    id: 4,
    name: 'Al Amal Pharmacy',
    address: '25 Rue des Frères Bouadou, Constantine',
    phone: '+213 31 XX XX XX',
    distance: 3.7,
    isOpen: true,
    coordinates: { lat: 36.35, lng: 6.61 }
  }
];