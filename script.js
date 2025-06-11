document.addEventListener('DOMContentLoaded', function() {
  // Selectors
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu a');
  const navbar = document.querySelector('.navbar');
  const contactForm = document.querySelector('.contact-form');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const sections = document.querySelectorAll('section');
  const projectCards = document.querySelectorAll('.project-card');
  const skillCategories = document.querySelectorAll('.skill-category');
  const socialLinks = document.querySelectorAll('.social-link');

  // Make navbar fixed by adding CSS dynamically (optional, add to your CSS instead)
  if (navbar) {
    navbar.style.position = 'fixed';
    navbar.style.top = '0';
    navbar.style.left = '0';
    navbar.style.width = '100%';
    navbar.style.zIndex = '999';
    navbar.style.transition = 'background 0.3s ease, box-shadow 0.3s ease';
  }

  // Mobile Navigation Toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Close mobile menu on nav link click & smooth scrolling
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      // Close menu
      if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }

      // Smooth scroll
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70; // navbar height offset
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Navbar background color on scroll and on page load
  function updateNavbarBackground() {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = 'none';
    }
  }

  window.addEventListener('scroll', updateNavbarBackground);
  updateNavbarBackground(); // Run once on load to set initial state

  // Contact form submit handler
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const formData = new FormData(this);
      const name = this.querySelector('input[type="text"]').value.trim();
      const email = this.querySelector('input[type="email"]').value.trim();
      const subject = this.querySelectorAll('input[type="text"]')[1].value.trim();
      const message = this.querySelector('textarea').value.trim();

      if (!name || !email || !subject || !message) {
        alert('Please fill in all fields.');
        return;
      }

      const submitBtn = this.querySelector('.btn-primary');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        alert('Thank you for your message! I\'ll get back to you soon.');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }

  // Scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    if (section.id !== 'home') {
      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';
      section.style.transition = 'all 0.8s ease-out';
      observer.observe(section);
    }
  });

  projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
    observer.observe(card);
  });

  skillCategories.forEach((category, index) => {
    category.style.opacity = '0';
    category.style.transform = 'translateY(30px)';
    category.style.transition = `all 0.6s ease-out ${index * 0.2}s`;
    observer.observe(category);
  });

  // Typing effect for hero subtitle
  if (heroSubtitle) {
    const text = '.NET Backend Developer & Database Specialist';
    heroSubtitle.textContent = '';
    let i = 0;

    function typeWriter() {
      if (i < text.length) {
        heroSubtitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }

    setTimeout(typeWriter, 1000);
  }

  // Project cards click animation
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      card.style.transform = 'scale(1.02)';
      setTimeout(() => {
        card.style.transform = '';
      }, 200);
    });
  });

  // Social links hover effects
  socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.transform = 'translateY(-3px) scale(1.1)';
    });
    link.addEventListener('mouseleave', () => {
      link.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Update active nav link on scroll
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});
