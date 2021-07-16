import { Component, NgZone } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions,} from '@ionic-native/native-geocoder/ngx';
declare var google: any;

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


  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;

  constructor(private geolocation: Geolocation,  private nativeGeocoder: NativeGeocoder,    
    public zone: NgZone,
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
