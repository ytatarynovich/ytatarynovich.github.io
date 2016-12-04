import './app.css';
import Promise from "ts-promise";
import LocationService from "./location-service";
import DtoConverter from "./dto-converter";
import CityWheather from "./weather-dto";

window['initMap'] = initMap;

function initMap() {
  let app = new WheatherApp();

  let locationService = new LocationService();
  let positionPromise = locationService.findLocation();
  positionPromise.then((position: google.maps.LatLng) => {
    app.loadWheather(position);
  });
}

class WheatherApp {

  loadWheather(position: google.maps.LatLng): void {
    const API_ID = '78306410734c69f481aa7b6cc4cd884c'
    let lat = position.lat();
    let lon = position.lng();
    const api = `https://api.openweathermap.org/data/2.5/find/?lat=${lat}&lon=${lon}&APPID=${API_ID}&cnt=5&units=metric`;
    this.getApi(api).then((data: any) => {
      let converter = new DtoConverter(data);
      let cities = converter.parse();
      let myCity: CityWheather = cities[0];
      document.getElementById('my-location').innerHTML = `
        <div>
          <span><b>${myCity.name}: </b></span>
          <img src="https://openweathermap.org/img/w/${myCity.icon}.png">
          <span>${myCity.temperature} °C</span>
        </div>
        <div>
          <span><b>${myCity.main}: </b></span>
          <span>${myCity.description}</span>
        </div>
      `;

      var iDiv = document.getElementById('city-list');

      let otherCities = cities.slice(1);

      otherCities.forEach((city) => {
        var innerDiv = document.createElement('div');
        innerDiv.className = 'city-wheather';
        innerDiv.innerHTML = `
          <div class="city-name">${city.name}</div>
          <div class="city-weather">
            <div class="temperature">
              <div>
                <img src="https://openweathermap.org/img/w/${city.icon}.png">
              </div>
              <div>
                <span>${city.temperature} °C</span>
              </div>
            </div>
            <div class="desc">
                <div>${city.main}:</div>
                <div>${city.description}</div>
            </div>
          </div>
        `;
        iDiv.appendChild(innerDiv);
      });
    });
  }

  getApi(url: string): Promise<any> {
    return new Promise(function(resolve, reject) {
      window['apiCallback'] = function () {
        resolve(arguments[0]);
      };

      let script = document.createElement('script');
      script.src = `${url}&callback=apiCallback`;

      document.head.appendChild(script);
    });
  }
}

