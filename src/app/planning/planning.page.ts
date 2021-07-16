import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-planning',
  templateUrl: './planning.page.html',
  styleUrls: ['./planning.page.scss'],
})
export class PlanningPage implements OnInit {

  hotelToggle: boolean = false;
  attractionToggle: boolean = false;
  restaurantToggle: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  changeHotelToggle() {
    this.hotelToggle = !this.hotelToggle;
  }
  changeAttractionToggle() {
    this.attractionToggle = !this.attractionToggle;
  }
  changeRestaurantToggle() {
    this.restaurantToggle = !this.restaurantToggle;
  }
}
