// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing main functionality...');
    
    // Mobile menu functionality with event delegation
    document.addEventListener('click', function(event) {
        // Mobile menu toggle
        if (event.target.closest('#mobileMenuButton')) {
            const mobileMenu = document.getElementById('mobileMenu');
            const mobileMenuButton = document.getElementById('mobileMenuButton');
            
            if (mobileMenu) {
                mobileMenu.classList.toggle('hidden');
                // Toggle icon
                const icon = mobileMenuButton.querySelector('svg');
                if (icon) {
                    if (mobileMenu.classList.contains('hidden')) {
                        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
                    } else {
                        icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
                    }
                }
            }
        }
        
        // Close mobile menu when clicking on mobile menu links
        if (event.target.closest('#mobileMenu a')) {
            const mobileMenu = document.getElementById('mobileMenu');
            const mobileMenuButton = document.getElementById('mobileMenuButton');
            
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuButton.querySelector('svg');
                if (icon) {
                    icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
                }
            }
        }
    });
    
    // Initialize portfolio filtering after components are loaded
    initializePortfolioFiltering();
    
    // Portfolio item click handlers - use event delegation
    document.addEventListener('click', function(event) {
        if (event.target.closest('.portfolio-item')) {
            const portfolioItem = event.target.closest('.portfolio-item');
            const modalId = portfolioItem.getAttribute('data-modal');
            if (modalId) {
                console.log('Portfolio item clicked, opening modal:', modalId);
                openModal(modalId);
            }
        }
    });
    
    // Contact form handling
    const contactSubmit = document.getElementById('contactSubmit');
    if (contactSubmit) {
        contactSubmit.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Simple validation
            const inputs = document.querySelectorAll('#contact input[required], #contact textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ef4444';
                } else {
                    input.style.borderColor = '#d1d5db';
                }
            });
            
            if (isValid) {
                // Show success message
                const originalText = contactSubmit.innerHTML;
                contactSubmit.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                contactSubmit.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                
                setTimeout(() => {
                    contactSubmit.innerHTML = originalText;
                    contactSubmit.style.background = '';
                    // Reset form
                    document.querySelector('#contact form').reset();
                }, 3000);
            } else {
                // Show error message
                const originalText = contactSubmit.innerHTML;
                contactSubmit.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Please fill all fields';
                contactSubmit.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
                
                setTimeout(() => {
                    contactSubmit.innerHTML = originalText;
                    contactSubmit.style.background = '';
                }, 3000);
            }
        });
    }
    
    // Add fadeIn animation for CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .fade-in {
            animation: fadeIn 0.5s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.classList.add('bg-white/95', 'shadow-lg');
            nav.classList.remove('bg-white/90');
        } else {
            nav.classList.remove('bg-white/95', 'shadow-lg');
            nav.classList.add('bg-white/90');
        }
    });
    
    console.log('Main functionality initialized');
});

// Portfolio filtering functionality
function initializePortfolioFiltering() {
    console.log('Initializing portfolio filtering...');
    
    // Use event delegation for filter buttons
    document.addEventListener('click', function(event) {
        if (event.target.closest('.filter-btn')) {
            const button = event.target.closest('.filter-btn');
            const filter = button.getAttribute('data-filter');
            
            console.log('Filter button clicked:', filter);
            
            // Update active button
            const filterButtons = document.querySelectorAll('.filter-btn');
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-gray-900', 'text-white', 'border-gray-900');
                btn.classList.add('bg-white', 'text-gray-700', 'border-gray-200');
            });
            button.classList.remove('bg-white', 'text-gray-700', 'border-gray-200');
            button.classList.add('bg-gray-900', 'text-white', 'border-gray-900');
            
            // Filter items
            const portfolioItems = document.querySelectorAll('.portfolio-item');
            let visibleCount = 0;
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    // Add fade in animation
                    item.classList.add('fade-in');
                    setTimeout(() => item.classList.remove('fade-in'), 500);
                    visibleCount++;
                } else {
                    item.style.display = 'none';
                }
            });
            
            console.log('Filtered to show', visibleCount, 'items');
        }
    });
    
    console.log('Portfolio filtering initialized');
}

// Reinitialize portfolio when components load
function reinitializePortfolio() {
    console.log('Reinitializing portfolio...');
    setTimeout(() => {
        initializePortfolioFiltering();
    }, 100);
}

// Make functions globally available
window.initializePortfolioFiltering = initializePortfolioFiltering;
window.reinitializePortfolio = reinitializePortfolio;