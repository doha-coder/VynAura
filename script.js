// =============================================
// VYNAURA - MAIN SCRIPT (CLEAN VERSION)
// =============================================

console.log('VynAura - Initializing...');

// IMMEDIATE FIX: Force loading screen to hide
setTimeout(() => {
    console.log('Force hiding loading screens...');
    
    const loadingScreen = document.getElementById('loadingScreen');
    const modelLoading = document.getElementById('modelLoading');
    
    if (loadingScreen) {
        loadingScreen.classList.add('loaded');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            console.log('Main loading screen hidden');
        }, 500);
    }
    
    if (modelLoading) {
        modelLoading.style.display = 'none';
        console.log('3D model loading screen hidden');
    }
    
    // Initialize the site
    initializeSite();
}, 2000);

// Main initialization function
function initializeSite() {
    console.log('Initializing VynAura site...');
    
    // Mark body as loaded
    document.body.classList.add('loaded');
    
    // Initialize all components
    initializeTheme();
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeShowMoreFeatures(); // ADD THIS LINE
    initializeFormValidation();
    initializeStarRating();
    initializeCustomization(); // Make sure this is included too
    
    console.log('VynAura site initialized successfully!');
}

// =============================================
// THEME MANAGEMENT
// =============================================

function initializeTheme() {
    const toggleBtn = document.querySelector('.switch');
    if (toggleBtn) {
        toggleBtn.addEventListener('change', () => {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    
    if (toggleBtn) {
        toggleBtn.checked = savedTheme === 'dark';
    }
}

// =============================================
// MOBILE MENU
// =============================================

function initializeMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            navOverlay.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu when clicking overlay
        navOverlay.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            navOverlay.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });

        // Close menu when clicking links
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                navOverlay.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

// =============================================
// SMOOTH SCROLLING
// =============================================

function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}
// === HERO SECTION FUNCTIONALITY ===

// Interactive Text Effects
function initializeInteractiveText() {
    const aiText = document.querySelector('.ai-text');
    const realityText = document.querySelector('.reality-text');
    const modelViewer = document.querySelector('model-viewer');
    
    if (aiText && realityText) {
        // AI text interaction
        aiText.addEventListener('click', function(e) {
            createParticles(e, 'ai');
            if (modelViewer) {
                modelViewer.cameraOrbit = '0deg 75deg 105%';
            }
        });
        
        // Reality text interaction
        realityText.addEventListener('click', function(e) {
            createParticles(e, 'reality');
            if (modelViewer) {
                modelViewer.cameraOrbit = '180deg 75deg 105%';
            }
        });
        
        // Hover effects
        [aiText, realityText].forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
                createHoverParticles(this);
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
}
// =============================================
// SHOW MORE FEATURES FUNCTIONALITY
// =============================================

function initializeShowMoreFeatures() {
    const showMoreBtn = document.getElementById('showMoreBtn');
    const hiddenFeatures = document.querySelectorAll('.hidden-feature');
    const featuresGrid = document.querySelector('.features-main-grid');
    
    if (!showMoreBtn || hiddenFeatures.length === 0) return;
    
    let isExpanded = false;
    
    showMoreBtn.addEventListener('click', function() {
        isExpanded = !isExpanded;
        
        // Toggle hidden features
        hiddenFeatures.forEach(feature => {
            if (isExpanded) {
                feature.style.display = 'block';
                // Add animation
                setTimeout(() => {
                    feature.style.opacity = '1';
                    feature.style.transform = 'translateY(0)';
                }, 10);
            } else {
                feature.style.opacity = '0';
                feature.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    feature.style.display = 'none';
                }, 300);
            }
        });
        
        // Update button text and icon
        const btnText = showMoreBtn.querySelector('.btn-text');
        const btnIcon = showMoreBtn.querySelector('.btn-icon');
        
        if (isExpanded) {
            btnText.textContent = 'Show Less Features';
            btnIcon.classList.remove('fa-chevron-down');
            btnIcon.classList.add('fa-chevron-up');
            featuresGrid.classList.add('show-more-active');
        } else {
            btnText.textContent = 'Show More Features';
            btnIcon.classList.remove('fa-chevron-up');
            btnIcon.classList.add('fa-chevron-down');
            featuresGrid.classList.remove('show-more-active');
        }
        
        // Smooth scroll to maintain position
        this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
    
    // Initialize hidden features as hidden
    hiddenFeatures.forEach(feature => {
        feature.style.display = 'none';
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(20px)';
        feature.style.transition = 'all 0.3s ease';
    });
}
// =============================================
// STAR RATING SYSTEM
// =============================================

function initializeStarRating() {
    const stars = document.querySelectorAll('.stars i');
    if (stars.length === 0) return;
    
    let currentRating = 0;

    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = parseInt(star.getAttribute('data-rating'));
            currentRating = rating;
            updateStars(rating);
        });

        star.addEventListener('mouseenter', () => {
            const rating = parseInt(star.getAttribute('data-rating'));
            updateStars(rating, true);
        });

        star.addEventListener('mouseleave', () => {
            updateStars(currentRating);
        });
    });

    function updateStars(rating, isHover = false) {
        stars.forEach((s, index) => {
            if (index < rating) {
                s.classList.remove('far');
                s.classList.add('fas');
                if (isHover) {
                    s.style.transform = 'scale(1.1)';
                } else {
                    s.style.transform = 'scale(1)';
                }
            } else {
                s.classList.remove('fas');
                s.classList.add('far');
                s.style.transform = 'scale(1)';
            }
        });
    }

    // Return public methods
    return {
        getCurrentRating: () => currentRating,
        reset: () => {
            currentRating = 0;
            updateStars(0);
        }
    };
}

