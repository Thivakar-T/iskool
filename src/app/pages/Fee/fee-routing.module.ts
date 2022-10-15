import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeeTermComponent } from './fee-term/fee-term.component';
import { FeeComponent } from './fee/fee.component';
import { FeeCollectionComponent } from './fee-collection/fee-collection.component';
import { FeeCollectionReportComponent } from './fee-collection-report/fee-collection-report.component';

const routes: Routes = [
  {
    path: 'fee-collection',
    component: FeeCollectionComponent
  },
  {
    path: 'fee-collection-report',
    component: FeeCollectionReportComponent
  },
  {
    path: 'finance/fee-list',
    component: FeeComponent
  },
  {
    path: 'finance/fee/new',
    component: FeeTermComponent
  },
  {
    path: 'new/:id',
    component: FeeTermComponent
  },
  {
    path: 'fee-collection',
    component: FeeCollectionComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeeRoutingModule { }
