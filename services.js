document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('eventForm');
  const inputs = form.querySelectorAll('input, select, textarea');

    function showError(field, message) {
    const errorSpan = field.parentElement.querySelector('.error-message');
    if (errorSpan) {
      errorSpan.textContent = message;
      errorSpan.style.display = 'block';
      field.setAttribute('aria-invalid', 'true');
    }
  }

  
  function clearError(field) {
    const errorSpan = field.parentElement.querySelector('.error-message');
    if (errorSpan) {
      errorSpan.textContent = '';
      errorSpan.style.display = 'none';
      field.removeAttribute('aria-invalid');
    }
  }

  
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  
  function validateField(field) {
    const value = field.value.trim();

    if (!value) {
      showError(field, 'This field is required');
      return false;
    }

    if (field.type === 'email' && !isValidEmail(value)) {
      showError(field, 'Please enter a valid email address');
      return false;
    }

    clearError(field);
    return true;
  }

  
  function validateForm() {
    let valid = true;
    inputs.forEach((input) => {
      if (!validateField(input)) {
        valid = false;
      }
    });
    return valid;
  }

  
  inputs.forEach((input) => {
    input.addEventListener('input', () => validateField(input));
  });

  
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateForm()) {
      
      alert('Thank you for registering! We have received your details.');
      form.reset();
    } else {
      
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
    }
  });

  

  });
