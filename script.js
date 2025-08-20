let isLoading = true;
let currentTheme = localStorage.getItem('theme') || 'light';
let hasAnimatedStats = false;

const loadingScreen = document.getElementById('loading-screen');
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const getStartedBtn = document.getElementById('get-started-btn');
if (getStartedBtn) {
  getStartedBtn.onclick = function() {
    window.location.href = 'getstarted.html';
  };
}
const viewDemoBtn = document.getElementById('view-demo-btn');
const navLinks = document.querySelectorAll('.nav-link');
const searchInput = document.querySelector('.search-input');
const aboutSection = document.getElementById('about');

document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  setTheme(currentTheme);

  setTimeout(() => {
    hideLoadingScreen();
  }, 2000);

  initializeEventListeners();
  initializeAnimations();
  initializeIntersectionObserver();
}

function hideLoadingScreen() {
  if (!loadingScreen) return;
  loadingScreen.style.opacity = '0';
  setTimeout(() => {
    loadingScreen.style.display = 'none';
    isLoading = false;
  }, 500);
}

function setTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  const themeIcon = themeToggle.querySelector('i');
  if (!themeIcon) return;
  themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

const notificationBell = document.getElementById('notification-bell');
const notificationContainer = document.getElementById('notification-container');

const notifications = [
  "Welcome back!",
  "You have 3 new messages.",
  "Your profile was viewed 10 times today.",
  "System will undergo maintenance at 12 AM."
];

function toggleNotifications() {
  if (!notificationContainer) return;

  if (notificationContainer.classList.contains('hidden')) {
    // Show notifications
    notificationContainer.innerHTML = notifications.map(msg => `<div class="notification-item">${msg}</div>`).join('');
    notificationContainer.classList.remove('hidden');
  } else {
    notificationContainer.classList.add('hidden');
  }
}

if (notificationBell) {
  notificationBell.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleNotifications();
  });

  document.addEventListener('click', (e) => {
    if (!notificationContainer.contains(e.target) && !notificationBell.contains(e.target)) {
      notificationContainer.classList.add('hidden');
    }
  });
}


function toggleTheme() {
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  setTheme(newTheme);

  document.body.style.transition = 'all 0.3s ease';
  setTimeout(() => {
    document.body.style.transition = '';
  }, 300);
}

