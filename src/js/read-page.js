const homeLinkEl = document.querySelector('[data-name="home"]');
const favoriteLinkEl = document.querySelector('[data-name="favorite"]');
const readLinkEl = document.querySelector('[data-name="read"]');

const homeMobileLinkEl = document.querySelector('[data-name="home-mobile"]');
const favoriteMobileLinkEl = document.querySelector(
  '[data-name="favorite-mobile"]'
);
const readMobileLinkEl = document.querySelector('[data-name="read-mobile"]');

readLinkEl.classList.add('navbar__link--current');
favoriteLinkEl.classList.remove('navbar__link--current');
homeLinkEl.classList.remove('navbar__link--current');

readMobileLinkEl.classList.add('navbar-mobile__link--current');
homeMobileLinkEl.classList.remove('navbar-mobile__link--current');
favoriteMobileLinkEl.classList.remove('navbar-mobile__link--current');