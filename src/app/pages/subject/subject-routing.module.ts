import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcademicstandardsubjectconfigurationComponent } from './subjectOffering/academicstandardsubjectconfiguration.component';
import { SectionAllotmentComponent } from './section-allotment/section-allotment.component';
import { RollnumberAllotmentComponent } from './rollnumber-allotment/rollnumber-allotment.component';


const routes: Routes = [
  {
    path: 'subject-offering',
    component: AcademicstandardsubjectconfigurationComponent
  },
  {
    path: 'section-allotment',
    component: SectionAllotmentComponent
  },
  {
    path: 'roll-number-allotment',
    component: RollnumberAllotmentComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectRoutingModule { }
