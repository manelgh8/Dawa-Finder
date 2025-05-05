document.addEventListener('DOMContentLoaded', function() {
    // Initialize the medications search page
    initializeMedicationsPage();
});

function initializeMedicationsPage() {
    // Load and apply URL parameters (for handling search queries and filters)
    applyUrlParameters();
    
    // Load medications data
    loadMedications();
    
    // Initialize search and filters
    initializeSearchAndFilters();
    
    // Initialize pagination
    initializePagination();
    
    // Initialize the modal for quick view
    initializeMedicationModal();
}

function applyUrlParameters() {
    const params = getUrlParams();
    
    // Apply search query if provided
    if (params.q) {
        const searchInput = document.getElementById('medication-search');
        if (searchInput) {
            searchInput.value = params.q;
        }
    }
    
    // Apply category filter if provided
    if (params.category) {
        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            const option = Array.from(categoryFilter.options).find(opt => 
                opt.value === params.category || 
                opt.textContent.toLowerCase() === params.category.toLowerCase().replace('-', ' ')
            );
            
            if (option) {
                categoryFilter.value = option.value;
            }
        }
    }
    
    // Apply laboratory filter if provided
    if (params.laboratory) {
        const laboratoryFilter = document.getElementById('laboratory-filter');
        // This would be populated by the loadLaboratories function
    }
    
    // Apply prescription filter if provided
    if (params.prescription) {
        const prescriptionFilter = document.getElementById('prescription-filter');
        if (prescriptionFilter) {
            prescriptionFilter.value = params.prescription;
        }
    }
    
    // Apply availability filter if provided
    if (params.availability) {
        const availabilityFilter = document.getElementById('availability-filter');
        if (availabilityFilter) {
            availabilityFilter.value = params.availability;
        }
    }
}

function loadMedications() {
    const medicationsGrid = document.getElementById('medications-grid');
    const resultsCount = document.getElementById('results-count');
    
    // In a real app, this would be an API call to fetch medications based on search and filters
    // For demo purposes, we'll use mock data
    const medications = getMockMedications();
    
    // Clear loading skeletons
    medicationsGrid.innerHTML = '';
    
    // Update results count
    if (resultsCount) {
        resultsCount.textContent = medications.length;
    }
    
    // Add medication cards
    medications.forEach(medication => {
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
    
    // If no results, show a message
    if (medications.length === 0) {
        medicationsGrid.innerHTML = `
            <div class="no-results">
                <p>No medications found matching your criteria.</p>
                <button id="clear-all-filters" class="btn btn-primary">Clear All Filters</button>
            </div>
        `;
        
        const clearAllButton = document.getElementById('clear-all-filters');
        if (clearAllButton) {
            clearAllButton.addEventListener('click', function() {
                window.location.href = 'medications.html';
            });
        }
    }
}

function initializeSearchAndFilters() {
    // Initialize search
    const searchInput = document.getElementById('medication-search');
    const searchButton = searchInput?.nextElementSibling;
    
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            applyFilters();
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                applyFilters();
            }
        });
    }
    
    // Initialize filters
    const filters = document.querySelectorAll('.filter-group select');
    filters.forEach(filter => {
        filter.addEventListener('change', function() {
            applyFilters();
        });
    });
    
    // Initialize clear filters button
    const clearFiltersButton = document.getElementById('clear-filters');
    if (clearFiltersButton) {
        clearFiltersButton.addEventListener('click', function() {
            // Reset all filters
            filters.forEach(filter => {
                filter.value = '';
            });
            
            if (searchInput) {
                searchInput.value = '';
            }
            
            // Apply (which now will show all medications)
            applyFilters();
        });
    }
    
    // Initialize sort selection
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            applyFilters();
        });
    }
    
    // Load available laboratories for the filter
    loadLaboratories();
}

function loadLaboratories() {
    const laboratoryFilter = document.getElementById('laboratory-filter');
    
    if (!laboratoryFilter) return;
    
    // In a real app, this would be an API call to fetch all laboratories
    // For demo purposes, we'll use mock data
    const laboratories = [
        { id: 1, name: 'Saidal' },
        { id: 2, name: 'Biopharm' },
        { id: 3, name: 'Hikma' },
        { id: 4, name: 'Lab Pharma' },
        { id: 5, name: 'El Kendi' }
    ];
    
    // Add options for each laboratory
    laboratories.forEach(lab => {
        const option = document.createElement('option');
        option.value = lab.id;
        option.textContent = lab.name;
        laboratoryFilter.appendChild(option);
    });
    
    // Apply the laboratory filter from URL if provided
    const params = getUrlParams();
    if (params.laboratory) {
        const option = Array.from(laboratoryFilter.options).find(opt => 
            opt.value === params.laboratory || 
            opt.textContent.toLowerCase() === params.laboratory.toLowerCase()
        );
        
        if (option) {
            laboratoryFilter.value = option.value;
        }
    }
}

