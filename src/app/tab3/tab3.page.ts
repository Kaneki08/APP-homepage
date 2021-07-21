import { Component, ViewChild, OnInit } from '@angular/core';
import { CalendarComponent } from 'ion2-calendar';
import { CalendarModule} from 'ion2-calendar';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page  {
  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();
 
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };
  

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor() { }

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

  // Change current month/week/day
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  // createEndTime(currentDate) {
  //   let endTime = new Date(Date.UTC(
  //     currentDate.getUTCFullYear(),
  //     currentDate.getUTCMonth(),
  //     currentDate.getUTCDate()
  //   ))
  // }
 
  createRandomEvents() {
    var events = [];
    for (var i = 0; i < 50; i += 1) {
      var date = new Date();
      var eventType = Math.floor(Math.random() * 2);
      var startDay = Math.floor(Math.random() * 90) - 45;
      var endDay = Math.floor(Math.random() * 2) + startDay;
      var startTime;
      var endTime;
      if (eventType === 0) {
        startTime = new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate() + startDay
          )
        );
        if (endDay === startDay) {
          endDay += 1;
        }
        endTime = new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate() + endDay
          )
        );
        events.push({
          title: 'All Day - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: true,
        });
      } else {
        var startMinute = Math.floor(Math.random() * 24 * 60);
        var endMinute = Math.floor(Math.random() * 180) + startMinute;
        startTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + startDay,
          0,
          date.getMinutes() + startMinute
        );
        endTime = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + endDay,
          0,
          date.getMinutes() + endMinute
        );
        events.push({
          title: 'Event - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: false,
        });
      }
    }
    // this.eventSource = events;
    console.log("=> EVENTS", events)
  }
}

