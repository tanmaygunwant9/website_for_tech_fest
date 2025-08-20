document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card");
  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const closeModal = document.getElementById("closeModal");

  // Open modal when card is clicked
  cards.forEach(card => {
    card.addEventListener("click", () => {
      modalTitle.textContent = card.dataset.title;
      modalDesc.textContent = card.dataset.desc;
      modal.classList.remove("hidden");
    });
  });

  // Close modal
  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // Close modal when clicking outside the content
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });

  // Profile icon logic
  const profileIcon = document.querySelector('.profile-avatar');
  const profileWindow = document.getElementById('profile-window');
  const closeProfileBtn = document.getElementById('close-profile-btn');

  if (profileIcon && profileWindow && closeProfileBtn) {
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
  }

  // Load profile info from localStorage
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
});
