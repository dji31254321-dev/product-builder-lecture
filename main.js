document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('theme-toggle');
  const themeTitle = document.getElementById('theme-title');
  const currentTheme = localStorage.getItem('theme') || 'light';

  // Apply saved theme on load
  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateUI('dark');
  }

  toggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      updateUI('light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      updateUI('dark');
    }
  });

  function updateUI(theme) {
    if (theme === 'dark') {
      themeTitle.textContent = 'Dark Mode';
      toggleBtn.textContent = 'Switch to Light Mode';
    } else {
      themeTitle.textContent = 'Light Mode';
      toggleBtn.textContent = 'Switch to Dark Mode';
    }
  }
});
