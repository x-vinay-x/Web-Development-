// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.5s ease-out';
    observer.observe(section);
});

// Active navigation highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Mobile navigation toggle (if needed)
const createMobileNav = () => {
    const nav = document.querySelector('nav');
    const burger = document.createElement('div');
    burger.className = 'burger';
    burger.innerHTML = '☰';
    burger.style.display = 'none';
    
    // Style the burger menu for mobile
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .burger {
                display: block !important;
                font-size: 2rem;
                cursor: pointer;
                color: #00f7ff;
            }
            .nav-links.active {
                display: flex !important;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(26, 29, 33, 0.95);
                padding: 1rem;
                backdrop-filter: blur(10px);
            }
        }
    `;
    document.head.appendChild(style);

    // Add burger menu functionality
    burger.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
    });

    nav.appendChild(burger);
};

// Initialize mobile navigation
createMobileNav();