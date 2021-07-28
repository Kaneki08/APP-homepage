import { Component, NgZone, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions,} from '@ionic-native/native-geocoder/ngx';
declare var google: any;
import { CalendarComponent} from 'ionic2-calendar';
import { ModalController } from '@ionic/angular';
import { CalModalPage } from '../pages/cal-modal/cal-modal.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  map: any;
  address:string;
  latitude: number;
  longitude: number;
  autocomplete: { input: string; };
  autocompleteItems: any[];
  location: any;
  placeid: any;
  GoogleAutocomplete: any;
  eventSource = [];
  viewTitle: string;
 
  calendar = {
    mode: 'day',
    currentDate: new Date(),
  };
 
  selectedDate: Date;


  @ViewChild( 'map', { read: ElementRef, static: false },) mapRef: ElementRef;

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(private geolocation: Geolocation,  private nativeGeocoder: NativeGeocoder,    
    public zone: NgZone,private modalCtrl: ModalController
  ) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
  }

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
    })
  }
  addUserMarker(userLocation) {
    const map = this.map;
    new google.maps.Marker({
      position: userLocation,
      map,
      title: 'myLocation',
    });
  }
    
  getAddressFromCoords(lattitude, longitude) {
    console.log("getAddressFromCoords "+lattitude+" "+longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5    
    }; 
    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if(value.length>0)
          responseAddress.push(value); 
        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value+", ";
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) =>{ 
        this.address = "Address Not Available!";
      }); 
  }

  //FUNCTION SHOWING THE COORDINATES OF THE POINT AT THE CENTER OF THE MAP
  ShowCords(){
    alert('lat' +this.latitude+', long'+this.longitude )
  }
   //AUTOCOMPLETE, SIMPLY LOAD THE PLACE USING GOOGLE PREDICTIONS AND RETURNING THE ARRAY.
   UpdateSearchResults(){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
    (predictions, status) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          this.autocompleteItems.push(prediction);
        });
      });
    });
  }
  
  //wE CALL THIS FROM EACH ITEM.
  SelectSearchResult(item) {
    ///WE CAN CONFIGURE MORE COMPLEX FUNCTIONS SUCH AS UPLOAD DATA TO FIRESTORE OR LINK IT TO SOMETHING
    alert(JSON.stringify(item))      
    this.placeid = item.place_id
  }
  
  
  //lET'S BE CLEAN! THIS WILL JUST CLEAN THE LIST WHEN WE CLOSE THE SEARCH BAR.
  ClearAutocomplete(){
    this.autocompleteItems = []
    this.autocomplete.input = ''
  }
  ngOnInit() {
    // const currentDate= new Date()
    // const endTime= this.createEndTime(currentDate)
    // console.log(currentDate)
    // console.log(endTime, "this end time")
    // this.eventSource.push({
    //   title: "hotels", 
    //   startTime: currentDate,
    //   endTime: currentDate,
    //   allDate: false
    // })
  }
  next() {
    this.myCal.slideNext();
  }
 
  back() {
    this.myCal.slidePrev();
  }

  // Change current month/week/day
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  // createRandomEvents() {
  //   var events = [];
  //   for (var i = 0; i < 50; i += 1) {
  //     var date = new Date();
  //     var eventType = Math.floor(Math.random() * 2);
  //     var startDay = Math.floor(Math.random() * 90) - 45;
  //     var endDay = Math.floor(Math.random() * 2) + startDay;
  //     var startTime;
  //     var endTime;
  //     if (eventType === 0) {
  //       startTime = new Date(
  //         Date.UTC(
  //           date.getUTCFullYear(),
  //           date.getUTCMonth(),
  //           date.getUTCDate() + startDay
  //         )
  //       );
  //       if (endDay === startDay) {
  //         endDay += 1;
  //       }
  //       endTime = new Date(
  //         Date.UTC(
  //           date.getUTCFullYear(),
  //           date.getUTCMonth(),
  //           date.getUTCDate() + endDay
  //         )
  //       );
  //       events.push({
  //         title: 'All Day - ' + i,
  //         startTime: startTime,
  //         endTime: endTime,
  //         allDay: true,
  //       });
  //     } else {
  //       var startMinute = Math.floor(Math.random() * 24 * 60);
  //       var endMinute = Math.floor(Math.random() * 180) + startMinute;
  //       startTime = new Date(
  //         date.getFullYear(),
  //         date.getMonth(),
  //         date.getDate() + startDay,
  //         0,
  //         date.getMinutes() + startMinute
  //       );
  //       endTime = new Date(
  //         date.getFullYear(),
  //         date.getMonth(),
  //         date.getDate() + endDay,
  //         0,
  //         date.getMinutes() + endMinute
  //       );
  //       events.push({
  //         title: 'Event - ' + i,
  //         startTime: startTime,
  //         endTime: endTime,
  //         allDay: false,
  //       });
  //     }
  //   }
  //   console.log(events),
  //   this.eventSource = events;
  // }
 
  // removeEvents() {
  //   this.eventSource = [];
  // }

  async openCalModal() {
    const modal = await this.modalCtrl.create({
      component: CalModalPage ,
      cssClass: 'cal-modal',
      backdropDismiss: false
    });
   
    await modal.present();
   
    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.event) {
        let event = result.data.event;
        if (event.allDay) {
          let start = event.startTime;
           event.startTime = new Date(
            Date.UTC(
              start.getUTCFullYear(),
              start.getUTCMonth(),
              start.getUTCDate()
              )
          );
          event.endTime = new Date(
            Date.UTC(
              start.getUTCFullYear(),
              start.getUTCMonth(),
              start.getUTCDate() + 1
            )
          );
        }
        this.eventSource.push(result.data.event);
        this.myCal.loadEvents();
      }
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
