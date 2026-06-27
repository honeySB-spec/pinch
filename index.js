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

  // 6. GSAP Expertise Scroll Effect
  if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // --- Hero Section Cinematic Entrance ---
    function playHeroEntrance() {
      const heroSection = document.querySelector('.hero');
      if (heroSection) {
        const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Video: cinematic zoom-in reveal
        heroTl.fromTo('.bg-video',
          { scale: 1.2, opacity: 0 },
          { scale: 1, opacity: 1, duration: 2 }
        );

        // Cloud card: float up from below
        heroTl.fromTo('.hero-content',
          { y: 60, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 1.2 },
          '-=1.2' // overlap with video
        );

        // Title: slide up and fade in
        heroTl.fromTo('.hero-title',
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          '-=0.7'
        );

        // Subtitle paragraph
        heroTl.fromTo('.hero-actions p',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.4'
        );

        // CTA buttons: stagger in
        heroTl.fromTo('.hero-actions .btn',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.15 },
          '-=0.3'
        );
      }
    }

    // --- Preloader Logic ---
    const preloader = document.getElementById('preloader');
    const progressBar = document.getElementById('preloader-bar');

    const criticalImages = [
      'assets/float_1.png',
      'assets/float_2.png',
      'assets/float_3.png',
      'assets/float_4.png',
      'assets/float_5.png',
      'assets/float_6.png',
      'assets/float_7.png',
      'assets/float_8.png',
      'assets/float_9.png',
      'assets/float_10.png',
      'assets/card_human_data.png',
      'assets/card_arena.png',
      'assets/card_benchmark.png',
      'assets/card_agents.png',
      'assets/mesh_bg.webp',
      'assets/research_portrait.png',
      'assets/footer_mesh.png',
      'assets/bg_noise.png'
    ];

    let loadedCount = 0;
    const totalAssets = criticalImages.length;
    let targetProgress = 0;
    let currentProgress = 0;
    let preloaderDone = false;

    function updateTargetProgress() {
      if (totalAssets > 0) {
        targetProgress = Math.min(100, Math.round((loadedCount / totalAssets) * 100));
      } else {
        targetProgress = 100;
      }
    }

    // Preload Images
    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        updateTargetProgress();
      };
      img.onerror = () => {
        // Still count failures so we don't get stuck
        loadedCount++;
        updateTargetProgress();
      };
    });

    // Safety timeout: force completion after 4.5 seconds
    const safetyTimeout = setTimeout(() => {
      targetProgress = 100;
    }, 4500);

    // Window load event: force completion
    window.addEventListener('load', () => {
      targetProgress = 100;
    });

    // Smooth progress loop
    function animateProgress() {
      if (preloaderDone) return;

      // Linear interpolation for smooth count-up
      const diff = targetProgress - currentProgress;
      if (diff > 0.1) {
        currentProgress += diff * 0.08; // smooth easing factor
      } else {
        currentProgress = targetProgress;
      }

      const visualPercent = Math.min(100, Math.floor(currentProgress));
      
      // Update DOM
      if (progressBar) progressBar.style.width = `${visualPercent}%`;

      if (visualPercent >= 100) {
        preloaderDone = true;
        clearTimeout(safetyTimeout);
        finishPreloader();
      } else {
        requestAnimationFrame(animateProgress);
      }
    }

    // Start progress animation
    requestAnimationFrame(animateProgress);

    function finishPreloader() {
      if (!preloader) {
        document.body.classList.remove('loading');
        playHeroEntrance();
        return;
      }

      if (typeof gsap !== 'undefined') {
        const exitTl = gsap.timeline({
          onComplete: () => {
            preloader.style.display = 'none';
            document.body.classList.remove('loading');
          }
        });

        // Fade out and float up the contents
        exitTl.to('.preloader-content', {
          opacity: 0,
          y: -40,
          duration: 0.6,
          ease: 'power3.in'
        });

        // Slide up the entire preloader panel
        exitTl.to(preloader, {
          yPercent: -100,
          duration: 1.2,
          ease: 'power4.inOut'
        }, '-=0.3');

        // Trigger the hero entrance timeline synchronously with the panel slide-up
        exitTl.add(() => {
          playHeroEntrance();
        }, '-=0.9');
      } else {
        // Fallback if GSAP fails to load
        preloader.style.transition = 'transform 1s ease-in-out, opacity 0.5s ease';
        preloader.style.transform = 'translateY(-100%)';
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.style.display = 'none';
          document.body.classList.remove('loading');
        }, 1000);
      }
    }

    // --- Expertise Scroll Effect ---
    const expSection = document.querySelector('.expertise-scroll');
    if (expSection) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: expSection,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1
        }
      });

      // Text sequence timeline
      tl.to('.exp-text-1', { opacity: 0, y: -50, duration: 1 }, 1)
        .fromTo('.exp-text-2', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, 2)
        .to('.exp-text-2', { opacity: 0, y: -50, duration: 1 }, 3)
        .fromTo('.exp-text-3', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 }, 4)
        .to('.exp-text-3', { opacity: 0, y: -50, duration: 1 }, 5)
        .fromTo('.exp-text-4', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1 }, 6);

      // Images parallax timeline — pairs share timing to match CSS pair layout
      const images = document.querySelectorAll('.exp-img');
      images.forEach((img, i) => {
        // Reduced speed variation for a smoother, slower drift
        const speedMultiplier = 1.1 + (i % 4) * 0.2; // 1.1, 1.3, 1.5, 1.7
        const startOffset = (i % 15) * 0.5; // 15 timing slots → pairs of 2 images max

        tl.to(img, {
          y: '-150vh', // Less distance to travel -> slower perceived speed
          duration: 2 / speedMultiplier, // Longer duration -> slower
          ease: 'none'
        }, startOffset);
      });
    }
  }
});
