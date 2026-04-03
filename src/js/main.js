/**
 * Legide Stitches - Main JavaScript
 * Core utilities, theme management, and initialization
 */

(function () {
  'use strict';

  // === Theme Management ===
  const ThemeManager = {
    STORAGE_KEY: 'legide-theme',

    init() {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = saved || (prefersDark ? 'dark' : 'light');
      this.apply(theme);

      const toggle = document.getElementById('themeToggle');
      if (toggle) {
        toggle.addEventListener('click', () => this.toggle());
      }

      // Listen for system theme changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(this.STORAGE_KEY)) {
          this.apply(e.matches ? 'dark' : 'light');
        }
      });
    },

    apply(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      this.updateIcons(theme);
    },

    toggle() {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      this.apply(next);
      localStorage.setItem(this.STORAGE_KEY, next);
    },

    updateIcons(theme) {
      const lightIcon = document.querySelector('.theme-icon--light');
      const darkIcon = document.querySelector('.theme-icon--dark');
      if (lightIcon && darkIcon) {
        lightIcon.style.display = theme === 'dark' ? 'block' : 'none';
        darkIcon.style.display = theme === 'dark' ? 'none' : 'block';
      }
    },
  };

  // === Scroll Progress ===
  const ScrollProgress = {
    init() {
      const bar = document.querySelector('.scroll-progress');
      if (!bar) return;

      const update = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? scrollTop / docHeight : 0;
        bar.style.transform = `scaleX(${progress})`;
      };

      window.addEventListener('scroll', update, { passive: true });
      update();
    },
  };

  // === Smooth Scroll ===
  const SmoothScroll = {
    init() {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
          const target = document.querySelector(anchor.getAttribute('href'));
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });
    },
  };

  // === Form Validation ===
  const FormValidator = {
    init() {
      document.querySelectorAll('[data-form]').forEach((form) => {
        form.addEventListener('submit', (e) => this.handleSubmit(e, form));

        // Real-time validation on blur
        form.querySelectorAll('[data-field]').forEach((field) => {
          field.addEventListener('blur', () => this.validateField(field));
          field.addEventListener('input', () => {
            const group = field.closest('.form-group');
            if (group && group.classList.contains('form-group--error')) {
              this.validateField(field);
            }
          });
        });
      });
    },

    validateField(field) {
      const group = field.closest('.form-group');
      if (!group) return true;

      const value = field.value.trim();
      let isValid = true;

      if (field.required && !value) {
        isValid = false;
      }

      if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
      }

      group.classList.toggle('form-group--error', !isValid);
      return isValid;
    },

    handleSubmit(e, form) {
      e.preventDefault();

      const fields = form.querySelectorAll('[data-field]');
      let allValid = true;

      fields.forEach((field) => {
        if (!this.validateField(field)) {
          allValid = false;
        }
      });

      if (!allValid) return;

      // Collect form data
      const formData = {};
      fields.forEach((field) => {
        formData[field.dataset.field] = field.value.trim();
      });

      // Simulate submission (ready for backend integration)
      this.submitForm(form, formData);
    },

    async submitForm(form, data) {
      const submitBtn = form.querySelector('[type="submit"]');
      const originalText = submitBtn.innerHTML;

      // Loading state
      submitBtn.classList.add('btn--loading');
      submitBtn.disabled = true;

      try {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/contact', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(data),
        // });

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Success
        form.reset();
        submitBtn.classList.remove('btn--loading');
        submitBtn.innerHTML = '✓ Sent Successfully!';
        submitBtn.style.background = 'var(--color-success)';
        submitBtn.style.borderColor = 'var(--color-success)';

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.style.borderColor = '';
          submitBtn.disabled = false;
        }, 3000);
      } catch (error) {
        submitBtn.classList.remove('btn--loading');
        submitBtn.disabled = false;
        console.error('Form submission error:', error);
      }
    },
  };

  // === Product Filtering (Shop Page) ===
  const ProductFilter = {
    init() {
      const filterBtns = document.querySelectorAll('[data-filter]');
      const grid = document.querySelector('[data-product-grid]');
      if (!filterBtns.length || !grid) return;

      // Check URL params for category
      const params = new URLSearchParams(window.location.search);
      const category = params.get('category');
      if (category) {
        this.filterProducts(category, grid, filterBtns);
      }

      filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
          const filter = btn.dataset.filter;

          // Update active state
          filterBtns.forEach((b) => b.classList.remove('filter-bar__btn--active'));
          btn.classList.add('filter-bar__btn--active');

          this.filterProducts(filter, grid, filterBtns);
        });
      });
    },

    filterProducts(category, grid, filterBtns) {
      const products = grid.querySelectorAll('.product-card');

      products.forEach((product) => {
        const productCategory = product.dataset.category;
        const shouldShow = category === 'all' || productCategory === category;

        product.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

        if (shouldShow) {
          product.style.display = '';
          requestAnimationFrame(() => {
            product.style.opacity = '1';
            product.style.transform = 'translateY(0)';
          });
        } else {
          product.style.opacity = '0';
          product.style.transform = 'translateY(20px)';
          setTimeout(() => {
            product.style.display = 'none';
          }, 300);
        }
      });
    },
  };

  // === Lazy Loading Images ===
  const LazyLoader = {
    init() {
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                  img.src = img.dataset.src;
                  img.removeAttribute('data-src');
                }
                img.classList.add('loaded');
                imageObserver.unobserve(img);
              }
            });
          },
          { rootMargin: '200px 0px' }
        );

        document.querySelectorAll('img[data-src]').forEach((img) => {
          imageObserver.observe(img);
        });
      }
    },
  };

  // === Navbar Scroll Behavior ===
  const NavbarScroll = {
    init() {
      const navbar = document.querySelector('.navbar');
      if (!navbar) return;

      let lastScroll = 0;

      const handleScroll = () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 50) {
          navbar.classList.add('navbar--scrolled');
        } else {
          navbar.classList.remove('navbar--scrolled');
        }

        lastScroll = currentScroll;
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    },
  };

  // === Initialize Everything ===
  document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    ScrollProgress.init();
    SmoothScroll.init();
    FormValidator.init();
    ProductFilter.init();
    LazyLoader.init();
    NavbarScroll.init();

    // Dispatch custom event for other modules
    window.dispatchEvent(new CustomEvent('legide:init'));
  });
})();
