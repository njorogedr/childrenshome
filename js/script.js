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







/*   const track = document.querySelector('.carousel-track');
  const leftBtn = document.querySelector('.carousel-btn.left');
  const rightBtn = document.querySelector('.carousel-btn.right');
 
  const scrollAmount = 400; 

  leftBtn.addEventListener('click', () => {
    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  rightBtn.addEventListener('click', () => {
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });




const messageSend = document.getElementById("messagee");

messageSend.addEventListener('click', () => {
// Removed duplicate showSidebar and hideSidebar functions to avoid conflicts with hamburger menu logic
function showSidebar(){
            const sidebar = document.querySelector('.sidebar')
            sidebar.style.display = 'flex'
        }
        
        function hideSidebar(){
            const sidebar = document.querySelector('.sidebar')
            sidebar.style.display = 'none'
        }


const accordion = document.getElementsByClassName('content-container');

for(i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener('click', function (){
        this.classList.toggle('active');
    });
};


function showMore (){
    const content = document.getElementById("moreInfo");
    if(content.style.display === "none"){
        content.style.display = "block";
    } else{
        content.style.display = "none";
    }
}




  const track = document.querySelector('.carousel-track');
  const leftBtn = document.querySelector('.carousel-btn.left');
  const rightBtn = document.querySelector('.carousel-btn.right');
 
  const scrollAmount = 400; 

  leftBtn.addEventListener('click', () => {
    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  rightBtn.addEventListener('click', () => {
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });




const messageSend = document.getElementById("messagee");

messageSend.addEventListener('click', () => {
    const confirmation = document.getElementById("confirmation");
    confirmation.style.display = "block";

    setTimeout(() => {
        confirmation.style.display = "none";
    }, 10000); 
});