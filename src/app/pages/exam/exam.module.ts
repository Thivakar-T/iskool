import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIModule } from '../../shared/ui/ui.module';
import {MatExpansionModule} from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbDropdownModule, NgbPaginationModule, NgbDatepickerModule, NgbCollapseModule, NgbNavModule ,NgbAccordionModule,} from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxPrintModule } from 'ngx-print';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ExamRoutingModule } from './exam-routing.module';
import { ExamScheduleComponent } from './exam-schedule/exam-schedule.component';
import { ManageExamTimeTableComponent } from './manage-exam-time-table/manage-exam-time-table.component';
import { StudentMarkEntryComponent } from './student-mark-entry/student-mark-entry.component';
import { ResultPublishComponent } from './result-publish/result-publish.component';
import { StudentPromotionComponent } from './student-promotion/student-promotion.component';


@NgModule({
  declarations: [ExamScheduleComponent, ManageExamTimeTableComponent, StudentMarkEntryComponent, ResultPublishComponent, StudentPromotionComponent,],
  imports: [
    CommonModule,
    ExamRoutingModule,
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
    NgbAccordionModule,
    PerfectScrollbarModule,
    MatExpansionModule,
  ]
})
export class ExamModule { }
