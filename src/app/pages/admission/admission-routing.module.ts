import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchStudentComponent } from './search-student/search-student.component';
import { AdmissionCancellationComponent } from './admissioncancellation/admission-cancellation/admission-cancellation.component';
import { CancellationListComponent } from './admissioncancellation/cancellation-list/cancellation-list.component';
import { StudentInformationComponent } from './student-information/student-information.component';
import { OutstandingfeereportComponent } from './outstandingfeereport/outstandingfeereport.component';
import { TermfeereportComponent } from './termfeereport/termfeereport.component';
import { StudentRegistrationComponent } from './student-registration/student-registration.component';
import { RollNumberreportComponent } from './roll-numberreport/roll-numberreport.component';
import { AdmissionReportComponent } from './admission-report/admission-report.component';
import { StudandAddressComponent } from './studand-address/studand-address.component';
import { StudentacademicRecordComponent } from './studentacademic-record/studentacademic-record.component';
import { StudentAcademicViewComponent } from './student-academic-view/student-academic-view.component';

const routes: Routes = [
  {
    path: 'admission-record',
    component: SearchStudentComponent
  },
  {
    path: 'new',
    component: StudentRegistrationComponent
  },
  {
    path: 'new/:id',
    component: StudentRegistrationComponent
  },
  {
    path: 'student-academic-record',
    component: StudentacademicRecordComponent
  },
  {
    path: 'student-academic-view/:id',
    component: StudentAcademicViewComponent
  },
  // {
  //   path: 'admission/student-academic-view',
  //   component: StudentAcademicViewComponent
  // },
  {
    path: 'admission-cancellation',
    component: AdmissionCancellationComponent
  },
  {
    path: 'cancellation-list',
    component: CancellationListComponent
  },
  {
    path: 'student-information',
    component: StudentInformationComponent
  },
  {
    path: 'outstanding-fee-report',
    component: OutstandingfeereportComponent
  },
  {
    path: 'term-fee-report',
    component: TermfeereportComponent
  },
  {
    path: 'student-information/:id',
    component: StudentInformationComponent
  },
  {
    path: 'roll-number-report',
    component: RollNumberreportComponent
  },
  {
    path: 'admission-report',
    component: AdmissionReportComponent
  },
  {
    path: 'student-address-report',
    component: StudandAddressComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmissionRoutingModule { }
