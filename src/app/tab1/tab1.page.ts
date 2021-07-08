import { Component, AfterViewInit, ViewChild } from '@angular/core';
declare var google;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements AfterViewInit{
  map;
  @ViewChild ('mapElement', {static: false}) mapElement;
 mapOptions = {
   center: { lat: -34.397, lng: 150.644},
   zoom: 8,
 }
  constructor() {}

  loadMap() {
     this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
  }
 ngAfterViewInit(): void {
   this.loadMap
}
}
