// =============================================
// VYNAURA - CLEAN MAIN SCRIPT
// =============================================
// Force scroll to top on page load
window.onbeforeunload = function() {
    window.scrollTo(0, 0);
}
console.log('VynAura - Initializing...');

// =============================================
// LOADING SCREEN MANAGEMENT
// =============================================

function handleLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    const modelLoading = document.getElementById('modelLoading');
    
    console.log('Handling loading screens...');
    
    // Hide 3D model loading if exists
    if (modelLoading) {
        modelLoading.style.display = 'none';
    }
    
    // Hide main loading screen with transition
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        
        // Remove from DOM after transition
        setTimeout(() => {
            loadingScreen.remove();
            console.log('Loading screen removed');
        }, 800);
    }
}

// =============================================
// MAIN INITIALIZATION
// =============================================

function initializeSite() {
    console.log('Initializing VynAura site...');
    
    // Mark body as loaded
    document.body.classList.add('loaded');
    
    // Initialize all components
    initializeTheme();
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeShowMoreFeatures();
    initializeFormValidation();
    initializeCustomization();
    initializeEnhancedModel();
    setupAddToCart();
    improveMobileScrolling();
    
    console.log('VynAura site initialized successfully!');
}

// =============================================
// THEME MANAGEMENT
// =============================================

function initializeTheme() {
    const toggleBtn = document.querySelector('.switch');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('change', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    toggleBtn.checked = savedTheme === 'dark';
}

// =============================================
// MOBILE MENU
// =============================================

function initializeMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');

    if (!menuToggle || !navLinks || !navOverlay) return;

    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        navOverlay.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking overlay
    navOverlay.addEventListener('click', () => {
        closeMobileMenu(menuToggle, navLinks, navOverlay);
    });

    // Close menu when clicking links
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu(menuToggle, navLinks, navOverlay);
        });
    });
}

