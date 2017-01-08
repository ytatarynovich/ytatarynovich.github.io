import { Component } from '@angular/core';
import { CityWheather } from './../header/weather-dto';
import { HttpModule } from '@angular/http';

@Component({
  selector: 'my-location',
  styleUrls: [ './my-location.component.css' ],
  templateUrl: './my-location.component.html'
})

export class MyLocationComponent {
  myCity: CityWheather;

  constructor() {
    this.myCity = new CityWheather();
    this.myCity.name = 'Mogilev';
    this.myCity.temperature= 10;
    this.myCity.main = 'asg';
    this.myCity.description= 'dfesc';
  }
}
