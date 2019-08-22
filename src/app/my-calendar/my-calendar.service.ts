import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const routes = {
  schedule: (c: CalendarRequest) => `/api/calendar?user=${c.email}`
};

export interface CalendarRequest {
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class MyCalendarService {
  constructor(private httpClient: HttpClient) {}

  getMyCalendar(context: CalendarRequest): Observable<string> {
    console.log(routes.schedule(context));
    console.log(this.httpClient);
    return this.httpClient
      .cache()
      .get(routes.schedule(context))
      .pipe(
        map((body: any) => body.value),
        catchError(() => of('Error, could not load calendars'))
      );
  }
}
