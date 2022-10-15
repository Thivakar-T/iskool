import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIModule } from '../../../shared/ui/ui.module';

import { AcademicRoutingModule } from './academic-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbDropdownModule, NgbPaginationModule, NgbDatepickerModule, NgbCollapseModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxPrintModule } from 'ngx-print';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SchemeComponent } from './scheme/scheme.component';
import { SubjectComponent } from './subject/subject.component';
import { SessionComponent } from './session/session.component';
import { DegreeComponent } from './degree/degree.component';
import { BranchComponent } from './branch/branch.component';
import { BatchComponent } from './batch/batch.component';
import { SessionTypeComponent } from './session-type/session-type.component';
import { TermComponent } from './term/term.component';
// import { RoomLabComponent } from './room-lab/room-lab.component';
import { ShiftComponent } from './shift/shift.component';
import { AcadamicBatchComponent } from './acadamic-batch/acadamic-batch.component';
import { DaymasterlistComponent } from './daymasterlist/daymasterlist.component';
import { YearlistComponent } from './yearlist/yearlist.component';
import { SemesterlistComponent } from './semesterlist/semesterlist.component';
import { AcademicSessionComponent } from './academic-session/academic-session.component';
import { AcademicSessionListComponent } from './academic-session-list/academic-session-list.component';
import { ClassRoomComponent } from './class-room/class-room.component';
import { ExamComponent } from './exam/exam.component';


 
@NgModule({
  declarations: [SchemeComponent,SubjectComponent, SessionComponent,DegreeComponent,BranchComponent,BatchComponent,SessionTypeComponent,TermComponent,ShiftComponent,AcadamicBatchComponent,DaymasterlistComponent,YearlistComponent,SemesterlistComponent, AcademicSessionComponent, AcademicSessionListComponent, ClassRoomComponent, ExamComponent],
  imports: [
    CommonModule,
    AcademicRoutingModule,
    UIModule,
    NgbModalModule,
    NgbDropdownModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgbDatepickerModule,
    NgSelectModule,
    NgbCollapseModule,
    NgbNavModule,
    AngularEditorModule,
    NgxPrintModule,
    PerfectScrollbarModule,
    
  ]
})
export class AcademicModule { }
