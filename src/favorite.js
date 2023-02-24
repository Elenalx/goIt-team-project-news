import LocalStorageClass from './js/localStorage';
import './js/dark-light_theme';

const localStorageEntity = new LocalStorageClass();




const favoriteNewsList = document.querySelector('#favorite__news');

let localStorageFavoriteData = localStorage.getItem('favorite');
if (localStorageFavoriteData && localStorageFavoriteData.length) {
  const parsedData = JSON.parse(localStorageFavoriteData); // распарсенніе данные (массив объектов)
  const favoriteMarkup = parsedData
    .map(element => {
      return element.markup;
    })
    .join('');
  favoriteNewsList.innerHTML = favoriteMarkup;
}


if (favoriteNewsList) {
    favoriteNewsList.addEventListener(
      'click', onClick
    );
}

    localStorageFavoriteData = JSON.parse(localStorageFavoriteData);
function onClick(e) {
    if (!e.target.parentNode.classList.contains('item-news__add-to-favorite')) {
        return;
    } 

    const choosenNews = e.target.closest('.list-news__item'); // лишка
    const id = choosenNews.dataset.id;
    e.target // toggle class
      .closest('.item-news__add-to-favorite')
        .classList.toggle('hidden-span');

    const idX = localStorageFavoriteData.findIndex(item => item.id === id);
    localStorageFavoriteData.splice(idX, 1);
    localStorage.setItem('favorite', JSON.stringify(localStorageFavoriteData));
    if (localStorageFavoriteData.length) {
const favoriteMarkup = localStorageFavoriteData
  .map(element => {
    return element.markup;
  })
  .join('');
favoriteNewsList.innerHTML = favoriteMarkup;
    } else {
        favoriteNewsList.innerHTML = `<section class="background">
    <div class="favorite-container container">     
        <p class="background___title">We haven't found news from this category</p>
        <picture>

          <img class="background___picture" src="https://i.ibb.co/cFdrWFz/desktop.png" alt="background-picture" width="248" height="198">
        </picture>      
    </div>
  </section>`;
    }
    

}


