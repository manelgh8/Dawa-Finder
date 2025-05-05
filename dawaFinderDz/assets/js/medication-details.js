document.addEventListener('DOMContentLoaded', function() {
    // Get medication ID from URL
    const urlParams = getUrlParams();
    const medicationId = urlParams.id;
    
    if (!medicationId) {
        // Redirect to medications page if no ID is provided
        window.location.href = 'medications.html';
        return;
    }
    
    // Load medication details
    loadMedicationDetails(medicationId);
    
    // Initialize tabs
    initializeDetailTabs();
    
    // Initialize image gallery
    initializeImageGallery();
    
    // Initialize review form
    initializeReviewForm();
    
    // Initialize action buttons (add to favorites, share)
    initializeActionButtons();
});

function loadMedicationDetails(medicationId) {
    // In a real app, this would fetch the medication details from an API
    // For demo purposes, we'll use mock data
    const medication = getMockMedicationById(parseInt(medicationId));
    
    if (!medication) {
        // Medication not found, redirect to medications page
        window.location.href = 'medications.html';
        return;
    }
    
    // Update page title
    document.title = `${medication.name} - PharmaFind-Dz`;
    
    // Update breadcrumbs and header
    updatePageHeader(medication);
    
    // Update medication details
    updateMedicationDetails(medication);
    
    // Load similar medications
    loadSimilarMedications(medication);
    
    // Load available pharmacies
    loadAvailablePharmacies(medication);
    
    // Load reviews
    loadMedicationReviews(medication);
}

function updatePageHeader(medication) {
    // Update page title
    const medicationName = document.getElementById('medication-name');
    if (medicationName) {
        medicationName.textContent = medication.name;
    }
    
    // Update breadcrumb
    const breadcrumbMedName = document.getElementById('breadcrumb-med-name');
    if (breadcrumbMedName) {
        breadcrumbMedName.textContent = medication.name;
    }
}

function updateMedicationDetails(medication) {
    // Update main details
    const detailMedName = document.getElementById('detail-medication-name');
    const medicationLab = document.getElementById('medication-lab');
    const medicationCategory = document.getElementById('medication-category');
    const medicationPrescription = document.getElementById('medication-prescription');
    const medicationImage = document.getElementById('medication-main-image');
    
    if (detailMedName) {
        detailMedName.textContent = medication.name;
    }
    
    if (medicationLab) {
        medicationLab.textContent = medication.laboratory;
    }
    
    if (medicationCategory) {
        medicationCategory.textContent = medication.category;
    }
    
    if (medicationPrescription) {
        medicationPrescription.textContent = medication.prescription 
            ? 'Prescription Required' 
            : 'No Prescription Required';
        
        medicationPrescription.classList.toggle('no-prescription', !medication.prescription);
    }
    
    if (medicationImage) {
        medicationImage.src = medication.image;
        medicationImage.alt = medication.name;
    }
    
    // Update thumbnails
    updateMedicationThumbnails(medication);
    
    // Update availability status
    const availabilityStatus = document.getElementById('availability-status');
    if (availabilityStatus) {
        if (medication.inStock) {
            availabilityStatus.innerHTML = `
                <span class="availability-in-stock">Available in <strong>${medication.availablePharmacies || 5}</strong> pharmacies near you</span>
            `;
        } else {
            availabilityStatus.innerHTML = `
                <span class="availability-out-of-stock">Currently unavailable in pharmacies near you</span>
            `;
        }
    }
    
    // Update price
    const medicationPrice = document.getElementById('medication-price');
    if (medicationPrice) {
        medicationPrice.textContent = formatCurrency(medication.price);
        
        // Add price range if applicable
        if (medication.priceMax && medication.priceMax > medication.price) {
            medicationPrice.textContent += ` - ${formatCurrency(medication.priceMax)}`;
        }
    }
    
    // Update description tab
    const medicationDescription = document.getElementById('medication-description');
    if (medicationDescription) {
        medicationDescription.textContent = medication.description || 
            `${medication.name} is used to treat various conditions. It is manufactured by ${medication.laboratory} and is widely available in pharmacies across Algeria.`;
    }
    
    // Update usage tab
    const medicationUsage = document.getElementById('medication-usage');
    if (medicationUsage) {
        medicationUsage.textContent = medication.usage || 
            `The typical dosage for ${medication.name} depends on the patient's age, weight, and medical condition. Please consult your doctor or pharmacist for proper dosage instructions.`;
    }
    
    // Update side effects tab
    const medicationSideEffects = document.getElementById('medication-side-effects');
    const sideEffectsList = document.getElementById('side-effects-list');
    
    if (medicationSideEffects) {
        medicationSideEffects.textContent = `Like all medications, ${medication.name} may cause side effects, although not everybody gets them. If you experience any of the following side effects, stop taking the medication and seek medical attention immediately:`;
        
        if (sideEffectsList) {
            // Add common side effects
            const sideEffects = medication.sideEffects || [
                'Nausea or vomiting',
                'Headache',
                'Dizziness',
                'Allergic reactions (rash, itching)',
                'Digestive issues'
            ];
            
            sideEffectsList.innerHTML = '';
            
            sideEffects.forEach(effect => {
                const sideEffectItem = document.createElement('div');
                sideEffectItem.classList.add('side-effect-item');
                sideEffectItem.innerHTML = `
                    <i class="fas fa-exclamation-circle"></i>
                    <span>${effect}</span>
                `;
                
                sideEffectsList.appendChild(sideEffectItem);
            });
        }
    }
}