function closeMobileMenu(menuToggle, navLinks, navOverlay) {
    navLinks.classList.remove('active');
    menuToggle.classList.remove('active');
    navOverlay.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
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

// =============================================
// SHOW MORE FEATURES
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
// Add this to your JavaScript
function createFallingParticles() {
    const container = document.querySelector('.hero');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'falling-particles';
    container.appendChild(particlesContainer);

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 3 + 1;
        const left = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${Math.random() > 0.5 ? 'rgba(74, 108, 247, 0.9)' : 'rgba(211, 193, 243, 0.9)'};
            border-radius: 50%;
            left: ${left}%;
            top: -20px;
            animation: fall ${duration}s linear ${delay}s infinite;
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// Add this CSS for JavaScript solution
const style = document.createElement('style');
style.textContent = `
    .falling-particles {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
        border-radius: 20px;
    }
    
    @keyframes fall {
        0% { transform: translateY(0) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(400px) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize when page loads
document.addEventListener('DOMContentLoaded', createFallingParticles);

// Enhanced CTA Interactive Features
function initializeEnhancedCTA() {
    const unlockCards = document.querySelectorAll('.unlock-card');
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    let unlockedCount = 0;
    const totalCards = unlockCards.length;
    
    unlockCards.forEach(card => {
        card.addEventListener('click', function() {
            if (this.classList.contains('locked')) {
                // Show sign in modal or redirect
                showSignInPrompt(this);
            } else {
                // Already unlocked - could show more details
                showFeatureDetails(this);
            }
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            if (this.classList.contains('locked')) {
                this.style.transform = 'translateY(-5px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (this.classList.contains('locked')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    // Simulate unlocking when user signs in (you'll call this after login)
    window.unlockAllFeatures = function() {
        unlockCards.forEach(card => {
            card.classList.remove('locked');
            card.classList.add('unlocked');
            
            const badge = card.querySelector('.card-badge');
            badge.classList.remove('locked-badge');
            badge.classList.add('unlocked-badge');
            badge.innerHTML = '<i class="fas fa-check"></i> Unlocked';
        });
        
        progressFill.style.width = '100%';
        progressText.textContent = '100% Unlocked - Full Access!';
    };
    
    function showSignInPrompt(card) {
        const feature = card.getAttribute('data-feature');
        const featureNames = {
            'design': 'Design Studio',
            'ai': 'AI Features',
            'safety': 'Safety Suite',
            'pricing': 'Live Pricing'
        };
        
        // You can replace this with a modal or keep the redirect
        if(confirm(`Sign in to unlock the ${featureNames[feature]} and start customizing your VynAura glasses!`)) {
            window.location.href = 'login.html';
        }
    }
    
    function showFeatureDetails(card) {
        const feature = card.getAttribute('data-feature');
        console.log(`Showing details for: ${feature}`);
        // Implement feature detail view
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializeEnhancedCTA);
// =============================================
// FORM VALIDATION & STAR RATING
// =============================================

function initializeStarRating() {
    const stars = document.querySelectorAll('.stars i');
    if (stars.length === 0) return null;
    
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
                s.style.transform = isHover ? 'scale(1.1)' : 'scale(1)';
            } else {
                s.classList.remove('fas');
                s.classList.add('far');
                s.style.transform = 'scale(1)';
            }
        });
    }

    return {
        getCurrentRating: () => currentRating,
        reset: () => {
            currentRating = 0;
            updateStars(0);
        }
    };
}

function initializeFormValidation() {
    const reviewForm = document.getElementById('reviewForm');
    if (!reviewForm) return;

    const starRating = initializeStarRating();
    if (!starRating) return;

    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (starRating.getCurrentRating() === 0) {
            showNotification('Please select a rating before submitting', 'warning');
            return;
        }
        
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
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Close button event
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
    
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
// =============================================
// CUSTOMIZABLE GLASSES - FIXED VERSION
// =============================================

function initializeCustomization() {
    const glassesBases = document.querySelectorAll('.glasses-base');
    const colorOptions = document.querySelectorAll('.color-option');
    const categories = document.querySelectorAll('.category');
    const categoryContents = document.querySelectorAll('.feature-category-content');
    const featureToggles = document.querySelectorAll('.feature-toggle input');
    
    if (glassesBases.length === 0) return;
    
    let currentColor = 'black';
    let selectedFeatures = new Set(['basic-ar', 'voice-control']);
    let basePrice = 499;
    
    // Initialize - show only black glasses by default
    glassesBases.forEach(glasses => {
        if (glasses.getAttribute('data-color') === 'black') {
            glasses.classList.add('active');
        } else {
            glasses.classList.remove('active');
        }
    });
    
    // Color Selection - FIXED
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            colorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const selectedColor = this.getAttribute('data-color');
            currentColor = selectedColor;
            
            // Hide all glasses first
            glassesBases.forEach(glasses => {
                glasses.classList.remove('active');
                glasses.style.display = 'none';
                glasses.style.opacity = '0';
            });
            
            // Show selected glasses
            const selectedGlasses = document.querySelector(`.glasses-base[data-color="${selectedColor}"]`);
            if (selectedGlasses) {
                selectedGlasses.style.display = 'block';
                setTimeout(() => {
                    selectedGlasses.classList.add('active');
                    selectedGlasses.style.opacity = '1';
                    selectedGlasses.style.transform = 'scale(1.1)';
                    
                    setTimeout(() => {
                        selectedGlasses.style.transform = 'scale(1)';
                    }, 300);
                }, 10);
            }
        });
    });
    
    // Rest of the function remains the same...
    // Category Navigation
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
    
    // Feature Toggles
    featureToggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const featureItem = this.closest('.feature-item');
            const feature = featureItem.getAttribute('data-feature');
            
            if (this.checked) {
                selectedFeatures.add(feature);
            } else {
                selectedFeatures.delete(feature);
            }
            
            updatePricing();
        });
    });
    
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
        
        const featuresTotalEl = document.getElementById('featuresTotal');
        const finalPriceEl = document.getElementById('finalPrice');
        const cartPriceEl = document.getElementById('cartPrice');
        
        if (featuresTotalEl) featuresTotalEl.textContent = `$${featuresTotal}`;
        if (finalPriceEl) finalPriceEl.textContent = `$${finalPrice}`;
        if (cartPriceEl) cartPriceEl.textContent = finalPrice;
        
        if (finalPriceEl) {
            finalPriceEl.style.transform = 'scale(1.1)';
            setTimeout(() => {
                finalPriceEl.style.transform = 'scale(1)';
            }, 300);
        }
    }
    
    // Initialize pricing
    updatePricing();
}
// =============================================
// 3D MODEL ENHANCEMENTS
// =============================================

function initializeEnhancedModel() {
    const modelViewer = document.querySelector('model-viewer');
    if (!modelViewer) return;
    
    modelViewer.addEventListener('load', () => {
        console.log('3D model loaded, applying enhanced settings...');
        
        setTimeout(() => {
            modelViewer.cameraOrbit = '0deg 75deg 2.3m';
            modelViewer.fieldOfView = '25deg';
            modelViewer.cameraTarget = '0m 0.1m 0m';
        }, 1000);
    });
    
    setupZoomControls(modelViewer);
    addResetButton();
}

function setupZoomControls(modelViewer) {
    let scale = 1;
    const minScale = 0.8;
    const maxScale = 1.5;
    
    modelViewer.addEventListener('wheel', (event) => {
        event.preventDefault();
        
        const delta = -event.deltaY * 0.01;
        scale = Math.min(maxScale, Math.max(minScale, scale + delta));
        
        const newDistance = 2.5 / scale;
        modelViewer.cameraOrbit = `0deg 75deg ${newDistance}m`;
    });
    
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

function resetCamera() {
    const modelViewer = document.querySelector('model-viewer');
    if (modelViewer) {
        modelViewer.cameraOrbit = '0deg 75deg 2.5m';
        modelViewer.fieldOfView = '30deg';
    }
}

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

// =============================================
// CART FUNCTIONALITY
// =============================================

function setupAddToCart() {
    const addToCartBtn = document.querySelector('.add-to-cart');
    const cartMessage = document.getElementById('cartMessage');
    const closeMessageBtn = document.getElementById('closeMessage');
    
    if (!addToCartBtn || !cartMessage) return;
    
    addToCartBtn.addEventListener('click', function(e) {
        e.preventDefault();
        showCartMessage(cartMessage);
    });
    
    if (closeMessageBtn) {
        closeMessageBtn.addEventListener('click', function() {
            hideCartMessage(cartMessage);
        });
    }
    
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
    
    setTimeout(() => {
        hideCartMessage(messageElement);
    }, 5000);
}

function hideCartMessage(messageElement) {
    messageElement.classList.remove('show');
}

// =============================================
// MOBILE SCROLLING IMPROVEMENTS
// =============================================

function improveMobileScrolling() {
    const featuresList = document.querySelector('.features-list');
    
    if (featuresList && 'ontouchstart' in window) {
        featuresList.classList.add('touch-scroll');
    }
}

// =============================================
// SCROLL ANIMATIONS & NAVBAR EFFECTS
// =============================================

function initializeScrollAnimations() {
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
}

function initializeNavbarScroll() {
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
}

// =============================================
// USER AUTHENTICATION
// =============================================
function checkUserAuth() {
    const user = JSON.parse(localStorage.getItem('vynaura_user'));
    const customizeSection = document.getElementById('customize');
    const signinCta = document.getElementById('signin-cta');
    const signInBtn = document.getElementById('signInBtn');
    const userStatus = document.getElementById('userStatus');
    
    if (user) {
        // User is logged in
        if (customizeSection) customizeSection.style.display = 'block';
        if (signinCta) signinCta.style.display = 'none';
        if (signInBtn) signInBtn.style.display = 'none';
        if (userStatus) userStatus.style.display = 'flex';
        
        showUserStatus(user);
    } else {
        // User is logged out
        if (customizeSection) customizeSection.style.display = 'none';
        if (signinCta) signinCta.style.display = 'block';
        if (signInBtn) signInBtn.style.display = 'flex';
        if (userStatus) userStatus.style.display = 'none';
    }
}

function showUserStatus(user) {
    const userStatus = document.getElementById('userStatus');
    const userName = document.getElementById('userName');
    const customizeSection = document.getElementById('customize');
    const signinCta = document.getElementById('signin-cta');
    const signInBtn = document.getElementById('signInBtn');
    
    // Update user name in dropdown
    if (userStatus && userName) {
        userName.textContent = user.fullName || user.name;
    }
    
    // Show/hide appropriate sections
    if (customizeSection) customizeSection.style.display = 'block';
    if (signinCta) signinCta.style.display = 'none';
    if (signInBtn) signInBtn.style.display = 'none';
    if (userStatus) userStatus.style.display = 'flex';
    
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
    const signInBtn = document.getElementById('signInBtn');
    const userStatus = document.getElementById('userStatus');
    
    // Show sign in, hide user dropdown and customization
    if (customizeSection) customizeSection.style.display = 'none';
    if (signinCta) signinCta.style.display = 'block';
    if (signInBtn) signInBtn.style.display = 'flex';
    if (userStatus) userStatus.style.display = 'none';
    
    // Remove user data and redirect
    localStorage.removeItem('vynaura_user');
    window.location.href = 'index.html';
}

// Make sure to call this when page loads
document.addEventListener('DOMContentLoaded', checkUserAuth);
// =============================================
// MAIN EVENT LISTENERS
// =============================================

// Single DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - checking authentication');
    checkUserAuth();
    initializeScrollAnimations();
    initializeNavbarScroll();
});

// Single window load listener
window.addEventListener('load', function() {
    console.log('Window fully loaded');
    handleLoadingScreen();
    initializeSite();
});

// Fallback loading screen removal
setTimeout(() => {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen && loadingScreen.parentNode) {
        console.log('Fallback: Removing loading screen');
        handleLoadingScreen();
    }
}, 3000);

console.log('VynAura script loaded successfully!');

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});