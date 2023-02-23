const homeLinkEl = document.querySelector('[data-name="home"]');
const favoriteLinkEl = document.querySelector('[data-name="favorite"]');
const readLinkEl = document.querySelector('[data-name="read"]');

readLinkEl.classList.add('navbar__link--current');
favoriteLinkEl.classList.remove('navbar__link--current');
homeLinkEl.classList.remove('navbar__link--current');
