const GITHUB_USERNAME = 'ehdgus6697-debug';
const FIELDS = ['name', 'email', 'message'];
const STATE = {
  theme: localStorage.getItem('theme') === 'dark' ? 'dark' : 'light',
  menuOpen: false,
  projects: { status: 'loading', data: [], error: '' },
  form: { errors: { name: '', email: '', message: '' }, success: false },
};

const themeButton = document.querySelector('#theme-toggle');
const menuButton = document.querySelector('#menu-toggle');
const menu = document.querySelector('#nav-links');
const header = document.querySelector('#site-header');
const topButton = document.querySelector('#back-to-top');
const projectsContent = document.querySelector('#projects-content');
const form = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

const renderTheme = () => {
  document.documentElement.dataset.theme = STATE.theme;
  themeButton.textContent = STATE.theme === 'dark' ? '라이트 모드' : '다크 모드';
  themeButton.setAttribute('aria-pressed', String(STATE.theme === 'dark'));
};
themeButton.addEventListener('click', () => {
  STATE.theme = STATE.theme === 'light' ? 'dark' : 'light';
  renderTheme();
  localStorage.setItem('theme', STATE.theme);
});

const renderMenu = () => {
  menu.classList.toggle('active', STATE.menuOpen);
  menuButton.setAttribute('aria-expanded', String(STATE.menuOpen));
};
menuButton.addEventListener('click', () => {
  STATE.menuOpen = !STATE.menuOpen;
  renderMenu();
});
document.querySelectorAll('nav a').forEach((link) => {
  link.addEventListener('click', () => {
    STATE.menuOpen = false;
    renderMenu();
  });
});

const updateScrollUI = () => {
  if (window.scrollY >= 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  topButton.hidden = window.scrollY < 300;
};
window.addEventListener('scroll', updateScrollUI);
topButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(({ isIntersecting, target }) => {
    if (isIntersecting) {
      target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const escapeHTML = (text) => text
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const renderProjects = () => {
  const { status, data, error } = STATE.projects;
  projectsContent.setAttribute('aria-busy', String(status === 'loading'));

  if (status === 'loading') {
    projectsContent.textContent = '프로젝트 로딩 중...';
  } else if (status === 'error') {
    projectsContent.innerHTML = `
      <p>프로젝트를 불러올 수 없습니다.</p>
      <p>${escapeHTML(error)}</p>
      <button id="retry-projects" type="button">다시 시도</button>
    `;
    document.querySelector('#retry-projects').addEventListener('click', loadProjects);
  } else if (status === 'empty') {
    projectsContent.textContent = '표시할 프로젝트가 없습니다.';
  } else {
    const cards = data.map(({ name, description, html_url, language, stargazers_count }) => `
      <article class="project-card">
        <h3><a href="${escapeHTML(html_url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(name)}</a></h3>
        <p>${escapeHTML(description || '설명이 없습니다.')}</p>
        <p>언어: ${escapeHTML(language || '미지정')} · Stars: ${stargazers_count}</p>
      </article>
    `);
    projectsContent.innerHTML = `<div class="projects-grid">${cards.join('')}</div>`;
  }
};

const loadProjects = async () => {
  STATE.projects.status = 'loading';
  renderProjects();
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
    if (response.status === 403 || response.status === 429) {
      throw new Error('GitHub 요청 제한 또는 접근 제한입니다. 잠시 후 다시 시도해주세요.');
    }
    if (!response.ok) {
      throw new Error(`GitHub 응답 오류: ${response.status}`);
    }
    const repositories = await response.json();
    STATE.projects.data = repositories.filter(({ fork }) => !fork);
    STATE.projects.status = STATE.projects.data.length > 0 ? 'success' : 'empty';
  } catch (error) {
    STATE.projects.status = 'error';
    STATE.projects.error = error.message;
  }
  renderProjects();
};

const validateField = (field) => {
  const value = document.querySelector(`#${field}`).value.trim();
  if (value === '') return '필수 입력 항목입니다.';
  if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return '올바른 이메일 형식을 입력해주세요.';
  }
  return '';
};
const renderForm = () => {
  FIELDS.forEach((field) => {
    const error = STATE.form.errors[field];
    document.querySelector(`#${field}-error`).textContent = error;
    document.querySelector(`#${field}`).setAttribute('aria-invalid', String(error !== ''));
  });
  formStatus.textContent = STATE.form.success
    ? '입력 확인이 완료되었습니다. 메시지는 실제로 전송되지 않습니다.'
    : '';
};

FIELDS.forEach((field) => {
  document.querySelector(`#${field}`).addEventListener('input', () => {
    STATE.form.errors[field] = validateField(field);
    STATE.form.success = false;
    renderForm();
  });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  FIELDS.forEach((field) => {
    STATE.form.errors[field] = validateField(field);
  });
  STATE.form.success = FIELDS.every((field) => STATE.form.errors[field] === '');
  renderForm();
});

renderTheme();
renderMenu();
updateScrollUI();
renderForm();
loadProjects();
