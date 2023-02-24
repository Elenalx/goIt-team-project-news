import { format, compareAsc } from 'date-fns';
import { pagination } from '../../index';

const addToFavoriteBtn = document.querySelector('.item-news__add-to-favorite');

const mobileScreenSize = window.matchMedia(
  'screen and (max-width: 767px)'
).matches;
const tabletScreenSize = window.matchMedia(
  'screen and (min-width: 768px) and (max-width: 1279px)'
).matches;
const desktopScreenSize = window.matchMedia(
  'screen and (min-width: 1280px)'
).matches;


export default class RenderNews {
  constructor() {
    this.currentPage = 1;
    this.lastElem = 8;
    this.firstElem = 0;
    this.maxPages = 3;
    this.weatherMarkup = '';
  }
  async renderPopularNews(newsArr, elemToJoin) {
    if (mobileScreenSize === true) {
      this.lastElem = this.currentPage * 4;
      this.firstElem = this.lastElem - 4;
      this.maxPages = Math.ceil(newsArr.length / 4);

    } else if (tabletScreenSize === true) {
      this.lastElem = this.currentPage * 7;
      this.firstElem = this.lastElem - 7;
      this.maxPages = Math.ceil(newsArr.length / 8);

    } else if (desktopScreenSize === true) {
      this.lastElem = this.currentPage * 8;
      this.firstElem = this.lastElem - 8;
      this.maxPages = Math.ceil(newsArr.length / 9);
    }
    const newsList = newsArr.slice(this.firstElem, this.lastElem);
    const newsMarkup = newsList.map(
      ({ title, abstract, media, section, published_date, url, id }) => {
        const newsDate = format(new Date(`${published_date}`), 'MM/dd/yyyy');
        let newsText = `${abstract}`;
        if (newsText.length > 115) {
          newsText = newsText.substring(0, 115);
        }
        let imageURL = `https://img.freepik.com/free-vector/internet-network-warning-404-error-page-or-file-not-found-for-web-page_1150-48326.jpg?w=996&t=st=1676297842~exp=1676298442~hmac=6cad659e6a3076ffcb73bbb246c4f7e5e1bf7cee7fa095d67fcced0a51c2405c`;
        if (media.length !== 0) {
          imageURL = media[0]['media-metadata'][2].url;
        }
        return `<li class="list-news__item popular-news__item" data-id=${id}>
  <article class="item-news__article">
    <div class="item-news__wrapper-img">
      <img
        class="item-news__img"
        src=${imageURL}
        alt="NewsImage"
      />
      <p class="item-news__category">${section}</p>
      <button type="button" class="item-news__add-to-favorite">
        <span class="item-news__add-to-favorite-btn">
          Add to favorite
          <svg
            class="item-news__block-icon active-news-icon"
            width="16"
            height="16"
            viewBox="0 0 37 32"
          >
            <path
              style="stroke: var(--color1, #4440f7)"
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-miterlimit="4"
              stroke-width="2.2857"
              d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"
            ></path>
          </svg>
          
        </span>
        <span class="item-news__remove-to-favorite-btn ">
          Remove from favorite
          <svg
            class="item-news__block-icon active-news-icon"
            width="16"
            height="16"
            viewBox="0 0 37 32"
          >
            <path
              style="stroke: var(--color1, #4440f7)"
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-miterlimit="4"
              stroke-width="2.2857"
              d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"
            ></path>
          </svg>
          
        </span>
      </button>
    </div>
    <div class="item-news__wrapper-text">
      <h2 class="item-news__title">
        ${title}
      </h2>
      <p class="item-news__description">
       ${newsText}...
      </p>
    </div>
    <div class="item-news__info">
      <span class="item-news__info-date">${newsDate}</span>
      <a target="_blank" class="item-news__info-link" href="${url}">
        Read more
      </a>
    </div>
  </article>
</li>`;
      }
    );
    if (mobileScreenSize === true) {
      newsMarkup.splice(0, 0, this.weatherMarkup);
      const newsMarkupWithWeather = newsMarkup
        .map(news => {
          return news;
        })
        .join('');
      elemToJoin.innerHTML = newsMarkupWithWeather;
    } else if (tabletScreenSize === true) {
      newsMarkup.splice(1, 0, this.weatherMarkup);
      const newsMarkupWithWeather = newsMarkup
        .map(news => {
          return news;
        })
        .join('');
      elemToJoin.innerHTML = newsMarkupWithWeather;
    } else if (desktopScreenSize === true) {
      newsMarkup.splice(2, 0, this.weatherMarkup);
      const newsMarkupWithWeather = newsMarkup
        .map(news => {
          return news;
        })
        .join('');
      elemToJoin.innerHTML = newsMarkupWithWeather;
    }
  }
  renderNewsbyASearch(newsArr, elem) {
    console.log(newsArr);
    const IMAGE_BASE_URL = 'https://static01.nyt.com/';
    const newsMarkup = newsArr.map(
      ({
        abstract,
        lead_paragraph,
        multimedia,
        section_name,
        pub_date,
        web_url,
      }) => {
        const newsDate = format(new Date(`${pub_date}`), 'MM/dd/yyyy');
        let newsText = `${lead_paragraph}`;
        if (newsText.length > 115) {
          newsText = newsText.substring(0, 115);
        }
        let imageURL = `https://img.freepik.com/free-vector/internet-network-warning-404-error-page-or-file-not-found-for-web-page_1150-48326.jpg?w=996&t=st=1676297842~exp=1676298442~hmac=6cad659e6a3076ffcb73bbb246c4f7e5e1bf7cee7fa095d67fcced0a51c2405c`;
        if (multimedia.length !== 0) {
          imageURL = `${IMAGE_BASE_URL}${multimedia[0].url}`;
        }
        return `<li class="list-news__item popular-news__item">
  <article class="item-news__article">
    <div class="item-news__wrapper-img">
      <img
        class="item-news__img"
        src=${imageURL}
        alt="NewsImage"
      />
      <p class="item-news__category">${section_name}</p>
      <button type="button" class="item-news__add-to-favorite">
        <span class="item-news__add-to-favorite-btn">
          Add to favorite
          <svg
            class="item-news__block-icon active-news-icon"
            width="16"
            height="16"
            viewBox="0 0 37 32"
          >
            <path
              style="stroke: var(--color1, #4440f7)"
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-miterlimit="4"
              stroke-width="2.2857"
              d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"
            ></path>
          </svg>
          
        </span>
        <span class="item-news__remove-to-favorite-btn">
          Remove from favorite
          <svg
            class="item-news__block-icon active-news-icon"
            width="16"
            height="16"
            viewBox="0 0 37 32"
          >
            <path
              style="stroke: var(--color1, #4440f7)"
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-miterlimit="4"
              stroke-width="2.2857"
              d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"
            ></path>
          </svg>
          
        </span>
      </button>
    </div>
    <div class="item-news__wrapper-text">
      <h2 class="item-news__title">
        ${abstract}
      </h2>
      <p class="item-news__description">
       ${newsText}...
      </p>
    </div>
    <div class="item-news__info">
      <span class="item-news__info-date">${newsDate}</span>
      <a target="_blank" class="item-news__info-link" href="${web_url}">
        Read more
      </a>
    </div>
  </article>
</li>`;
      }
    );
    if (mobileScreenSize === true) {
      newsMarkup.splice(0, 0, this.weatherMarkup);
      const newsMarkupWithWeather = newsMarkup
        .map(news => {
          return news;
        })
        .join('');
      elem.innerHTML = newsMarkupWithWeather;
    } else if (tabletScreenSize === true) {
      newsMarkup.splice(1, 0, this.weatherMarkup);
      const newsMarkupWithWeather = newsMarkup
        .map(news => {
          return news;
        })
        .join('');
      elem.innerHTML = newsMarkupWithWeather;
    } else if (desktopScreenSize === true) {
      newsMarkup.splice(2, 0, this.weatherMarkup);
      const newsMarkupWithWeather = newsMarkup
        .map(news => {
          return news;
        })
        .join('');
      elem.innerHTML = newsMarkupWithWeather;
    }
  }

