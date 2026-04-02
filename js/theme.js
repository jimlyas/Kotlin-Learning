(function() {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  function getPreferredTheme() {
    const stored = localStorage.getItem('kotlin-academy-theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('kotlin-academy-theme', theme);
    updateToggleIcon(theme);
  }
  
  function updateToggleIcon(theme) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('.material-symbols-outlined');
    if (icon) {
      icon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
    }
  }
  
  function toggleTheme() {
    const current = html.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  }
  
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  const initialTheme = getPreferredTheme();
  setTheme(initialTheme);
  
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('kotlin-academy-theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
})();
