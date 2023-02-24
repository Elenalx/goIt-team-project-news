const homeLinkEl = document.querySelector('[data-name="home"]');
const favoriteLinkEl = document.querySelector('[data-name="favorite"]');
const readLinkEl = document.querySelector('[data-name="read"]');

const homeMobileLinkEl = document.querySelector('[data-name="home-mobile"]');
const favoriteMobileLinkEl = document.querySelector(
  '[data-name="favorite-mobile"]'
);
const readMobileLinkEl = document.querySelector('[data-name="read-mobile"]');

favoriteLinkEl.classList.add('navbar__link--current');
homeLinkEl.classList.remove('navbar__link--current');
readLinkEl.classList.remove('navbar__link--current');

favoriteMobileLinkEl.classList.add('navbar-mobile__link--current');
homeMobileLinkEl.classList.remove('navbar-mobile__link--current');
readMobileLinkEl.classList.remove('navbar-mobile__link--current');