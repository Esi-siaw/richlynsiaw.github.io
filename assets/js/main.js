// Initialize animations
AOS.init({
  duration: 800,
  once: true
});

// Animate skill bars on scroll
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.skill-progress').forEach(bar => {
        bar.style.width = bar.getAttribute('data-width') + '%';
      });
    }
  });
});
skillObserver.observe(document.querySelector('.skills-grid'));

// Stats counter animation (add later)
