const app = document.querySelector('#app');
const navButtons = document.querySelectorAll('.nav-button[data-page]');

function setActiveButton(pageName) {
  navButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.page === pageName);
  });
}

function renderPage(pageName) {
  const template = document.querySelector(`#page-${pageName}`);

  if (!template) {
    renderPage('accueil');
    return;
  }

  app.replaceChildren(template.content.cloneNode(true));
  setActiveButton(pageName);
  window.history.replaceState(null, '', `#${pageName}`);

  const title = document.querySelector('h1');

  if (title) {
    title.setAttribute('tabindex', '-1');
    title.focus({ preventScroll: true });
  }
}

function handleNavigation(event) {
  const button = event.target.closest('.nav-button[data-page]');

  if (!button) {
    return;
  }

  event.preventDefault();
  renderPage(button.dataset.page);
}

document.addEventListener('click', handleNavigation);

window.addEventListener('popstate', () => {
  const pageName = window.location.hash.replace('#', '') || 'accueil';
  renderPage(pageName);
});

const initialPage = window.location.hash.replace('#', '') || 'accueil';
renderPage(initialPage);
