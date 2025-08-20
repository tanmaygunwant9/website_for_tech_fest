document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    let valid = true;

    if (!email.includes('@')) {
      document.getElementById('emailError').style.display = 'block';
      valid = false;
    } else {
      document.getElementById('emailError').style.display = 'none';
    }

    if (password.length < 6) {
      document.getElementById('passwordError').style.display = 'block';
      valid = false;
    } else {
      document.getElementById('passwordError').style.display = 'none';
    }

    if (valid) {
      
      window.location.href = 'main.html';
    }
  });

 
  const signupLink = document.querySelector('.login-footer a');
  signupLink.addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = 'main.html';
  });
});

window.onload = function() {
  const signupForm = document.getElementById('signupForm');
  if (!signupForm) {
    console.error('Signup form not found!');
    return;
  }
  const inputs = signupForm.querySelectorAll('input');
  const progressDots = document.querySelectorAll('.progress-dot');

  inputs.forEach(input => {
    input.addEventListener('input', function() {
      validateField(this);
      updateProgress();
    });

    input.addEventListener('blur', function() {
      validateField(this);
    });
  });

  function validateField(field) {
    const formGroup = field.closest('.form-group');
    const errorMessage = formGroup.querySelector('.error-message');

    formGroup.classList.remove('error', 'success');

    if (field.hasAttribute('required') && !field.value.trim()) {
      if (field === document.activeElement || field.value !== '') {
        formGroup.classList.add('error');
      }
      return false;
    }

    if (field.type === 'email' && field.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value)) {
        formGroup.classList.add('error');
        return false;
      }
    }

    if (field.value.trim()) {
      formGroup.classList.add('success');
    }

    return true;
  }

  function updateProgress() {
    const filledFields = Array.from(inputs).filter(input => input.value.trim()).length;
    const totalFields = inputs.length;
    const progressLevel = Math.min(Math.floor((filledFields / totalFields) * 3), 3);

    progressDots.forEach((dot, index) => {
      dot.classList.toggle('active', index < progressLevel);
    });
  }


  signupForm.addEventListener('submit', function(e) {
    e.preventDefault();

    let isValid = true;
    const requiredFields = signupForm.querySelectorAll('input[required]');

    requiredFields.forEach(field => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    if (isValid) {
      const button = signupForm.querySelector('.btn-login');
      button.classList.add('loading');
      button.textContent = '';

      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const bio = document.getElementById('bio').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const location = document.getElementById('location').value.trim();
      const skillsRaw = document.getElementById('skills').value.trim();
      const skills = skillsRaw ? skillsRaw.split(',').map(s => s.trim()).filter(s => s) : [];

      
      localStorage.setItem('profile', JSON.stringify({ name, email, bio, phone, location, skills }));
      if (!localStorage.getItem('profileJoined')) {
        localStorage.setItem('profileJoined', new Date().toLocaleDateString());
      }

      
      setTimeout(() => {
        button.classList.remove('loading');
        button.textContent = 'Create Account';
        signupForm.reset();
        document.querySelectorAll('.form-group').forEach(group => {
          group.classList.remove('success', 'error');
        });
        updateProgress();
        window.location.href = 'main.html';
      }, 1200);
    } else {
     
      signupForm.style.animation = 'none';
      signupForm.offsetHeight; 
      signupForm.style.animation = 'shake 0.5s ease-in-out';
    }
  });

  
  updateProgress();
};
