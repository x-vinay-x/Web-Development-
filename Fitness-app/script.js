// Handle BMI Calculator link click
document.addEventListener('DOMContentLoaded', () => {
    const bmiCalculatorLink = document.querySelector('a[href="bmi-calculator.html"]');
    if (bmiCalculatorLink) {
        bmiCalculatorLink.addEventListener('click', (e) => {
            e.preventDefault();
            // Add fade-out effect to current page
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s ease';
            
            // Navigate to BMI calculator page after fade-out
            setTimeout(() => {
                window.location.href = 'bmi-calculator.html';
            }, 300);
        });
    }

    // Book A Class button navigation
    const bookClassBtn = document.getElementById('bookClassBtn');
    if (bookClassBtn) {
        bookClassBtn.addEventListener('click', () => {
            window.location.href = 'book-class.html';
        });
    }
});

// Add fade-in effect when page loads
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.3s ease';
});

// DOM Elements
const navbar = document.querySelector('nav');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav__links');
const navLinks = document.querySelectorAll('.nav__links a');
const sections = document.querySelectorAll('section, header');
const scrollToTopBtn = document.getElementById('scrollToTop');
const dropdowns = document.querySelectorAll('.dropdown');

// Mobile Menu Toggle
menuToggle?.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        // Close all dropdowns
        dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
    }
});

// Handle dropdown toggles on mobile
dropdowns.forEach(dropdown => {
    const dropdownLink = dropdown.querySelector('a');
    dropdownLink.addEventListener('click', (e) => {
        if (window.innerWidth < 900) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    });
});

