import { CalendarComponent } from 'ionic2-calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { CalModalPage } from '../pages/cal-modal/cal-modal.page';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page  {
  eventSource = [];
  viewTitle: string;
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

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor( private modalCtrl: ModalController, @Inject(LOCALE_ID) private locale: string, private alertCtrl: AlertController ) {}
 
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
    component: CalModalPage,
    cssClass: 'cal-modal',
    backdropDismiss: false,
  });
 
  await modal.present();
 
  modal.onDidDismiss().then((result) => {
    let eventCopy = {
      title: result.data.event.title,
      startTime: new Date(result.data.event.startTime),
      endTime: new Date(result.data.event.endTime),
      allDay: result.data.event.allDay,
      desc: result.data.event.desc,
    };
      console.log(eventCopy.startTime, eventCopy.endTime, "test")
    // handle event if its all day
    if (eventCopy.allDay) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;

      eventCopy.startTime = new Date(
        Date.UTC(
          start.getUTCFullYear(),
          start.getUTCMonth(),
          start.getUTCDate()
        )
      );
      eventCopy.endTime = new Date(
        Date.UTC(
          end.getUTCFullYear(),
          end.getUTCMonth(),
          end.getUTCDate() + 1
        )
      );
    }

    this.eventSource.push(eventCopy);
    this.myCal.loadEvents();
    this.resetEvent();
  });
}
resetEvent() {
  this.event = {
    title: '',
    desc: '',
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    allDay: false,
  };
}
async onEventSelected(event) {
  // Use Angular date pipe for conversion
  let start = formatDate(event.startTime, 'medium',this.locale);
  let end = formatDate(event.endTime, 'medium',this.locale);
 
  const alert = await this.alertCtrl.create({
    header: event.title,
    subHeader: event.desc,
    message: 'From: ' + start + '<br><br>To: ' + end,
    buttons: ['OK']
  });
  alert.present();
}
}