function updateMedicationThumbnails(medication) {
    const thumbnailsContainer = document.getElementById('medication-thumbnails');
    
    if (!thumbnailsContainer) return;
    
    // Clear existing thumbnails
    thumbnailsContainer.innerHTML = '';
    
    // In a real app, we would have multiple images for the medication
    // For demo purposes, we'll create thumbnails with the same image
    const thumbnailCount = 4;
    
    for (let i = 0; i < thumbnailCount; i++) {
        const thumbnail = document.createElement('div');
        thumbnail.classList.add('medication-thumbnail');
        
        if (i === 0) {
            thumbnail.classList.add('active');
        }
        
        thumbnail.innerHTML = `<img src="${medication.image}" alt="${medication.name} view ${i + 1}">`;
        
        thumbnailsContainer.appendChild(thumbnail);
    }
}

function loadSimilarMedications(medication) {
    const similarMedsGrid = document.getElementById('similar-medications-grid');
    
    if (!similarMedsGrid) return;
    
    // In a real app, this would fetch similar medications based on category or other factors
    // For demo purposes, we'll use mock data
    const allMedications = getMockMedications();
    
    // Filter to get medications in the same category, excluding the current one
    const similarMedications = allMedications
        .filter(med => med.category === medication.category && med.id !== medication.id)
        .slice(0, 4);
    
    // Clear loading skeletons
    similarMedsGrid.innerHTML = '';
    
    // Add medication cards
    similarMedications.forEach(med => {
        const medicationCard = document.createElement('div');
        medicationCard.classList.add('medication-card');
        medicationCard.innerHTML = `
            <div class="medication-image">
                <img src="${med.image}" alt="${med.name}">
            </div>
            <div class="medication-info">
                <h3 class="medication-name">${med.name}</h3>
                <div class="medication-lab">By ${med.laboratory}</div>
                <div class="medication-meta">
                    <div class="medication-price">${formatCurrency(med.price)}</div>
                    <div class="medication-status ${med.inStock ? '' : 'out-of-stock'}">
                        ${med.inStock ? 'In Stock' : 'Out of Stock'}
                    </div>
                </div>
            </div>
        `;
        
        // Add click event to view medication details
        medicationCard.addEventListener('click', function() {
            window.location.href = `medication-details.html?id=${med.id}`;
        });
        
        similarMedsGrid.appendChild(medicationCard);
    });
    
    // If no similar medications found
    if (similarMedications.length === 0) {
        similarMedsGrid.innerHTML = `
            <div class="no-results">
                <p>No similar medications found.</p>
            </div>
        `;
    }
}

