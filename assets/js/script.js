document.addEventListener('DOMContentLoaded', function() {

  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(el => observer.observe(el));

  const slideLeftElements = document.querySelectorAll('.slide-in-left');
  slideLeftElements.forEach(el => observer.observe(el));

  const slideRightElements = document.querySelectorAll('.slide-in-right');
  slideRightElements.forEach(el => observer.observe(el));

  const parallaxSections = document.querySelectorAll('.hero-bg');
  window.addEventListener('scroll', function() {
    parallaxSections.forEach(section => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.5;
      section.style.transform = `translate3d(0, ${rate}px, 0) scale(1.1)`;
    });
  });

  const statNumbers = document.querySelectorAll('.stat-number');

  const animateStats = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const finalValue = parseInt(target.getAttribute('data-value'));
        let currentValue = 0;
        const increment = finalValue / 50;
        const duration = 2000;
        const stepTime = duration / 50;

        const counter = setInterval(() => {
          currentValue += increment;
          if (currentValue >= finalValue) {
            target.textContent = finalValue.toLocaleString();
            clearInterval(counter);
          } else {
            target.textContent = Math.floor(currentValue).toLocaleString();
          }
        }, stepTime);

        observer.unobserve(target);
      }
    });
  };

  const statsObserver = new IntersectionObserver(animateStats, {
    threshold: 0.5
  });

  statNumbers.forEach(stat => {
    statsObserver.observe(stat);
  });

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
      }
    });
  });

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      if (name && email && message) {
        const confirmationDiv = document.getElementById('formConfirmation');
        confirmationDiv.style.display = 'block';
        confirmationDiv.innerHTML = `
          <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Message envoyé avec succès!</strong><br>
            Merci ${name}, nous vous répondrons dans les plus brefs délais.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        `;

        contactForm.reset();

        setTimeout(() => {
          confirmationDiv.style.display = 'none';
        }, 5000);
      }
    });
  }

  const cards = document.querySelectorAll('.card-military');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  const portfolioItems = document.querySelectorAll('.portfolio-item');
  portfolioItems.forEach(item => {
    item.addEventListener('click', function() {
      const img = this.querySelector('img');
      if (img) {
        const modal = document.createElement('div');
        modal.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          cursor: pointer;
        `;

        const modalImg = document.createElement('img');
        modalImg.src = img.src;
        modalImg.style.cssText = `
          max-width: 90%;
          max-height: 90%;
          object-fit: contain;
        `;

        modal.appendChild(modalImg);
        document.body.appendChild(modal);

        modal.addEventListener('click', () => {
          document.body.removeChild(modal);
        });
      }
    });
  });

  const carouselElements = document.querySelectorAll('.carousel');
  carouselElements.forEach(carousel => {
    carousel.addEventListener('slide.bs.carousel', function () {
      const activeItem = this.querySelector('.carousel-item.active');
      if (activeItem) {
        activeItem.style.transition = 'transform 0.6s ease-in-out';
      }
    });
  });
});
