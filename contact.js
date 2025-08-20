document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const successMsg = document.getElementById("successMsg");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); // stop page reload

    // Normally you'd send data to backend here with fetch()
    // For demo, just show success message
    successMsg.classList.remove("hidden");

    // Reset form
    contactForm.reset();
  });
});
