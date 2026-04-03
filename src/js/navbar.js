/**
 * Legide Stitches - Navbar Module
 * Mobile menu toggle, overlay handling, and active link management
 */

(function () {
  'use strict';

  const Navbar = {
    toggle: null,
    menu: null,
    overlay: null,
    isOpen: false,

    init() {
      this.toggle = document.getElementById('navbarToggle');
      this.menu = document.getElementById('navbarMenu');
      this.overlay = document.getElementById('navbarOverlay');

      if (!this.toggle || !this.menu) return;

      // Toggle menu
      this.toggle.addEventListener('click', () => this.toggleMenu());

      // Close on overlay click
      if (this.overlay) {
        this.overlay.addEventListener('click', () => this.closeMenu());
      }

      // Close on link click (mobile)
      this.menu.querySelectorAll('[data-nav]').forEach((link) => {
        link.addEventListener('click', () => {
          if (this.isOpen) this.closeMenu();
        });
      });

      // Close on Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.closeMenu();
        }
      });

      // Close on resize to desktop
      window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && this.isOpen) {
          this.closeMenu();
        }
      });
    },

    toggleMenu() {
      this.isOpen ? this.closeMenu() : this.openMenu();
    },

    openMenu() {
      this.isOpen = true;
      this.menu.classList.add('navbar__menu--open');
      this.toggle.classList.add('navbar__toggle--active');
      this.toggle.setAttribute('aria-expanded', 'true');
      if (this.overlay) this.overlay.classList.add('navbar__overlay--visible');
      document.body.style.overflow = 'hidden';
    },

    closeMenu() {
      this.isOpen = false;
      this.menu.classList.remove('navbar__menu--open');
      this.toggle.classList.remove('navbar__toggle--active');
      this.toggle.setAttribute('aria-expanded', 'false');
      if (this.overlay) this.overlay.classList.remove('navbar__overlay--visible');
      document.body.style.overflow = '';
    },
  };

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Navbar.init());
  } else {
    Navbar.init();
  }
})();
