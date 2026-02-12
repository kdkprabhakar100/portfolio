// ==========================================
// MODERN PORTFOLIO - ENHANCED JAVASCRIPT
// ==========================================

// Smooth slide navigation with improved performance
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get target section
        const targetSection = document.querySelector(this.getAttribute('href'));
        
        if (!targetSection) return;
        
        // Calculate slide offset
        const slides = Array.from(document.querySelectorAll('.slide'));
        const offset = slides.indexOf(targetSection);
        
        // Apply transform with smooth transition
        const slidesContainer = document.querySelector('.slides');
        slidesContainer.style.transform = `translateX(-${offset * 100}%)`;
        
        // Update active navigation state
        updateActiveNav(this);
    });
});

// Update active navigation item
function updateActiveNav(activeLink) {
    // Remove active class from all nav items
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to clicked item
    activeLink.classList.add('active');
}

// Optional: Add active state styling to CSS
const style = document.createElement('style');
style.textContent = `
    nav ul li a.active {
        color: #fff;
        background-color: rgba(84, 166, 168, 0.2);
    }
    
    nav ul li a.active::before {
        width: 80%;
    }
`;
document.head.appendChild(style);

// Initialize: Set first nav item as active
document.addEventListener('DOMContentLoaded', () => {
    const firstNavLink = document.querySelector('nav ul li a');
    if (firstNavLink) {
        firstNavLink.classList.add('active');
    }
});

// Optional: Keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    const slides = Array.from(document.querySelectorAll('.slide'));
    const slidesContainer = document.querySelector('.slides');
    const currentTransform = slidesContainer.style.transform;
    const currentIndex = currentTransform ? 
        parseInt(currentTransform.match(/-?(\d+)/)?.[1] || 0) / 100 : 0;
    
    let newIndex = currentIndex;
    
    // Arrow key navigation
    if (e.key === 'ArrowRight' && currentIndex < slides.length - 1) {
        newIndex = currentIndex + 1;
    } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        newIndex = currentIndex - 1;
    } else {
        return; // Exit if not arrow key
    }
    
    // Apply new transform
    slidesContainer.style.transform = `translateX(-${newIndex * 100}%)`;
    
    // Update nav active state
    const navLinks = Array.from(document.querySelectorAll('nav ul li a'));
    if (navLinks[newIndex]) {
        updateActiveNav(navLinks[newIndex]);
    }
});

// Optional: Touch swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

const slidesContainer = document.querySelector('.slides');

slidesContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

slidesContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50; // Minimum swipe distance
    const slides = Array.from(document.querySelectorAll('.slide'));
    const currentTransform = slidesContainer.style.transform;
    const currentIndex = currentTransform ? 
        parseInt(currentTransform.match(/-?(\d+)/)?.[1] || 0) / 100 : 0;
    
    let newIndex = currentIndex;
    
    // Swipe left (next slide)
    if (touchStartX - touchEndX > swipeThreshold && currentIndex < slides.length - 1) {
        newIndex = currentIndex + 1;
    }
    
    // Swipe right (previous slide)
    if (touchEndX - touchStartX > swipeThreshold && currentIndex > 0) {
        newIndex = currentIndex - 1;
    }
    
    // Apply transform if index changed
    if (newIndex !== currentIndex) {
        slidesContainer.style.transform = `translateX(-${newIndex * 100}%)`;
        
        // Update nav active state
        const navLinks = Array.from(document.querySelectorAll('nav ul li a'));
        if (navLinks[newIndex]) {
            updateActiveNav(navLinks[newIndex]);
        }
    }
}

// Optional: Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add fade-in effect to slides
    const fadeStyle = document.createElement('style');
    fadeStyle.textContent = `
        body:not(.loaded) .slide {
            opacity: 0;
        }
        
        body.loaded .slide {
            animation: fadeInSlide 0.6s ease-out forwards;
        }
        
        @keyframes fadeInSlide {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(fadeStyle);
});

console.log('✅ Portfolio JavaScript loaded successfully!');
