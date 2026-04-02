(function() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then((registration) => {
        console.log('SW registered:', registration.scope);
      })
      .catch((error) => {
        console.log('SW registration failed:', error);
      });
  }

  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  
  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  
  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }
  
  if (hamburger) {
    hamburger.addEventListener('click', openSidebar);
  }
  
  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }
  
  document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        closeSidebar();
      }
    });
  });
  
  const progress = JSON.parse(localStorage.getItem('kotlin-academy-progress') || '{}');
  
  function saveProgress() {
    localStorage.setItem('kotlin-academy-progress', JSON.stringify(progress));
  }
  
  function markComplete(lessonId) {
    progress[lessonId] = true;
    saveProgress();
    updateUI();
  }
  
  function isCompleted(lessonId) {
    return progress[lessonId] === true;
  }
  
  function getCompletedCount(part) {
    const partProgress = Object.keys(progress).filter(key => 
      key.startsWith(part + '-') && progress[key]
    ).length;
    return partProgress;
  }
  
  function getTotalLessons(part) {
    const counts = {
      '1': 10,
      '2': 8,
      '3': 5
    };
    return counts[part] || 0;
  }
  
  function getNextLesson(part) {
    for (let i = 1; i <= getTotalLessons(part); i++) {
      const lessonId = `${part}-${i}`;
      if (!progress[lessonId]) {
        return lessonId;
      }
    }
    return `${part}-1`;
  }
  
  function updateUI() {
    document.querySelectorAll('.nav-item').forEach(item => {
      const lessonId = item.dataset.lesson;
      if (lessonId && isCompleted(lessonId)) {
        item.classList.add('completed');
      }
    });
    
    document.querySelectorAll('.lesson-card, .chapter-lessons li').forEach(card => {
      const lessonId = card.dataset.lesson;
      if (lessonId) {
        if (isCompleted(lessonId)) {
          card.classList.add('completed');
          const check = card.querySelector('.nav-item-check');
          if (check) check.style.opacity = '1';
        }
      }
    });
    
    document.querySelectorAll('[data-progress-part]').forEach(el => {
      const part = el.dataset.progressPart;
      const completed = getCompletedCount(part);
      const total = getTotalLessons(part);
      const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
      
      const fill = el.querySelector('.progress-fill, .part-progress-fill');
      const text = el.querySelector('.progress-text, .part-progress-value');
      
      if (fill) fill.style.width = percentage + '%';
      if (text) text.textContent = `${completed}/${total} lessons`;
    });
    
    document.querySelectorAll('.chapter-card[data-part]').forEach(card => {
      const part = card.dataset.part;
      const completed = getCompletedCount(part);
      const total = getTotalLessons(part);
      const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
      
      const fill = card.querySelector('.progress-fill');
      const text = card.querySelector('.progress-text');
      
      if (fill) fill.style.width = percentage + '%';
      if (text) text.textContent = `${completed}/${total} lessons completed`;
    });
    
    document.querySelectorAll('.chapter-btn, .resume-btn').forEach(btn => {
      const part = btn.dataset.part;
      if (part) {
        const nextLesson = getNextLesson(part);
        const lessonNum = nextLesson.split('-')[1];
        btn.href = `part-${part}/part-${part}-${lessonNum}.html`;
      }
    });
    
    document.querySelectorAll('.mark-complete-btn').forEach(btn => {
      const lessonId = btn.dataset.lesson;
      if (lessonId) {
        updateMarkCompleteButton(lessonId);
      }
    });
  }
  
  window.markComplete = markComplete;
  window.isCompleted = isCompleted;
  window.toggleComplete = function(lessonId) {
    if (isCompleted(lessonId)) {
      delete progress[lessonId];
    } else {
      markComplete(lessonId);
    }
    saveProgress();
    updateUI();
    updateMarkCompleteButton(lessonId);
  };
  
  function updateMarkCompleteButton(lessonId) {
    const btn = document.querySelector(`.mark-complete-btn[data-lesson="${lessonId}"]`);
    if (!btn) return;
    const isDone = isCompleted(lessonId);
    btn.classList.toggle('completed', isDone);
    btn.querySelector('.mark-complete-text').textContent = isDone ? 'Completed' : 'Mark as Complete';
  }
  
  updateUI();
  
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
        document.body.classList.add('page-transition');
      }
    });
  });
  
  observer.observe(document.documentElement, { attributes: true });
  
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href$=".html"]');
    if (link && !link.target) {
      document.body.classList.add('page-transition');
    }
  });
})();
