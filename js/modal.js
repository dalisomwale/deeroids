// Modal functionality with working slideshow
let slideIndexes = {};

// Initialize all modals and slideshows
function initializeModals() {
    console.log('Initializing modals...');
    
    // Close modal when clicking close button
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('close-modal')) {
            const modalId = event.target.getAttribute('data-modal');
            closeModal(modalId);
            return;
        }
        
        // Close modal when clicking outside content
        if (event.target.classList.contains('modal')) {
            const modalId = event.target.id;
            closeModal(modalId);
            return;
        }
        
        // Slideshow navigation - Previous buttons
        if (event.target.classList.contains('prev') || event.target.parentElement.classList.contains('prev')) {
            const button = event.target.classList.contains('prev') ? event.target : event.target.parentElement;
            const modalId = button.getAttribute('data-modal');
            changeSlide(modalId, -1);
            return;
        }
        
        // Slideshow navigation - Next buttons
        if (event.target.classList.contains('next') || event.target.parentElement.classList.contains('next')) {
            const button = event.target.classList.contains('next') ? event.target : event.target.parentElement;
            const modalId = button.getAttribute('data-modal');
            changeSlide(modalId, 1);
            return;
        }
        
        // Slideshow navigation - Dots
        if (event.target.classList.contains('dot')) {
            const dot = event.target;
            const modalId = dot.getAttribute('data-modal');
            const slideIndex = parseInt(dot.getAttribute('data-slide'));
            currentSlide(modalId, slideIndex);
            return;
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        const openModal = document.querySelector('.modal[style="display: block;"]');
        if (openModal) {
            const modalId = openModal.id;
            if (event.key === 'ArrowLeft') {
                changeSlide(modalId, -1);
            } else if (event.key === 'ArrowRight') {
                changeSlide(modalId, 1);
            } else if (event.key === 'Escape') {
                closeModal(modalId);
            }
        }
    });
    
    console.log('Modals initialized successfully');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeModals();
});

// Modal functions
function openModal(modalId) {
    console.log('Opening modal:', modalId);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Initialize slideshow for this modal
        if (!slideIndexes[modalId]) {
            slideIndexes[modalId] = 0;
        }
        showSlides(modalId);
        
        // Add animation class
        setTimeout(() => {
            modal.classList.add('modal-open');
        }, 10);
    } else {
        console.error('Modal not found:', modalId);
    }
}

function closeModal(modalId) {
    console.log('Closing modal:', modalId);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        modal.classList.remove('modal-open');
    }
}

// Slideshow functionality
function currentSlide(modalId, n) {
    console.log('Current slide:', modalId, n);
    slideIndexes[modalId] = n;
    showSlides(modalId);
}

function changeSlide(modalId, n) {
    console.log('Changing slide:', modalId, n);
    if (!slideIndexes[modalId]) slideIndexes[modalId] = 0;
    
    const slides = document.querySelectorAll(`#${modalId} .slide`);
    if (!slides.length) {
        console.error('No slides found for modal:', modalId);
        return;
    }
    
    slideIndexes[modalId] += n;
    
    if (slideIndexes[modalId] >= slides.length) slideIndexes[modalId] = 0;
    if (slideIndexes[modalId] < 0) slideIndexes[modalId] = slides.length - 1;
    
    showSlides(modalId);
}

function showSlides(modalId) {
    const slides = document.querySelectorAll(`#${modalId} .slide`);
    const dots = document.querySelectorAll(`#${modalId} .dot`);
    
    if (!slides.length) {
        console.error('No slides found for modal:', modalId);
        return;
    }
    
    // Ensure index is within bounds
    if (slideIndexes[modalId] >= slides.length) slideIndexes[modalId] = 0;
    if (slideIndexes[modalId] < 0) slideIndexes[modalId] = slides.length - 1;
    
    const slidesContainer = document.querySelector(`#${modalId} .slides`);
    if (slidesContainer) {
        slidesContainer.style.transform = `translateX(-${slideIndexes[modalId] * 100}%)`;
        console.log('Slides container transformed to:', slideIndexes[modalId] * 100 + '%');
    } else {
        console.error('Slides container not found for modal:', modalId);
    }
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === slideIndexes[modalId]);
    });
    
    console.log('Showing slide', slideIndexes[modalId] + 1, 'of', slides.length, 'for modal:', modalId);
}

// Make functions globally available
window.openModal = openModal;
window.closeModal = closeModal;
window.changeSlide = changeSlide;
window.currentSlide = currentSlide;