// =============================================
// FORM VALIDATION
// =============================================

function initializeFormValidation() {
    const reviewForm = document.getElementById('reviewForm');
    if (!reviewForm) return;

    const starRating = initializeStarRating();

    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (starRating.getCurrentRating() === 0) {
            showNotification('Please select a rating before submitting', 'warning');
            return;
        }
        
        const formData = {
            name: document.getElementById('reviewName').value,
            profession: document.getElementById('reviewTitle').value,
            message: document.getElementById('reviewMessage').value,
            rating: starRating.getCurrentRating()
        };

        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<div class="loading-spinner small"></div> Submitting...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            showNotification('Thank you for your review!', 'success');
            this.reset();
            starRating.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// =============================================
// NOTIFICATION SYSTEM
// =============================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--card-bg);
        border: 1px solid ${getNotificationColor(type)};
        border-left: 4px solid ${getNotificationColor(type)};
        padding: 15px 20px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        max-width: 400px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-triangle',
        warning: 'exclamation-circle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        success: 'var(--success)',
        error: 'var(--error)',
        warning: 'var(--warning)',
        info: 'var(--accent)'
    };
    return colors[type] || 'var(--accent)';
}
// =============================================
// CUSTOMIZABLE GLASSES FUNCTIONALITY
// =============================================

