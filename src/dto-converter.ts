import CityWheather from "./weather-dto";

export default class DtoConverter {

  constructor(private _data: string) { }

  parse(): CityWheather[] {
    let jsonData = JSON.parse(this._data);

    let cities = jsonData['list'];
    let wheather = cities.map((city: CityDto) => this.parseCity(city));

    return wheather;
  }

  private parseCity(dto: CityDto) : CityWheather {
    let city = new CityWheather();
    city.name = dto.name;
    city.temperature = dto.main.temp;
    city.main = dto.weather[0].main;
    city.description = dto.weather[0].description;
    city.icon = dto.weather[0].icon;

    return city;
  }
}

interface CityDto {
  name: string,
  main: {
    temp: number
  },
  weather: Array<{
    main: string,
    description: string,
    icon: string
  }>
}
