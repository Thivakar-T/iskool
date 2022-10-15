import { Component, OnInit, Inject, LOCALE_ID, HostListener, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

import {
    endOfDay,
    addMonths
} from 'date-fns';
import {
    DAYS_IN_WEEK,
    SchedulerViewDay,
    SchedulerViewHour,
    SchedulerViewHourSegment,
    CalendarSchedulerEvent,
    CalendarSchedulerEventAction,
    startOfPeriod,
    endOfPeriod,
    addPeriod,
    subPeriod,
    SchedulerDateFormatter,
    SchedulerEventTimesChangedEvent,
    CalendarSchedulerViewComponent
} from 'angular-calendar-scheduler';
import {
    CalendarView,
    CalendarDateFormatter,
    DateAdapter
} from 'angular-calendar';

import { AppService } from './../../administration/app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
    providers: [{
        provide: CalendarDateFormatter,
        useClass: SchedulerDateFormatter
    }]
})
export class CalendarComponent implements OnInit {

    title: string = 'My Calendar';
    CalendarView = CalendarView;
    loading: boolean = false; // laoder

    view: CalendarView = CalendarView.Week;
    viewDate: Date = new Date(new Date().setDate(new Date().getDate() - 2));
    viewDays: number = DAYS_IN_WEEK;
    forceViewDays: number = DAYS_IN_WEEK;
    refresh: Subject<any> = new Subject();
    locale: string = 'en';
    hourSegments: number = 2;
    weekStartsOn: number = 0;
    startsWithToday: boolean = true;
    activeDayIsOpen: boolean = true;
    excludeDays: number[] = []; // [0];
    dayStartHour: number = 8;
    dayEndHour: number = 20;
    //crud access
    canCreate: boolean;
    canUpdate: boolean;
    canView: boolean;
    canEdit: boolean;
    canDelete: boolean;
    //Page Policy & Modulelist
    moduleData: any;
    module_master: boolean;
    pageList: any;
    policyList: any = [];
    minDate: Date = new Date(new Date().setDate(new Date().getDate() - 10));
    maxDate: Date = endOfDay(addMonths(new Date(), 1));
    dayModifier: Function;
    hourModifier: Function;
    segmentModifier: Function;
    eventModifier: Function;
    prevBtnDisabled: boolean = false;
    nextBtnDisabled: boolean = false;
    timeOut: any;
    obj: any = {};
    actions: CalendarSchedulerEventAction[] = [
        // {
        //     when: 'enabled',
        //     label: '<span class="valign-center"><i class="material-icons md-18 md-red-500">Cancel</i></span>',
        //     title: 'Delete',
        //     onClick: (event: CalendarSchedulerEvent): void => {
        //     }
        // },
        // {
        //     when: 'cancelled',
        //     label: '<span class="valign-center"><i class="material-icons md-18 md-red-500">autorenew</i></span>',
        //     title: 'Restore',
        //     onClick: (event: CalendarSchedulerEvent): void => {
        //     }
        // }
    ];

    events: CalendarSchedulerEvent[];

    @ViewChild(CalendarSchedulerViewComponent) calendarScheduler: CalendarSchedulerViewComponent;

    constructor(@Inject(LOCALE_ID) locale: string, private appService: AppService, private dateAdapter: DateAdapter,
    private spinner: NgxSpinnerService,
    public toastr: ToastrService,) {
        this.locale = locale;


        // this.dayModifier = ((day: SchedulerViewDay): void => {
        //     day.cssClass = this.isDateValid(day.date) ? '' : 'cal-disabled';
        // }).bind(this);

        // this.hourModifier = ((hour: SchedulerViewHour): void => {
        //     hour.cssClass = this.isDateValid(hour.date) ? '' : 'cal-disabled';
        // }).bind(this);

        this.segmentModifier = ((segment: SchedulerViewHourSegment): void => {
            segment.isDisabled = !this.isDateValid(segment.date);
        }).bind(this);

        this.eventModifier = ((event: CalendarSchedulerEvent): void => {
            event.isDisabled = !this.isDateValid(event.start);
        }).bind(this);

        this.dateOrViewChanged();
    }

    addCss() {
        var elements = document.getElementsByClassName('material-icons');
        if (elements.length > 0) {
            elements[0]['style']['text-transform'] = 'capitalize';
        }
    }
    ngOnDestroy() {
        if (this.timeOut) {
            clearInterval(this.timeOut);
        }
    }