function applyFilters() {
    // Build the query string based on filters
    const searchInput = document.getElementById('medication-search');
    const categoryFilter = document.getElementById('category-filter');
    const laboratoryFilter = document.getElementById('laboratory-filter');
    const prescriptionFilter = document.getElementById('prescription-filter');
    const availabilityFilter = document.getElementById('availability-filter');
    const sortSelect = document.getElementById('sort-select');
    
    let queryParams = [];
    
    if (searchInput && searchInput.value.trim()) {
        queryParams.push(`q=${encodeURIComponent(searchInput.value.trim())}`);
    }
    
    if (categoryFilter && categoryFilter.value) {
        queryParams.push(`category=${encodeURIComponent(categoryFilter.value)}`);
    }
    
    if (laboratoryFilter && laboratoryFilter.value) {
        queryParams.push(`laboratory=${encodeURIComponent(laboratoryFilter.value)}`);
    }
    
    if (prescriptionFilter && prescriptionFilter.value) {
        queryParams.push(`prescription=${encodeURIComponent(prescriptionFilter.value)}`);
    }
    
    if (availabilityFilter && availabilityFilter.value) {
        queryParams.push(`availability=${encodeURIComponent(availabilityFilter.value)}`);
    }
    
    if (sortSelect && sortSelect.value) {
        queryParams.push(`sort=${encodeURIComponent(sortSelect.value)}`);
    }
    
    // Reload the page with new filters
    // In a real app, this might use history.pushState instead to avoid full page reloads
    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
    window.location.href = `medications.html${queryString}`;
}

function initializePagination() {
    const pagination = document.getElementById('medications-pagination');
    
    if (!pagination) return;
    
    const prevButton = pagination.querySelector('.pagination-prev');
    const nextButton = pagination.querySelector('.pagination-next');
    const pageButtons = pagination.querySelectorAll('.pagination-numbers button');
    
    // In a real app, the current page would come from the URL or API response
    // For demo purposes, we'll just use the first page
    const currentPage = 1;
    
    // Update button states
    prevButton.classList.toggle('disabled', currentPage === 1);
    
    pageButtons.forEach(button => {
        const pageNum = parseInt(button.textContent);
        button.classList.toggle('active', pageNum === currentPage);
        
        button.addEventListener('click', function() {
            // In a real app, this would navigate to the specific page
            // For demo purposes, we'll just reload the current page
            window.scrollTo(0, 0);
        });
    });
    
    prevButton.addEventListener('click', function() {
        if (currentPage > 1) {
            // In a real app, this would navigate to the previous page
            // For demo purposes, we'll just reload the current page
            window.scrollTo(0, 0);
        }
    });
    
    nextButton.addEventListener('click', function() {
        // In a real app, this would navigate to the next page
        // For demo purposes, we'll just reload the current page
        window.scrollTo(0, 0);
    });
}

function initializeMedicationModal() {
    const modal = document.getElementById('medication-modal');
    const closeBtn = modal?.querySelector('.modal-close');
    
    if (!modal || !closeBtn) return;
    
    // Close modal when clicking the close button
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close modal when clicking outside the content
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

function getMockMedications() {
    // In a real app, this data would come from an API
    return [
        {
            id: 1,
            name: 'Paracetamol',
            image: 'assets/images/med-paracetamol.jpg',
            laboratory: 'Saidal',
            category: 'Pain Relief',
            price: 120,
            inStock: true,
            prescription: false
        },
        {
            id: 2,
            name: 'Amoxicillin',
            image: 'assets/images/med-amoxicillin.jpg',
            laboratory: 'Biopharm',
            category: 'Antibiotics',
            price: 450,
            inStock: true,
            prescription: true
        },
        {
            id: 3,
            name: 'Omeprazole',
            image: 'assets/images/med-omeprazole.jpg',
            laboratory: 'Hikma',
            category: 'Gastrointestinal',
            price: 320,
            inStock: false,
            prescription: true
        },
        {
            id: 4,
            name: 'Vitamin D3',
            image: 'assets/images/med-vitamind.jpg',
            laboratory: 'Lab Pharma',
            category: 'Vitamins',
            price: 250,
            inStock: true,
            prescription: false
        },
        {
            id: 5,
            name: 'Aspirin',
            image: 'assets/images/med-aspirin.jpg',
            laboratory: 'Saidal',
            category: 'Pain Relief',
            price: 100,
            inStock: true,
            prescription: false
        },
        {
            id: 6,
            name: 'Metformin',
            image: 'assets/images/med-metformin.jpg',
            laboratory: 'El Kendi',
            category: 'Diabetes',
            price: 380,
            inStock: true,
            prescription: true
        },
        {
            id: 7,
            name: 'Atorvastatin',
            image: 'assets/images/med-atorvastatin.jpg',
            laboratory: 'Hikma',
            category: 'Cardiovascular',
            price: 520,
            inStock: true,
            prescription: true
        },
        {
            id: 8,
            name: 'Ventolin Inhaler',
            image: 'assets/images/med-ventolin.jpg',
            laboratory: 'Biopharm',
            category: 'Respiratory',
            price: 850,
            inStock: false,
            prescription: true
        }
    ];
}