  renderCategoryNews(newsArr, elemToJoin) {
    console.log(newsArr);
    if (mobileScreenSize === true) {
      this.lastElem = this.currentPage * 4;
      this.firstElem = this.lastElem - 4;
      this.maxPages = Math.ceil(newsArr.length / 4);
    } else if (tabletScreenSize === true) {
      this.lastElem = this.currentPage * 7;
      this.firstElem = this.lastElem - 7;
      this.maxPages = Math.ceil(newsArr.length / 8);
    }
    const IMAGE_BASE_URL = 'https://static01.nyt.com/';
    const newsList = newsArr.slice(this.firstElem, this.lastElem);
    const newsMarkup = newsList.map(
      ({ title, abstract, multimedia, published_date, section, url }) => {
        const newsDate = format(new Date(`${published_date}`), 'MM/dd/yyyy');
        let newsText = `${abstract}`;
        if (newsText.length > 115) {
          newsText = newsText.substring(0, 115);
        }
        let imageURL = `https://img.freepik.com/free-vector/internet-network-warning-404-error-page-or-file-not-found-for-web-page_1150-48326.jpg?w=996&t=st=1676297842~exp=1676298442~hmac=6cad659e6a3076ffcb73bbb246c4f7e5e1bf7cee7fa095d67fcced0a51c2405c`;
        if (multimedia) {
          imageURL = `${multimedia[1].url}`;
        }
        return `<li class="list-news__item popular-news__item">
  <article class="item-news__article">
    <div class="item-news__wrapper-img">
      <img
        class="item-news__img"
        src=${imageURL}
        alt="NewsImage"
      />
      <p class="item-news__category">${section}</p>
      <button type="button" class="item-news__add-to-favorite">
        <span class="item-news__add-to-favorite-btn">
          Add to favorite
          <svg
            class="item-news__block-icon active-news-icon"
            width="16"
            height="16"
            viewBox="0 0 37 32"
          >
            <path
              style="stroke: var(--color1, #4440f7)"
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-miterlimit="4"
              stroke-width="2.2857"
              d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"
            ></path>
          </svg>
          
        </span>
        <span class="item-news__remove-to-favorite-btn">
          Remove from favorite
          <svg
            class="item-news__block-icon active-news-icon"
            width="16"
            height="16"
            viewBox="0 0 37 32"
          >
            <path
              style="stroke: var(--color1, #4440f7)"
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-miterlimit="4"
              stroke-width="2.2857"
              d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"
            ></path>
          </svg>
          
        </span>
      </button>
    </div>
    <div class="item-news__wrapper-text">
      <h2 class="item-news__title">
        ${title}
      </h2>
      <p class="item-news__description">
       ${newsText}...
      </p>
    </div>
    <div class="item-news__info">
      <span class="item-news__info-date">${newsDate}</span>
      <a target="_blank" class="item-news__info-link" href="${url}">
        Read more
      </a>
    </div>
  </article>
</li>`;
      }
    );
    if (mobileScreenSize === true) {
      newsMarkup.splice(0, 0, this.weatherMarkup);
      const newsMarkupWithWeather = newsMarkup
        .map(news => {
          return news;
        })
        .join('');
      elemToJoin.innerHTML = newsMarkupWithWeather;
    } else if (tabletScreenSize === true) {
      newsMarkup.splice(1, 0, this.weatherMarkup);
      const newsMarkupWithWeather = newsMarkup
        .map(news => {
          return news;
        })
        .join('');
      elemToJoin.innerHTML = newsMarkupWithWeather;
    } else if (desktopScreenSize === true) {
      newsMarkup.splice(2, 0, this.weatherMarkup);
      const newsMarkupWithWeather = newsMarkup
        .map(news => {
          return news;
        })
        .join('');
      elemToJoin.innerHTML = newsMarkupWithWeather;
    }
  }

