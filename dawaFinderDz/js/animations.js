// Animation functionality
export function initScrollAnimations() {
  // Initialize animations for elements with specific classes
  initScrollFadeElements();
  initStaggeredAnimations();
  
  // Run once on page load
  setTimeout(() => {
    animateVisibleElements();
  }, 300);
}

// Function to initialize scroll fade elements
function initScrollFadeElements() {
  // Get all elements with scroll-fade class
  const elements = document.querySelectorAll('.feature-card, .medication-card, .pharmacy-card, .charity-card, .about-content > *');
  
  // Add scroll-fade class to elements
  elements.forEach(element => {
    if (!element.classList.contains('scroll-fade')) {
      element.classList.add('scroll-fade');
    }
  });
  
  // Add scroll event listener
  window.addEventListener('scroll', animateVisibleElements);
}

// Function to initialize staggered animations
function initStaggeredAnimations() {
  // Get all staggered-item elements
  const staggeredItems = document.querySelectorAll('.staggered-item');
  
  // Apply staggered delay to each item
  staggeredItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
  });
}

// Function to animate elements when they become visible
function animateVisibleElements() {
  const elements = document.querySelectorAll('.scroll-fade');
  
  elements.forEach(element => {
    if (isElementInViewport(element) && !element.classList.contains('visible')) {
      element.classList.add('visible');
    }
  });
}

// Function to check if element is in viewport
function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  
  // Consider element in viewport when its top is in the bottom 70% of the screen
  return (rect.top <= windowHeight * 0.7);
}

// Add CSS animations if not already present
if (!document.querySelector('#scroll-animations-styles')) {
  const styleElement = document.createElement('style');
  styleElement.id = 'scroll-animations-styles';
  styleElement.textContent = `
    .scroll-fade {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .scroll-fade.visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(styleElement);
}