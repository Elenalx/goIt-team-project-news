import './js/dark-light_theme';

const readNewsList = document.querySelector('.list-news');
const oneDayNews = document.querySelector('.date-list__item');

oneDayNews.addEventListener('click', onDayClick);

function onDayClick(e) {
    
    if (e.target.classList.contains('date__day') || e.target.classList.contains('date__arrow')) {
        readNewsList.classList.toggle('is-hidden');
    }
}

let localStorageReadData = localStorage.getItem('read');
if (localStorageReadData && localStorageReadData.length) {
  const parsedData = JSON.parse(localStorageReadData); // распарсенніе данные (массив объектов)
  const readMarkup = parsedData
    .map(element => {
      return element.markup;

    })
    .join('');
  readNewsList.innerHTML = readMarkup;
}
