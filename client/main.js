import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.list.userInCollection = function() {
    return Meteor.users.find();
}

Template.map.onRendered(function() {
  GoogleMaps.load( {
    v: '3', key: 'AIzaSyBjcuxTYozbmLeBvnRNJfH2B7edNlF7_3o'
  } )
    
    
    GoogleMaps.ready('map', function(map) {
    var latLng = Geolocation.latLng();

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(latLng.lat, latLng.lng),
      map: map.instance
    });
  });
    
});


Template.map.onCreated(function() {  
  var self = this;

  GoogleMaps.ready('map', function(map) {
    var marker;

    // Create and move the marker when latLng changes.
    self.autorun(function() {
      var latLng = Geolocation.latLng();
      if (! latLng)
        return;

      // If the marker doesn't yet exist, create it.
      if (! marker) {
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(latLng.lat, latLng.lng),
          map: map.instance
        });
      }
      // The marker already exists, so we'll just change its position.
      else {
        marker.setPosition(latLng);
      }

      // Center and zoom the map view onto the current position.
      map.instance.setCenter(marker.getPosition());
//      map.instance.setZoom(MAP_ZOOM);
    });
  });
});



Template.map.helpers({
    
    geolocationError: function() {
//    var error = Geolocation.error();
//    return error && error.message;
        let error = Geolocation.error();
        return error && error.code !== 3 && error.message;
  },
    
  exampleMapOptions: function() { 
   
      var latLng = Geolocation.latLng();
    // Initialize the map once we have the latLng.
    if (GoogleMaps.loaded() && latLng) {
      return {
        center: new google.maps.LatLng(latLng.lat, latLng.lng),
        zoom: 16
      };
    }
//    if (GoogleMaps.loaded()) {
//      return {
//        center: new google.maps.LatLng(36.098276, -79.511543),
//        zoom: 1
//      }
//    }
  }
});