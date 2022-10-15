import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExamScheduleComponent } from './exam-schedule/exam-schedule.component';
import { ManageExamTimeTableComponent } from './manage-exam-time-table/manage-exam-time-table.component';
import { StudentMarkEntryComponent } from './student-mark-entry/student-mark-entry.component';
import { ResultPublishComponent } from './result-publish/result-publish.component';
import { StudentPromotionComponent } from './student-promotion/student-promotion.component';

const routes: Routes = [
  {
    path: 'exam-schedule',
    component: ExamScheduleComponent
  },
  {
    path: 'manage-exam-time-table',
    component: ManageExamTimeTableComponent
  },
  {
    path: 'mark-entry',
    component: StudentMarkEntryComponent
  },
  {
    path: 'result-publish',
    component: ResultPublishComponent
  },
  {
    path: 'student-promotion',
    component: StudentPromotionComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamRoutingModule { }
