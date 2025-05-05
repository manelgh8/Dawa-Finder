// Medications functionality
export function initMedications() {
  // Initialize medications grid with data
  loadMedications();
}

// Function to load medications data
function loadMedications() {
  const medicationsGrid = document.getElementById('medications-grid');
  if (!medicationsGrid) return;
  
  // In a real app, this would fetch data from an API
  // For this demo, we'll use mock data
  
  // Clear existing content
  medicationsGrid.innerHTML = '';
  
  // Add loading spinner
  const loadingSpinner = document.createElement('div');
  loadingSpinner.className = 'loading-spinner';
  medicationsGrid.appendChild(loadingSpinner);
  
  // Simulate API call delay
  setTimeout(() => {
    // Remove loading spinner
    loadingSpinner.remove();
    
    // Create medication cards
    mockMedications.forEach((medication, index) => {
      const medicationCard = createMedicationCard(medication, index);
      medicationsGrid.appendChild(medicationCard);
      
      // Add class after a small delay to trigger animation
      setTimeout(() => {
        medicationCard.classList.add('animated');
      }, 50 * index);
    });
  }, 1000);
}

// Function to create a medication card
function createMedicationCard(medication, index) {
  const card = document.createElement('div');
  card.className = 'medication-card staggered-item';
  
  card.innerHTML = `
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
        <button class="btn tertiary-btn btn-sm medication-details-btn" data-id="${medication.id}">
          <i class="fas fa-info-circle"></i> Details
        </button>
        <button class="btn primary-btn btn-sm find-medication-btn" data-id="${medication.id}">
          <i class="fas fa-map-marker-alt"></i> Find
        </button>
      </div>
    </div>
  `;
  
  // Add event listeners
  const detailsBtn = card.querySelector('.medication-details-btn');
  const findBtn = card.querySelector('.find-medication-btn');
  
  if (detailsBtn) {
    detailsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showMedicationDetails(medication);
    });
  }
  
  if (findBtn) {
    findBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      findMedication(medication);
    });
  }
  
  // Add click event to entire card
  card.addEventListener('click', () => {
    showMedicationDetails(medication);
  });
  
  return card;
}

