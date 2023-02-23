const homeLinkEl = document.querySelector('[data-name="home"]');
const favoriteLinkEl = document.querySelector('[data-name="favorite"]');
const readLinkEl = document.querySelector('[data-name="read"]');

const homeMobileLinkEl = document.querySelector('[data-name="home-mobile"]');
const favoriteMobileLinkEl = document.querySelector(
  '[data-name="favorite-mobile"]'
);
const readMobileLinkEl = document.querySelector('[data-name="read-mobile"]');

readLinkEl.classList.add('navbarlink--current');
favoriteLinkEl.classList.remove('navbarlink--current');
homeLinkEl.classList.remove('navbarlink--current');

readMobileLinkEl.classList.add('navbar-mobilelink--current');
homeMobileLinkEl.classList.remove('navbar-mobilelink--current');
favoriteMobileLinkEl.classList.remove('navbar-mobilelink--current');