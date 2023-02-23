import RenderNews from "./renderNews";

const renderNews = new RenderNews();


export default class Weather {
  constructor() {
    this.KEY = '03c5762bdc5b910c3c4c3d1ef326933c';
    this.latitude = 50.4333;
    this.longitude = 30.5167;
    this.markup = '';
  }

  askGeo() {
    window.navigator.geolocation.getCurrentPosition(this.onSuccess.bind(this));
  }


  onSuccess(position) {
    const weatherTemp = document.querySelector('.weather__temp');
    const weatherDescr = document.querySelector('.weather__descr');
    const cityNme = document.querySelector('.city-name');
    const weatherImg = document.querySelector('.weather__img');
    const dayWeek = document.querySelector('.day-week');
    const localDate = document.querySelector('.local-date');
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    this.getWeather(this.latitude, this.longitude).then(response => {
      cityNme.textContent = response.name;
      weatherTemp.textContent = `${(response.main.temp / 100).toFixed()}°`;
      weatherDescr.textContent = response.weather[0].main;
      weatherImg.setAttribute(
        'src',
        `https://openweathermap.org/img/wn/${response.weather[0].icon}@4x.png`
      );
      const date = new Date().toDateString();
      dayWeek.textContent = date.slice(0, 4);
      localDate.textContent = date.slice(4, date.length);
  }); 
  }


  async getWeather(latitude, longitude) {
    const fetchWeather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?appid=${this.KEY}&lat=${latitude}&lon=${longitude}`
    );
    const weatherData = await fetchWeather.json();
    return weatherData;
  }

  renderWeatherElement(data) {
    const {
      weather,
      main: { temp },
      name,
    } = data;

    const localTemp = Math.abs((temp / 100).toFixed());
    const date = new Date().toDateString();
    const dayWeek = date.slice(0, 4);
    const localDate = date.slice(4, date.length);

    this.markup = `<li class="weather list-news__item">
        <div class="weather__info">
        <span class="weather__temp">${localTemp}°</span>
        <div>
        <span class="weather__descr">${weather[0].main}</span>
        <div class="weather__city">
        <svg viewBox="0 0 37 32">
        <path
        d="M12.164 0.881c-6.557 0.008-11.871 5.321-11.88 11.878v0.001c0 0.005 0 0.012 0 0.018 0 2.685 0.9 5.16 2.414 7.14l-0.021-0.028s0.324 0.426 0.376 0.486l9.11 10.747 9.114-10.749c0.047-0.058 0.372-0.483 0.372-0.483l0.001-0.004c1.494-1.951 2.394-4.425 2.394-7.11 0-0.005 0-0.010 0-0.015v0.001c-0.007-6.559-5.322-11.874-11.88-11.881h-0.001zM12.164 17.080c-2.386 0-4.321-1.934-4.321-4.321s1.934-4.321 4.321-4.321v0c2.386 0 4.32 1.934 4.32 4.32s-1.934 4.32-4.32 4.32v0z">
        </path>
        </svg>
        <span class="city-name">${name}</span>
        </div>
        </div>
        </div>
        <img class="weather__img" src="https://openweathermap.org/img/wn/${weather[0].icon}@4x.png" alt="Weather icon">
        <div class="weather__date">
        <p class="day-week">${dayWeek}</p>
        <p class="local-date">${localDate}</p>
        </div>
        <a class="weather__link" href="https://ua.sinoptik.ua/" target="_blank" rel="noreferrer noopener">weather for week</a>
        </li>`;
  }
}


