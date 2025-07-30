  const toggle = document.getElementById('dark-mode-toggle');
  const icon = document.querySelector('#theme-switch i');

  function setInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.body.classList.add('dark-mode');
      toggle.checked = true;
      icon.classList.replace('fa-moon', 'fa-sun');
    }
  }

  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
      icon.classList.replace('fa-moon', 'fa-sun');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
      icon.classList.replace('fa-sun', 'fa-moon');
    }
  });

  window.addEventListener('DOMContentLoaded', setInitialTheme);
