// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: false,
  mirror: false,
  offset: 100,
  delay: 100,
  anchorPlacement: 'top-bottom'
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: 'smooth'
      });

      // Update active nav link
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
      });
      this.classList.add('active');
    }
  });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (window.scrollY >= sectionTop - 100) {
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

// Projects functionality
const handleProjects = () => {
  // Make sure all project links work
  document.querySelectorAll('.project-card a').forEach(link => {
    if (link.getAttribute('href') === '#') {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Demo link coming soon!');
      });
    }
  });

  // Handle the View My Work button in hero section
  const viewMyWorkBtn = document.querySelector('#home .btn-primary.btn-lg');
  if (viewMyWorkBtn) {
    viewMyWorkBtn.addEventListener('click', function(e) {
      e.preventDefault();

      // Scroll to projects section
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        window.scrollTo({
          top: projectsSection.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  }

  // Handle the Contact Me button in hero section
  const contactMeBtn = document.querySelector('#home .btn-outline-light.btn-lg');
  if (contactMeBtn) {
    contactMeBtn.addEventListener('click', function(e) {
      e.preventDefault();

      // Scroll to contact section
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        window.scrollTo({
          top: contactSection.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  }
};

// Initialize EmailJS
(function() {
  // Initialize EmailJS with your public key
  emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual EmailJS public key when you get one
})();

// Handle contact form submission
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();

  formMessage.innerHTML = '<div class="alert alert-info">Sending message...</div>';

  // For demonstration purposes, simulate a successful form submission
  setTimeout(() => {
    // Store the form data in localStorage (simulating database storage)
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value,
      timestamp: new Date().toISOString()
    };

    // Get existing messages or initialize empty array
    const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    existingMessages.push(formData);

    // Save to localStorage
    localStorage.setItem('contactMessages', JSON.stringify(existingMessages));

    // Show success message
    formMessage.innerHTML = '<div class="alert alert-success">Message sent successfully! I\'ll get back to you soon.</div>';
    contactForm.reset();

    // Log the message that would be sent to the email
    console.log('Email would be sent to: yatankumarcantact@gmail.com');
    console.log('Message details:', formData);
  }, 1500);
});

// Add typing animation to hero section using Typed.js
const initTypeAnimation = () => {
  console.log('Initializing typing animation...');
  const typedElement = document.getElementById('typed-text');

  if (typedElement) {
    console.log('Found typed-text element, initializing Typed.js');
    const typed = new Typed('#typed-text', {
      strings: ['Yatan Kumar', 'a Web Developer', 'a Blockchain Enthusiast', 'a Tech Innovator'],
      typeSpeed: 80,
      backSpeed: 50,
      backDelay: 1500,
      startDelay: 500,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    });
    console.log('Typed.js initialized:', typed);
  } else {
    console.error('Could not find typed-text element');
  }
};

// Add animation to contact form inputs
const initContactAnimations = () => {
  const contactInputs = document.querySelectorAll('#contact-form input, #contact-form textarea');
  contactInputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('input-focused');
    });
    input.addEventListener('blur', () => {
      if (input.value.trim() === '') {
        input.parentElement.classList.remove('input-focused');
      }
    });
  });

  // Add floating animation to social icons
  const socialIcons = document.querySelectorAll('.social-icon');
  socialIcons.forEach((icon, index) => {
    icon.style.animationDelay = `${index * 0.2}s`;
    icon.classList.add('social-float');
  });
};

// Add scroll reveal animations
const initScrollReveal = () => {
  // Animate skill bars on scroll
  const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.progress-bar');
    skillBars.forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0%';
      setTimeout(() => {
        bar.style.width = width;
        bar.style.transition = 'width 1.5s ease-in-out';
      }, 200);
    });
  };

  // Create an observer for skill section
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateSkillBars();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(skillsSection);
  }

  // Add counter animation to achievement numbers
  const achievementNumbers = document.querySelectorAll('.achievement-item h5');
  achievementNumbers.forEach(item => {
    const text = item.textContent;
    if (text.includes('593') || text.includes('30') || text.includes('3')) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const numStr = text.match(/\d+/);
            if (numStr) {
              const num = parseInt(numStr[0]);
              let count = 0;
              const counter = setInterval(() => {
                count += Math.ceil(num / 50);
                if (count >= num) {
                  clearInterval(counter);
                  count = num;
                }
                item.textContent = text.replace(numStr[0], count);
              }, 30);
            }
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      observer.observe(item);
    }
  });
};

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  // Initialize projects functionality
  handleProjects();

  // Initialize animations
  initTypeAnimation();
  initContactAnimations();
  initScrollReveal();

  // Add particle animation to hero section
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';

    // Create particles
    for (let i = 0; i < 10; i++) {
      const particle = document.createElement('span');
      particle.className = 'particle';
      particlesContainer.appendChild(particle);
    }

    heroSection.appendChild(particlesContainer);
  }
});
