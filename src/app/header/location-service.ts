// import Promise from "ts-promise";
//
// export default class LocationService {
//
//     findLocation(): Promise<google.maps.LatLng> {
//         let current = new google.maps.LatLng(
//             -34.397,
//             150.644
//         );
//
//         let map = new google.maps.Map(document.getElementById('map'), {
//             center: current,
//             zoom: 10
//         });
//
//         let infoWindow = new google.maps.InfoWindow(map);
//
//         return new Promise<google.maps.LatLng>(function(resolve, reject) {
//             // Try HTML5 geolocation.
//             if (navigator.geolocation) {
//                 navigator.geolocation.getCurrentPosition(function (position) {
//                     let coords = position.coords;
//                     current = new google.maps.LatLng(
//                         coords.latitude,
//                         coords.longitude
//                     );
//
//                     infoWindow.setPosition(current);
//                     infoWindow.setContent('Location found.');
//                     map.setCenter(current);
//                     resolve(current)
//                 }, function () {
//                     this.handleLocationError(true, infoWindow, map.getCenter());
//                     reject(null);
//                 });
//             } else {
//                 // Browser doesn't support Geolocation
//                 this.handleLocationError(false, infoWindow, map.getCenter());
//                 reject(null);
//             }
//         });
//     }
//
//
//     handleLocationError(browserSupport:boolean, infoWindow:google.maps.InfoWindow, pos:google.maps.LatLng) {
//         infoWindow.setPosition(pos);
//         infoWindow.setContent(browserSupport ?
//             'Error: The Geolocation service failed.' :
//             'Error: Your browser doesn\'t support geolocation.');
//     }
// }
