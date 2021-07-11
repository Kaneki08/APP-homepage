import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  public listOFLocations = [
    {
      locationName: "Universal Studios",
      description: "Its a theme park and they make movies",
      tag: "attraction"
    },
    {
      locationName: "Disney Land",
      description: "Its a theme park based on disney",
      tag: "attraction"
    },
    {
      locationName: "Hollywood Hotel",
      description: "This casual hotel with a retro vibe and a colorful outdoor fountain is a block from Santa Monica Boulevard",
      tag: "Hotels"
    },
    {
      locationName: "Sofitel Los Angeles at Beverly Hills",
      description: "Opposite upscale shopping at the Beverly Center, this high-end, contemporary hotel",
      tag: "Hotels"
    },
    {
      locationName: "Nest Cafe",
      description: "is a family owned diner that offers guests all day breakfast, Lunch and Dinner",
      tag: "Restaurants"
    }

  ]
  constructor() {}
}
