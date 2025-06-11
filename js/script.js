const setupSmoothScrolling = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      if (anchor.hash) {
        const target = document.querySelector(anchor.hash);
        if (target) {
          e.preventDefault();
          const offset = window.innerWidth <= 480 ? 50 : window.innerWidth <= 576 ? 60 : window.innerWidth <= 768 ? 70 : 90;
          window.scrollTo({
            top: target.offsetTop - offset,
            behavior: 'smooth'
          });
          if (window.innerWidth <= 768 && navLinks.classList.contains('show')) {
            toggleMenu(e);
          }
        }
        // If target doesn't exist, let the default happen (browser jumps to hash)
      }
    });
  });
document.addEventListener('DOMContentLoaded', () => {
  setupSmoothScrolling();

  // Scroll to footer when "Donate" button is clicked
  const donateBtn = document.querySelector('.donate-btn');
  const footer = document.querySelector('footer');
  if (donateBtn && footer) {
    donateBtn.addEventListener('click', (e) => {
      e.preventDefault();
      footer.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Scroll to FAQ section when "FAQ" is clicked
  const faqBtn = document.querySelector('.faq-btn');
  const faqSection = document.querySelector('#faq');
  if (faqBtn && faqSection) {
    faqBtn.addEventListener('click', (e) => {
      e.preventDefault();
      faqSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Scroll to Contact container when "Contact Details" is clicked
  const contactBtn = document.querySelector('.contact-details-btn');
  const contactContainer = document.querySelector('#contact-container');
  if (contactBtn && contactContainer) {
    contactBtn.addEventListener('click', (e) => {
      e.preventDefault();
      contactContainer.scrollIntoView({ behavior: 'smooth' });
    });
  }
});
