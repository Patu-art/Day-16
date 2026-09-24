const menuToggle = document.getElementById('menuToggle');
const siteNav = document.getElementById('siteNav');
const navLinks = siteNav ? siteNav.querySelectorAll('a') : [];

if (menuToggle && siteNav) {
  const closeMenu = () => {
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    siteNav.classList.remove('open');
    document.body.classList.remove('menu-open');
  };

  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav.classList.toggle('open');
    document.body.classList.toggle('menu-open');
  });

  navLinks.forEach(link => link.addEventListener('click', closeMenu));
  window.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 860) closeMenu(); });
}

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealElements.forEach(el => revealObserver.observe(el));
} else {
  revealElements.forEach(el => el.classList.add('in-view'));
}

const quoteForm = document.getElementById('quoteForm');
const formStatus = document.getElementById('formStatus');

if (quoteForm && formStatus) {
  quoteForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!quoteForm.reportValidity()) return;
    const fields = new FormData(quoteForm);
    const name = String(fields.get('name') || '').trim();
    const phone = String(fields.get('phone') || '').trim();
    const email = String(fields.get('email') || '').trim();
    const project = String(fields.get('project') || '').trim();
    const message = String(fields.get('message') || '').trim();
    const subject = 'Kitchen / bathroom enquiry — ' + project;
    const body = [
      'Name: ' + name,
      'Phone: ' + phone,
      'Email: ' + email,
      'Project: ' + project,
      '',
      'Project details:',
      message || '(not provided)'
    ].join('\\n');
    const url = 'mailto:polbudandson@gmail.com?subject='
      + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    formStatus.textContent = 'Your email app should open with a draft. Please review and send it to contact the business. If nothing opens, use the email link above.';
    window.location.href = url;
  });
}