function initializeCustomization() {
    // Elements
    const glassesBases = document.querySelectorAll('.glasses-base');
    const colorOptions = document.querySelectorAll('.color-option');
    const categories = document.querySelectorAll('.category');
    const categoryContents = document.querySelectorAll('.feature-category-content');
    const featureToggles = document.querySelectorAll('.feature-toggle input');
    const featureDots = document.querySelectorAll('.feature-dot');
    
    // Pricing elements
    const featuresTotalEl = document.getElementById('featuresTotal');
    const finalPriceEl = document.getElementById('finalPrice');
    const cartPriceEl = document.getElementById('cartPrice');
    
    // State
    let currentColor = 'black';
    let selectedFeatures = new Set(['basic-ar', 'voice-control']);
    let basePrice = 499;
    
    // Color Selection - Switch actual images
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            colorOptions.forEach(opt => opt.classList.remove('active'));
            // Add active class to clicked option
            this.classList.add('active');
            
            // Get selected color
            const selectedColor = this.getAttribute('data-color');
            currentColor = selectedColor;
            
            // Hide all glasses images
            glassesBases.forEach(glasses => {
                glasses.classList.remove('active');
            });
            
            // Show the selected color glasses
            const selectedGlasses = document.querySelector(`.glasses-base[data-color="${selectedColor}"]`);
            if (selectedGlasses) {
                selectedGlasses.classList.add('active');
                
                // Add selection animation
                selectedGlasses.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    selectedGlasses.style.transform = 'scale(1)';
                }, 300);
            }
        });
    });
    
    // Category Navigation (unchanged)
    categories.forEach(category => {
        category.addEventListener('click', function() {
            const categoryId = this.getAttribute('data-category');
            
            categories.forEach(cat => cat.classList.remove('active'));
            this.classList.add('active');
            
            categoryContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === categoryId) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Feature Toggles (unchanged)
    featureToggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const featureItem = this.closest('.feature-item');
            const feature = featureItem.getAttribute('data-feature');
            const price = parseInt(featureItem.getAttribute('data-price'));
            
            if (this.checked) {
                selectedFeatures.add(feature);
            } else {
                selectedFeatures.delete(feature);
            }
            
            updateFeatureDots();
            updatePricing();
        });
    });
    
    // Feature dot click to toggle features (unchanged)
    featureDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const feature = this.getAttribute('data-feature');
            const correspondingToggle = document.querySelector(`.feature-item[data-feature="${feature}"] input`);
            
            if (correspondingToggle) {
                correspondingToggle.checked = !correspondingToggle.checked;
                correspondingToggle.dispatchEvent(new Event('change'));
            }
        });
    });
    
    function updateFeatureDots() {
        featureDots.forEach(dot => {
            const feature = dot.getAttribute('data-feature');
            dot.style.display = selectedFeatures.has(feature) ? 'block' : 'none';
        });
    }
    
    function updatePricing() {
        let featuresTotal = 0;
        
        featureToggles.forEach(toggle => {
            if (toggle.checked) {
                const featureItem = toggle.closest('.feature-item');
                const price = parseInt(featureItem.getAttribute('data-price'));
                featuresTotal += price;
            }
        });
        
        const finalPrice = basePrice + featuresTotal;
        
        featuresTotalEl.textContent = `$${featuresTotal}`;
        finalPriceEl.textContent = `$${finalPrice}`;
        cartPriceEl.textContent = finalPrice;
        
        finalPriceEl.style.transform = 'scale(1.1)';
        setTimeout(() => {
            finalPriceEl.style.transform = 'scale(1)';
        }, 300);
    }
    
    // Initialize
    updateFeatureDots();
    updatePricing();
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializeCustomization);
// =============================================
// SCROLL ANIMATIONS
// =============================================

const fadeElements = document.querySelectorAll('.fade-in');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

fadeElements.forEach(element => {
    observer.observe(element);
});

// =============================================
// NAVBAR SCROLL EFFECT
// =============================================

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

window.addEventListener('scroll', throttle(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 100));

// =============================================
// ADDITIONAL STYLES
// =============================================

