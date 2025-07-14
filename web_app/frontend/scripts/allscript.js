// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Initialize Swiper
const swiper = new Swiper('.swiper-container', {
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar Animation on Scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
});

// Add form submission handling
document.getElementById('cropForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Here you would typically send the data to your backend
    // For now, we'll just show a sample result
    const result = document.getElementById('prediction-result');
    result.innerHTML = `
        <div style="color: var(--primary-color); font-weight: 600;">
            Based on the provided parameters, the recommended crop is:
            <div style="font-size: 1.5rem; margin-top: 1rem; color: var(--dark-color);">
                Rice 🌾
            </div>
        </div>
    `;
    
    // Smooth scroll to result
    result.scrollIntoView({ behavior: 'smooth' });
});

// Add input validation
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', function() {
        const value = parseFloat(this.value);
        const min = parseFloat(this.min);
        const max = parseFloat(this.max);
        
        if (value < min) this.value = min;
        if (value > max) this.value = max;
    });
}); 