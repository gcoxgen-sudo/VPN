// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileNavigation();
    initFAQ();
    initScrollAnimations();
    initStickyButton();
    initSmoothScrolling();
    initPerformanceOptimizations();
    initMobileOptimizations();
});

// Mobile Navigation
function initMobileNavigation() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (!mobileMenuBtn || !mobileNav) return;
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking on links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileNav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            mobileNav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

// Mobile Optimizations
function initMobileOptimizations() {
    // Prevent zoom on double tap
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Improve touch scrolling
    document.addEventListener('touchstart', function() {}, { passive: true });
    document.addEventListener('touchmove', function() {}, { passive: true });
    
    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            // Recalculate viewport height
            document.documentElement.style.setProperty('--vh', window.innerHeight * 0.01 + 'px');
        }, 100);
    });
    
    // Set CSS custom property for viewport height
    function setViewportHeight() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', vh + 'px');
    }
    
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    
    // Add mobile-specific classes
    if (isMobile()) {
        document.body.classList.add('mobile-device');
    }
    
    // Optimize for mobile performance
    if (isMobile()) {
        // Reduce animations on mobile
        document.body.classList.add('reduce-motion');
        
        // Lazy load images more aggressively
        const images = document.querySelectorAll('img[data-src]');
        if (images.length > 0) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            }, { rootMargin: '50px' });
            
            images.forEach(img => imageObserver.observe(img));
        }
    }
}

// Check if device is mobile
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           window.innerWidth <= 768;
}

// FAQ Functionality
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    otherAnswer.style.maxHeight = '0';
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
                answer.style.maxHeight = '0';
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.advantage-card, .pricing-card, .review-card, .faq-item, .section-header'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Add CSS for animation
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// Sticky Button
function initStickyButton() {
    const stickyButton = document.getElementById('sticky-button');
    const heroSection = document.getElementById('hero');
    
    if (!stickyButton || !heroSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                stickyButton.style.display = 'none';
            } else {
                stickyButton.style.display = 'block';
            }
        });
    }, {
        threshold: 0.1
    });
    
    observer.observe(heroSection);
}

// Smooth Scrolling
function initSmoothScrolling() {
    // Add smooth scrolling to all anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Performance Optimizations
function initPerformanceOptimizations() {
    // Lazy load images (if any are added later)
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Preload critical resources
    preloadCriticalResources();
    
    // Optimize scroll performance
    optimizeScrollPerformance();
}

// Preload critical resources
function preloadCriticalResources() {
    // Preload fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap';
    fontLink.as = 'style';
    document.head.appendChild(fontLink);
}

// Optimize scroll performance
function optimizeScrollPerformance() {
    let ticking = false;
    
    function updateScrollEffects() {
        // Add any scroll-based effects here
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

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
    };
}

// Enhanced FAQ with keyboard navigation
function enhanceFAQAccessibility() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        
        // Add keyboard navigation
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                const nextItem = faqItems[index + 1];
                if (nextItem) {
                    nextItem.querySelector('.faq-question').focus();
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prevItem = faqItems[index - 1];
                if (prevItem) {
                    prevItem.querySelector('.faq-question').focus();
                }
            }
        });
        
        // Add ARIA attributes
        question.setAttribute('aria-expanded', 'false');
        question.setAttribute('role', 'button');
        question.setAttribute('tabindex', '0');
        
        const answer = item.querySelector('.faq-answer');
        answer.setAttribute('aria-hidden', 'true');
    });
}

// Initialize accessibility enhancements
document.addEventListener('DOMContentLoaded', function() {
    enhanceFAQAccessibility();
});

// Analytics and Tracking (placeholder)
function trackEvent(eventName, eventData = {}) {
    // Add your analytics tracking code here
    console.log('Event tracked:', eventName, eventData);
    
    // Example: Google Analytics 4
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', eventName, eventData);
    // }
}

// Track CTA button clicks
document.addEventListener('click', function(e) {
    if (e.target.matches('.cta-button, .plan-button, .sticky-button-content')) {
        trackEvent('cta_click', {
            button_text: e.target.textContent.trim(),
            button_location: e.target.closest('section')?.id || 'unknown'
        });
    }
});

// Touch interactions for mobile
function initTouchInteractions() {
    // Add touch feedback to interactive elements
    const touchElements = document.querySelectorAll('.cta-button, .plan-button, .mobile-cta-btn, .faq-question, .mobile-nav-link');
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.classList.add('touch-feedback');
        }, { passive: true });
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touch-feedback');
            }, 100);
        }, { passive: true });
        
        element.addEventListener('touchcancel', function() {
            this.classList.remove('touch-feedback');
        }, { passive: true });
    });
    
    // Improve scroll performance on mobile
    let ticking = false;
    function updateScrollPosition() {
        // Add any scroll-based mobile optimizations here
        ticking = false;
    }
    
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollPosition);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    
    // Handle mobile menu gestures
    let startY = 0;
    let currentY = 0;
    let isDragging = false;
    
    const mobileNav = document.getElementById('mobile-nav');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    
    if (mobileNav && mobileMenuBtn) {
        mobileNav.addEventListener('touchstart', function(e) {
            startY = e.touches[0].clientY;
            isDragging = true;
        }, { passive: true });
        
        mobileNav.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            currentY = e.touches[0].clientY;
            const diff = startY - currentY;
            
            if (diff < -50) { // Swipe down to close
                mobileNav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.classList.remove('menu-open');
                isDragging = false;
            }
        }, { passive: true });
        
        mobileNav.addEventListener('touchend', function() {
            isDragging = false;
        }, { passive: true });
    }
}

// Initialize touch interactions
document.addEventListener('DOMContentLoaded', function() {
    initTouchInteractions();
});

// Track FAQ interactions
document.addEventListener('click', function(e) {
    if (e.target.matches('.faq-question')) {
        const question = e.target.textContent.trim();
        const isExpanded = e.target.closest('.faq-item').classList.contains('active');
        
        trackEvent('faq_interaction', {
            question: question,
            action: isExpanded ? 'close' : 'open'
        });
    }
});

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You can add error reporting here
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when you have a service worker
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// Performance Monitoring
function measurePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                
                console.log('Performance metrics:', {
                    loadTime: perfData.loadEventEnd - perfData.loadEventStart,
                    domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                    firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0
                });
            }, 0);
        });
    }
}

// Initialize performance monitoring
measurePerformance();

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initFAQ,
        initScrollAnimations,
        initStickyButton,
        initSmoothScrolling,
        debounce,
        throttle
    };
}
