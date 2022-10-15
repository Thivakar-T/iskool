import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { CasteComponent } from './caste/caste.component';
import { OccupationComponent } from './occupation/occupation.component';

import { UIModule } from './../../../shared/ui/ui.module';

import { JobTypeComponent } from './job-type/job-type.component';
import { ReligionComponent } from './religion/religion.component';
import { MotherTongeComponent } from './mother-tonge/mother-tonge.component';
import { DocumentComponent } from './document/document.component';
import { BloodGroupComponent } from './blood-group/blood-group.component';
import { SectionComponent } from './section/section.component';
import { CountryComponent } from './country/country.component';
import { CityComponent } from './city/city.component';
import { StateComponent } from './state/state.component';
import { StandardComponent } from './standard/standard.component';
import { LocationComponent } from './location/location.component';
import { HolidayComponent } from './holiday/holiday.component';
import { HolidayListComponent } from './holiday-list/holiday-list.component';
import { GradingComponent } from './grading/grading.component';
import { SubjectComponent } from './subject/subject.component';
import { DepartmentComponent } from './department/department.component';
import { GradeListComponent } from './grade-list/grade-list.component';
import { AddmissionCommonDocumentComponent } from './addmission-common-document/addmission-common-document.component';
import { FeeCollectionCounterComponent } from './fee-collection-counter/fee-collection-counter.component';


const routes: Routes = [

  {
    path: 'addmission-common-document',
    component: AddmissionCommonDocumentComponent
  },
  {
    path: 'fee-collection-counter',
    component: FeeCollectionCounterComponent
  },
  {
    path: 'job-type',
    component: JobTypeComponent
  },
  {
    path: 'religion',
    component: ReligionComponent
  },{
    path: 'mother-tongue',
    component: MotherTongeComponent
  },
  {
    path: 'category',
    component: CategoryComponent
  },
  
  {
    path: 'caste',
    component: CasteComponent 
  },
  {
    path: 'occupation',
    component: OccupationComponent
  },

{
    path: 'document',
    component: DocumentComponent
  },
  

  {
    path: 'blood-group',
    component: BloodGroupComponent
  },
  {
    path: 'section',
    component: SectionComponent
  },
  {
    path: 'country',
    component: CountryComponent
  },
  {
    path: 'city',
    component: CityComponent
  },
  {
    path: 'state',
    component: StateComponent
  },
  {
    path: 'standard',
    component: StandardComponent
  },
  {
    path: 'location',
    component: LocationComponent
  },
  {
    path: 'holiday',
    component: HolidayComponent
  }
  ,
  {
    path: 'holiday-list',
    component: HolidayListComponent
  },

  {
    path: 'subject',
    component: SubjectComponent
  },
  {
    path: 'grading',
    component: GradingComponent
  },
  {
    path: 'grading/:id',
    component: GradingComponent
  },
  {
    path: 'grade-list',
    component: GradeListComponent
  },
  {
    path: 'department',
    component: DepartmentComponent
  },

  {
    path:"holiday/:id",
     component:HolidayComponent
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,UIModule]
})
export class CommonMasterRoutingModule { }