function toggleMobileMenu() {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');

  if (navMenu.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

function closeMobileMenu() {
  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
  document.body.style.overflow = '';
}

function handleNavigation(e) {
  const target = e.target.getAttribute('href');

  if (target && target.endsWith('.html')) return;

  e.preventDefault();

  navLinks.forEach((link) => link.classList.remove('active'));
  e.target.classList.add('active');

  closeMobileMenu();

  if (target === '#about') {
    showAboutSection();
  } else if (target === '#services') {
    showServicesSection();
  }

  if (target && target.startsWith('#')) {
    const elem = document.querySelector(target);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  createRippleEffect(e);
}

function showServicesSection() {
  const servicesSection = document.getElementById('services');
  if (!servicesSection) return;
  servicesSection.classList.add('visible');
}

function showAboutSection() {
  if (!aboutSection) return;
  aboutSection.classList.add('visible');

  if (!hasAnimatedStats) {
    setTimeout(() => {
      animateStats();
      hasAnimatedStats = true;
    }, 300);
  }
}

function createRippleEffect(e) {
  const ripple = document.createElement('span');
  const rect = e.target.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;

  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
    background: rgba(45, 212, 191, 0.3);
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
  `;

  e.target.style.position = 'relative';
  e.target.style.overflow = 'hidden';
  e.target.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
}

function handleScroll() {
  const scrollTop = window.pageYOffset;

  if (scrollTop > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  const shapes = document.querySelectorAll('.floating-shape');
  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 0.5;
    const yPos = -(scrollTop * speed) / 10;
    shape.style.transform = `translateY(${yPos}px) rotate(${scrollTop * 0.1}deg)`;
  });

  updateActiveNavLink();
}

function updateActiveNavLink() {
  const sections = ['home', 'about', 'services', 'portfolio', 'contact', 'dashboard'];
  let current = 'home';

  sections.forEach((sectionId) => {
    const section = document.getElementById(sectionId);
    if (!section) return;
    const rect = section.getBoundingClientRect();
    if (rect.top <= 100 && rect.bottom >= 100) {
      current = sectionId;
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

function initializeIntersectionObserver() {
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      if (entry.target.id === 'about') {
        showAboutSection();
      }

      if (
        entry.target.classList.contains('stat-card') ||
        entry.target.classList.contains('about-card') ||
        entry.target.classList.contains('team-member') ||
        entry.target.classList.contains('tech-item')
      ) {
        entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
      }

      observer.unobserve(entry.target);
    });
  }, observerOptions);

  if (aboutSection) observer.observe(aboutSection);

  document.querySelectorAll('.stat-card, .about-card, .team-member, .tech-item').forEach((el, idx) => {
    el.style.animationDelay = `${idx * 0.1}s`;
    observer.observe(el);
  });
}

function animateStats() {
  const statNumbers = document.querySelectorAll('.stat-number');

  statNumbers.forEach((stat) => {
    const target = parseInt(stat.getAttribute('data-target')) || 0;
    let current = 0;
    const increment = target / 50;

    const updateStat = () => {
      current += increment;
      if (current < target) {
        stat.textContent = Math.ceil(current);
        requestAnimationFrame(updateStat);
      } else {
        stat.textContent = target + (target === 500 ? '+' : '');
      }
    };

    stat.style.animation = 'countUp 0.8s ease forwards';
    setTimeout(updateStat, 200);
  });
}

function initializeAnimations() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity:0; }
      to { transform: translateX(0); opacity:1; }
    }
    @keyframes slideOut {
      from { transform: translateX(0); opacity:1; }
      to { transform: translateX(100%); opacity:0; }
    }
    @keyframes ripple {
      to { transform: scale(2); opacity:0; }
    }
  `;
  document.head.appendChild(style);
}

function initializeEventListeners() {
  if (hamburger) hamburger.addEventListener('click', toggleMobileMenu);
  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

  navLinks.forEach((link) => {
    link.addEventListener('click', handleNavigation);
  });

  if (getStartedBtn) {
    getStartedBtn.addEventListener('click', () => {
      showNotification('Getting started with InteractiveApp...', 'success');
    });
  }

  if (viewDemoBtn) {
    viewDemoBtn.addEventListener('click', () => {
      showNotification('Loading interactive demo...', 'info');
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
    searchInput.addEventListener('focus', () => {
      searchInput.parentElement.style.transform = 'scale(1.02)';
    });
    searchInput.addEventListener('blur', () => {
      searchInput.parentElement.style.transform = 'scale(1)';
    });
  }

  window.addEventListener('scroll', throttle(handleScroll, 16));

  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
      closeMobileMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
    }
  });

  window.addEventListener(
    'resize',
    throttle(() => {
      if (window.innerWidth > 768) {
        closeMobileMenu();
      }
    }, 250)
  );

  setTimeout(() => {
    addTechItemListeners();
    addTeamMemberListeners();
  }, 1000);
}

// Utility Functions
function throttle(fn, limit) {
  let inThrottle;
  return function () {
    let args = arguments;
    let context = this;
    if (!inThrottle) {
      fn.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

function handleSearch(e) {
  const query = e.target.value.toLowerCase().trim();
  if (query.length > 0) {
    showSearchSuggestions(query);
  } else {
    hideSearchSuggestions();
  }
}

function showSearchSuggestions(query) {
  console.log('Search suggestions:', query);
}

function hideSearchSuggestions() {
  console.log('Hide search suggestions');
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${getNotificationIcon(type)}"></i>
      <span>${message}</span>
    </div>
    <button class="notification-close" onclick="this.parentElement.remove()">
      <i class="fas fa-times"></i>
    </button>
  `;

  notification.style.cssText = `
    position: fixed;
    top: 90px;
    right: 20px;
    background: var(--bg-card);
    color: var(--text-primary);
    padding: 16px 20px;
    border-radius: 12px;
    box-shadow: var(--shadow-heavy);
    border-left: 4px solid var(--primary-color);
    z-index: 9999;
    max-width: 350px;
    animation: slideIn 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

function getNotificationIcon(type) {
  const icons = {
    success: 'check-circle',
    error: 'exclamation-circle',
    warning: 'exclamation-triangle',
    info: 'info-circle',
  };
  return icons[type] || 'info-circle';
}

function addTechItemListeners() {
  const techItems = document.querySelectorAll('.tech-item');

  techItems.forEach((item) => {
    item.addEventListener('click', () => {
      const techName = item.querySelector('span').textContent;
      showNotification(`Learning more about ${techName}...`, 'info');
      setTimeout(() => {
        console.log(`Showing ${techName} info...`);
      }, 1000);
    });
  });
}

function addTeamMemberListeners() {
  const teamMembers = document.querySelectorAll('.team-member');

  teamMembers.forEach((member) => {
    const socials = member.querySelectorAll('.member-socials a');

    socials.forEach((social) => {
      social.addEventListener('click', (e) => {
        e.preventDefault();
        const className = social.querySelector('i').className;
        let platform = 'Profile';
        if (className.includes('linkedin')) platform = 'LinkedIn';
        else if (className.includes('github')) platform = 'GitHub';
        else if (className.includes('twitter')) platform = 'Twitter';
        else if (className.includes('dribbble')) platform = 'Dribbble';
        else if (className.includes('behance')) platform = 'Behance';
        else if (className.includes('envelope')) platform = 'Email';

        showNotification(`Opening ${platform} profile...`, 'info');
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const bell = document.querySelector('.notification-bell');
  const notificationContainer = document.getElementById('notification-container');

  bell.addEventListener('click', function() {
    notificationContainer.classList.toggle('hidden');
  });

  document.addEventListener('click', function(e) {
    if (!bell.contains(e.target) && !notificationContainer.contains(e.target)) {
      notificationContainer.classList.add('hidden');
    }
  });

  const profileIcon = document.querySelector('.profile-avatar');
  const profileWindow = document.getElementById('profile-window');
  const closeProfileBtn = document.getElementById('close-profile-btn');

  profileIcon.addEventListener('click', function() {
    profileWindow.classList.remove('hidden');
  });

  closeProfileBtn.addEventListener('click', function() {
    profileWindow.classList.add('hidden');
  });

  document.addEventListener('click', function(e) {
    if (
      !profileWindow.contains(e.target) &&
      !profileIcon.contains(e.target) &&
      !profileWindow.classList.contains('hidden')
    ) {
      profileWindow.classList.add('hidden');
    }
  });

  const profile = JSON.parse(localStorage.getItem('profile'));
  if (profile) {
    document.getElementById('profile-name').textContent = profile.name || '';
    document.getElementById('profile-email').textContent = profile.email || '';
    document.getElementById('profile-bio').textContent = profile.bio || '';
    document.getElementById('profile-phone').textContent = profile.phone || 'Not set';
    document.getElementById('profile-location').textContent = profile.location || 'Not set';
    document.getElementById('profile-skills').textContent = profile.skills && profile.skills.length
      ? profile.skills.join(', ')
      : 'Not set';
    document.getElementById('profile-joined').textContent = localStorage.getItem('profileJoined') || '';
  }

  const searchInput = document.querySelector('.search-input');
  const navContainer = document.querySelector('.nav-container');
  let searchMsg = document.getElementById('search-msg');
  if (!searchMsg) {
    searchMsg = document.createElement('div');
    searchMsg.id = 'search-msg';
    searchMsg.style.position = 'absolute';
    searchMsg.style.top = '60px';
    searchMsg.style.left = '50%';
    searchMsg.style.transform = 'translateX(-50%)';
    searchMsg.style.background = '#fff';
    searchMsg.style.color = '#2563eb';
    searchMsg.style.padding = '10px 18px';
    searchMsg.style.borderRadius = '8px';
    searchMsg.style.boxShadow = '0 2px 8px rgba(37,99,235,0.08)';
    searchMsg.style.fontWeight = '500';
    searchMsg.style.fontSize = '1rem';
    searchMsg.style.display = 'none';
    navContainer.appendChild(searchMsg);
  }

  const searchableItems = [
    "Home", "About", "Services", "Portfolio", "Contact", "Dashboard",
    "Sarah Johnson", "Michael Chen", "Emily Rodriguez",
    "React", "JavaScript", "Node.js", "Python", "AWS", "Docker", "Git", "MongoDB",
    "Custom Web Development", "UI/UX Design", "Consultation & Strategy", "Performance Optimization", "Cloud Integration", "Security Audits"
  ];

  searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      const query = searchInput.value.trim().toLowerCase();
      if (!query) {
        searchMsg.style.display = 'none';
        return;
      }
      const found = searchableItems.some(item => item.toLowerCase().includes(query));
      if (found) {
        searchMsg.textContent = `"${searchInput.value}" is available!`;
        searchMsg.style.color = '#00c9a7';
      } else {
        searchMsg.textContent = `"${searchInput.value}" not found.`;
        searchMsg.style.color = '#ef4444';
      }
      searchMsg.style.display = 'block';
      setTimeout(() => {
        searchMsg.style.display = 'none';
      }, 2000);
    }
  });

  const contactBtn = document.getElementById('contact-us-btn');
  if (contactBtn) {
    contactBtn.onclick = function() {
      window.location.href = 'contact.html';
    };
  }

  const portfolioBtn = document.getElementById('view-portfolio-btn');
  if (portfolioBtn) {
    portfolioBtn.onclick = function() {
      window.location.href = 'portfolio.html';
    };
  }
});

