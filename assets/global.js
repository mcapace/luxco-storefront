/**
 * Luxco Yellowstone Storefront - Global JavaScript
 */

(function() {
  'use strict';

  // Utility functions
  const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), delay);
    };
  };

  // Header scroll behavior
  const initHeaderScroll = () => {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let lastScroll = 0;
    const scrollThreshold = 50;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > scrollThreshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    });
  };

  // Mobile menu functionality
  const initMobileMenu = () => {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.mobile-nav');
    const close = document.querySelector('.mobile-nav-close');
    const overlay = document.querySelector('.mobile-overlay');

    if (!toggle || !nav) return;

    const openMenu = () => {
      nav.classList.add('active');
      overlay?.classList.add('active');
      document.body.style.overflow = 'hidden';
      toggle.setAttribute('aria-expanded', 'true');
    };

    const closeMenu = () => {
      nav.classList.remove('active');
      overlay?.classList.remove('active');
      document.body.style.overflow = '';
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', openMenu);
    close?.addEventListener('click', closeMenu);
    overlay?.addEventListener('click', closeMenu);

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('active')) {
        closeMenu();
      }
    });
  };

  // Smooth scroll for anchor links
  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  };

  // Lazy loading images
  const initLazyLoad = () => {
    if ('loading' in HTMLImageElement.prototype) {
      // Browser supports native lazy loading
      document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        img.src = img.dataset.src || img.src;
      });
    } else {
      // Fallback for older browsers
      const lazyImages = document.querySelectorAll('img[loading="lazy"]');

      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src || img.src;
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      });

      lazyImages.forEach(img => imageObserver.observe(img));
    }
  };

  // Animation on scroll
  const initScrollAnimations = () => {
    const animatedElements = document.querySelectorAll('[data-animate]');

    if (animatedElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
  };

  // Product quantity selector
  const initQuantitySelectors = () => {
    document.querySelectorAll('.quantity-selector').forEach(selector => {
      const decreaseBtn = selector.querySelector('[data-action="decrease"]');
      const increaseBtn = selector.querySelector('[data-action="increase"]');
      const input = selector.querySelector('.quantity-input');

      if (!decreaseBtn || !increaseBtn || !input) return;

      decreaseBtn.addEventListener('click', () => {
        const value = parseInt(input.value);
        if (value > 1) {
          input.value = value - 1;
          input.dispatchEvent(new Event('change'));
        }
      });

      increaseBtn.addEventListener('click', () => {
        const value = parseInt(input.value);
        const max = input.max ? parseInt(input.max) : Infinity;
        if (value < max) {
          input.value = value + 1;
          input.dispatchEvent(new Event('change'));
        }
      });

      input.addEventListener('change', () => {
        const value = parseInt(input.value);
        const min = input.min ? parseInt(input.min) : 1;
        const max = input.max ? parseInt(input.max) : Infinity;

        if (value < min) input.value = min;
        if (value > max) input.value = max;
      });
    });
  };

  // Age verification modal
  const initAgeVerification = () => {
    const ageVerified = localStorage.getItem('age_verified');
    const modal = document.querySelector('.age-gate-overlay');

    if (!modal || ageVerified === 'true') {
      modal?.remove();
      return;
    }

    modal.style.display = 'flex';

    const confirmBtn = modal.querySelector('[data-age-confirm]');
    const denyBtn = modal.querySelector('[data-age-deny]');

    confirmBtn?.addEventListener('click', () => {
      localStorage.setItem('age_verified', 'true');
      modal.remove();
    });

    denyBtn?.addEventListener('click', () => {
      window.location.href = 'https://www.responsibility.org/';
    });
  };

  // Product image gallery
  const initProductGallery = () => {
    const mainImage = document.getElementById('ProductImage');
    const thumbnails = document.querySelectorAll('.product-thumbnail');

    if (!mainImage || thumbnails.length === 0) return;

    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', function() {
        thumbnails.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        mainImage.src = this.dataset.imageUrl;
        mainImage.srcset = '';
      });
    });
  };

  // Add to cart functionality (Shopify AJAX)
  const initAddToCart = () => {
    const forms = document.querySelectorAll('form[action="/cart/add"]');

    forms.forEach(form => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.textContent = 'Adding...';
        submitBtn.disabled = true;

        try {
          const formData = new FormData(form);
          const response = await fetch('/cart/add.js', {
            method: 'POST',
            body: formData
          });

          if (response.ok) {
            submitBtn.textContent = 'Added!';

            // Update cart count in header
            const cartCount = document.querySelector('.cart-count');
            if (cartCount) {
              const cartResponse = await fetch('/cart.js');
              const cart = await cartResponse.json();
              cartCount.textContent = cart.item_count;
              cartCount.style.display = cart.item_count > 0 ? 'flex' : 'none';
            }

            setTimeout(() => {
              submitBtn.textContent = originalText;
              submitBtn.disabled = false;
            }, 2000);
          } else {
            throw new Error('Failed to add item');
          }
        } catch (error) {
          submitBtn.textContent = 'Error';
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
          }, 2000);
        }
      });
    });
  };

  // Newsletter form
  const initNewsletter = () => {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = form.querySelector('input[type="email"]');
      const button = form.querySelector('button');
      const message = form.querySelector('.newsletter-message');

      if (!email.value) return;

      button.disabled = true;
      button.textContent = 'Subscribing...';

      // Simulate API call (replace with actual newsletter service integration)
      setTimeout(() => {
        button.textContent = 'Subscribed!';
        email.value = '';

        if (message) {
          message.textContent = 'Thank you for subscribing!';
          message.style.display = 'block';
        }

        setTimeout(() => {
          button.disabled = false;
          button.textContent = 'Subscribe';
        }, 3000);
      }, 1000);
    });
  };

  // Initialize everything when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initMobileMenu();
    initSmoothScroll();
    initLazyLoad();
    initScrollAnimations();
    initQuantitySelectors();
    initAgeVerification();
    initProductGallery();
    initAddToCart();
    initNewsletter();
  });

})();
