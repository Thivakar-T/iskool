import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SchedulerModule } from 'angular-calendar-scheduler';



import { NgbNavModule, NgbDropdownModule, NgbModalModule, NgbTooltipModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { UIModule } from '../shared/ui/ui.module';

import { FullCalendarModule } from '@fullcalendar/angular';

import { PagesRoutingModule } from './pages-routing.module';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../core/helpers/jwt.interceptor';
import { ErrorInterceptor } from '../core/helpers/error.interceptor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AcademicModule } from './master/academic_master/academic.module';
import { CommonMasterModule } from './master/common-master/common-master.module';
import { FeeModule } from './Fee/fee.module'
import { StandardModule } from './Fee/standard.module';
import { RouteModule } from './transport/route.module';
import { SubjectModule } from './subject/subject.module';
import{ExamModule}from './exam/exam.module';
import { CalendarComponent } from './administration/calendar/calendar.component';
import { HolidayCalendarComponent } from './administration/holiday-calendar/holiday-calendar.component';
import {NotificationModule} from './notification/notification.module'

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 0.3
};

@NgModule({
  declarations: [ DashboardComponent, CalendarComponent, HolidayCalendarComponent],
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    NgbModalModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    UIModule,
    FullCalendarModule,
    NgbNavModule,
    NgbTooltipModule,
    PerfectScrollbarModule,
    NgbDatepickerModule,
    AcademicModule,
    CommonMasterModule,
    FeeModule,
    StandardModule,
    RouteModule,
    SubjectModule,
    ExamModule,
    NotificationModule,
    NgScrollbarModule,
    NgMultiSelectDropDownModule,
    NgSelectModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    SchedulerModule.forRoot({ locale: 'en', headerDateFormat: 'daysRange' }),
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'en-US' }

  ]
}) 
export class PagesModule { }