function loadAvailablePharmacies(medication) {
    const pharmaciesList = document.getElementById('pharmacies-list');
    
    if (!pharmaciesList) return;
    
    // In a real app, this would fetch pharmacies that have this medication in stock
    // For demo purposes, we'll use mock data
    const pharmacies = getMockPharmacies();
    
    // Filter pharmacies with this medication in stock
    const availablePharmacies = medication.inStock 
        ? pharmacies.slice(0, 3) // Just use the first 3 pharmacies
        : [];
    
    // Clear loading skeletons
    pharmaciesList.innerHTML = '';
    
    // Add pharmacy cards
    availablePharmacies.forEach(pharmacy => {
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
    
    // If no pharmacies have this medication in stock
    if (availablePharmacies.length === 0) {
        pharmaciesList.innerHTML = `
            <div class="no-results">
                <p>No pharmacies with this medication in stock found near you.</p>
                <button id="notify-availability" class="btn btn-primary">Notify Me When Available</button>
            </div>
        `;
        
        const notifyButton = document.getElementById('notify-availability');
        if (notifyButton) {
            notifyButton.addEventListener('click', function() {
                // In a real app, this would register for notifications
                const isLoggedIn = localStorage.getItem('pharmafind_user');
                
                if (isLoggedIn) {
                    showNotification('You will be notified when this medication becomes available.', 'success');
                } else {
                    // Show login prompt
                    showNotification('Please login to receive notifications.', 'info');
                    setTimeout(() => {
                        window.location.href = 'login.html?redirect=medication-details.html?id=' + medication.id;
                    }, 2000);
                }
            });
        }
    }
}

function loadMedicationReviews(medication) {
    // Update the reviews tab
    const reviewsList = document.getElementById('reviews-list');
    const noReviewsMessage = document.getElementById('no-reviews-message');
    const reviewLoginPrompt = document.getElementById('review-login-prompt');
    const reviewForm = document.getElementById('review-form');
    
    if (!reviewsList) return;
    
    // In a real app, this would fetch reviews for this medication
    // For demo purposes, we'll use mock data
    const reviews = getMockReviews(medication.id);
    
    // Clear reviews list
    reviewsList.innerHTML = '';
    
    // Update average rating
    updateAverageRating(reviews);
    
    // Show "no reviews" message if there are no reviews
    if (noReviewsMessage) {
        noReviewsMessage.style.display = reviews.length === 0 ? 'block' : 'none';
    }
    
    // Add review cards
    reviews.forEach(review => {
        const reviewCard = document.createElement('div');
        reviewCard.classList.add('review-card');
        reviewCard.innerHTML = `
            <div class="review-header">
                <div class="review-author">
                    <img src="${review.authorImage}" alt="${review.authorName}">
                    <div class="review-author-info">
                        <h4>${review.authorName}</h4>
                        <p>${formatDate(review.date)}</p>
                    </div>
                </div>
                <div class="review-rating">
                    ${getStarRating(review.rating)}
                </div>
            </div>
            <h4 class="review-title">${review.title}</h4>
            <p class="review-content">${review.content}</p>
        `;
        
        reviewsList.appendChild(reviewCard);
    });
    
    // Show login prompt or review form based on login status
    const isLoggedIn = localStorage.getItem('pharmafind_user');
    
    if (reviewLoginPrompt && reviewForm) {
        reviewLoginPrompt.style.display = isLoggedIn ? 'none' : 'block';
        reviewForm.style.display = isLoggedIn ? 'block' : 'none';
    }
}

function updateAverageRating(reviews) {
    const averageRating = document.getElementById('average-rating');
    const totalReviews = document.getElementById('total-reviews');
    const averageStars = document.getElementById('average-rating-stars');
    
    if (!reviews.length) {
        // No reviews
        if (averageRating) averageRating.textContent = '0';
        if (totalReviews) totalReviews.textContent = '(0 reviews)';
        return;
    }
    
    // Calculate average rating
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    const avg = sum / reviews.length;
    
    // Update average rating text
    if (averageRating) {
        averageRating.textContent = avg.toFixed(1);
    }
    
    // Update total reviews
    if (totalReviews) {
        totalReviews.textContent = `(${reviews.length} ${reviews.length === 1 ? 'review' : 'reviews'})`;
    }
    
    // Update rating stars
    if (averageStars) {
        averageStars.innerHTML = getStarRating(avg);
    }
    
    // Update rating bars
    updateRatingBars(reviews);
}

function updateRatingBars(reviews) {
    // Count ratings for each star level
    const ratingCounts = {
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0
    };
    
    reviews.forEach(review => {
        ratingCounts[review.rating]++;
    });
    
    // Update each rating bar
    for (let i = 5; i >= 1; i--) {
        const barContainer = document.querySelector(`.rating-bar:nth-child(${6-i}) .bar`);
        const countElement = document.querySelector(`.rating-bar:nth-child(${6-i}) .rating-count`);
        
        if (barContainer) {
            const percentage = reviews.length > 0 ? (ratingCounts[i] / reviews.length) * 100 : 0;
            barContainer.style.width = `${percentage}%`;
        }
        
        if (countElement) {
            countElement.textContent = ratingCounts[i];
        }
    }
}

function getStarRating(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    // Add half star if needed
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Add empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

function initializeDetailTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabButtons.forEach(tab => tab.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and its content
            this.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
}

function initializeImageGallery() {
    // Initialize thumbnail clicks to change main image
    const thumbnailsContainer = document.getElementById('medication-thumbnails');
    
    if (!thumbnailsContainer) return;
    
    // Add click event listener to the container (event delegation)
    thumbnailsContainer.addEventListener('click', function(event) {
        const thumbnail = event.target.closest('.medication-thumbnail');
        
        if (!thumbnail) return;
        
        // Update active thumbnail
        thumbnailsContainer.querySelectorAll('.medication-thumbnail').forEach(thumb => {
            thumb.classList.remove('active');
        });
        
        thumbnail.classList.add('active');
        
        // Update main image
        const mainImage = document.getElementById('medication-main-image');
        if (mainImage) {
            mainImage.src = thumbnail.querySelector('img').src;
        }
    });
}

function initializeReviewForm() {
    const reviewForm = document.getElementById('review-form');
    
    if (!reviewForm) return;
    
    // Initialize star rating
    const ratingStars = reviewForm.querySelectorAll('.rating-stars-input i');
    let selectedRating = 0;
    
    ratingStars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            selectedRating = rating;
            
            // Update star display
            ratingStars.forEach((s, i) => {
                if (i < rating) {
                    s.className = 'fas fa-star active';
                } else {
                    s.className = 'far fa-star';
                }
            });
        });
        
        star.addEventListener('mouseenter', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            
            // Temporarily update star display on hover
            ratingStars.forEach((s, i) => {
                if (i < rating) {
                    s.className = 'fas fa-star active';
                } else {
                    s.className = 'far fa-star';
                }
            });
        });
        
        star.addEventListener('mouseleave', function() {
            // Restore selected rating when mouse leaves
            ratingStars.forEach((s, i) => {
                if (i < selectedRating) {
                    s.className = 'fas fa-star active';
                } else {
                    s.className = 'far fa-star';
                }
            });
        });
    });
    
    // Handle form submission
    reviewForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const title = this.querySelector('#review-title').value;
        const content = this.querySelector('#review-content').value;
        
        // Validate form
        if (!selectedRating) {
            showNotification('Please select a rating.', 'error');
            return;
        }
        
        if (!title) {
            showNotification('Please enter a title for your review.', 'error');
            return;
        }
        
        if (!content) {
            showNotification('Please enter your review.', 'error');
            return;
        }
        
        // In a real app, this would submit the review to an API
        // For demo purposes, we'll show a success message and reset the form
        showNotification('Your review has been submitted successfully!', 'success');
        
        // Reset form
        this.reset();
        ratingStars.forEach(s => {
            s.className = 'far fa-star';
        });
        selectedRating = 0;
        
        // Refresh reviews (in a real app, we would add the new review to the list)
        // For demo purposes, we'll reload the page after a delay
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    });
}

