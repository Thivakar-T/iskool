import { NgModule , LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIModule } from './../../shared/ui/ui.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { AdministrationRoutingModule } from './administration-routing.module';
import { RoleComponent } from './role/role.component';
import { PagePolicyComponent } from './page-policy/page-policy.component';
import { UserListComponent } from './user-list/user-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbDropdownModule, NgbPaginationModule, NgbDatepickerModule, NgbCollapseModule, NgbNavModule, NgbAccordionModule, } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxPrintModule } from 'ngx-print';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { RolePolicyComponent } from './role-policy/role-policy.component';
import { NgScrollbarModule } from 'ngx-scrollbar'; 
import { UserComponent } from './user/user.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { SchedulerModule } from 'angular-calendar-scheduler';
import { FullCalendarModule } from '@fullcalendar/angular';



@NgModule({
  declarations: [RoleComponent, PagePolicyComponent, UserListComponent, RolePolicyComponent, UserComponent],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    UIModule,
    CommonModule,
    NgbModalModule,
    NgbDropdownModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgbDatepickerModule,
    NgSelectModule,
    FullCalendarModule,
    NgbCollapseModule,
    UIModule,
    NgbNavModule,
    AngularEditorModule,
    NgxPrintModule,
    NgbAccordionModule,
    PerfectScrollbarModule,
    MatExpansionModule,
    NgScrollbarModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    SchedulerModule.forRoot({ locale: 'en', headerDateFormat: 'daysRange' }),



  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-US' }

  ]
})
export class AdministrationModule { }