const additionalStyles = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes ripple {
        from { transform: scale(0); opacity: 1; }
        to { transform: scale(4); opacity: 0; }
    }
    
    .loading-spinner.small {
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255,255,255,0.3);
        border-top: 2px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        display: inline-block;
        margin-right: 8px;
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--card-bg);
        padding: 15px 20px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 15px;
        max-width: 400px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        border-left: 4px solid var(--accent);
    }
    
    .notification-success {
        border-left-color: var(--success);
    }
    
    .notification-error {
        border-left-color: var(--error);
    }
    
    .notification-warning {
        border-left-color: var(--warning);
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// =============================================
// USER AUTHENTICATION (SIMPLIFIED)
// =============================================

function showUserStatus(user) {
    const userStatus = document.getElementById('userStatus');
    const userName = document.getElementById('userName');
    
    if (userStatus && userName) {
        userStatus.style.display = 'flex';
        userName.textContent = `Welcome, ${user.fullName}`;
    }
}
// =============================================
// USER AUTHENTICATION & SECTION MANAGEMENT
// =============================================

function checkUserAuth() {
    const user = JSON.parse(localStorage.getItem('vynaura_user'));
    const customizeSection = document.getElementById('customize');
    const signinCta = document.getElementById('signin-cta');
    
    if (user) {
        // User is logged in - show customization, hide CTA
        if (customizeSection) {
            customizeSection.style.display = 'block';
        }
        if (signinCta) {
            signinCta.style.display = 'none';
        }
        console.log('User authenticated, showing customization section');
    } else {
        // User is not logged in - hide customization, show CTA
        if (customizeSection) {
            customizeSection.style.display = 'none';
        }
        if (signinCta) {
            signinCta.style.display = 'block';
        }
    }
}

function showUserStatus(user) {
    const userStatus = document.getElementById('userStatus');
    const userName = document.getElementById('userName');
    const customizeSection = document.getElementById('customize');
    const signinCta = document.getElementById('signin-cta');
    
    if (userStatus && userName) {
        userStatus.style.display = 'flex';
        userName.textContent = `Welcome, ${user.fullName}`;
    }
    
    // Show customization section and hide CTA when user logs in
    if (customizeSection) {
        customizeSection.style.display = 'block';
    }
    if (signinCta) {
        signinCta.style.display = 'none';
    }
    
    // Smooth scroll to customization section
    setTimeout(() => {
        if (customizeSection) {
            customizeSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    }, 500);
}

function logout() {
    const customizeSection = document.getElementById('customize');
    const signinCta = document.getElementById('signin-cta');
    
    // Hide customization section and show CTA on logout
    if (customizeSection) {
        customizeSection.style.display = 'none';
    }
    if (signinCta) {
        signinCta.style.display = 'block';
    }
    
    localStorage.removeItem('vynaura_user');
    window.location.href = 'index.html';
}
function logout() {
    localStorage.removeItem('vynaura_user');
    window.location.href = 'index.html';
}

// Check for logged in user on load
document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(localStorage.getItem('vynaura_user'));
    if (user) {
        showUserStatus(user);
    }
});

console.log('VynAura script loaded successfully!');
// Interactive Text Effects
function initializeInteractiveText() {
    const aiText = document.querySelector('.ai-text');
    const realityText = document.querySelector('.reality-text');
    const modelViewer = document.querySelector('model-viewer');
    
    if (aiText && realityText) {
        // AI text interaction
        aiText.addEventListener('click', function(e) {
            createParticles(e, 'ai');
            if (modelViewer) {
                // Trigger AI-related animation on model
                modelViewer.cameraOrbit = '0deg 75deg 105%';
                modelViewer.animationName = 'ai-pulse';
            }
        });
        
        // Reality text interaction
        realityText.addEventListener('click', function(e) {
            createParticles(e, 'reality');
            if (modelViewer) {
                // Trigger reality-related animation
                modelViewer.cameraOrbit = '180deg 75deg 105%';
                modelViewer.animationName = 'reality-zoom';
            }
        });
        
        // Hover effects
        [aiText, realityText].forEach(element => {
            element.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1)';
                createHoverParticles(this);
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializeInteractiveText);
// Enhanced 3D Model Control
function initializeEnhancedModel() {
    const modelViewer = document.querySelector('model-viewer');
    
    if (!modelViewer) return;
    
    // Wait for model to load
    modelViewer.addEventListener('load', () => {
        console.log('3D model loaded, applying enhanced settings...');
        
        // Set initial camera position for better zoom
        setTimeout(() => {
            // More zoomed-in camera settings
            modelViewer.cameraOrbit = '0deg 75deg 2.3m';
            modelViewer.fieldOfView = '25deg';
            modelViewer.cameraTarget = '0m 0.1m 0m';
            
            // Smooth camera transition
            modelViewer.addEventListener('camera-change', () => {
                // Optional: Add smooth camera behavior
            });
        }, 1000);
    });
    
    // Add zoom controls
    setupZoomControls(modelViewer);
}

function setupZoomControls(modelViewer) {
    let scale = 1;
    const minScale = 0.8;
    const maxScale = 1.5;
    
    // Mouse wheel zoom
    modelViewer.addEventListener('wheel', (event) => {
        event.preventDefault();
        
        const delta = -event.deltaY * 0.01;
        scale = Math.min(maxScale, Math.max(minScale, scale + delta));
        
        // Adjust camera distance based on scale
        const newDistance = 2.5 / scale;
        modelViewer.cameraOrbit = `0deg 75deg ${newDistance}m`;
    });
    
    // Touch pinch zoom
    let touchStartDistance = 0;
    
    modelViewer.addEventListener('touchstart', (event) => {
        if (event.touches.length === 2) {
            touchStartDistance = getTouchDistance(event.touches);
        }
    });
    
    modelViewer.addEventListener('touchmove', (event) => {
        if (event.touches.length === 2) {
            event.preventDefault();
            const currentDistance = getTouchDistance(event.touches);
            const delta = (currentDistance - touchStartDistance) * 0.01;
            
            scale = Math.min(maxScale, Math.max(minScale, scale + delta));
            const newDistance = 2.5 / scale;
            modelViewer.cameraOrbit = `0deg 75deg ${newDistance}m`;
            
            touchStartDistance = currentDistance;
        }
    });
}

function getTouchDistance(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

// Reset camera position
function resetCamera() {
    const modelViewer = document.querySelector('model-viewer');
    if (modelViewer) {
        modelViewer.cameraOrbit = '0deg 75deg 2.5m';
        modelViewer.fieldOfView = '30deg';
    }
}

// Add reset button to interaction hints
function addResetButton() {
    const hints = document.querySelector('.interaction-hints');
    if (hints) {
        const resetHint = document.createElement('div');
        resetHint.className = 'hint reset-hint';
        resetHint.innerHTML = `
            <i class="fas fa-sync-alt"></i>
            <span>Reset view</span>
        `;
        resetHint.addEventListener('click', resetCamera);
        hints.appendChild(resetHint);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeEnhancedModel();
    addResetButton();
});
// =============================================
// NON-BLOCKING CART MESSAGE FUNCTIONALITY
// =============================================

function setupAddToCart() {
    const addToCartBtn = document.querySelector('.add-to-cart');
    const cartMessage = document.getElementById('cartMessage');
    const closeMessageBtn = document.getElementById('closeMessage');
    
    if (!addToCartBtn || !cartMessage) return;
    
    addToCartBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Show message immediately without heavy computations
        showCartMessage(cartMessage);
        
        // Lightweight celebration (non-blocking)
        setTimeout(() => {
            addLightCelebration();
        }, 100);
    });
    
    // Close message
    if (closeMessageBtn) {
        closeMessageBtn.addEventListener('click', function() {
            hideCartMessage(cartMessage);
        });
    }
    
    // Auto-hide after 5 seconds
    if (cartMessage) {
        cartMessage.addEventListener('click', function(e) {
            if (e.target === this) {
                hideCartMessage(this);
            }
        });
    }
}

function showCartMessage(messageElement) {
    messageElement.classList.add('show');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideCartMessage(messageElement);
    }, 5000);
}

