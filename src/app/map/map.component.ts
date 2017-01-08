import { Component } from '@angular/core';

@Component({
  selector: 'map',
  styleUrls: [ './map.component.css' ],
  templateUrl: './map.component.html'
})

export class MapComponent {

  constructor() {}

  ngOnInit() {
    let mapProp = {
      center: new google.maps.LatLng(-34.397, 150.644),
      zoom: 10,
    };

    let map = new google.maps.Map(document.getElementById("map"), mapProp);
  }
}