// ============================================
// ON THE POINT BUSINESS SOLUTIONS - SCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Hamburger Menu Toggle – must work on mobile tap and desktop click
    var hamburger = document.getElementById('hamburger');
    var navMenu = document.getElementById('navMenu');
    if (!hamburger || !navMenu) return;

    var justTouched = false;

    function openMenu() {
        hamburger.classList.add('active');
        navMenu.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
    }
    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    }
    function toggleMenu() {
        if (navMenu.classList.contains('active')) closeMenu();
        else openMenu();
    }

    // Mobile: touchend fires first; we toggle and mark so the following click is ignored
    hamburger.addEventListener('touchend', function(e) {
        e.preventDefault();
        e.stopPropagation();
        justTouched = true;
        toggleMenu();
        setTimeout(function() { justTouched = false; }, 400);
    }, { passive: false });

    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (justTouched) return;
        toggleMenu();
    });

    // Close menu when a link is clicked (click only so mobile gets a chance to navigate)
    document.querySelectorAll('.nav-link').forEach(function(link) {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });
});

// Rest of script runs after DOM ready where needed

// Dropdown menu toggle for mobile
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const dropdown = toggle.closest('.dropdown');
            dropdown.classList.toggle('active');
        }
    });
});

// Close dropdown when window is resized
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});

// Smooth scrolling for navigation links (same-page hash only; don't block other links)
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href === '#') return;
            var target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Here you would typically send this data to a server
        // For now, we'll just show a success message
        console.log('Form submitted:', { name, email, message });
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Add scroll animation effect
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

// Observe service cards and other elements
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// CTA Button smooth scroll to contact section
const ctaButtons = document.querySelectorAll('.cta-button');

ctaButtons.forEach(button => {
    if (button.textContent.includes('Get Started')) {
        button.addEventListener('click', () => {
            document.querySelector('#contact').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
});