function hideCartMessage(messageElement) {
    messageElement.classList.remove('show');
}

// Lightweight celebration (no DOM manipulation during animation)
function addLightCelebration() {
    // Simple CSS-based celebration
    const cartMessage = document.getElementById('cartMessage');
    if (cartMessage) {
        cartMessage.style.animation = 'celebrate 0.5s ease';
        setTimeout(() => {
            cartMessage.style.animation = '';
        }, 500);
    }
}

// Add celebration CSS
const celebrationCSS = `
@keyframes celebrate {
    0% { transform: translateX(400px) scale(1); }
    50% { transform: translateX(380px) scale(1.05); }
    100% { transform: translateX(400px) scale(1); }
}

.cart-message.show {
    transform: translateX(400px);
    animation: slideIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
}

@keyframes slideIn {
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
`;

// Inject styles safely
if (document.head) {
    const style = document.createElement('style');
    style.textContent = celebrationCSS;
    document.head.appendChild(style);
}

// Initialize safely after page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupAddToCart);
} else {
    setupAddToCart();
}
// Add smooth scrolling behavior for mobile
function improveMobileScrolling() {
    const featuresList = document.querySelector('.features-list');
    
    if (featuresList && 'ontouchstart' in window) {
        // Add touch-friendly class
        featuresList.classList.add('touch-scroll');
        
        // Prevent accidental body scroll when scrolling features
        featuresList.addEventListener('touchstart', function(e) {
            this.style.overflowY = 'auto';
        });
        
        featuresList.addEventListener('touchend', function(e) {
            // Small delay to ensure scroll completes
            setTimeout(() => {
                this.style.overflowY = 'auto';
            }, 100);
        });
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', improveMobileScrolling);
