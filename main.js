document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('theme-toggle');
  const themeTitle = document.getElementById('theme-title');
  const drawBtn = document.getElementById('draw-btn');
  const lottoContainer = document.getElementById('lotto-container');

  // 테마 로직
  const currentTheme = localStorage.getItem('theme') || 'light';
  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeUI('dark');
  }

  toggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      updateThemeUI('light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      updateThemeUI('dark');
    }
    
    // Disqus 테마 새로고침 (Disqus가 로드된 경우)
    if (typeof DISQUS !== 'undefined') {
      DISQUS.reset({
        reload: true,
        config: function () {
          this.page.url = window.location.href;
          this.page.identifier = window.location.pathname;
        }
      });
    }
  });

  function updateThemeUI(theme) {
    if (theme === 'dark') {
      themeTitle.textContent = '다크 모드';
      toggleBtn.textContent = '라이트 모드로 전환';
    } else {
      themeTitle.textContent = '라이트 모드';
      toggleBtn.textContent = '다크 모드로 전환';
    }
  }

  // 로또 로직
  drawBtn.addEventListener('click', () => {
    const numbers = generateLottoNumbers();
    displayNumbers(numbers);
  });

  function generateLottoNumbers() {
    const set = new Set();
    while (set.size < 6) {
      const num = Math.floor(Math.random() * 45) + 1;
      set.add(num);
    }
    return Array.from(set).sort((a, b) => a - b);
  }

  function displayNumbers(numbers) {
    lottoContainer.innerHTML = '';
    numbers.forEach((num, index) => {
      setTimeout(() => {
        const ball = document.createElement('div');
        ball.className = 'ball';
        ball.textContent = num;
        lottoContainer.appendChild(ball);
      }, index * 100);
    });
  }
});
