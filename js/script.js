document.addEventListener('DOMContentLoaded', () => {
  // --- Navigation ---
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('#navLinks');

  const toggleMenu = (event) => {
    if (!hamburger || !navLinks) return;
    event.stopPropagation();
    navLinks.classList.toggle('show');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
  };

  const closeMenuOnClickOutside = (event) => {
    if (!hamburger || !navLinks) return;
    const isClickInsideNavbar = event.target.closest('.navbar');
    if (!isClickInsideNavbar && navLinks.classList.contains('show')) {
      navLinks.classList.remove('show');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  };

  const setupSmoothScrolling = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        if (anchor.hash) {
          e.preventDefault();
          const target = document.querySelector(anchor.hash);
          if (target) {
            const offset = window.innerWidth <= 480 ? 50 : window.innerWidth <= 576 ? 60 : window.innerWidth <= 768 ? 70 : 90;
            window.scrollTo({
              top: target.offsetTop - offset,
              behavior: 'smooth'
            });
            if (window.innerWidth <= 768 && navLinks.classList.contains('show')) {
              toggleMenu(e);
            }
          }
        }
      });
    });
  };

  // --- Form Submission ---
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log('Form submitted:', Object.fromEntries(formData));
    alert('Thank you for your message! We will get back to you soon.');
    event.target.reset();
  };

  // --- Testimonial Carousel ---
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const cardsWrapper = document.querySelector('.testimonial-cards-wrapper');
  const prevBtn = document.querySelector('.arrow-prev');
  const nextBtn = document.querySelector('.arrow-next');
  const indicatorsContainer = document.querySelector('.testimonial-indicators');
  const track = document.querySelector('.testimonial-track');
  const prevTrackBtn = document.getElementById('prevTestimonial');
  const nextTrackBtn = document.getElementById('nextTestimonial');
  let currentIndex = 0;
  let autoSlideInterval;
  const cardCount = testimonialCards.length;

  const updateCardWidth = () => {
    if (!cardsWrapper || !indicatorsContainer) return false;
    if (window.innerWidth <= 768) {
      cardsWrapper.style.transform = 'translateX(0)';
      cardsWrapper.style.transition = 'none';
      indicatorsContainer.style.display = 'none';
      return false;
    }
    indicatorsContainer.style.display = 'flex';
    return true;
  };

  const createIndicators = () => {
    if (!indicatorsContainer || window.innerWidth <= 768) return;
    indicatorsContainer.innerHTML = '';
    for (let i = 0; i < cardCount; i++) {
      const indicator = document.createElement('div');
      indicator.classList.add('testimonial-indicator');
      if (i === currentIndex) indicator.classList.add('active');
      indicator.addEventListener('click', () => goToSlide(i));
      indicatorsContainer.appendChild(indicator);
    }
  };

  const updateIndicators = () => {
    if (window.innerWidth <= 768) return;
    document.querySelectorAll('.testimonial-indicator').forEach((el, idx) => {
      el.classList.toggle('active', idx === currentIndex);
    });
  };

  const goToSlide = (index) => {
    if (window.innerWidth <= 768 || !testimonialCards.length || !cardsWrapper) return;
    currentIndex = index;
    const cardWidth = testimonialCards[0].offsetWidth + 30;
    cardsWrapper.style.transition = 'transform 0.8s ease';
    cardsWrapper.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    updateIndicators();
  };

  const nextSlide = () => {
    if (window.innerWidth <= 768) return;
    currentIndex = (currentIndex + 1) % cardCount;
    goToSlide(currentIndex);
  };

  const prevSlide = () => {
    if (window.innerWidth <= 768) return;
    currentIndex = (currentIndex - 1 + cardCount) % cardCount;
    goToSlide(currentIndex);
  };

  const startAutoSlide = () => {
    if (window.innerWidth <= 768 || cardCount <= 1) return;
    autoSlideInterval = setInterval(nextSlide, 8000);
  };

  const pauseAutoSlide = () => {
    clearInterval(autoSlideInterval);
  };

  // --- Initialization ---
  const init = () => {
    // Nav
    if (hamburger) {
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.addEventListener('click', toggleMenu);
      document.addEventListener('click', closeMenuOnClickOutside);
    }

    // Smooth scroll
    setupSmoothScrolling();

    // Form
    const contactForm = document.querySelector('form');
    if (contactForm) {
      contactForm.addEventListener('submit', handleFormSubmit);
    }

    // Testimonial carousel (desktop)
    if (cardCount > 0 && cardsWrapper) {
      const isDesktop = updateCardWidth();
      if (isDesktop) {
        createIndicators();
        goToSlide(currentIndex);
        startAutoSlide();
      }

      if (prevBtn) prevBtn.addEventListener('click', () => {
        prevSlide(); pauseAutoSlide(); startAutoSlide();
      });

      if (nextBtn) nextBtn.addEventListener('click', () => {
        nextSlide(); pauseAutoSlide(); startAutoSlide();
      });

      const container = document.querySelector('.testimonial-container');
      if (container) {
        container.addEventListener('mouseenter', pauseAutoSlide);
        container.addEventListener('mouseleave', startAutoSlide);
      }
    }

    // Mobile testimonial scroll buttons
    if (track && prevTrackBtn && nextTrackBtn) {
      prevTrackBtn.addEventListener('click', () => {
        track.scrollBy({ left: -320, behavior: 'smooth' });
      });
      nextTrackBtn.addEventListener('click', () => {
        track.scrollBy({ left: 320, behavior: 'smooth' });
      });
    }

    // Resize behavior
    window.addEventListener('resize', () => {
      const isDesktop = updateCardWidth();
      if (isDesktop) {
        createIndicators();
        goToSlide(currentIndex);
        startAutoSlide();
      } else {
        pauseAutoSlide();
      }
      // Close nav on desktop if open
      if (window.innerWidth > 768 && navLinks && hamburger) {
        navLinks.classList.remove('show');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  };

  init();
});
// --- Utility Functions ---
const isMobile = () => window.innerWidth <= 768;    