function initializeActionButtons() {
    const addToFavoritesBtn = document.getElementById('add-to-favorites');
    const shareMedicationBtn = document.getElementById('share-medication');
    
    if (addToFavoritesBtn) {
        addToFavoritesBtn.addEventListener('click', function() {
            const isLoggedIn = localStorage.getItem('pharmafind_user');
            
            if (isLoggedIn) {
                // Toggle favorite status
                const isFavorite = this.classList.contains('favorited');
                
                if (isFavorite) {
                    // Remove from favorites
                    this.classList.remove('favorited');
                    this.innerHTML = '<i class="far fa-heart"></i> Add to Favorites';
                    showNotification('Removed from favorites.', 'success');
                } else {
                    // Add to favorites
                    this.classList.add('favorited');
                    this.innerHTML = '<i class="fas fa-heart"></i> Remove from Favorites';
                    showNotification('Added to favorites!', 'success');
                }
            } else {
                // Show login prompt
                showNotification('Please login to add favorites.', 'info');
                setTimeout(() => {
                    window.location.href = 'login.html?redirect=' + window.location.href;
                }, 2000);
            }
        });
    }
    
    if (shareMedicationBtn) {
        shareMedicationBtn.addEventListener('click', function() {
            // In a real app, this would open a sharing dialog
            // For demo purposes, we'll show a notification
            
            // Check if Web Share API is available
            if (navigator.share) {
                navigator.share({
                    title: document.title,
                    url: window.location.href
                })
                .then(() => console.log('Shared successfully'))
                .catch(error => console.log('Error sharing:', error));
            } else {
                // Fallback: Copy link to clipboard
                const tempInput = document.createElement('input');
                tempInput.value = window.location.href;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                
                showNotification('Link copied to clipboard!', 'success');
            }
        });
    }
}

