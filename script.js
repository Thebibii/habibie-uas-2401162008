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

// Enhanced demo functionality with better mobile support
function toggleDemo() {
  const demoIcon = document.getElementById("demoIcon");
  const demoTitle = document.getElementById("demoTitle");
  const demoButton = document.getElementById("demoButton");
  const demoAnimation = document.getElementById("demoAnimation");

  if (!demoIcon || !demoTitle || !demoButton || !demoAnimation) return;

  const isPlaying = demoIcon.classList.contains("playing");

  if (!isPlaying) {
    // Start demo
    demoIcon.classList.add("playing");
    demoIcon.innerHTML = '<i class="fas fa-pause"></i>';
    demoTitle.textContent = "Demo Sedang Berjalan...";
    demoButton.innerHTML = '<i class="fas fa-pause"></i> Stop Demo';
    demoButton.classList.remove("btn-primary");
    demoButton.classList.add("btn-secondary");
    demoAnimation.style.display = "block";

    // Provide haptic feedback on supported devices
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    showNotification(
      "🚀 Demo dimulai! JavaScript sedang berjalan...",
      "success"
    );
  } else {
    // Stop demo
    demoIcon.classList.remove("playing");
    demoIcon.innerHTML = '<i class="fas fa-play"></i>';
    demoTitle.textContent = "Klik untuk Memulai Demo";
    demoButton.innerHTML = '<i class="fas fa-play"></i> Start Demo';
    demoButton.classList.remove("btn-secondary");
    demoButton.classList.add("btn-primary");
    demoAnimation.style.display = "none";

    showNotification("⏹️ Demo dihentikan", "info");
  }
}

// Enhanced notification system with responsive design
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => notification.remove());

  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;

  const colors = {
    success:
      "background: linear-gradient(135deg, #10b981, #059669); color: white;",
    error:
      "background: linear-gradient(135deg, #ef4444, #dc2626); color: white;",
    warning:
      "background: linear-gradient(135deg, #f59e0b, #d97706); color: white;",
    info: "background: linear-gradient(135deg, #3b82f6, #2563eb); color: white;",
  };

  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    ${colors[type]}
    padding: 1rem 1.5rem;
    border-radius: 0.75rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    animation: slideIn 0.3s ease-out;
    max-width: calc(100vw - 40px);
    font-size: 0.875rem;
    font-weight: 500;
    backdrop-filter: blur(8px);
  `;

  // Responsive positioning for mobile
  if (window.innerWidth < 768) {
    notification.style.cssText += `
      top: 10px;
      right: 10px;
      left: 10px;
      max-width: none;
      text-align: center;
    `;
  }

  notification.innerHTML = `
    <div class="notification-content">
      <span>${message}</span>
      <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;

  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = "slideOut 0.3s ease-in";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// Video demo functionality
function playDemo() {
  showNotification("🎬 Demo video akan segera dimulai!", "info");

  // Simulate video loading
  setTimeout(() => {
    showNotification("📹 Fitur video demo akan segera tersedia!", "warning");
  }, 1000);
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

// Enhanced contact form handling
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Basic form validation
      const requiredFields = this.querySelectorAll("[required]");
      let isValid = true;

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = "#ef4444";
          field.addEventListener(
            "input",
            function () {
              this.style.borderColor = "";
            },
            { once: true }
          );
        }
      });

      if (isValid) {
        // Simulate form submission
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;

        submitButton.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
        submitButton.disabled = true;

        setTimeout(() => {
          showNotification(
            "✅ Pesan berhasil dikirim! Kami akan segera menghubungi Anda.",
            "success"
          );
          this.reset();
          submitButton.innerHTML = originalText;
          submitButton.disabled = false;
        }, 2000);
      } else {
        showNotification(
          "❌ Mohon lengkapi semua field yang wajib diisi.",
          "error"
        );
      }
    });
  }
});

// Add loading animation for page transitions
window.addEventListener("beforeunload", () => {
  document.body.style.opacity = "0.7";
  document.body.style.transition = "opacity 0.3s ease";
});

// Add some fun easter eggs with mobile support
let clickCount = 0;
document.querySelector(".logo")?.addEventListener("click", (e) => {
  clickCount++;

  // Add visual feedback
  e.target.style.transform = "scale(0.95)";
  setTimeout(() => {
    e.target.style.transform = "";
  }, 150);

  if (clickCount === 5) {
    showNotification(
      "🎉 Easter egg found! You clicked the logo 5 times!",
      "success"
    );
    clickCount = 0;

    // Confetti effect for desktop
    if (window.innerWidth > 768) {
      createConfetti();
    }
  }
});

// Simple confetti effect
function createConfetti() {
  const colors = ["#2563eb", "#7c3aed", "#10b981", "#f59e0b"];

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement("div");
    confetti.style.cssText = `
      position: fixed;
      width: 10px;
      height: 10px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      top: -10px;
      left: ${Math.random() * 100}vw;
      z-index: 1000;
      pointer-events: none;
      animation: confetti-fall 3s linear forwards;
    `;

    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 3000);
  }

  // Add confetti animation
  if (!document.querySelector("#confetti-css")) {
    const style = document.createElement("style");
    style.id = "confetti-css";
    style.textContent = `
      @keyframes confetti-fall {
        to {
          transform: translateY(100vh) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

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
