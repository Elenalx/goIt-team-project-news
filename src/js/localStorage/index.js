import RenderNews from '../renderNews';

const newsList = document.querySelector('.list-news');
// const addToFavoriteBtn = document.querySelector('.item-news__add-to-favorite');


const favoriteNewsArr = [];
localStorage.setItem('favorite', favoriteNewsArr);
const x = localStorage.getItem('favorite');
console.log(x);

export default class LocalStorageClass {
  constructor() {
    this.favorite = [];
    this.read = [];
  }

    onAddToFavoriteClick(e) {
      if (
        !e.target.parentNode.classList.contains('item-news__add-to-favorite')
      ) {
        return;
      }
      
      e.target                                      // toggle class
        .closest('.item-news__add-to-favorite') 
        .classList.toggle('hidden-span');
      const choosenNews = (e.target.closest('.list-news__item')); // лишка 
      const choosenNewsId = choosenNews.dataset.id;   // id лишки
      const localStorageFavoriteData = localStorage.getItem('favorite'); // данные с LS
      const parsedData = JSON.parse(localStorageFavoriteData);  // распарсенніе данные (массив объектов)
      console.log(parsedData);

        const doesHaveElement = parsedData.findIndex(
          news => news.id === choosenNewsId
        );

      console.log(doesHaveElement);


        if (doesHaveElement < 0) {
            const choosenNewsMarkup = `<li class="list-news__item popular-news__item"data-id=${choosenNewsId}>${choosenNews.innerHTML}</li>`;
            const chooseNewsObj = {
                      id: choosenNewsId,
                      markup: choosenNewsMarkup,
            };
          parsedData.push(chooseNewsObj);
          localStorage.setItem('favorite', JSON.stringify(parsedData));
          console.log()
          // localStorageFavorite.push(chooseNewsObj);
          // console.log(localStorageFavorite);
          // this.favorite.push(chooseNewsObj);
        } else {

        }

        // console.log(`after everything`);
        // console.log(this.favorite);
        // console.log(doesHaveElement);
        //  this.favorite.splice(doesHaveElement, 1);

        
        

  

        // this.favorite.push(chooseNewsObj);

        // if (doesHaveElement >= 0) {
            
        // } else {
        //     console.log('there are no elements with such id')
        // }

        
       
        // if () {
            
        // }
        
        
        


        // console.log(this.favorite);
    };
}

const localStorageEntity = new LocalStorageClass();
newsList.addEventListener(
  'click',
  localStorageEntity.onAddToFavoriteClick.bind(localStorageEntity)
);