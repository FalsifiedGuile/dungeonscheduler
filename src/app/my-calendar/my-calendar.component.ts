import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  TemplateRef,
  OnInit,
  NgZone
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { MyCalendarService, MyEvent } from './my-calendar.service';
import { finalize } from 'rxjs/operators';
import { Logger, untilDestroyed } from '@app/core';

const log = new Logger('MyEvent');

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['my-calendar.component.scss'],
  templateUrl: 'my-calendar.component.html'
})
export class MyCalendarComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];

  isLoading = false;
  activeDayIsOpen: boolean = true;
  email = '';
  constructor(
    private modal: NgbModal,
    private calendarService: MyCalendarService,
    private ngZone: NgZone,
    private cRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.email = JSON.parse(sessionStorage.getItem('credentials')).email;
    this.getCalendar();
  }

  getCalendar() {
    this.calendarService.getMyCalendar({ email: this.email }).subscribe(event => {
      this.isLoading = true;
      const arrayLength = event.length;
      var events: CalendarEvent[] = [];
      for (var i = 0; i < arrayLength; i++) {
        events = [
          ...events,
          {
            title: event[i].title,
            start: new Date(event[i].start),
            end: new Date(event[i].end),
            color: eval('colors.' + event[i].color),
            draggable: event[i].draggable,
            resizable: event[i].resizable
          }
        ];
      }
      console.log(events);
      this.events = events;
      this.cRef.detectChanges();
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    const event: MyEvent = {
      title: 'New event',
      start: startOfDay(date),
      end: endOfDay(date),
      color: 'red',
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    };
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        console.log(events.length);
        if (events.length === 0) {
          this.uploadMyEvent(event);
          this.addEvent(date, date);
        }
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    } else {
    }
  }

  uploadMyEvent(event: MyEvent) {
    const event$ = this.calendarService.addMyCalendar({ email: this.email, myEvent: event });
    console.log(event$);
    event$.subscribe(
      res => {
        if (res) {
          log.debug(`${res.email} successfully logged in`);
        }
      },
      err => {
        log.debug(`Login error: ${err}`);
      }
    );
  }

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(start: Date, end: Date): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(start),
        end: endOfDay(end),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      }
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
