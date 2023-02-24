import RenderNews from '../renderNews';


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
      e.target // toggle class
        .closest('.item-news__add-to-favorite')
        .classList.toggle('hidden-span');
      const choosenNews = e.target.closest('.list-news__item'); // лишка
      this.id = choosenNews.dataset.id; // id лишки
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

      } else {
        // если в LS нет записи favorite
        this.favoriteArr.push(chooseNewsObj);
        localStorage.setItem('favorite', JSON.stringify(this.favoriteArr));
        
      }
  }
  
  onReadMoreClick(e) {
    if (!e.target.classList.contains('item-news__info-link')) {
      return;
    }

    

    const choosenNews = e.target.closest('.list-news__item'); // лишка
    this.id = choosenNews.dataset.id; // id лишки
    const choosenNewsMarkup = `<li class="list-news__item popular-news__item"data-id=${this.id}>${choosenNews.innerHTML}</li>`; // разметка
    const chooseNewsObj = {
      //объект с id и разметкой
      id: this.id,
      markup: choosenNewsMarkup,
    };

    if (localStorage.getItem('read')) {
      // есть ли в LS запись с ключом read ?
      // если в LS есть запись read  =>
      const localStorageReadData = localStorage.getItem('read'); // данные с LS
      this.read = JSON.parse(localStorageReadData) || []; // распарсенніе данные (массив объектов)

      const doesHaveElement = this.read.findIndex(
        news => news.id === this.id
      ); // проверяем есть ли в массиве объектов, объект с данным id
      console.log(doesHaveElement);
      if (doesHaveElement < 0) {
        // если нет
        this.read.push(chooseNewsObj);
        localStorage.setItem('read', JSON.stringify(this.read));
      } 
    } else {
      // если в LS нет записи read
      this.read.push(chooseNewsObj);
      localStorage.setItem('read', JSON.stringify(this.read));
    }
  }
  
  

}
