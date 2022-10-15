import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SchemeComponent } from './scheme/scheme.component';
import { SubjectComponent } from './subject/subject.component';
import { SessionComponent } from './session/session.component';
import { DegreeComponent } from './degree/degree.component';
import { BranchComponent } from './branch/branch.component';
import { BatchComponent } from './batch/batch.component';
import { BoardComponent } from '../common-master/board/board.component';
import { AdmissionCategoryComponent } from '../common-master/admission-category/admission-category.component';
import { TermComponent } from './term/term.component';
import { SessionTypeComponent } from './session-type/session-type.component';
import { UIModule } from './../../../shared/ui/ui.module';
import { DaymasterlistComponent } from './daymasterlist/daymasterlist.component';
import { YearlistComponent } from './yearlist/yearlist.component';
import { SemesterlistComponent } from './semesterlist/semesterlist.component';
// import { RoomLabComponent } from './room-lab/room-lab.component';
import { ShiftComponent } from './shift/shift.component';
import { AcadamicBatchComponent } from './acadamic-batch/acadamic-batch.component';
import { AcademicSessionComponent } from './academic-session/academic-session.component';
import { AcademicSessionListComponent } from './academic-session-list/academic-session-list.component';
import { ClassRoomComponent } from './class-room/class-room.component';
import { ExamComponent } from './exam/exam.component';
import { AcademicYearComponent } from '../common-master/academic-year/academic-year.component';



const routes: Routes = [
  {
    path: 'admisson-category',
    component: AdmissionCategoryComponent
  },
  {
    path: 'board',
    component: BoardComponent 
  },
  {
    path: 'scheme',
    component: SchemeComponent
  },
  
  {
    path: 'subject',
    component: SubjectComponent 
  },
  {
    path: 'session',
    component: SessionComponent
  },
  {

    path: 'degree',
    component: DegreeComponent
  },
  {
    path: 'branch',
    component: BranchComponent
  },
  {
    path: 'batch',
    component: BatchComponent
  },
  {
    path: 'term',
    component: TermComponent
  },
  {
    path: 'session-type',
    component: SessionTypeComponent
  },
  {
    path: 'day-master-list',
    component: DaymasterlistComponent
  },
  {
    path: 'yearlist',
    component: YearlistComponent 
  },
  {
    path: 'semesterlist',
    component: SemesterlistComponent
  },
  {
    path: 'academic-batch',
    component: AcadamicBatchComponent
  },
  {
    path: 'shift',
    component: ShiftComponent
  },
  {
    path: 'class-room',
    component: ClassRoomComponent
  },
  {
    path: 'academic-session',
    component: AcademicSessionComponent
  },
  {
    path: 'academic-session/:id',
    component: AcademicSessionComponent
  },
  {
    path: 'academic-session-list',
    component: AcademicSessionListComponent
  },
  {
    path: 'exam',
    component: ExamComponent
  },
  {
    path: 'academic-year',
    component: AcademicYearComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,UIModule]
})
export class AcademicRoutingModule { }
