document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');

  // Hamburger Menu
  const hamburger = document.querySelector('.hamburger');
  if (hamburger) {
      hamburger.addEventListener('click', function() {
          this.classList.toggle('active');
      });
  } else {
      console.error('Hamburger menu element not found');
  }

  // Logo and hero buttons
  const logoImage = document.querySelector('.logo img');
  const herobuttons = document.querySelector('.herobuttons');
  if (logoImage && herobuttons) {
      setTimeout(() => {
          logoImage.classList.add('is-visible');

          setTimeout(() => {
              logoImage.classList.add('scale-down');

              setTimeout(() => {
                  herobuttons.classList.add('is-visible');
              }, 500); // Verkürzte Verzögerung für das Einblenden der Buttons

          }, 1500); // Verkürzte Zeit für den "scale-down" Effekt
      }, 500); // Kürzere anfängliche Verzögerung
  } else {
      console.error('Logo image or hero buttons element not found');
  }

  // Scroll to about section
  const aboutButton = document.getElementById('scrollToAbout');
  const aboutSection = document.getElementById('about');
  if (aboutButton && aboutSection) {
      aboutButton.addEventListener('click', function(event) {
          event.preventDefault();
          aboutSection.scrollIntoView({ behavior: 'smooth' });

          // Show about content on click
          const aboutContent = document.querySelector('.about .container');
          if (aboutContent) {
              aboutContent.style.display = 'block';
              setTimeout(() => {
                  aboutContent.classList.add('visible-content');
              }, 100);
          } else {
              console.error('About content element not found');
          }
      });
  } else {
      console.error('About button or about section element not found');
  }

  // Show about content on scroll
  window.addEventListener('scroll', function() {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
          const aboutPosition = aboutSection.getBoundingClientRect();
          if (aboutPosition.top <= window.innerHeight * 0.8 && aboutPosition.bottom >= 0) {
              showAboutContent();
          }
      }
  });

  function showAboutContent() {
      const aboutContent = document.querySelector('.about .container');
      if (aboutContent && !aboutContent.classList.contains('visible-content')) {
          aboutContent.style.display = 'block';
          setTimeout(() => {
              aboutContent.classList.add('visible-content');
          }, 100);
      }
  }

  // IntersectionObserver for hidden content
  const hiddenContent = document.querySelector('.hidden-content');
  if (hiddenContent) {
      const observer = new IntersectionObserver(function(entries) {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  hiddenContent.classList.add('visible-content');
                  observer.unobserve(entry.target); // Beobachtung beenden, nachdem es einmal sichtbar wurde
              }
          });
      }, {
          threshold: 0.1 // Sektion muss zu 10% sichtbar sein, bevor die Funktion ausgelöst wird
      });

      observer.observe(hiddenContent);
  } else {
      console.error('Hidden content element not found');
  }
});