    ngOnInit(): void {
        this.spinner.show();
        var date = new Date(new Date().setDate(new Date().getDate() - 2));
        var weekDate = new Date(new Date().setDate(new Date().getDate() + 4));
        var fromDate = date.getDate().toString().padStart(2, "0") + "/" + (date.getMonth() + 1).toString().padStart(2, "0") + '/' + date.getFullYear();
        var toDate = weekDate.getDate().toString().padStart(2, "0") + "/" + (weekDate.getMonth() + 1).toString().padStart(2, "0") + '/' + weekDate.getFullYear();
        this.obj = { fromDate, toDate }
        this.appService.updateTimeTable(this.obj).subscribe(
            (res) => {

                res.data.responseList.forEach(data_ => {
                    data_.stateDate = new Date(data_.startTime.substring(6, 10), data_.startTime.substring(3, 5) - 1, data_.startTime.substring(0, 2), data_.startTime.substring(11, 13), data_.startTime.substring(14, 16), data_.startTime.substring(17, 19));
                    data_.endDate = new Date(data_.endTime.substring(6, 10), data_.endTime.substring(3, 5) - 1, data_.endTime.substring(0, 2), data_.endTime.substring(11, 13), data_.endTime.substring(14, 16), data_.endTime.substring(17, 19));
                    var GivenDate = `${data_.startTime.substring(6, 10)}-${data_.startTime.substring(3, 5)}-${data_.startTime.substring(0, 2)}`;
                    var CurrentDate = new Date();
                    var freshDate = new Date(GivenDate);

                    if (freshDate > CurrentDate) {
                        data_.isPreviousDate = false;
                    } else {
                        data_.isPreviousDate = true;
                    }
                });

                this.appService.getEvents(res.data, this.actions)
                    .then((events: CalendarSchedulerEvent[]) => this.events = events);
                    this.toastr.success(res.message, 'Success!');
                this.spinner.hide();
            },
            (err) => {
                this.spinner.hide();

            }
        );
    }

    viewDaysOptionChanged(viewDays: number): void {
        this.forceViewDays = viewDays;
    }

    changeDate(date: Date): void {
        this.viewDate = date;
        this.dateOrViewChanged();
    }

    changeView(view: CalendarView): void {
        this.view = view;
        this.dateOrViewChanged();
    }

    dateOrViewChanged(): void {
        if (this.startsWithToday) {
            this.prevBtnDisabled = !this.isDateValid(subPeriod(this.dateAdapter, CalendarView.Day/*this.view*/, this.viewDate, 1));
            this.nextBtnDisabled = !this.isDateValid(addPeriod(this.dateAdapter, CalendarView.Day/*this.view*/, this.viewDate, 1));
        } else {
            this.prevBtnDisabled = !this.isDateValid(endOfPeriod(this.dateAdapter, CalendarView.Day/*this.view*/, subPeriod(this.dateAdapter, CalendarView.Day/*this.view*/, this.viewDate, 1)));
            this.nextBtnDisabled = !this.isDateValid(startOfPeriod(this.dateAdapter, CalendarView.Day/*this.view*/, addPeriod(this.dateAdapter, CalendarView.Day/*this.view*/, this.viewDate, 1)));
        }

        if (this.viewDate < this.minDate) {
            this.changeDate(this.minDate);
        } else if (this.viewDate > this.maxDate) {
            this.changeDate(this.maxDate);
        }
    }

    private isDateValid(date: Date): boolean {
        return /*isToday(date) ||*/ date >= this.minDate && date <= this.maxDate;
    }

    viewDaysChanged(viewDays: number): void {
        this.viewDays = viewDays;
    }

    dayHeaderClicked(day: SchedulerViewDay): void {
    }

    hourClicked(hour: SchedulerViewHour): void {
    }

    segmentClicked(action: string, segment: SchedulerViewHourSegment): void {
    }

    eventClicked(action: string, event: CalendarSchedulerEvent): void {
        var eventDate = event.start.getFullYear() + "-" + (event.start.getMonth() + 1).toString().padStart(2, "0") + '-' + event.start.getDate().toString().padStart(2, "0");

    }

    eventTimesChanged({ event, newStart, newEnd, type }: SchedulerEventTimesChangedEvent): void {
        const ev: CalendarSchedulerEvent = this.events.find(e => e.id === event.id);
        ev.start = newStart;
        ev.end = newEnd;
        this.refresh.next();
    }

    setPagePolicy() {
        this.canCreate = this.policyList.includes('Create') ? true : false;
        this.canUpdate = this.policyList.includes('Update') ? true : false;
        this.canView = this.policyList.includes('View') ? true : false;
        this.canEdit = this.policyList.includes('Edit') ? true : false;
        this.canDelete = this.policyList.includes('Delete') ? true : false;

    }
}
