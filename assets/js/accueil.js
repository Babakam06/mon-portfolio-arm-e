document.addEventListener('DOMContentLoaded', function() {

  // 1. Gestion de la barre de navigation au scroll (rétrécissement)
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function() {
    if (navbar) {
        // La classe 'navbar-scrolled' est définie dans accueil.css
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }
  });


  // 2. Intersection Observer pour les animations au scroll et les compteurs
  const observateurOptions = {
    threshold: 0.15, // Déclenche l'animation lorsque 15% de l'élément est visible
    rootMargin: '0px 0px -50px 0px'
  };

  const observateur = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Démarre l'animation du compteur si l'élément est un stat-number et n'a pas encore été animé
        if (entry.target.classList.contains('stat-number') && !entry.target.classList.contains('anime')) {
            entry.target.classList.add('anime'); 
            animerCompteur(entry.target);
        }
      }
    });
  }, observateurOptions);

  // Éléments à observer pour l'animation
  const elements = document.querySelectorAll('.fade-in, .slide-left, .slide-right, .stat-number');
  elements.forEach(el => observateur.observe(el));


  // 3. Fonction d'animation du compteur
  function animerCompteur(el) {
    const valeurStr = el.getAttribute('data-value') || el.textContent.replace(/\s/g, '');
    const valeur = parseInt(valeurStr);
    
    if (isNaN(valeur)) return;

    let actuel = 0;
    const increment = valeur / 50; 
    const timer = setInterval(() => {
      actuel += increment;
      if (actuel >= valeur) {
        el.textContent = valeur.toLocaleString('fr-FR');
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(actuel).toLocaleString('fr-FR');
      }
    }, 30);
  }

  
  // 4. Modal pour les éléments de portfolio (réutilisation du code script.js)
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
});