// Navigation functionality
export function initNavigation() {
  // Get navigation elements
  const header = document.querySelector('.header');
  const menuToggle = document.querySelector('#menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const langToggle = document.querySelector('#lang-toggle');
  const langDropdown = document.querySelector('#lang-dropdown');
  const langOptions = document.querySelectorAll('[data-lang]');
  
  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.padding = '0.5rem 0';
      header.style.boxShadow = 'var(--shadow-lg)';
    } else {
      header.style.padding = '';
      header.style.boxShadow = '';
    }
  });
  
  // Mobile menu toggle
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('mobile-active');
    });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (
      navLinks && 
      navLinks.classList.contains('mobile-active') && 
      !e.target.closest('.navbar')
    ) {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('mobile-active');
    }
  });
  
  // Navigation smooth scroll
  const allNavLinks = document.querySelectorAll('a[href^="#"]');
  allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Skip if not a hash link
      if (href === '#') return;
      
      e.preventDefault();
      
      // Close mobile menu if open
      if (navLinks && navLinks.classList.contains('mobile-active')) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('mobile-active');
      }
      
      // Smooth scroll to section
      const targetSection = document.querySelector(href);
      if (targetSection) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update active nav link
        allNavLinks.forEach(link => link.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });
  
  // Language selector
  if (langToggle && langDropdown) {
    langToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('show');
    });
    
    // Close language dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.language-selector')) {
        langDropdown.classList.remove('show');
      }
    });
    
    // Language selection
    langOptions.forEach(option => {
      option.addEventListener('click', (e) => {
        e.preventDefault();
        
        const lang = option.getAttribute('data-lang');
        const langText = option.textContent.trim();
        
        // Update active language
        langOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        
        // Update button text
        langToggle.querySelector('span').textContent = lang.toUpperCase();
        
        // Update app language (this would be handled by a translation system in a real app)
        setAppLanguage(lang);
        
        // Close dropdown
        langDropdown.classList.remove('show');
      });
    });
  }
  
  // Scroll spy to highlight active section in navigation
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 200; // Offset to trigger earlier
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Update active nav link
        allNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

// Function to simulate language change
function setAppLanguage(lang) {
  console.log(`Changing application language to: ${lang}`);
  // In a real app, this would load language files and update text content
  
  // Simulate language change with a notification
  const event = new CustomEvent('showNotification', {
    detail: {
      type: 'info',
      title: 'Language Changed',
      message: `The application language has been changed to ${getLangName(lang)}.`
    }
  });
  document.dispatchEvent(event);
}

// Helper function to get full language name
function getLangName(code) {
  const languages = {
    'en': 'English',
    'fr': 'French',
    'ar': 'Arabic'
  };
  return languages[code] || code;
}