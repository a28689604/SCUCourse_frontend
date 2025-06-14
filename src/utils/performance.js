import { getCLS, getFCP, getFID, getLCP, getTTFB } from "web-vitals";

// Web Vitals tracking for performance monitoring
export const trackWebVitals = () => {
  if (typeof window !== "undefined") {
    getCLS(console.log);
    getFCP(console.log);
    getFID(console.log);
    getLCP(console.log);
    getTTFB(console.log);
  }
};

// Image optimization helper
export const optimizeImage = (src, _width = 800, _quality = 80) => {
  // Add parameters for image optimization if using a service like Cloudinary
  return src;
};

// Debounce function for performance optimization
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      window.clearTimeout(timeout);
      func(...args);
    };
    window.clearTimeout(timeout);
    timeout = window.setTimeout(later, wait);
  };
};

// Throttle function for scroll events
export const throttle = (func, limit) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      window.setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Lazy loading intersection observer
export const createLazyLoadObserver = callback => {
  if ("IntersectionObserver" in window) {
    return new window.IntersectionObserver(callback, {
      rootMargin: "50px 0px",
      threshold: 0.01,
    });
  }
  return null;
};
