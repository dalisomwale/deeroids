// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
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
        });
    }
    
    // Close mobile menu when clicking on links
    const mobileMenuLinks = document.querySelectorAll('#mobileMenu a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuButton.querySelector('svg');
            if (icon) {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
            }
        });
    });
    
    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-gray-900', 'text-white', 'border-gray-900');
                btn.classList.add('bg-white', 'text-gray-700', 'border-gray-200');
            });
            this.classList.remove('bg-white', 'text-gray-700', 'border-gray-200');
            this.classList.add('bg-gray-900', 'text-white', 'border-gray-900');
            
            // Filter items
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.style.display = 'block';
                    // Add fade in animation
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
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
                    contactSubmit.style.background = 'linear-gradient(135deg, #3b82f6, #8b5cf6)';
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
                    contactSubmit.style.background = 'linear-gradient(135deg, #3b82f6, #8b5cf6)';
                }, 3000);
            }
        });
    }
    
    // Portfolio item click handlers
    const portfolioItemsClickable = document.querySelectorAll('.portfolio-item');
    portfolioItemsClickable.forEach(item => {
        item.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            if (modalId) {
                openModal(modalId);
            }
        });
    });
    
    // Add fadeIn animation for CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
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
});