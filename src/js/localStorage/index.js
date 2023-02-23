import RenderNews from '../renderNews';

const newsList = document.querySelector('.list-news');
// const addToFavoriteBtn = document.querySelector('.item-news__add-to-favorite');

// const renderNews = new RenderNews();

localStorage.setItem('favorite', []);

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


        const choosenNews = (e.target.closest('.list-news__item'));
        const choosenNewsId = choosenNews.dataset.id;
        const doesHaveElement = this.favorite.findIndex(
          news => news.id === choosenNewsId
        );


        if (doesHaveElement < 0) {
            e.target
              .closest('.item-news__add-to-favorite')
                .classList.toggle('hidden-span');
            const choosenNewsMarkup = `<li class="list-news__item popular-news__item"data-id=${choosenNewsId}>${choosenNews.innerHTML}</li>`;
            const chooseNewsObj = {
                      id: choosenNewsId,
                      markup: choosenNewsMarkup,
            };
            this.favorite.push(chooseNewsObj);
        } else {

        }

        console.log(`after everything`);
        console.log(this.favorite);
        console.log(doesHaveElement);
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