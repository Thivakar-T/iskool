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
import { SubjectRoutingModule } from './subject-routing.module';
import { AcademicstandardsubjectconfigurationComponent } from './subjectOffering/academicstandardsubjectconfiguration.component';
import { SectionAllotmentComponent } from './section-allotment/section-allotment.component';
import { RollnumberAllotmentComponent } from './rollnumber-allotment/rollnumber-allotment.component';





@NgModule({
  declarations: [AcademicstandardsubjectconfigurationComponent,SectionAllotmentComponent, RollnumberAllotmentComponent  ],
  imports: [
    CommonModule,
    SubjectRoutingModule,
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
export class SubjectModule { }