// Handle all navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // If it's an external link (like login.html, signup.html, bmi-calculator.html)
        if (href.includes('.html')) {
            // Add fade-out effect
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s ease';
            
            // Navigate after fade-out
            setTimeout(() => {
                window.location.href = href;
            }, 300);
            return;
        }

        // For internal links (sections)
        e.preventDefault();
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            // Close mobile menu if open
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            // Close all dropdowns
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
            
            // Smooth scroll to section
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Show/hide scroll to top button
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// Scroll to top functionality
scrollToTopBtn?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Active link highlighting using Intersection Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to corresponding link
            const activeLink = document.querySelector(`a[href="#${entry.target.id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}, observerOptions);

// Observe all sections
sections.forEach(section => {
    if (section.id) {
        observer.observe(section);
    }
});

// Fade-in animation for sections
const fadeInElements = document.querySelectorAll('.section__container');

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, {
    threshold: 0.1
});

fadeInElements.forEach(element => {
    fadeInObserver.observe(element);
});

// Theme Switcher
const toggleSwitch = document.querySelector('#checkbox');
const currentTheme = localStorage.getItem('theme');

// Set initial theme
if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);
  if (currentTheme === 'light') {
    toggleSwitch.checked = false;
  } else {
    toggleSwitch.checked = true;
  }
} else {
  // Default to dark theme if no theme is set
  document.documentElement.setAttribute('data-theme', 'dark');
  toggleSwitch.checked = true;
}

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
}

toggleSwitch.addEventListener('change', switchTheme);

// Explore Section Navigation
const exploreGrid = document.querySelector('.explore__grid');
const prevButton = document.querySelector('.explore__nav span:first-child');
const nextButton = document.querySelector('.explore__nav span:last-child');
let currentPosition = 0;
const isMobile = window.innerWidth < 900;
const cardWidth = isMobile ? 280 : 320; // Width of each card
const gap = isMobile ? 24 : 32; // Gap between cards
const totalCards = document.querySelectorAll('.explore__card').length;
const cardsPerView = isMobile ? 1 : 3;
const maxPosition = -(totalCards - cardsPerView) * (cardWidth + gap);

function updateNavigation() {
  // Enable/disable buttons based on position
  prevButton.style.opacity = currentPosition === 0 ? '0.5' : '1';
  nextButton.style.opacity = currentPosition <= maxPosition ? '0.5' : '1';
  
  // Add/remove pointer-events based on position
  prevButton.style.pointerEvents = currentPosition === 0 ? 'none' : 'auto';
  nextButton.style.pointerEvents = currentPosition <= maxPosition ? 'none' : 'auto';
}

function slideCards(direction) {
  const moveAmount = direction === 'next' ? -(cardWidth + gap) : (cardWidth + gap);
  const newPosition = currentPosition + moveAmount;
  
  // Ensure we don't slide too far in either direction
  if (newPosition > 0) {
    currentPosition = 0;
  } else if (newPosition < maxPosition) {
    currentPosition = maxPosition;
  } else {
    currentPosition = newPosition;
  }
  
  exploreGrid.style.transform = `translateX(${currentPosition}px)`;
  updateNavigation();
}

// Add click event listeners
prevButton.addEventListener('click', () => {
  if (currentPosition < 0) {
    slideCards('prev');
  }
});

nextButton.addEventListener('click', () => {
  if (currentPosition > maxPosition) {
    slideCards('next');
  }
});

// Initialize navigation state
updateNavigation();

// Update on window resize
window.addEventListener('resize', () => {
  const newIsMobile = window.innerWidth < 900;
  const newCardWidth = newIsMobile ? 280 : 320;
  const newGap = newIsMobile ? 24 : 32;
  const newCardsPerView = newIsMobile ? 1 : 3;
  
  if (newIsMobile !== isMobile || newCardWidth !== cardWidth || newGap !== gap || newCardsPerView !== cardsPerView) {
    currentPosition = 0;
    exploreGrid.style.transform = 'translateX(0)';
    updateNavigation();
  }
});

// Add touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

exploreGrid.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});

exploreGrid.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0 && currentPosition > maxPosition) {
      // Swipe left
      slideCards('next');
    } else if (diff < 0 && currentPosition < 0) {
      // Swipe right
      slideCards('prev');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
    // Fade-in effect for body
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.3s ease';

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav__links');
    const dropdowns = document.querySelectorAll('.dropdown');
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && menuToggle && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
    });

    // Handle dropdown toggles on mobile
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a');
        if (dropdownLink) {
            dropdownLink.addEventListener('click', (e) => {
                if (window.innerWidth < 900) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    // Navigation links
    const navLinks = document.querySelectorAll('.nav__links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.includes('.html')) {
                // External link: fade out and navigate
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.3s ease';
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
                return;
            }
            // Internal link: smooth scroll
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                if (menuToggle && navMenu) {
                    menuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
                dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Intersection Observer for active link highlighting
    const sections = document.querySelectorAll('section, header');
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.5 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);
    sections.forEach(section => {
        if (section.id) observer.observe(section);
    });

    // Fade-in animation for sections
    const fadeInElements = document.querySelectorAll('.section__container');
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });
    fadeInElements.forEach(element => fadeInObserver.observe(element));

    // Scroll to top button
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        if (scrollToTopBtn) {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        }
    });

    // Theme Switcher
    const toggleSwitch = document.querySelector('#checkbox');
    if (toggleSwitch) {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme) {
            document.documentElement.setAttribute('data-theme', currentTheme);
            toggleSwitch.checked = currentTheme === 'dark';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            toggleSwitch.checked = true;
        }
        toggleSwitch.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Explore Section Navigation (responsive)
    const exploreGrid = document.querySelector('.explore__grid');
    const prevButton = document.querySelector('.explore__nav span:first-child');
    const nextButton = document.querySelector('.explore__nav span:last-child');
    let currentPosition = 0;
    let cardWidth, gap, cardsPerView, maxPosition, totalCards;

    function recalculateExploreVars() {
        const isMobile = window.innerWidth < 900;
        cardWidth = isMobile ? 280 : 320;
        gap = isMobile ? 24 : 32;
        totalCards = document.querySelectorAll('.explore__card').length;
        cardsPerView = isMobile ? 1 : 3;
        maxPosition = -(totalCards - cardsPerView) * (cardWidth + gap);
    }

    function updateNavigation() {
        if (!prevButton || !nextButton) return;
        prevButton.style.opacity = currentPosition === 0 ? '0.5' : '1';
        nextButton.style.opacity = currentPosition <= maxPosition ? '0.5' : '1';
        prevButton.style.pointerEvents = currentPosition === 0 ? 'none' : 'auto';
        nextButton.style.pointerEvents = currentPosition <= maxPosition ? 'none' : 'auto';
    }

    function slideCards(direction) {
        const moveAmount = direction === 'next' ? -(cardWidth + gap) : (cardWidth + gap);
        const newPosition = currentPosition + moveAmount;
        if (newPosition > 0) {
            currentPosition = 0;
        } else if (newPosition < maxPosition) {
            currentPosition = maxPosition;
        } else {
            currentPosition = newPosition;
        }
        if (exploreGrid) exploreGrid.style.transform = `translateX(${currentPosition}px)`;
        updateNavigation();
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            if (currentPosition < 0) slideCards('prev');
        });
    }
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            if (currentPosition > maxPosition) slideCards('next');
        });
    }

    window.addEventListener('resize', () => {
        recalculateExploreVars();
        currentPosition = 0;
        if (exploreGrid) exploreGrid.style.transform = 'translateX(0)';
        updateNavigation();
    });

    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    if (exploreGrid) {
        exploreGrid.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });
        exploreGrid.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            handleSwipe();
        });
    }
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentPosition > maxPosition) {
                slideCards('next');
            } else if (diff < 0 && currentPosition < 0) {
                slideCards('prev');
            }
        }
    }
    // Initial setup
    recalculateExploreVars();
    updateNavigation();
}); 