// Hamburger menu fix for responsive design
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const sidebar = document.querySelector('.sidebar');
  const closeBtn = document.querySelector('.sidebar .close-btn');
  const navLinks = document.querySelectorAll('.sidebar a');

  if (hamburger && sidebar) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.style.display = 'flex';
    });
  }

  if (closeBtn && sidebar) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.style.display = 'none';
    });
  }

  // Hide sidebar when clicking a nav link
  if (navLinks && sidebar) {
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        sidebar.style.display = 'none';
      });
    });
  }

  // Hide sidebar when clicking outside of it on mobile
  window.addEventListener('click', (e) => {
    if (
      sidebar &&
      sidebar.style.display === 'flex' &&
      !sidebar.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      sidebar.style.display = 'none';
    }
  });

  // Prevent clicks inside sidebar from closing it
  if (sidebar) {
    sidebar.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
});

// Accordion for FAQ section
document.addEventListener("DOMContentLoaded", function () {
  const accordions = document.querySelectorAll(".content-container");

  accordions.forEach(container => {
    const question = container.querySelector(".question");
    if (question) {
      question.addEventListener("click", () => {
        container.classList.toggle("active");
      });
    }
  });

  // FAQ toggle for elements with class 'FAQ'
  const accordionFAQ = document.getElementsByClassName('FAQ');
  for(let i = 0; i < accordionFAQ.length; i++) {
    accordionFAQ[i].addEventListener('click', function (){
      this.classList.toggle('active');
    });
  }

  // Show more/less functionality
  window.showMore = function () {
    const content = document.getElementById("moreInfo");
    if(content.style.display === "none" || content.style.display === "") {
      content.style.display = "block";
    } else {
      content.style.display = "none";
    }
  };

  // Carousel functionality
  const track = document.querySelector('.carousel-track');
  const leftBtn = document.querySelector('.carousel-btn.left');
  const rightBtn = document.querySelector('.carousel-btn.right');
  const scrollAmount = 400; 

  if (leftBtn && track) {
    leftBtn.addEventListener('click', () => {
      track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }

  if (rightBtn && track) {
    rightBtn.addEventListener('click', () => {
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }

  // Message send confirmation
  const messageSend = document.getElementById("messagee");
  if (messageSend) {
    messageSend.addEventListener('click', () => {
      const confirmation = document.getElementById("confirmation");
      if (confirmation) {
        confirmation.style.display = "block";
        setTimeout(() => {
          confirmation.style.display = "none";
        }, 10000); 
      }
    });
  }
});
