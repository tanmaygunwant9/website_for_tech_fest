// Chart.js Example
const ctx = document.getElementById('myChart').getContext('2d');
new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Sales ($)',
      data: [1200, 1900, 3000, 2500, 3200, 4000],
      borderColor: '#2563eb',
      backgroundColor: 'rgba(37, 99, 235, 0.2)',
      fill: true,
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: true } }
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // Homepage button redirect
  const homepageBtn = document.getElementById('btn-homepage');
  if (homepageBtn) {
    homepageBtn.addEventListener('click', function() {
      window.location.href = 'main.html';
    });
  }

  // Profile window logic
  const profileIcon = document.getElementById('dashboard-profile-icon');
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
    document.getElementById('profile-name').textContent = profile.name;
    document.getElementById('profile-email').textContent = profile.email;
    document.getElementById('profile-bio').textContent = profile.bio || '';
    document.getElementById('profile-joined').textContent = localStorage.getItem('profileJoined') || '';
    document.getElementById('profile-phone').textContent = profile.phone || 'Not set';
    document.getElementById('profile-location').textContent = profile.location || 'Not set';
    document.getElementById('profile-skills').textContent = profile.skills ? profile.skills.join(', ') : 'Not set';
  }
});