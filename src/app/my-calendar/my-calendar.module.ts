import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MyCalendarComponent } from './my-calendar.component';
import { MyCalendarRoutingModule } from './my-calendar-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MyCalendarRoutingModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  declarations: [MyCalendarComponent],
  exports: [MyCalendarComponent]
})
export class MyCalendarModule {}