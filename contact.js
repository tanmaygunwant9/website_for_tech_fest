document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const successMsg = document.getElementById("successMsg");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    successMsg.classList.remove("hidden");

  
    contactForm.reset();
  });
});

