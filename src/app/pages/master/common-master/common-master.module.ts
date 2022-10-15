import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonMasterRoutingModule } from './common-master-routing.module';
import { UIModule } from './../../../shared/ui/ui.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbDropdownModule, NgbPaginationModule, NgbDatepickerModule, NgbCollapseModule, NgbNavModule ,NgbAccordionModule,} from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxPrintModule } from 'ngx-print';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AdmissionCategoryComponent } from './admission-category/admission-category.component';
import { JobTypeComponent } from './job-type/job-type.component';
import { ReligionComponent } from './religion/religion.component';
import { MotherTongeComponent } from './mother-tonge/mother-tonge.component';
import { CategoryComponent } from './category/category.component';
import { CasteComponent } from './caste/caste.component';
import { OccupationComponent } from './occupation/occupation.component';
import { DocumentComponent } from './document/document.component';
import { BoardComponent } from './board/board.component';
import { BloodGroupComponent } from './blood-group/blood-group.component';
import { SectionComponent } from './section/section.component';
import { CountryComponent } from './country/country.component';
import { CityComponent } from './city/city.component';
import { StateComponent } from './state/state.component';
import { StandardComponent } from './standard/standard.component';
import { LocationComponent } from './location/location.component';
import { HolidayComponent } from './holiday/holiday.component';
import { SubjectComponent } from './subject/subject.component';
import { AcademicYearComponent } from './academic-year/academic-year.component';
import { GradingComponent } from './grading/grading.component';
import { HolidayListComponent } from './holiday-list/holiday-list.component';
import { DepartmentComponent } from './department/department.component';
import { GradeListComponent } from './grade-list/grade-list.component';
import { AddmissionCommonDocumentComponent } from './addmission-common-document/addmission-common-document.component';
import { FeeCollectionCounterComponent } from './fee-collection-counter/fee-collection-counter.component';


 
@NgModule({
  declarations: [AdmissionCategoryComponent,JobTypeComponent,ReligionComponent,MotherTongeComponent,DocumentComponent,BoardComponent,BloodGroupComponent,SectionComponent,
  CategoryComponent, CasteComponent, OccupationComponent,DocumentComponent,BoardComponent,BloodGroupComponent,SectionComponent, CountryComponent, CityComponent, StateComponent, StandardComponent, LocationComponent,  SubjectComponent, AcademicYearComponent,GradingComponent, DepartmentComponent , HolidayListComponent, HolidayComponent, GradeListComponent, AddmissionCommonDocumentComponent, FeeCollectionCounterComponent],


  imports: [
    CommonModule,
    CommonMasterRoutingModule,
    CommonModule,
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
    NgbNavModule,
    AngularEditorModule,
    NgxPrintModule,
    NgbAccordionModule,
    PerfectScrollbarModule,

  ]
})
export class CommonMasterModule { }
 