// Function to show medication details
function showMedicationDetails(medication) {
  console.log(`Showing details for medication: ${medication.name}`);
  
  // In a real app, this would open a detailed view or modal
  // For this demo, we'll create a modal on the fly
  
  // Create modal HTML
  const modalHTML = `
    <div class="modal-container" id="medication-details-modal">
      <div class="modal medication-modal">
        <div class="modal-header">
          <h2>${medication.name}</h2>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="medication-modal-content">
            <div class="medication-modal-image">
              <img src="${medication.image}" alt="${medication.name}">
              ${medication.prescription ? '<span class="prescription-badge">Prescription Required</span>' : '<span class="otc-badge">Over-the-Counter</span>'}
            </div>
            <div class="medication-modal-info">
              <div class="info-group">
                <h3>General Information</h3>
                <p><strong>Manufacturer:</strong> ${medication.manufacturer}</p>
                <p><strong>Category:</strong> ${medication.category}</p>
                <p><strong>Price:</strong> ${medication.price} DZD</p>
              </div>
              
              <div class="info-group">
                <h3>Description</h3>
                <p>${medication.description}</p>
              </div>
              
              <div class="info-group">
                <h3>Usage</h3>
                <p>${medication.usage || 'Take as directed by your healthcare provider.'}</p>
              </div>
              
              <div class="info-group">
                <h3>Side Effects</h3>
                <ul class="side-effects-list">
                  ${(medication.sideEffects || ['Common side effects may occur', 'Consult a doctor if symptoms persist']).map(effect => `<li>${effect}</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>
          
          <div class="medication-modal-actions">
            <button class="btn secondary-btn find-medication-btn" data-id="${medication.id}">
              <i class="fas fa-map-marker-alt"></i> Find Nearby Pharmacies
            </button>
            <button class="btn tertiary-btn add-favorite-btn" data-id="${medication.id}">
              <i class="far fa-heart"></i> Add to Favorites
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
  const modal = document.getElementById('medication-details-modal');
  const closeBtn = modal.querySelector('.modal-close');
  const findBtn = modal.querySelector('.find-medication-btn');
  const favoriteBtn = modal.querySelector('.add-favorite-btn');
  
  // Add modal styles if not already present
  if (!document.querySelector('#medication-modal-styles')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'medication-modal-styles';
    styleElement.textContent = `
      .medication-modal {
        max-width: 800px;
      }
      
      .medication-modal-content {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-6);
      }
      
      @media (min-width: 768px) {
        .medication-modal-content {
          flex-direction: row;
        }
      }
      
      .medication-modal-image {
        position: relative;
        flex: 0 0 40%;
      }
      
      .medication-modal-image img {
        width: 100%;
        border-radius: var(--border-radius-md);
      }
      
      .prescription-badge, .otc-badge {
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 4px 8px;
        color: var(--color-white);
        font-size: var(--font-size-sm);
        font-weight: 600;
        border-radius: var(--border-radius-sm);
      }
      
      .prescription-badge {
        background-color: var(--color-error);
      }
      
      .otc-badge {
        background-color: var(--color-success);
      }
      
      .medication-modal-info {
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
      }
      
      .side-effects-list {
        list-style-type: disc;
        margin-left: var(--spacing-4);
      }
      
      .medication-modal-actions {
        display: flex;
        gap: var(--spacing-4);
        margin-top: var(--spacing-6);
      }
      
      @media (max-width: 768px) {
        .medication-modal-actions {
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
  
  // Find this medication
  if (findBtn) {
    findBtn.addEventListener('click', () => {
      modal.classList.remove('show');
      setTimeout(() => {
        modal.remove();
        findMedication(medication);
      }, 300);
    });
  }
  
  // Add to favorites
  if (favoriteBtn) {
    favoriteBtn.addEventListener('click', () => {
      addToFavorites(medication);
      
      // Update button
      favoriteBtn.innerHTML = '<i class="fas fa-heart"></i> Added to Favorites';
      favoriteBtn.disabled = true;
    });
  }
}

// Function to find medication in pharmacies
function findMedication(medication) {
  console.log(`Finding pharmacies with medication: ${medication.name}`);
  
  // In a real app, this would search for pharmacies with this medication
  // For this demo, we'll scroll to the pharmacies section
  
  const pharmaciesSection = document.getElementById('pharmacies');
  if (pharmaciesSection) {
    const headerHeight = document.querySelector('.header').offsetHeight;
    const targetPosition = pharmaciesSection.offsetTop - headerHeight;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
    
    // Update pharmacy search input if it exists
    const locationInput = document.getElementById('location-input');
    if (locationInput) {
      locationInput.setAttribute('placeholder', `Find "${medication.name}" nearby...`);
      locationInput.focus();
    }
    
    // Show notification
    const event = new CustomEvent('showNotification', {
      detail: {
        type: 'info',
        title: 'Find Medication',
        message: `Searching for pharmacies with ${medication.name}...`
      }
    });
    document.dispatchEvent(event);
  }
}

// Function to add medication to favorites
function addToFavorites(medication) {
  console.log(`Adding medication to favorites: ${medication.name}`);
  
  // In a real app, this would add to a user's favorites in a database
  // For this demo, we'll store in localStorage
  
  let favorites = JSON.parse(localStorage.getItem('pharmafind-favorites') || '[]');
  
  // Check if already in favorites
  if (!favorites.some(fav => fav.id === medication.id)) {
    favorites.push(medication);
    localStorage.setItem('pharmafind-favorites', JSON.stringify(favorites));
    
    // Show notification
    const event = new CustomEvent('showNotification', {
      detail: {
        type: 'success',
        title: 'Added to Favorites',
        message: `${medication.name} has been added to your favorites.`
      }
    });
    document.dispatchEvent(event);
  } else {
    // Show notification
    const event = new CustomEvent('showNotification', {
      detail: {
        type: 'info',
        title: 'Already in Favorites',
        message: `${medication.name} is already in your favorites.`
      }
    });
    document.dispatchEvent(event);
  }
}

// Mock medications data
const mockMedications = [
  {
    id: 1,
    name: 'Paracetamol 500mg',
    manufacturer: 'Biopharm',
    category: 'Pain Relief',
    price: 120,
    prescription: false,
    image: './images/pharmacy-online-paracetamol-soluble-paracetamol-500mg-100-effervescent-soluble-tablets-1603455187paracetamol-soluble-500mg-effervescent.jpg',
    description: 'Paracetamol is a pain reliever and fever reducer used to treat many conditions such as headache, muscle aches, arthritis, backache, toothaches, colds, and fevers.',
    usage: 'The usual dose is one or two 500mg tablets up to 4 times in 24 hours. Allow at least 4 hours between doses.',
    sideEffects: [
      'Nausea',
      'Stomach pain',
      'Loss of appetite',
      'Headache',
      'Dizziness'
    ]
  },
  {
    id: 2,
    name: 'Amoxicillin 500mg',
    manufacturer: 'Saidal',
    category: 'Antibiotics',
    price: 280,
    prescription: true,
    image: './images/icon.jpg',
    description: 'Amoxicillin is a penicillin antibiotic that fights bacteria. It is used to treat many different types of infection caused by bacteria, such as tonsillitis, bronchitis, pneumonia, and infections of the ear, nose, throat, skin, or urinary tract.',
    usage: 'The usual dose for adults is 250mg to 500mg three times a day or as directed by your doctor.',
    sideEffects: [
      'Diarrhea',
      'Stomach pain',
      'Nausea or vomiting',
      'Rash',
      'Allergic reactions'
    ]
  },
  {
    id: 3,
    name: 'Aspirin 100mg',
    manufacturer: 'Pharmal',
    category: 'Blood Thinners',
    price: 150,
    prescription: false,
    image: 'https://images.pexels.com/photos/2820144/pexels-photo-2820144.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Aspirin is a salicylate that reduces substances in the body that cause pain, fever, and inflammation. It is used to treat pain, fever, or inflammation and reduces the risk of heart attack and stroke.',
    usage: 'For prevention of heart attack and stroke, the usual dose is 75mg to 100mg once daily.',
    sideEffects: [
      'Stomach irritation',
      'Heartburn',
      'Mild nausea or vomiting',
      'Increased risk of bleeding',
      'Ringing in ears'
    ]
  },
  {
    id: 4,
    name: 'Metformin 850mg',
    manufacturer: 'Inpha-Médis',
    category: 'Diabetes',
    price: 320,
    prescription: true,
    image: 'https://images.pexels.com/photos/208512/pexels-photo-208512.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Metformin is an oral diabetes medicine that helps control blood sugar levels. It is used together with diet and exercise to improve blood sugar control in adults with type 2 diabetes.',
    usage: 'The usual starting dose is 500mg or 850mg twice daily with meals. Your doctor may increase your dose gradually.',
    sideEffects: [
      'Nausea',
      'Vomiting',
      'Stomach pain',
      'Diarrhea',
      'Loss of appetite'
    ]
  },
  {
    id: 5,
    name: 'Omeprazole 20mg',
    manufacturer: 'Pharmalliance',
    category: 'Gastrointestinal',
    price: 240,
    prescription: true,
    image: './images/494858354_2744283059112786_8420870901609068888_n.jpg',
    description: 'Omeprazole reduces the amount of acid in your stomach. It is used to treat symptoms of gastroesophageal reflux disease (GERD) and other conditions caused by excess stomach acid.',
    usage: 'The usual dose is 20mg once daily for 4-8 weeks. Take before eating, preferably in the morning.',
    sideEffects: [
      'Headache',
      'Stomach pain',
      'Nausea',
      'Diarrhea',
      'Vomiting'
    ]
  },
  {
    id: 6,
    name: 'Ciprofloxacin 500mg',
    manufacturer: 'Biopharm',
    category: 'Antibiotics',
    price: 350,
    prescription: true,
    image: './images/00022313_ciprofloxacin_500mg_brawn_10x10_9228_60a8_large_bac0f3e12d.jpg',
    description: 'Ciprofloxacin is a fluoroquinolone antibiotic that fights bacteria in the body. It is used to treat different types of bacterial infections, including skin infections, bone and joint infections, respiratory or urinary tract infections, and certain types of diarrhea.',
    usage: 'The usual adult dose is 250-750mg every 12 hours depending on the infection being treated.',
    sideEffects: [
      'Nausea',
      'Diarrhea',
      'Headache',
      'Dizziness',
      'Rash'
    ]
  }
];