// Charity platform functionality
export function initCharity() {
  // Get charity buttons
  const donateBtn = document.querySelector('.charity-card.donate .btn');
  const requestBtn = document.querySelector('.charity-card.request .btn');
  
  // Handle donate button click
  if (donateBtn) {
    donateBtn.addEventListener('click', () => {
      showDonateForm();
    });
  }
  
  // Handle request button click
  if (requestBtn) {
    requestBtn.addEventListener('click', () => {
      showDonations();
    });
  }
}

// Function to show donation form
function showDonateForm() {
  console.log('Showing donation form');
  
  // In a real app, this would open a form or redirect to a donation page
  // For this demo, we'll open a modal with a form
  
  // Create modal HTML
  const modalHTML = `
    <div class="modal-container" id="donate-modal">
      <div class="modal">
        <div class="modal-header">
          <h2>Donate Medications or Medical Equipment</h2>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <form id="donation-form" class="charity-form">
            <div class="form-group">
              <label for="donation-type">Donation Type</label>
              <select id="donation-type" required>
                <option value="">Select type</option>
                <option value="medication">Medication</option>
                <option value="equipment">Medical Equipment</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="donation-name">Name of Item</label>
              <input type="text" id="donation-name" placeholder="Enter the name of the medication or equipment" required>
            </div>
            
            <div class="form-group">
              <label for="donation-quantity">Quantity</label>
              <input type="number" id="donation-quantity" min="1" placeholder="How many items" required>
            </div>
            
            <div class="form-group">
              <label for="donation-expiry">Expiry Date (if applicable)</label>
              <input type="date" id="donation-expiry">
            </div>
            
            <div class="form-group">
              <label for="donation-condition">Condition</label>
              <select id="donation-condition" required>
                <option value="">Select condition</option>
                <option value="new">New (Unopened)</option>
                <option value="partial">Partially Used</option>
                <option value="used">Used (Good Condition)</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="donation-description">Description</label>
              <textarea id="donation-description" placeholder="Provide details about your donation" rows="3"></textarea>
            </div>
            
            <div class="form-group">
              <label for="donation-images">Images (Optional)</label>
              <div class="file-input-container">
                <input type="file" id="donation-images" accept="image/*" multiple>
                <label for="donation-images" class="file-input-label">
                  <i class="fas fa-cloud-upload-alt"></i>
                  <span>Choose Files</span>
                </label>
                <div id="file-preview" class="file-preview"></div>
              </div>
            </div>
            
            <div class="form-group">
              <label for="donation-location">Pickup Location</label>
              <input type="text" id="donation-location" placeholder="Where can the item be picked up" required>
            </div>
            
            <div class="form-group">
              <label for="donation-contact">Contact Information</label>
              <input type="text" id="donation-contact" placeholder="How you can be reached" required>
            </div>
            
            <div class="form-group terms-checkbox">
              <input type="checkbox" id="donation-terms" required>
              <label for="donation-terms">I confirm that the donated items are not expired, are in good condition, and are safe to use.</label>
            </div>
            
            <button type="submit" class="btn primary-btn btn-block">Submit Donation</button>
          </form>
        </div>
      </div>
    </div>
  `;
  
  // Add modal to document
  const modalElement = document.createElement('div');
  modalElement.innerHTML = modalHTML;
  document.body.appendChild(modalElement.firstElementChild);
  
  // Get modal elements
  const modal = document.getElementById('donate-modal');
  const closeBtn = modal.querySelector('.modal-close');
  const donationForm = document.getElementById('donation-form');
  const fileInput = document.getElementById('donation-images');
  const filePreview = document.getElementById('file-preview');
  
  // Add charity form styles if not already present
  if (!document.querySelector('#charity-form-styles')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'charity-form-styles';
    styleElement.textContent = `
      .charity-form select,
      .charity-form textarea {
        width: 100%;
        padding: var(--spacing-3) var(--spacing-4);
        border: 1px solid var(--color-gray-300);
        border-radius: var(--border-radius-md);
        transition: all 0.3s ease;
      }
      
      .charity-form select:focus,
      .charity-form textarea:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 2px rgba(12, 184, 182, 0.25);
      }
      
      .file-input-container {
        position: relative;
      }
      
      .file-input-container input[type="file"] {
        position: absolute;
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        z-index: -1;
      }
      
      .file-input-label {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-2);
        padding: var(--spacing-3) var(--spacing-4);
        border: 2px dashed var(--color-gray-300);
        border-radius: var(--border-radius-md);
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .file-input-label:hover {
        border-color: var(--color-primary);
        background-color: var(--color-gray-100);
      }
      
      .file-input-label i {
        font-size: var(--font-size-xl);
        color: var(--color-primary);
      }
      
      .file-preview {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-2);
        margin-top: var(--spacing-2);
      }
      
      .file-preview-item {
        position: relative;
        width: 80px;
        height: 80px;
        border-radius: var(--border-radius-sm);
        overflow: hidden;
      }
      
      .file-preview-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .file-preview-remove {
        position: absolute;
        top: 2px;
        right: 2px;
        width: 20px;
        height: 20px;
        background-color: var(--color-error);
        color: var(--color-white);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 12px;
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
  
  // Handle file input change
  if (fileInput && filePreview) {
    fileInput.addEventListener('change', () => {
      handleFileInput(fileInput, filePreview);
    });
  }
  
  // Handle form submission
  if (donationForm) {
    donationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form values
      const type = document.getElementById('donation-type').value;
      const name = document.getElementById('donation-name').value;
      const quantity = document.getElementById('donation-quantity').value;
      
      // In a real app, this would submit to a backend
      console.log('Donation submitted:', { type, name, quantity });
      
      // Close modal
      modal.classList.remove('show');
      setTimeout(() => {
        modal.remove();
        
        // Show success notification
        const event = new CustomEvent('showNotification', {
          detail: {
            type: 'success',
            title: 'Donation Submitted',
            message: 'Thank you for your donation! Your contribution will help those in need.'
          }
        });
        document.dispatchEvent(event);
      }, 300);
    });
  }
}

// Function to handle file input change
function handleFileInput(input, preview) {
  if (!input.files || !preview) return;
  
  // Clear preview
  preview.innerHTML = '';
  
  // Add preview for each file
  for (let i = 0; i < input.files.length; i++) {
    const file = input.files[i];
    
    // Only process images
    if (!file.type.startsWith('image/')) continue;
    
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const previewItem = document.createElement('div');
      previewItem.className = 'file-preview-item';
      
      previewItem.innerHTML = `
        <img src="${e.target.result}" alt="Preview">
        <div class="file-preview-remove" data-index="${i}">&times;</div>
      `;
      
      preview.appendChild(previewItem);
      
      // Add remove button event
      const removeBtn = previewItem.querySelector('.file-preview-remove');
      if (removeBtn) {
        removeBtn.addEventListener('click', () => {
          previewItem.remove();
          // Note: In a real app, this would remove the file from the input
          // This is complex in vanilla JS and usually handled by libraries
        });
      }
    };
    
    reader.readAsDataURL(file);
  }
}

// Function to show available donations
function showDonations() {
  console.log('Showing available donations');
  
  // In a real app, this would fetch and display donations
  // For this demo, we'll open a modal with mock donations
  
  // Create modal HTML
  const modalHTML = `
    <div class="modal-container" id="donations-modal">
      <div class="modal donations-modal">
        <div class="modal-header">
          <h2>Available Donations</h2>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="donations-filter">
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="medication">Medications</button>
            <button class="filter-btn" data-filter="equipment">Medical Equipment</button>
            <button class="filter-btn" data-filter="other">Other</button>
          </div>
          
          <div class="donations-grid">
            ${mockDonations.map(donation => `
              <div class="donation-card" data-type="${donation.type}">
                <div class="donation-image">
                  <img src="${donation.image}" alt="${donation.name}">
                </div>
                <div class="donation-content">
                  <h3 class="donation-name">${donation.name}</h3>
                  <div class="donation-info">
                    <span class="donation-type">${donation.type}</span>
                    <span class="donation-quantity">${donation.quantity} available</span>
                  </div>
                  <p class="donation-description">${donation.description}</p>
                  <div class="donation-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${donation.location}</span>
                  </div>
                  <div class="donation-date">
                    <i class="fas fa-calendar-alt"></i>
                    <span>Posted ${donation.date}</span>
                  </div>
                  <div class="donation-actions">
                    <button class="btn primary-btn btn-sm request-donation-btn" data-id="${donation.id}">
                      Request Item
                    </button>
                    <button class="btn tertiary-btn btn-sm contact-donor-btn" data-id="${donation.id}">
                      Contact Donor
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
          
          <div class="donations-pagination">
            <button class="pagination-btn prev" disabled>
              <i class="fas fa-chevron-left"></i> Previous
            </button>
            <div class="pagination-pages">
              <span class="page-number active">1</span>
              <span class="page-number">2</span>
              <span class="page-number">3</span>
            </div>
            <button class="pagination-btn next">
              Next <i class="fas fa-chevron-right"></i>
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
  const modal = document.getElementById('donations-modal');
  const closeBtn = modal.querySelector('.modal-close');
  const filterBtns = modal.querySelectorAll('.filter-btn');
  const donationCards = modal.querySelectorAll('.donation-card');
  const requestBtns = modal.querySelectorAll('.request-donation-btn');
  const contactBtns = modal.querySelectorAll('.contact-donor-btn');
  
  // Add donations styles if not already present
  if (!document.querySelector('#donations-styles')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'donations-styles';
    styleElement.textContent = `
      .donations-modal {
        max-width: 900px;
      }
      
      .donations-filter {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: var(--spacing-2);
        margin-bottom: var(--spacing-6);
      }
      
      .donations-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: var(--spacing-4);
        margin-bottom: var(--spacing-6);
      }
      
      .donation-card {
        background-color: var(--color-white);
        border-radius: var(--border-radius-lg);
        box-shadow: var(--shadow-md);
        overflow: hidden;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      
      .donation-card:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-lg);
      }
      
      .donation-image {
        height: 160px;
        overflow: hidden;
      }
      
      .donation-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      
      .donation-content {
        padding: var(--spacing-4);
      }
      
      .donation-name {
        font-size: var(--font-size-lg);
        margin-bottom: var(--spacing-2);
      }
      
      .donation-info {
        display: flex;
        justify-content: space-between;
        margin-bottom: var(--spacing-3);
      }
      
      .donation-type {
        background-color: var(--color-primary-light);
        color: var(--color-white);
        padding: 2px 8px;
        border-radius: var(--border-radius-pill);
        font-size: var(--font-size-sm);
      }
      
      .donation-quantity {
        font-size: var(--font-size-sm);
        color: var(--color-gray-600);
      }
      
      .donation-description {
        margin-bottom: var(--spacing-3);
        font-size: var(--font-size-sm);
        color: var(--color-gray-700);
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      
      .donation-location, .donation-date {
        display: flex;
        align-items: center;
        gap: var(--spacing-2);
        margin-bottom: var(--spacing-2);
        font-size: var(--font-size-sm);
        color: var(--color-gray-600);
      }
      
      .donation-location i, .donation-date i {
        color: var(--color-primary);
      }
      
      .donation-actions {
        display: flex;
        gap: var(--spacing-2);
        margin-top: var(--spacing-4);
      }
      
      .donations-pagination {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      
      .pagination-btn {
        display: flex;
        align-items: center;
        gap: var(--spacing-2);
        padding: var(--spacing-2) var(--spacing-4);
        border-radius: var(--border-radius-md);
        background-color: var(--color-gray-100);
        color: var(--color-gray-700);
        transition: all 0.3s ease;
      }
      
      .pagination-btn:hover:not(:disabled) {
        background-color: var(--color-primary-light);
        color: var(--color-white);
      }
      
      .pagination-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      
      .pagination-pages {
        display: flex;
        align-items: center;
        gap: var(--spacing-2);
      }
      
      .page-number {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        font-size: var(--font-size-sm);
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .page-number:hover {
        background-color: var(--color-gray-200);
      }
      
      .page-number.active {
        background-color: var(--color-primary);
        color: var(--color-white);
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
  
  // Filter donations
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active filter
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Filter cards
      const filter = btn.getAttribute('data-filter');
      
      donationCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-type') === filter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  
  // Request donation buttons
  requestBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const donation = mockDonations.find(d => d.id.toString() === id);
      
      if (donation) {
        // In a real app, this would open a request form
        const event = new CustomEvent('showNotification', {
          detail: {
            type: 'info',
            title: 'Request Donation',
            message: `You're requesting ${donation.name}. In a complete app, a request form would appear.`
          }
        });
        document.dispatchEvent(event);
      }
    });
  });
  
  // Contact donor buttons
  contactBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const donation = mockDonations.find(d => d.id.toString() === id);
      
      if (donation) {
        // In a real app, this would open a contact form or messaging interface
        const event = new CustomEvent('showNotification', {
          detail: {
            type: 'info',
            title: 'Contact Donor',
            message: `You're contacting the donor of ${donation.name}. In a complete app, a messaging interface would appear.`
          }
        });
        document.dispatchEvent(event);
      }
    });
  });
}

