// ========================================
// PROJECT PAGINATION
// ========================================
const projectsPerPage = 3; // Show 3 projects per page
let currentPage = 0;

function initPagination() {
    const projectCards = document.querySelectorAll('.project-card');
    const totalPages = Math.ceil(projectCards.length / projectsPerPage);
    const paginationDots = document.getElementById('paginationDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // Create pagination dots
    paginationDots.innerHTML = '';
    for (let i = 0; i < totalPages; i++) {
        const dot = document.createElement('div');
        dot.className = 'pagination-dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToPage(i));
        paginationDots.appendChild(dot);
    }

    function showPage(page) {
        currentPage = page;
        
        // Hide all cards with fade out
        projectCards.forEach(card => {
            card.classList.add('hidden');
            card.classList.remove('fade-in');
        });
        
        // Show cards for current page with fade in
        const start = page * projectsPerPage;
        const end = start + projectsPerPage;
        
        // Small delay to ensure fade effect
        setTimeout(() => {
            for (let i = start; i < end && i < projectCards.length; i++) {
                projectCards[i].classList.remove('hidden');
                projectCards[i].classList.add('fade-in');
            }
        }, 50);
        
        // Update dots
        document.querySelectorAll('.pagination-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === page);
        });
        
        // Update buttons
        prevBtn.disabled = page === 0;
        nextBtn.disabled = page === totalPages - 1;
    }

    function goToPage(page) {
        if (page >= 0 && page < totalPages) {
            showPage(page);
        }
    }

    // Button event listeners
    prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
    nextBtn.addEventListener('click', () => goToPage(currentPage + 1));

    // Initialize first page
    showPage(0);
}

// Initialize pagination when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPagination);
} else {
    initPagination();
}

// ========================================
// MOBILE MENU TOGGLE
// ========================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger?.addEventListener('click', () => {
    navMenu?.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu?.classList.remove('active');
    });
});

// ========================================
// SMOOTH SCROLL
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// FORM SUBMISSION
// ========================================
const contactForm = document.querySelector('.contact-form');

contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Show success message
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    
    alert(`¡Gracias ${name}! Tu mensaje ha sido recibido. Te contactaré pronto.\n\n(Nota: Este es un formulario de demostración. Para contacto real, usa LinkedIn o GitHub.)`);
    
    // Reset form
    contactForm.reset();
});

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.project-card, .tech-item, .about-text, .tech-stack').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================================
// ACTIVE NAV LINK ON SCROLL
// ========================================
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========================================
// TYPING EFFECT FOR TERMINAL
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    const typingElements = document.querySelectorAll('.typing-effect');
    const isMobile = window.innerWidth < 768;
    
    typingElements.forEach((element, index) => {
        const text = element.textContent;
        element.textContent = '';
        
        // Only set width to 0 on desktop where we use nowrap
        if (!isMobile) {
            element.style.width = '0';
        }
        
        setTimeout(() => {
            // Only animate width on desktop
            if (!isMobile) {
                element.style.width = '100%';
            }
            
            let i = 0;
            const typeWriter = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeWriter);
                }
            }, 50);
        }, index * 500);
    });
});

console.log('%c┌─────────────────────────────────────┐', 'color: #00ff41');
console.log('%c│  Osaki Dev Portfolio - v2.0        │', 'color: #00ff41');
console.log('%c│  Made with 💚 by Osaki            │', 'color: #00ff41');
console.log('%c│  GitHub: github.com/alejamt00       │', 'color: #00ff41');
console.log('%c└─────────────────────────────────────┘', 'color: #00ff41');
