import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { UIModule } from './../../shared/ui/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbDropdownModule, NgbPaginationModule, NgbDatepickerModule, NgbCollapseModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxPrintModule } from 'ngx-print';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AdmissionRoutingModule } from './admission-routing.module';
import { SearchStudentComponent } from './search-student/search-student.component';
import { AdmissionCancellationComponent } from './admissioncancellation/admission-cancellation/admission-cancellation.component';
import { CancellationListComponent } from './admissioncancellation/cancellation-list/cancellation-list.component';
import { StudentInformationComponent } from './student-information/student-information.component';
import { OutstandingfeereportComponent } from './outstandingfeereport/outstandingfeereport.component';
import { TermfeereportComponent } from './termfeereport/termfeereport.component';
import { AcademicRecordsComponent } from './academic-records/academic-records.component';
import { StudentRegistrationComponent } from './student-registration/student-registration.component';
import { RollNumberreportComponent } from './roll-numberreport/roll-numberreport.component';
import { AdmissionReportComponent } from './admission-report/admission-report.component';
import { StudandAddressComponent } from './studand-address/studand-address.component';
import { StudentacademicRecordComponent } from './studentacademic-record/studentacademic-record.component';
import { StudentAcademicViewComponent } from './student-academic-view/student-academic-view.component';

@NgModule({
  declarations: [ SearchStudentComponent, AdmissionCancellationComponent, CancellationListComponent, StudentInformationComponent, OutstandingfeereportComponent, TermfeereportComponent, AcademicRecordsComponent, StudentRegistrationComponent, RollNumberreportComponent, AdmissionReportComponent, StudandAddressComponent, StudentacademicRecordComponent, StudentAcademicViewComponent, ],
  imports: [
    NgbModule,
    CommonModule,
    AdmissionRoutingModule,
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
    NgbCollapseModule,
    UIModule,
    NgbNavModule,
    AngularEditorModule,
    NgxPrintModule,
    PerfectScrollbarModule,
  ]
})
export class AdmissionModule { }
