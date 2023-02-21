const KEY = '03c5762bdc5b910c3c4c3d1ef326933c';

const listEl = document.querySelector('.list-news');

export function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  getWeather(latitude, longitude)
    .then(data => {
      renderWeatherElement(data, listEl);
    })
    .catch(err => console.log(err));
}

export function error(err) {
  getWeather(50.4333, 30.5167).then(data => {
    renderWeatherElement(data, listEl);
  });
}

export function getWeather(latitude, longitude) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?appid=${KEY}&lat=${latitude}&lon=${longitude}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

export function renderWeatherElement(data, container) {
  const {
    weather,
    main: { temp },
    name,
  } = data;

  const localTemp = (temp / 100).toFixed(1);

  const date = new Date().toDateString();
  const dayWeek = date.slice(0, 4);
  const localDate = date.slice(4, date.length);

  const markup = `<li class="weather list-news__item">
        <div class="weather__info">
        <span class="weather__temp">${localTemp}&#176;</span>
        <div>
        <span class="weather__descr">${weather[0].main}</span>
        <div class="weather__city">
        <span>${name}</span>
        </div>
        </div>
        </div>
        <img class="weather__img" src="https://openweathermap.org/img/wn/${weather[0].icon}@4x.png" alt="Weather icon">
        <div class="weather__date">
        <p>${dayWeek}</p>
        <p>${localDate}</p>
        </div>
        <a class="weather__link" href="https://ua.sinoptik.ua/" target="_blank" rel="noreferrer noopener">weather for week</a>
        </li>`;
  container.insertAdjacentHTML('afterbegin', markup);
}
