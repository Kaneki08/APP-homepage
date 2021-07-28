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
  // define event variable
  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false
  };
  minDate = new Date().toISOString();
 
  calendar = {
    mode: 'day',
    currentDate: new Date(),
  };
 
  // selectedDate: Date;


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
    this.resetEvent();
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

  

  async openCalModal() {
    const modal = await this.modalCtrl.create({
      component: CalModalPage ,
      cssClass: 'cal-modal',
      backdropDismiss: false
    });
   
    await modal.present();
   
    modal.onDidDismiss().then((result) => {
        let eventCopy = {
          title: this.event.title,
          startTime:  new Date(this.event.startTime),
          endTime: new Date(this.event.endTime),
          allDay: this.event.allDay,
          desc: this.event.desc
        }
     
        if (eventCopy.allDay) {
          let start = eventCopy.startTime;
          let end = eventCopy.endTime;
     
          eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
          eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
        }
     
        this.eventSource.push(eventCopy);
        this.myCal.loadEvents();
        this.resetEvent();
        console.log(this.eventSource, "TEST")
      // if (result.data && result.data.event) {
      //   let event = result.data.event;
      //   if (event.allDay) {
      //     let start = event.startTime;
      //      event.startTime = new Date(
      //       Date.UTC(
      //         start.getUTCFullYear(),
      //         start.getUTCMonth(),
      //         start.getUTCDate()
      //         )
      //     );
      //     event.endTime = new Date(
      //       Date.UTC(
      //         start.getUTCFullYear(),
      //         start.getUTCMonth(),
      //         start.getUTCDate() + 1
      //       )
      //     );
      //   }
      //   this.eventSource.push(result.data.event);
      //   this.myCal.loadEvents();
      // }
    });
}
resetEvent() {
  this.event = {
    title: '',
    desc: '',
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    allDay: false
  };
}
}