function getMockMedicationById(id) {
    const medications = getMockMedications();
    return medications.find(med => med.id === id);
}

function getMockMedications() {
    return [
        {
            id: 1,
            name: 'Paracetamol',
            image: 'assets/images/med-paracetamol.jpg',
            laboratory: 'Saidal',
            category: 'Pain Relief',
            price: 120,
            inStock: true,
            prescription: false,
            description: 'Paracetamol (acetaminophen) is a pain reliever and fever reducer. It is used to treat many conditions such as headache, muscle aches, arthritis, backache, toothaches, colds, and fevers.',
            usage: 'For adults and children 12 years and over: Take 1 to 2 tablets every 4 to 6 hours as needed. Do not take more than 8 tablets in 24 hours. For children under 12 years: Consult a doctor.',
            sideEffects: [
                'Nausea and vomiting',
                'Loss of appetite',
                'Stomach pain',
                'Unusual tiredness or weakness',
                'Yellowing of the skin or eyes (sign of liver problems)'
            ],
            availablePharmacies: 12
        },
        {
            id: 2,
            name: 'Amoxicillin',
            image: 'assets/images/med-amoxicillin.jpg',
            laboratory: 'Biopharm',
            category: 'Antibiotics',
            price: 450,
            inStock: true,
            prescription: true,
            description: 'Amoxicillin is a penicillin antibiotic that fights bacteria. It is used to treat many different types of infection caused by bacteria, such as tonsillitis, bronchitis, pneumonia, and infections of the ear, nose, throat, skin, or urinary tract.',
            usage: 'Take exactly as prescribed by your doctor. Follow all directions on your prescription label. Do not take in larger or smaller amounts or for longer than recommended.',
            sideEffects: [
                'Diarrhea, nausea, vomiting',
                'Stomach pain',
                'Skin rash or itching',
                'Allergic reactions (difficulty breathing, swelling)',
                'Vaginal discharge or irritation'
            ],
            availablePharmacies: 8
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

function getMockPharmacies() {
    return [
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
}

function getMockReviews(medicationId) {
    // Only return reviews for the first two medications in our mock data
    if (medicationId === 1) {
        return [
            {
                id: 1,
                medicationId: 1,
                authorName: 'Amina Benali',
                authorImage: 'assets/images/user-1.jpg',
                date: '2023-05-15',
                rating: 5,
                title: 'Very effective pain relief',
                content: 'I use this for headaches and it works quickly. No side effects for me. Highly recommended!'
            },
            {
                id: 2,
                medicationId: 1,
                authorName: 'Karim Hadj',
                authorImage: 'assets/images/user-2.jpg',
                date: '2023-04-22',
                rating: 4,
                title: 'Good for fever',
                content: 'Helped reduce my fever quickly. The only reason I\'m giving 4 stars instead of 5 is because it took a bit longer to work for my muscle pain.'
            },
            {
                id: 3,
                medicationId: 1,
                authorName: 'Salima Mansouri',
                authorImage: 'assets/images/user-3.jpg',
                date: '2023-03-10',
                rating: 5,
                title: 'Always in my medicine cabinet',
                content: 'A must-have medication for any household. Works well for various aches and pains. I always keep it in stock.'
            }
        ];
    } else if (medicationId === 2) {
        return [
            {
                id: 4,
                medicationId: 2,
                authorName: 'Mohammed Belhadi',
                authorImage: 'assets/images/user-4.jpg',
                date: '2023-06-05',
                rating: 5,
                title: 'Effective antibiotic',
                content: 'Prescribed for a sinus infection. Started working within 24 hours and cleared the infection completely by the end of the course.'
            },
            {
                id: 5,
                medicationId: 2,
                authorName: 'Fatima Zidane',
                authorImage: 'assets/images/user-5.jpg',
                date: '2023-05-20',
                rating: 3,
                title: 'Works but has side effects',
                content: 'It cured my infection but I experienced some digestive issues while taking it. Make sure to take with food and maybe add a probiotic.'
            }
        ];
    }
    
    // For other medications, return empty array (no reviews yet)
    return [];
}