document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Intersection Observer for Scroll-driven animations
  const revealElements = document.querySelectorAll(
    '.reveal-fade, .reveal-slide-up, .reveal-slide-right, .reveal-slide-left'
  );

  const observerOptions = {
    root: null, // Viewport
    threshold: 0.1, // Trigger when 10% visible
    rootMargin: '0px 0px -80px 0px' // Adjust to trigger slightly before element enters
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once animated, we don't need to observe it anymore
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));

  // 3. Premium cursor hover depth effect for Taste Mesh section
  const tasteMeshSection = document.querySelector('.taste-mesh');
  const floatLayer = document.getElementById('float-layer');
  const floatItems = document.querySelectorAll('.float-item');

  if (tasteMeshSection && floatLayer) {
    tasteMeshSection.addEventListener('mousemove', (e) => {
      const rect = tasteMeshSection.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within element
      const y = e.clientY - rect.top;  // y position within element
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const deltaX = (x - centerX) / centerX; // value between -1 and 1
      const deltaY = (y - centerY) / centerY; // value between -1 and 1
      
      // Animate each floating item with slightly different weights (depth speed)
      floatItems.forEach((item, index) => {
        const factor = (index % 3 + 1) * 15; // 15px, 30px, 45px max movement
        const moveX = deltaX * factor;
        const moveY = deltaY * factor;
        
        item.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });
    });

    // Reset positions when mouse leaves the section
    tasteMeshSection.addEventListener('mouseleave', () => {
      floatItems.forEach(item => {
        item.style.transform = 'translate3d(0, 0, 0)';
        item.style.transition = 'transform 0.5s ease-out';
      });
    });

    tasteMeshSection.addEventListener('mouseenter', () => {
      floatItems.forEach(item => {
        item.style.transition = 'none'; // Instant transition while inside
      });
    });
  }

  // 4. Mobile responsive menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenuBtn.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // 5. FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      
      // Close all other FAQ items first
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          const otherContent = otherItem.querySelector('.faq-content');
          otherTrigger.setAttribute('aria-expanded', 'false');
          otherContent.style.maxHeight = null;
        }
      });

      // Toggle current FAQ item
      if (isOpen) {
        trigger.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = null;
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
});
