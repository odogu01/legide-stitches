/**
 * Legide Stitches - Testimonial Slider Module
 * Carousel with auto-play, navigation, and dot indicators
 */

(function () {
  'use strict';

  const TestimonialSlider = {
    track: null,
    slides: [],
    dots: [],
    prevBtn: null,
    nextBtn: null,
    currentIndex: 0,
    autoPlayInterval: null,
    autoPlayDelay: 5000,
    isTransitioning: false,

    init() {
      this.track = document.getElementById('testimonialTrack');
      if (!this.track) return;

      this.slides = Array.from(this.track.querySelectorAll('.testimonials__slide'));
      this.dots = Array.from(document.querySelectorAll('.testimonials__dot'));
      this.prevBtn = document.getElementById('prevTestimonial');
      this.nextBtn = document.getElementById('nextTestimonial');

      if (!this.slides.length) return;

      // Event listeners
      if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
      if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());

      this.dots.forEach((dot) => {
        dot.addEventListener('click', () => {
          this.goTo(parseInt(dot.dataset.slide, 10));
        });
      });

      // Touch/swipe support
      this.initSwipe();

      // Auto-play
      this.startAutoPlay();

      // Pause on hover
      const slider = this.track.closest('.testimonials__slider');
      if (slider) {
        slider.addEventListener('mouseenter', () => this.stopAutoPlay());
        slider.addEventListener('mouseleave', () => this.startAutoPlay());
      }

      // Pause when not visible
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              entry.isIntersecting ? this.startAutoPlay() : this.stopAutoPlay();
            });
          },
          { threshold: 0.3 }
        );
        observer.observe(slider);
      }
    },

    goTo(index) {
      if (this.isTransitioning) return;
      this.isTransitioning = true;
      this.currentIndex = index;

      this.track.style.transform = `translateX(-${index * 100}%)`;

      // Update dots
      this.dots.forEach((dot, i) => {
        dot.classList.toggle('testimonials__dot--active', i === index);
        dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
      });

      setTimeout(() => {
        this.isTransitioning = false;
      }, 500);
    },

    next() {
      const nextIndex = (this.currentIndex + 1) % this.slides.length;
      this.goTo(nextIndex);
    },

    prev() {
      const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
      this.goTo(prevIndex);
    },

    startAutoPlay() {
      this.stopAutoPlay();
      this.autoPlayInterval = setInterval(() => this.next(), this.autoPlayDelay);
    },

    stopAutoPlay() {
      if (this.autoPlayInterval) {
        clearInterval(this.autoPlayInterval);
        this.autoPlayInterval = null;
      }
    },

    initSwipe() {
      let startX = 0;
      let endX = 0;
      const threshold = 50;

      this.track.addEventListener(
        'touchstart',
        (e) => {
          startX = e.touches[0].clientX;
        },
        { passive: true }
      );

      this.track.addEventListener(
        'touchend',
        (e) => {
          endX = e.changedTouches[0].clientX;
          const diff = startX - endX;

          if (Math.abs(diff) > threshold) {
            diff > 0 ? this.next() : this.prev();
          }
        },
        { passive: true }
      );
    },
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => TestimonialSlider.init());
  } else {
    TestimonialSlider.init();
  }
})();
