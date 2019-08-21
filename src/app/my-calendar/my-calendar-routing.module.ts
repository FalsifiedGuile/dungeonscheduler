import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { MyCalendarComponent } from './my-calendar.component';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    { path: '', redirectTo: '/calendar', pathMatch: 'full' },
    { path: 'calendar', component: MyCalendarComponent, data: { title: extract('Calendar') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MyCalendarRoutingModule {}
