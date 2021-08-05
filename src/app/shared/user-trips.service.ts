import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserTripsService {
  public user = [
    {
      username: 'Derick',
      trips: [
         {
          title: 'Trip 1',
          locations: [
            {
              title: 'In-N-Out Burger',
          cost: '$20',
          startTime: '6 Am ',
          endTime: ' 1 Pm ',
          allDay: false,
          img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/InNOut.svg/1200px-InNOut.svg.png",
            }, 
            {
            title: 'Six flags',
            cost: '$60',
          startTime: '1 Pm',
          endTime: '3 Pm ',
          allDay: false,
          img: "http://allears.net/wp-content/uploads/2019/04/Six-Flags-Promo.jpeg",
            },
            {
              title: 'Universal Studios ',
              cost: '$50',
              startTime: ' 3:30 Am ',
              endTime: '7 Pm',
              allDay: false,
              img: "https://allears.net/wp-content/uploads/2020/03/CCMMJETOUZFC3LZ2E2U6GEKQ64.jpg",
            }
          ]
         }
       ]
     }

  ]

  constructor() { }
}
