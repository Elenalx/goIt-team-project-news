import './js/dark-light_theme';
import './js/categories';
import './js/weather';
// import './js/mobile-menu';
import './js/localStorage';
import FetchNews from './js/fetchNews';
import RenderNews from './js/renderNews';
import Weather from './js/weather';
import Pagination from 'tui-pagination';
import LocalStorageClass from './js/localStorage'
import 'tui-pagination/dist/tui-pagination.css';


  
const mobileScreenSize = window.matchMedia(
  'screen and (max-width: 767px)'
).matches;
const tabletScreenSize = window.matchMedia(
  'screen and (min-width: 768px) and (max-width: 1279px)'
).matches;
const desktopScreenSize = window.matchMedia(
  'screen and (min-width: 1280px)'
).matches;

// ------------------------------------------ paginator ------------------------------------------
const options = {
  totalItems: 10,
  itemsPerPage: 10,
  visiblePages: 10,
  page: 1,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};
const container = document.getElementById('pagination', options);
const pagination = new Pagination(container);

//  ------------------------------------------ paginator ------------------------------------------
const currentMonthYear = document.querySelector('.current-date');
const localStorageEntity = new LocalStorageClass();
const weather = new Weather();                   
const renderNews = new RenderNews();
const fetchNews = new FetchNews();
const newsList = document.querySelector('.list-news');
const searchForm = document.querySelector('.search-field');
const prevPage = document.querySelector('.prev__page');
const nextPage = document.querySelector('.next__page');
const categoriesList = document.querySelector('.category__list-bt');
const otherCategoryBtn = document.querySelector('.category__item-bt-arrow');
const otherCategoriesThumb = document.querySelector('.filter-category__list');
const otherCategoryContainer = document.querySelector(
  '.category__others-container'
);
const chooseDate = document.querySelector('.days');

chooseDate.addEventListener('click', onChooseDateClick)
categoriesList.addEventListener('click', onCategoryClick);
otherCategoriesThumb.addEventListener('click', onCategoryClick);
// otherCategoriesBtn.addEventListener('click', onOtherCategoriesClick);
prevPage.addEventListener('click', onPrevBtnClick);
nextPage.addEventListener('click', onNextBtnClick);
searchForm.addEventListener('submit', onFormSubmit);
newsList.addEventListener(
  'click',
  localStorageEntity.onAddToFavoriteClick.bind(localStorageEntity)
);
newsList.addEventListener(
  'click',
  localStorageEntity.onReadMoreClick.bind(localStorageEntity)
);
// document.addEventListener('click', onDocumentClick);


// --------------------------------------------- вызовы функций при первой загрузке ---------------------------------------------
      
onPageLoad();


getCategoriesList();

localStorage.removeItem('favorite');
// ---------------------------------------------------------------------------------------------------------------------------------------

// function onOtherCategoriesClick() {
//   otherCategoriesThumb.classList.toggle('is-hidden');
// }

// function onDocumentClick(e) {
//   if (e.target !== otherCategoryContainer && e.target !== otherCategoryBtn) {
//     otherCategoryContainer.classList.remove('is-open');
//   }
// }

// function onDocumentClick(e) {
//   if (e.currentTarget !== otherCategoryContainer) {
//     otherCategoryContainer.classList.remove('is-open');
//   }
// }

async function onPrevBtnClick() {
  if (searchForm.elements.searchQuery.value !== '') {
    if (fetchNews.currentPage === 0) {
      return;
    } else {
      fetchNews.decrementPage();
      try {
        const news = await fetchNews.fetchNewsBySearch();
        renderNews.renderNewsbyASearch(news.response.docs, newsList);
        scroll(0, 0);
      } catch (error) {
        console.log(error);
      }
    }
  } else if (fetchNews.category !== '') {
    if (renderNews.currentPage === 1) {
      return;
    } else {
      renderNews.currentPage -= 1;
      try {
        const news = await fetchNews.fetchNewsByCategory();
        renderNews.renderCategoryNews(news.results, newsList);
        scroll(0, 0);
      } catch (error) {
        console.log(error);
      }
    }
  } else {
    if (renderNews.currentPage === 1) {
      return;
    } else {
      renderNews.currentPage -= 1;
      try {
        const news = await fetchNews.fetchNewsByMostPopular();
        renderNews.renderPopularNews(news.results, newsList);
        scroll(0, 0);
      } catch (error) {
        console.log(error);
      }
    }
  }
}


async function onNextBtnClick() {
  if (searchForm.elements.searchQuery.value !== '') {
    try {
      fetchNews.incrementPage();
      const news = await fetchNews.fetchNewsBySearch();
      console.log(news.response);
      renderNews.renderNewsbyASearch(news.response.docs, newsList);
      scroll(0, 0);
    } catch (error) {
      console.log(error);
    }
  } else if (fetchNews.category !== '') {
    if (renderNews.currentPage === renderNews.maxPages) {
      return;
    } else {
      renderNews.currentPage += 1;
      try {
        const news = await fetchNews.fetchNewsByCategory();
        renderNews.renderCategoryNews(news.results, newsList);
        scroll(0, 0);
      } catch (error) {
        console.log(error);
      }
    }
  } else { 
    if (renderNews.currentPage === renderNews.maxPages) {
      return;
    } else {
      renderNews.currentPage += 1;
      try {
        const news = await fetchNews.fetchNewsByMostPopular();
        renderNews.renderPopularNews(news.results, newsList);
        scroll(0, 0);
      } catch (error) {
        console.log(error);
      }
    }
  }
}

