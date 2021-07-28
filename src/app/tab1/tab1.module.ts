import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { CalModalPageModule} from '../pages/cal-modal/cal-modal.module'
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { NgCalendarModule  } from 'ionic2-calendar';

@NgModule({
  imports: [
    IonicModule,
    NgCalendarModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }
  ]),
  Tab1PageRoutingModule,
],
  exports: [CalModalPageModule],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
