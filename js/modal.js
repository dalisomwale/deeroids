// Modal functionality
let slideIndexes = {};

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
    document.body.style.overflow = 'hidden';
    // Reset slideshow to first slide
    if (!slideIndexes[modalId]) {
        slideIndexes[modalId] = 0;
    }
    currentSlide(modalId, 0);
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            const modalId = modal.id;
            closeModal(modalId);
        }
    });
});

// Initialize modal functionality
document.addEventListener('DOMContentLoaded', function() {
    // Close modal when clicking close button
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            closeModal(modalId);
        });
    });
    
    // Slideshow navigation - Previous buttons
    const prevButtons = document.querySelectorAll('.prev');
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            changeSlide(modalId, -1);
        });
    });
    
    // Slideshow navigation - Next buttons
    const nextButtons = document.querySelectorAll('.next');
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            changeSlide(modalId, 1);
        });
    });
    
    // Slideshow navigation - Dots
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            currentSlide(modalId, slideIndex);
        });
    });
});

// Slideshow functionality
function currentSlide(modalId, n) {
    slideIndexes[modalId] = n;
    showSlides(modalId);
}

function changeSlide(modalId, n) {
    if (!slideIndexes[modalId]) slideIndexes[modalId] = 0;
    slideIndexes[modalId] += n;
    showSlides(modalId);
}

function showSlides(modalId) {
    const slides = document.querySelectorAll(`#${modalId} .slide`);
    const dots = document.querySelectorAll(`#${modalId} .dot`);
    
    if (!slides.length) return;
    
    if (slideIndexes[modalId] >= slides.length) slideIndexes[modalId] = 0;
    if (slideIndexes[modalId] < 0) slideIndexes[modalId] = slides.length - 1;
    
    const slidesContainer = document.querySelector(`#${modalId} .slides`);
    if (slidesContainer) {
        slidesContainer.style.transform = `translateX(-${slideIndexes[modalId] * 100}%)`;
    }
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === slideIndexes[modalId]);
    });
}