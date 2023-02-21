// window.addEventListener('load', windowLoad);

// function windowLoad() {
//   const htmlBlock = document.documentElement;

//   const saveUserTheme = localStorage.getItem('user-theme');

//   let userTheme;
//   if (window.matchMedia) {
//     userTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
//       ? 'dark'
//       : 'light';
//   }
//   window
//     .matchMedia('(prefers-color-scheme: dark)')
//     .addEventListener('change', e => {
//       !saveUserTheme ? changeTheme() : null;
//     });

//   const themeButton = document.querySelector('.switch-checkbox');
//   if (themeButton) {
//     themeButton.addEventListener('click', function (e) {
//       changeTheme(true);
//     });
//   }
// }

// function setThemeClass() {
//   if (saveUserTheme) {
//     htmlBlock.classList.add(saveUserTheme);
//   } else {
//     htmlBlock.classList.add(userTheme);
//   }
// }

// setThemeClass();

// function changeTheme(saveTheme = false) {
//   let currentTheme = htmlBlock.classList.contains('light') ? 'light' : 'dark';
//   let newTheme;

//   if (currentTheme === 'light') {
//     newTheme = 'dark';
//   } else if (currentTheme === 'dark') {
//     newTheme = 'light';
//   }
//   htmlBlock.classList.remove(currentTheme);
//   htmlBlock.classList.add(newTheme);
//   saveTheme ? localStorage.setItem('user-theme', newTheme) : null;
// }

const changeThemeBtn = document.querySelector('.switch-checkbox');
const bodyTheme = document.querySelector('body');
const themeDarkEl = document.querySelector('.theme__dark');
const themeLightEl = document.querySelector('.theme__light');

changeThemeBtn.addEventListener('click', changeTheme);

function changeTheme() {
  bodyTheme.classList.toggle('darkMode');
  themeDarkEl.classList.toggle('opacityForDark');
  themeLightEl.classList.toggle('opacityForDark');
  // localStorage.setItem('theme', 'dark');
  if (localStorage.getItem('theme') !== 'dark') {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.removeItem('theme');
  }
  // addDarkClassToHTML();
}

function addDarkClassToHTML() {
  try {
    if (localStorage.getItem('theme') === 'dark') {
      bodyTheme.classList.add('darkMode');
      changeThemeBtn.checked = true;
    }
    // else {
    //   bodyTheme.classList.remove('theme-dark');
    // }
  } catch (err) {}
}

addDarkClassToHTML();