// Mock donations data
const mockDonations = [
  {
    id: 1,
    name: 'Insulin Pen (Unused)',
    type: 'medication',
    quantity: 3,
    description: 'Unopened insulin pens still in original packaging. Expiration date is in 6 months.',
    location: 'Algiers Center',
    date: '2 days ago',
    image: 'https://images.pexels.com/photos/207603/pexels-photo-207603.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 2,
    name: 'Blood Pressure Monitor',
    type: 'equipment',
    quantity: 1,
    description: 'Slightly used blood pressure monitor in good working condition. Comes with cuff and batteries.',
    location: 'Oran',
    date: '1 week ago',
    image: 'https://images.pexels.com/photos/4226768/pexels-photo-4226768.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 3,
    name: 'Asthma Inhaler (Unopened)',
    type: 'medication',
    quantity: 2,
    description: 'New asthma inhalers still in sealed packaging. Never used and valid for another year.',
    location: 'Constantine',
    date: '3 days ago',
    image: 'https://images.pexels.com/photos/4270377/pexels-photo-4270377.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 4,
    name: 'Crutches (Adult Size)',
    type: 'equipment',
    quantity: 1,
    description: 'Aluminum crutches in excellent condition. Adjustable height suitable for adults.',
    location: 'Algiers West',
    date: '5 days ago',
    image: 'https://images.pexels.com/photos/3952248/pexels-photo-3952248.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 5,
    name: 'Diabetic Test Strips',
    type: 'other',
    quantity: 50,
    description: 'Unopened box of diabetic test strips for glucose monitoring. Compatible with most standard meters.',
    location: 'Blida',
    date: '1 day ago',
    image: 'https://images.pexels.com/photos/7088497/pexels-photo-7088497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 6,
    name: 'Wheelchair (Foldable)',
    type: 'equipment',
    quantity: 1,
    description: 'Foldable wheelchair in good condition. Slight wear on the armrests but fully functional.',
    location: 'Annaba',
    date: '2 weeks ago',
    image: 'https://images.pexels.com/photos/60582/wheelchair-old-age-1-60582.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];