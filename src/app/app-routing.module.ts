import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)},
  {
    path: 'planning',
    loadChildren: () => import('./Home/planning/planning.module').then( m => m.PlanningPageModule)
  },
  {
    path: 'trip',
    loadChildren: () => import('./trip/trip.module').then( m => m.TripPageModule)
  },
  {
    path: 'cal-modal',
    loadChildren: () => import('./pages/cal-modal/cal-modal.module').then( m => m.CalModalPageModule)
  },
  {
    path: 'schedule',
    loadChildren: () => import('./Home/schedule/schedule.module').then( m => m.SchedulePageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
