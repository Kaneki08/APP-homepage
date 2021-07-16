import { Component, OnInit } from '@angular/core';
// import {LocationsService} from '../shared/locations.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.page.html',
  styleUrls: ['./trip.page.scss'],
})
export class TripPage implements OnInit {

  hotelToggle: boolean = false;
  attractionToggle: boolean = false;
  restaurantToggle: boolean = false;

  private query: ActivatedRoute;

  updatedLocations = [];

  constructor(private activatedRoute: ActivatedRoute) {
    this.query = activatedRoute;
   }

  
  ngOnInit() {
    // get the information from the url
    this.hotelToggle = (this.query.snapshot.queryParamMap.get('hotels') === 'true');
    this.attractionToggle = (this.query.snapshot.queryParamMap.get('attractions') === 'true');
    this.restaurantToggle = (this.query.snapshot.queryParamMap.get('restaurants') === 'true');

    // filtering based on new information
    this.updatedLocations = this.locations.filter( each => {
      return (this.hotelToggle === true && each.tag === "hotels") ||
             (this.attractionToggle === true && each.tag === "attractions") ||
             (this.restaurantToggle === true && each.tag === "restaurants")
    })
  }

  public locations = [
    {
      locationName: "Universal Studios",
      description: "Its a theme park and they make movies",
      Cost: "$500",
      tag: "attractions"
    },
    {
      locationName: "Disney Land",
      description: "Its a theme park based on disney",
      Cost: "$700",
      tag: "attractions"
    },
    {
      locationName: "Hollywood Hotel",
      description: "This casual hotel with a retro vibe and a colorful outdoor fountain is a block from Santa Monica Boulevard",
      Cost: "$300",
      tag: "hotels"
    },
    {
      locationName: "Sofitel Los Angeles at Beverly Hills",
      description: "Opposite upscale shopping at the Beverly Center, this high-end, contemporary hotel",
      Cost: "$1200",
      tag: "hotels"
    },
    {
      locationName: "Nest Cafe",
      description: "is a family owned diner that offers guests all day breakfast, Lunch and Dinner",
       Cost: "$200",
      tag: "restaurants"
    }];


    /*
      Get the query parameters
      Filter locations by tag
    */

  }
