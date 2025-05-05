document.addEventListener('DOMContentLoaded', function() {
    // Load popular medications
    loadPopularMedications();
    
    // Load nearby pharmacies
    loadNearbyPharmacies();
    
    // Initialize search bar functionality
    initializeSearchBar();
    
    // Initialize testimonials slider
    initializeTestimonialsSlider();
});

function loadPopularMedications() {
    const medicationsGrid = document.getElementById('popular-medications-grid');
    
    // In a real app, this would be an API call to fetch popular medications
    // For demo purposes, we'll use mock data
    const popularMedications = [
        {
            id: 1,
            name: 'Paracetamol',
            image: 'assets/images/med-paracetamol.jpg',
            laboratory: 'Saidal',
            category: 'Pain Relief',
            price: 120,
            inStock: true
        },
        {
            id: 2,
            name: 'Amoxicillin',
            image: 'assets/images/med-amoxicillin.jpg',
            laboratory: 'Biopharm',
            category: 'Antibiotics',
            price: 450,
            inStock: true
        },
        {
            id: 3,
            name: 'Omeprazole',
            image: 'assets/images/med-omeprazole.jpg',
            laboratory: 'Hikma',
            category: 'Gastrointestinal',
            price: 320,
            inStock: false
        },
        {
            id: 4,
            name: 'Vitamin D3',
            image: 'assets/images/med-vitamind.jpg',
            laboratory: 'Lab Pharma',
            category: 'Vitamins',
            price: 250,
            inStock: true
        }
    ];
    
    // Clear loading skeletons
    medicationsGrid.innerHTML = '';
    
    // Add medication cards
    popularMedications.forEach(medication => {
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
        `;
        
        // Add click event to view medication details
        medicationCard.addEventListener('click', function() {
            window.location.href = `medication-details.html?id=${medication.id}`;
        });
        
        medicationsGrid.appendChild(medicationCard);
    });
}

function loadNearbyPharmacies() {
    const pharmaciesList = document.getElementById('nearby-pharmacies-list');
    
    // In a real app, this would use the user's location to find nearby pharmacies
    // For demo purposes, we'll use mock data
    const nearbyPharmacies = [
        {
            id: 1,
            name: 'Pharmacie Centrale',
            address: '123 Boulevard Mohamed V, Algiers',
            distance: 850,
            open: true
        },
        {
            id: 2,
            name: 'Pharmacie El Amal',
            address: '45 Rue Didouche Mourad, Algiers',
            distance: 1200,
            open: true
        },
        {
            id: 3,
            name: 'Pharmacie du Port',
            address: '78 Avenue de l\'ALN, Algiers',
            distance: 2500,
            open: false
        }
    ];
    
    // Clear loading skeletons
    pharmaciesList.innerHTML = '';
    
    // Add pharmacy cards
    nearbyPharmacies.forEach(pharmacy => {
        const pharmacyCard = document.createElement('div');
        pharmacyCard.classList.add('pharmacy-card');
        pharmacyCard.innerHTML = `
            <div class="pharmacy-info">
                <h3 class="pharmacy-name">${pharmacy.name}</h3>
                <div class="pharmacy-address">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${pharmacy.address}</span>
                </div>
                <div class="pharmacy-meta">
                    <div class="pharmacy-distance">
                        <i class="fas fa-walking"></i>
                        <span>${getDistanceText(pharmacy.distance)}</span>
                    </div>
                    <div class="pharmacy-hours ${pharmacy.open ? '' : 'closed'}">
                        ${pharmacy.open ? 'Open Now' : 'Closed'}
                    </div>
                </div>
            </div>
        `;
        
        // Add click event to view pharmacy details
        pharmacyCard.addEventListener('click', function() {
            window.location.href = `pharmacy-details.html?id=${pharmacy.id}`;
        });
        
        pharmaciesList.appendChild(pharmacyCard);
    });
    
    // Initialize the map placeholder with a message
    const mapPlaceholder = document.querySelector('.map-placeholder');
    if (mapPlaceholder) {
        mapPlaceholder.innerHTML = '<p>Map loading... In a real app, this would show pharmacy locations on a map.</p>';
    }
}

function initializeSearchBar() {
    const searchBar = document.getElementById('main-search');
    const searchButton = searchBar?.nextElementSibling;
    const searchOptions = document.querySelectorAll('.search-options button');
    
    // Set default search type
    let searchType = 'medication';
    
    // Handle search option selection
    searchOptions.forEach(option => {
        option.addEventListener('click', function() {
            searchOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            searchType = this.getAttribute('data-type');
            
            // Update placeholder text based on search type
            if (searchType === 'medication') {
                searchBar.placeholder = 'Search for medications...';
            } else if (searchType === 'pharmacy') {
                searchBar.placeholder = 'Search for pharmacies...';
            } else if (searchType === 'laboratory') {
                searchBar.placeholder = 'Search for laboratories...';
            }
        });
    });
    
    // Handle search form submission
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const searchQuery = searchBar.value.trim();
            
            if (searchQuery) {
                if (searchType === 'medication') {
                    window.location.href = `medications.html?q=${encodeURIComponent(searchQuery)}`;
                } else if (searchType === 'pharmacy') {
                    window.location.href = `pharmacies.html?q=${encodeURIComponent(searchQuery)}`;
                } else if (searchType === 'laboratory') {
                    window.location.href = `laboratories.html?q=${encodeURIComponent(searchQuery)}`;
                }
            }
        });
    }
    
    // Allow pressing Enter to search
    if (searchBar) {
        searchBar.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                searchButton.click();
            }
        });
    }
}

function initializeTestimonialsSlider() {
    const testimonialsSlider = document.getElementById('testimonials-slider');
    
    // In a real app, this would be an API call to fetch testimonials
    // For demo purposes, we'll use the ones hardcoded in HTML
    
    // If this were a real slider, we would initialize it here
    // For now, we'll just add a simple hover effect
    const testimonialCards = testimonialsSlider.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            testimonialCards.forEach(c => c.style.opacity = '0.7');
            this.style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', function() {
            testimonialCards.forEach(c => c.style.opacity = '1');
        });
    });
}