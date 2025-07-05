// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all interactive features
  initializeScrollAnimations();
  initializeSmoothScrolling();
  initializeResponsiveFeatures();
  initializeTouchSupport();
  initializeHamburgerMenu();

  console.log("TechFlow website loaded successfully! 🚀");
});

// Initialize hamburger menu functionality
function initializeHamburgerMenu() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      // Toggle hamburger animation
      this.classList.toggle("active");

      // Toggle navigation menu
      navLinks.classList.toggle("active");

      // Add haptic feedback on supported devices
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    });

    // Close menu when clicking on a link
    const navLinkItems = navLinks.querySelectorAll(".nav-link");
    navLinkItems.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
      const isClickInsideNav = navLinks.contains(event.target);
      const isClickOnHamburger = hamburger.contains(event.target);

      if (
        !isClickInsideNav &&
        !isClickOnHamburger &&
        navLinks.classList.contains("active")
      ) {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      }
    });

    // Close menu on escape key
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navLinks.classList.contains("active")) {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      }
    });

    // Handle window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      }
    });
  }
}

// Enhanced scroll animations with better performance
function initializeScrollAnimations() {
  // Create intersection observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
        // Unobserve after animation to improve performance
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".feature-card, .portfolio-item, .team-card, .contact-method, .stat-card, .widget-card"
  );

  animateElements.forEach((el, index) => {
    el.classList.add("animate-on-scroll");
    // Stagger animations for better visual effect
    el.style.animationDelay = `${index * 0.1}s`;
    observer.observe(el);
  });

  // Add CSS for scroll animations
  if (!document.querySelector("#scroll-animations-css")) {
    const style = document.createElement("style");
    style.id = "scroll-animations-css";
    style.textContent = `
      .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
      }
      
      .animate-on-scroll.animate-in {
        opacity: 1;
        transform: translateY(0);
      }
      
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
      
      .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
      
      .notification-close {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 0.25rem;
        opacity: 0.7;
        transition: opacity 0.2s;
      }
      
      .notification-close:hover {
        opacity: 1;
      }
      
      /* Responsive animation adjustments */
      @media (max-width: 768px) {
        .animate-on-scroll {
          transform: translateY(20px);
        }
      }
      
      @media (prefers-reduced-motion: reduce) {
        .animate-on-scroll {
          transition: none;
          opacity: 1;
          transform: none;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// Enhanced smooth scrolling
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const headerHeight =
          document.querySelector(".header")?.offsetHeight || 0;
        const targetPosition = target.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Initialize responsive features
function initializeResponsiveFeatures() {
  // Handle viewport changes
  function handleViewportChange() {
    const viewport = window.innerWidth;
    const body = document.body;

    // Add viewport classes for CSS targeting
    body.classList.remove(
      "viewport-xs",
      "viewport-sm",
      "viewport-md",
      "viewport-lg",
      "viewport-xl"
    );

    if (viewport < 576) {
      body.classList.add("viewport-xs");
    } else if (viewport < 768) {
      body.classList.add("viewport-sm");
    } else if (viewport < 992) {
      body.classList.add("viewport-md");
    } else if (viewport < 1200) {
      body.classList.add("viewport-lg");
    } else {
      body.classList.add("viewport-xl");
    }

    // Adjust sidebar behavior on mobile
    const sidebar = document.querySelector(".sidebar");
    if (sidebar && viewport < 1200) {
      sidebar.style.position = "static";
    } else if (sidebar) {
      sidebar.style.position = "";
    }
  }

  // Initial call and event listener
  handleViewportChange();
  window.addEventListener("resize", debounce(handleViewportChange, 250));

  // Handle orientation changes
  window.addEventListener("orientationchange", () => {
    setTimeout(handleViewportChange, 100);
  });
}

// Initialize touch support for mobile devices
function initializeTouchSupport() {
  // Add touch classes for better mobile interaction
  if ("ontouchstart" in window) {
    document.body.classList.add("touch-device");

    // Improve button interactions on touch devices
    const buttons = document.querySelectorAll(
      ".btn, .nav-link, .portfolio-item"
    );
    buttons.forEach((button) => {
      button.addEventListener("touchstart", function () {
        this.classList.add("touch-active");
      });

      button.addEventListener("touchend", function () {
        setTimeout(() => {
          this.classList.remove("touch-active");
        }, 150);
      });
    });
  }

  // Handle form inputs on mobile
  const inputs = document.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.addEventListener("focus", function () {
      // Prevent zoom on iOS
      if (window.innerWidth < 768) {
        this.style.fontSize = "16px";
      }
    });
  });
}

// Utility function for debouncing
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

// Enhanced lazy loading with better performance
function initializeLazyLoading() {
  const images = document.querySelectorAll('img[src*="picsum.photos"]');

  const imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.style.opacity = "0";
          img.style.transition = "opacity 0.3s ease";

          const newImg = new Image();
          newImg.onload = function () {
            img.src = this.src;
            img.style.opacity = "1";
          };
          newImg.onerror = () => {
            // Fallback for failed images
            img.src = "/placeholder.svg?height=250&width=400";
            img.style.opacity = "1";
          };
          newImg.src = img.src;

          imageObserver.unobserve(img);
        }
      });
    },
    {
      rootMargin: "50px",
    }
  );

  images.forEach((img) => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener("DOMContentLoaded", initializeLazyLoading);

// Add loading animation for page transitions
window.addEventListener("beforeunload", () => {
  document.body.style.opacity = "0.7";
  document.body.style.transition = "opacity 0.3s ease";
});

// Performance monitoring
function initializePerformanceMonitoring() {
  // Monitor page load performance
  window.addEventListener("load", () => {
    if ("performance" in window) {
      const perfData = performance.getEntriesByType("navigation")[0];
      console.log(
        `Page loaded in ${Math.round(
          perfData.loadEventEnd - perfData.loadEventStart
        )}ms`
      );
    }
  });

  // Monitor scroll performance
  let scrollTimeout;
  window.addEventListener(
    "scroll",
    () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          scrollTimeout = null;
          // Optimize animations during scroll
          document.body.classList.add("scrolling");
          clearTimeout(document.body.scrollEndTimer);
          document.body.scrollEndTimer = setTimeout(() => {
            document.body.classList.remove("scrolling");
          }, 150);
        }, 10);
      }
    },
    { passive: true }
  );
}

// Initialize performance monitoring
document.addEventListener("DOMContentLoaded", initializePerformanceMonitoring);

// Service Worker registration for better performance (optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Only register in production
    if (location.protocol === "https:" || location.hostname === "localhost") {
      console.log("Service Worker support detected");
      // navigator.serviceWorker.register('/sw.js'); // Uncomment when SW is available
    }
  });
}

// Add CSS for touch device optimizations
const touchStyles = document.createElement("style");
touchStyles.textContent = `
  .touch-device .btn:hover {
    transform: none;
  }
  
  .touch-device .btn.touch-active {
    transform: scale(0.95);
    opacity: 0.8;
  }
  
  .touch-device .nav-link:hover {
    transform: none;
  }
  
  .touch-device .feature-card:hover,
  .touch-device .team-card:hover,
  .touch-device .portfolio-item:hover {
    transform: none;
  }
  
  .scrolling * {
    pointer-events: none;
  }
  
  .scrolling .animate-on-scroll {
    transition-duration: 0.3s;
  }
`;
document.head.appendChild(touchStyles);
