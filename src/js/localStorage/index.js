import RenderNews from '../renderNews';

// const favoriteNewsList = document.querySelector('#favorite__news');





export default class LocalStorageClass {
  constructor() {
    this.popularArr = [];
    this.favoriteArr = [];
    this.read = [];
    this.id = '';
    this.imageURL = '';
    this.category = '';
    this.title = '';
    this.desc = '';
    this.date = '';
    this.url = '';
  }

    onAddToFavoriteClick(e) {
      if (
        !e.target.parentNode.classList.contains('item-news__add-to-favorite')
      ) {
        return;
      }
      // console.log(localStorage.getItem('favorite'));
      e.target // toggle class
        .closest('.item-news__add-to-favorite')
        .classList.toggle('hidden-span');
      const choosenNews = e.target.closest('.list-news__item'); // лишка
      this.id = choosenNews.dataset.id; // id лишки
      // console.log(this.id);
      // console.log(this.popularArr);
      // const newsIndex = this.popularArr.findIndex(news => `${news.id}` === `${this.id}`);
      // console.log(newsIndex);
      const choosenNewsMarkup = `<li class="list-news__item popular-news__item"data-id=${this.id}>${choosenNews.innerHTML}</li>`; // разметка
      const chooseNewsObj = {
        //объект с id и разметкой
        id: this.id,
        markup: choosenNewsMarkup,
      };

      if (localStorage.getItem('favorite')) {
        // есть ли в LS запись с ключом favorite ?
        // если в LS есть запись favorite  =>
        const localStorageFavoriteData = localStorage.getItem('favorite'); // данные с LS
        this.favoriteArr = JSON.parse(localStorageFavoriteData) || []; // распарсенніе данные (массив объектов)
        // this.favoriteArr.push(chooseNewsObj);


        const doesHaveElement = this.favoriteArr.findIndex(
          news => news.id === this.id
        ); // проверяем есть ли в массиве объектов, объект с данным id
        console.log(doesHaveElement);
        if (doesHaveElement < 0) {
          // если нет
          this.favoriteArr.push(chooseNewsObj);
          localStorage.setItem('favorite', JSON.stringify(this.favoriteArr));
        } else {
          // если да
          this.favoriteArr.splice(doesHaveElement, 1);
          localStorage.setItem('favorite', JSON.stringify(this.favoriteArr));
        }
        // console.log(parsedData);
      } else {
        // если в LS нет записи favorite
        this.favoriteArr.push(chooseNewsObj);
        localStorage.setItem('favorite', JSON.stringify(this.favoriteArr));
        
      }
    };
  

}

// const localStorageEntity = new LocalStorageClass();
// favoriteNewsList.addEventListener(
//   'click',
//   localStorageEntity.onAddToFavoriteClick.bind(localStorageEntity)
// );