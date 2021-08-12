import { Component, OnInit } from '@angular/core';
import{ UserTripsService } from '../../shared/user-trips.service'
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {

public index= 0;

  public date= new Date()
  
  public formatedDate= this.date.toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  })

  constructor(private userTripsService: UserTripsService, private alertCtrl: AlertController) { 
    
  }
  public userProfile = this.userTripsService.user; // this makes a reference to your data
  public userTrips = this.userTripsService.user[0].trips[0].locations;

  ngOnInit() {
    console.log(this.userTripsService.user)
    console.log(this.userTrips)
    this.showAlert()
    
  }
  
  async showAlert() {
   const alert = await this.alertCtrl.create({
     header:"You exceed your time at ",
     subHeader:"In N Out It's currently 1:30 Pm ",
     message: "You won't make it to Six Flags at time",
     buttons: ["ok"],
   })
   await alert.present();
   console.log(document.getElementById("card1"));
   this.missEvent();
   this.stylePTag();
  }

  missEvent() {
    const card = document.getElementById("card1");
    const p = document.createElement("button");
    p.id = "test"
    p.textContent = "Delete";
    card.style.background= "red";
    card.appendChild(p);
  }

  stylePTag() {
    const p = document.getElementById("test")
    p.style.color = "white"
    p.style.float = "right"
    p.style.background= "red"
    p.style.marginRight = "20px"
    p.style.marginBottom = "20px"
    p.onclick = this.testFunction
  }
testFunction() {
  alert(
    "Button Works"
  )
} 
}
