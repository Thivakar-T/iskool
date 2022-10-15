import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule, NgbDropdownModule, NgbPaginationModule, NgbDatepickerModule, NgbCollapseModule, NgbNavModule ,NgbAccordionModule,} from '@ng-bootstrap/ng-bootstrap';

import { FeeRoutingModule } from './fee-routing.module';
import { FeeComponent } from './fee/fee.component';
import { FeeTermComponent } from './fee-term/fee-term.component';
import { UIModule } from './../../shared/ui/ui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeeCollectionComponent } from './fee-collection/fee-collection.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxPrintModule } from 'ngx-print';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FeeCollectionReportComponent } from './fee-collection-report/fee-collection-report.component';

@NgModule({
  declarations: [FeeComponent, FeeTermComponent, FeeCollectionComponent, FeeCollectionReportComponent],
  imports: [
    CommonModule,
    FeeRoutingModule,
    UIModule,
    AngularEditorModule,
    PerfectScrollbarModule,
    NgxPrintModule,
    NgMultiSelectDropDownModule,
    NgbModalModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgbDatepickerModule, 
    NgbCollapseModule,
     NgbNavModule ,
     NgbAccordionModule,
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbDatepickerModule,

  ]
})
export class FeeModule { }
