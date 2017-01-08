// import { Injectable }     from '@angular/core';
// import { Http, Response } from '@angular/http';
// import { Observable }     from 'rxjs/Observable';
//
// @Injectable()
// export class MyLocationService {
//   private heroesUrl = 'app/heroes';  // URL to web API
//
//   constructor (private http: Http) {}
//
//   findMyLocation (): Observable<Location> {
//     let infoWindow = new google.maps.InfoWindow(map);
//
//     let location = new Observable<Location>();
//
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(function (position) {
//         let coords = position.coords;
//         current = new google.maps.LatLng(
//             coords.latitude,
//             coords.longitude
//         );
//
//         infoWindow.setPosition(current);
//         infoWindow.setContent('Location found.');
//         map.setCenter(current);
//         resolve(current)
//       }, function () {
//         this.handleLocationError(true, infoWindow, map.getCenter());
//         reject(null);
//       });
//     } else {
//       reject(null);
//     }
//
//     return location;
//
//   }
// }
