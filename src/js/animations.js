/**
 * Legide Stitches - Animations Module
 * Scroll-triggered fade-in animations using IntersectionObserver
 */

(function () {
  'use strict';

  const ScrollAnimations = {
    observer: null,

    init() {
      if (!('IntersectionObserver' in window)) {
        // Fallback: show all elements immediately
        document.querySelectorAll('.fade-in').forEach((el) => {
          el.classList.add('fade-in--visible');
        });
        return;
      }

      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('fade-in--visible');
              this.observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px',
        }
      );

      // Observe all fade-in elements
      document.querySelectorAll('.fade-in').forEach((el) => {
        this.observer.observe(el);
      });
    },
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ScrollAnimations.init());
  } else {
    ScrollAnimations.init();
  }
})();
