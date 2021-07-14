import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {
  NativeGeocoder,
  NativeGeocoderResult,
  NativeGeocoderOptions,
} from '@ionic-native/native-geocoder/ngx';
declare var google: any;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  map: any;
  latitude: number;
  longitude: number;

  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;

  constructor(private geolocation: Geolocation) {}

  ionViewDidEnter() {
    this.showMap();
  }

  showMap() {
    const location = new google.maps.LatLng(34.0522, -118.2437);
    const options = {
      center: location,
      zoom: 8,
      disableDefaultUI: true,
    };
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
  }

  getUserLocation() {
    this.geolocation.getCurrentPosition().then((res) => {
      this.latitude = res.coords.latitude;
      this.longitude = res.coords.longitude;

      let latLng = new google.maps.LatLng(this.latitude, this.longitude);
      const options = {
        center: latLng,
        zoom: 18,
        disableDefaultUI: true,
      };
      this.map = new google.maps.Map(this.mapRef.nativeElement, options);
      this.addUserMarker(latLng);
    });
  }
  addUserMarker(userLocation) {
    const map = this.map;
    new google.maps.Marker({
      position: userLocation,
      map,
      title: 'myLocation',
    });
  }
}

// showMap() {
//   this.geolocation.getCurrentPosition().then((res) => {
//     this.latitude = res.coords.latitude;
//     this.longitude = res.coords.latitude;

//     let latLng = new google.maps.LatLng(this.latitude, this.longitude);
//     const options = {
//       center: latLng,
//       zoom: 15,
//       disableDefaultUI: true
//     }

//     this.map = new google.maps.Map(this.mapRef.nativeElement, options);
//   })

// var loc = {};
// var geocoder = new google.maps.Geocoder();
// console.log("hi")
// const location = new google.maps.LatLng(-17.824858, 31.053028);
// // const location = new google.maps.LatLng(-17.824858, 31.053028);
// const options = {
//   center: location,
//   zoom: 15,
//   disableDefaultUI: true
// }
// this.map = new google.maps.Map(this.mapRef.nativeElement, options);
