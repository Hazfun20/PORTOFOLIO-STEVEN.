(() => {
  'use strict';

  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.primary-nav');

  if (menuButton && navigation) {
    const closeMenu = () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Buka menu navigasi');
      navigation.classList.remove('is-open');
    };

    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Buka menu navigasi' : 'Tutup menu navigasi');
      navigation.classList.toggle('is-open', !isOpen);
    });

    navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  // Filter karya berdasarkan kategori.
  const filterButtons = document.querySelectorAll('.filter-button');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selectedFilter = button.dataset.filter;
      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });

      projectCards.forEach((card) => {
        const showCard = selectedFilter === 'all' || card.dataset.category === selectedFilter;
        card.hidden = !showCard;
      });
    });
  });

  // Lightbox untuk melihat gambar karya dengan ukuran lebih besar.
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.querySelector('.lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxType = document.getElementById('lightbox-type');
  const closeLightboxButton = document.querySelector('.lightbox-close');
  let lastFocusedElement = null;

  const closeLightbox = () => {
    if (!lightbox || !lightbox.classList.contains('is-open')) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-locked');
    if (lightboxImage) lightboxImage.src = '';
    if (lastFocusedElement) lastFocusedElement.focus();
  };

  document.querySelectorAll('.project-open').forEach((button) => {
    button.addEventListener('click', () => {
      if (!lightbox || !lightboxImage) return;
      lastFocusedElement = button;
      lightboxImage.src = button.dataset.image || '';
      lightboxImage.alt = button.getAttribute('aria-label') || button.dataset.title || 'Karya portofolio';
      lightboxTitle.textContent = button.dataset.title || 'Karya';
      lightboxType.textContent = button.dataset.type || '';
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('is-locked');
      closeLightboxButton?.focus();
    });
  });

  closeLightboxButton?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeLightbox();
  });

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