async function onFormSubmit(e) {
  e.preventDefault();
  renderNews.currentPage = 1;
  fetchNews.searchQuery = encodeURIComponent(
    `${e.currentTarget.elements.searchQuery.value}`
  );
  try {
    const news = await fetchNews.fetchNewsBySearch();
    renderNews.renderNewsbyASearch(news.response.docs, newsList);
    scroll(0, 0);
  } catch (error) {
    console.log(error);
  }
}

async function onCategoryClick(e) {
  renderNews.currentPage = 1;
  if (!e.target.hasAttribute('name')) {
    return;
  }
    fetchNews.category = encodeURIComponent(
      e.target.getAttribute('name').toLowerCase()
    );
  console.log(fetchNews.category);
  try {
    const fetchCategoryNews = await fetchNews.fetchNewsByCategory();
    renderNews.renderCategoryNews(fetchCategoryNews.results, newsList);
  }
  catch (error){console.log(error)}
}

async function getCategoriesList() {
  const categoriesArr = await fetchNews.fetchCategoriesList();
  for (let i = 0; i < 6; i += 1) {
    categoriesList.children[
      i
    ].textContent = `${categoriesArr[i]['display_name']}`;
    categoriesList.children[i].setAttribute(
      'name',
      `${categoriesArr[i]['display_name']}`
    );
  }
  for (let j = 6; j <= 49; j += 1) {
      const otherCategoryElem = document.createElement('li');
      const otherCategoryBtn = document.createElement('button');
      otherCategoryElem.classList.add('filter-category__item');
      otherCategoryBtn.classList.add('filter-category__button');
      otherCategoryElem.append(otherCategoryBtn);
    otherCategoryBtn.textContent = `${categoriesArr[j]['display_name']}`;
    otherCategoryBtn.setAttribute(
      'name',
      `${categoriesArr[j]['display_name']}`
    );
    otherCategoriesThumb.append(otherCategoryElem);
  }
}




async function onPageLoad() {
 await weather
    .getWeather(weather.latitude, weather.longitude)
    .then(response => {
      weather.renderWeatherElement(response);
      renderNews.weatherMarkup = weather.markup;
    })
    .catch(error => console.log(error));

  
fetchNews
    .fetchNewsByMostPopular()
  .then(result => {
    console.log(result.results)
    renderNews.renderPopularNews(result.results, newsList);
    weather.askGeo();

    // getDataNeeded(result.results);
    // console.log(localStorageEntity.popularArr);
     
   })
   .catch(error => console.log(error));
}


function getDataNeeded (arr) {
     arr.map(result => {
        if (Object.values(result.media).length > 0) {
          localStorageEntity.popularArr.push({
            title: result.title,
            desc: result.abstract,
            date: result.published_date,
            url: result.url,
            imageURL: result.media[0]['media-metadata'][0].ulr,
          });
        } else {
          localStorageEntity.popularArr.push({
            title: result.title,
            desc: result.abstract,
            date: result.published_date,
            category: result.section,
            url: result.url,
            imageURL: `https://img.freepik.com/free-vector/internet-network-warning-404-error-page-or-file-not-found-for-web-page_1150-48326.jpg?w=996&t=st=1676297842~exp=1676298442~hmac=6cad659e6a3076ffcb73bbb246c4f7e5e1bf7cee7fa095d67fcced0a51c2405c`,
          });
        }
      });
}


function onChooseDateClick(e) {
  fetchNews.date = e.target.textContent;
  // console.log(fetchNews.date);
  // console.log(currentMonthYear.textContent);
}
// добавить категории для мобилки 

// добавить клик по фаворит  класс hidden-span

// при сабмите возвращаться на главную 

// ан аккордеоне добавлять класс   is-hidden

// выбор даты и сохранение 

// {abstract, media[0][media-metadata][0], published_date, title, url, nytdsection}


// ------------------------------------------------  READ PAGE      -------------------------------------------------------------------


// if (readNewsList) {
//   readNewsList.addEventListener('click', onClick);
// }

// localStorageReadData = JSON.parse(localStorageReadData);
// function onClick(e) {
//   if (!e.target.classList.contains('item-news__info-link')) {
//     return;
//   }

//   const choosenNews = e.target.closest('.list-news__item'); // лишка
//   const id = choosenNews.dataset.id;
//   //   e.target // toggle class
//   //     .closest('.item-news__info-link')
//   //     .classList.toggle('hidden-span');

//   const idX = localStorageFavoriteData.findIndex(item => item.id === id);
//   localStorageFavoriteData.splice(idX, 1);
//   localStorage.setItem('favorite', JSON.stringify(localStorageFavoriteData));
//   if (localStorageFavoriteData.length) {
//     const favoriteMarkup = localStorageFavoriteData
//       .map(element => {
//         return element.markup;
//         // console.log(element.markup);
//       })
//       .join('');
//     readNewsList.innerHTML = favoriteMarkup;
//   }
//   //   else {
//   //     readNewsList.innerHTML = `<section class="background">
//   //     <div class="favorite-container container">
//   //         <p class="background___title">We haven't found news from this category</p>
//   //         <picture>

//   //           <img class="background___picture" src="https://i.ibb.co/cFdrWFz/desktop.png" alt="background-picture" width="248" height="198">
//   //         </picture>
//   //     </div>
//   //   </section>`;
//   //   }
// }