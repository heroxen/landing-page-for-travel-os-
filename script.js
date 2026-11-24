(() => {
  const config = window.TRAVELOS_CONFIG || {};
  const modal = document.getElementById('download-modal');
  const openBtn = document.getElementById('open-download');
  const closeBtn = document.getElementById('close-modal');
  const form = document.getElementById('lead-form');
  const message = document.getElementById('form-message');
  const status = document.getElementById('download-status');
  const year = document.getElementById('year');
  year.textContent = new Date().getFullYear();

  function openModal() { modal.hidden = false; document.body.style.overflow = 'hidden'; document.getElementById('name').focus(); }
  function closeModal() { modal.hidden = true; document.body.style.overflow = ''; }
  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) closeModal(); });

  function availableDownloads() {
    return Object.entries(config.downloads || {}).filter(([, url]) => typeof url === 'string' && /^https:\/\/.+/i.test(url));
  }
  function showDownloads() {
    const entries = availableDownloads();
    if (!entries.length) {
      message.textContent = 'Thanks! The app files are not published yet. Please check back soon.';
      status.textContent = 'App download links have not been configured by the Travel OS team yet.';
      return;
    }
    message.textContent = 'Thanks! Choose your device below.';
    const list = document.createElement('div');
    list.className = 'download-links';
    const names = {android:'Android APK', ios:'iPhone / iPad', windows:'Windows', mac:'macOS'};
    entries.forEach(([key, url]) => {
      const a = document.createElement('a');
      a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
      a.className = 'button button-primary'; a.textContent = 'Download for ' + (names[key] || key);
      list.appendChild(a);
    });
    form.querySelector('.download-links')?.remove();
    form.appendChild(list);
    status.textContent = 'Only download builds published by the official Travel OS team.';
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    message.textContent = '';
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const consent = document.getElementById('consent').checked;
    if (!name || !email) { message.textContent = 'Please enter your name and a valid email address.'; return; }

    if (config.formspreeEndpoint && /^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+$/.test(config.formspreeEndpoint)) {
      const submit = form.querySelector('button[type="submit"]');
      submit.disabled = true; submit.textContent = 'Submitting…';
      try {
        const response = await fetch(config.formspreeEndpoint, {
          method: 'POST', headers: {'Content-Type':'application/json','Accept':'application/json'},
          body: JSON.stringify({name, email, updates_consent: consent, source:'Travel OS landing page'})
        });
        if (!response.ok) throw new Error('Submission failed');
      } catch (_) {
        message.textContent = 'We could not submit your details. Please try again later.';
        submit.disabled = false; submit.innerHTML = 'Continue <span>↗</span>'; return;
      }
      submit.disabled = false; submit.innerHTML = 'Continue <span>↗</span>';
    } else {
      message.textContent = 'Email capture is in preview mode: configure Formspree in config.js to securely receive entries.';
    }
    showDownloads();
  });

  const menu = document.querySelector('.menu-toggle');
  menu.addEventListener('click', () => {
    const nav = document.querySelector('.desktop-nav');
    const visible = nav.style.display === 'flex';
    nav.style.display = visible ? 'none' : 'flex';
    nav.style.position = visible ? '' : 'absolute';
    nav.style.top = '95px'; nav.style.right = '20px'; nav.style.zIndex = '10';
    nav.style.padding = '18px'; nav.style.background = '#fff'; nav.style.borderRadius = '6px';
    nav.style.flexDirection = 'column'; nav.style.boxShadow = '0 10px 30px #0002';
    menu.setAttribute('aria-expanded', String(!visible));
  });
})();