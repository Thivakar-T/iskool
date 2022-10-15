import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StandardComponent } from './standard Fee/standard.component';
import { AcadamicYearComponent } from './../Fee/Acadamic Fee Master/acadamic-year.component';
const routes: Routes = [
  {
    path: 'new',
    component: StandardComponent
  },
  {
    path: 'acadamic-fee',
    component: AcadamicYearComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StandardRoutingModule { }
