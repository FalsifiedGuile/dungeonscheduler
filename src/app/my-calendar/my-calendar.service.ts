import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const routes = {
  schedule: (c: CalendarRequest) => `/api/calendar/user/${c.email}`,
  addEvent: '/api/calendar/add-event'
};

export interface CalendarRequest {
  email: string;
}

export interface addRequest {
  email: string;
  myEvent: MyEvent;
}
export interface MyEvent {
  start: Date;
  end?: Date;
  title: String;
  color?: String;
  allDay?: boolean;
  resizable?: {
    beforeStart: boolean;
    afterEnd: boolean;
  };
  draggable?: boolean;
}

export interface EventWrapper {
  myEvent: MyEvent;
}

@Injectable({
  providedIn: 'root'
})
export class MyCalendarService {
  constructor(private httpClient: HttpClient) {}

  getMyCalendar(context: CalendarRequest): Observable<any> {
    console.log(routes.schedule(context));
    console.log(this.httpClient);
    return this.httpClient.cache().get(routes.schedule(context));
  }
  /**
   * Add event to Calendar
   * @param context The Event parameters.
   * @return The Event credentials.
   */
  addMyCalendar(context: addRequest): Observable<any> {
    console.log(routes.addEvent);
    console.log(this.httpClient);
    return this.httpClient.post<{ myEvent: EventWrapper }>(routes.addEvent, context);
  }
}
