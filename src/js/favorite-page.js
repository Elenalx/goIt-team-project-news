const homeLinkEl = document.querySelector('[data-name="home"]');
const favoriteLinkEl = document.querySelector('[data-name="favorite"]');
const readLinkEl = document.querySelector('[data-name="read"]');

const homeMobileLinkEl = document.querySelector('[data-name="home-mobile"]');
const favoriteMobileLinkEl = document.querySelector(
  '[data-name="favorite-mobile"]'
);
const readMobileLinkEl = document.querySelector('[data-name="read-mobile"]');

favoriteLinkEl.classList.add('navbarlink--current');
homeLinkEl.classList.remove('navbarlink--current');
readLinkEl.classList.remove('navbarlink--current');

favoriteMobileLinkEl.classList.add('navbar-mobilelink--current');
homeMobileLinkEl.classList.remove('navbar-mobilelink--current');
readMobileLinkEl.classList.remove('navbar-mobilelink--current');