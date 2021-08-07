import { Component, OnInit } from '@angular/core';
import{ UserTripsService } from '../../shared/user-trips.service'



@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {

  public date= new Date()
  
  public formatedDate= this.date.toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  })

  constructor(private userTripsService: UserTripsService) { 
    
  }
  public userProfile = this.userTripsService.user; // this makes a reference to your data
  public userTrips = this.userTripsService.user[0].trips[0].locations;

  ngOnInit() {
    console.log(this.userTripsService.user)
    console.log(this.userTrips)
  }

}