  renderNewsCard(id, imageURL, category, title, desc, newsDate, url, additionalClass = '') {
    return `<li class="list-news__item popular-news__item" data-id=${id}>
  <article class="item-news__article">
    <div class="item-news__wrapper-img">
      <img
        class="item-news__img"
        src=${imageURL}
        alt="NewsImage"
      />
      <p class="item-news__category">${category}</p>
      <button type="button" class="item-news__add-to-favorite ${additionalClass}">
        <span class="item-news__add-to-favorite-btn">
          Add to favorite
          <svg
            class="item-news__block-icon active-news-icon"
            width="16"
            height="16"
            viewBox="0 0 37 32"
          >
            <path
              style="stroke: var(--color1, #4440f7)"
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-miterlimit="4"
              stroke-width="2.2857"
              d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"
            ></path>
          </svg>
          
        </span>
        <span class="item-news__remove-to-favorite-btn">
          Remove from favorite
          <svg
            class="item-news__block-icon active-news-icon"
            width="16"
            height="16"
            viewBox="0 0 37 32"
          >
            <path
              style="stroke: var(--color1, #4440f7)"
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-miterlimit="4"
              stroke-width="2.2857"
              d="M10.666 2.286c-4.207 0-7.619 3.377-7.619 7.543 0 3.363 1.333 11.345 14.458 19.413 0.235 0.143 0.505 0.219 0.78 0.219s0.545-0.076 0.78-0.219c13.125-8.069 14.458-16.050 14.458-19.413 0-4.166-3.412-7.543-7.619-7.543s-7.619 4.571-7.619 4.571-3.412-4.571-7.619-4.571z"
            ></path>
          </svg>
          
        </span>
      </button>
    </div>
    <div class="item-news__wrapper-text">
      <h2 class="item-news__title">
        ${title}
      </h2>
      <p class="item-news__description">
       ${desc}...
      </p>
    </div>
    <div class="item-news__info">
      <span class="item-news__info-date">${newsDate}</span>
      <a target="_blank" class="item-news__info-link" href="${url}">
        Read more
      </a>
    </div>
  </article>
</li>`;
  }
}

