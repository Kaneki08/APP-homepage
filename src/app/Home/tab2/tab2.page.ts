import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  slideOps = {
    initialSlide:2,
    speed: 400
  }

  constructor(public router:Router) {}
 
  nextpage() {
    this.router.navigateByUrl('/planning');
  }

}
