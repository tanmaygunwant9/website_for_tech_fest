document.addEventListener("DOMContentLoaded", function() {
  const learnMoreBtn = document.getElementById("learnMoreBtn");
  const moreContent = document.getElementById("moreContent");

  learnMoreBtn.addEventListener("click", function() {
    if (moreContent.classList.contains("hidden")) {
      moreContent.classList.remove("hidden");
      learnMoreBtn.textContent = "Show Less";
    } else {
      moreContent.classList.add("hidden");
      learnMoreBtn.textContent = "Learn More";
    }
  });
});
