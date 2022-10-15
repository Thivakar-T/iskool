import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIModule } from './../../shared/ui/ui.module';
import {MatExpansionModule} from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbDropdownModule, NgbPaginationModule, NgbDatepickerModule, NgbCollapseModule, NgbNavModule ,NgbAccordionModule,} from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxPrintModule } from 'ngx-print';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { StandardRoutingModule } from './standard-routing.module';
import { StandardComponent } from './standard Fee/standard.component';
import { AcadamicYearComponent } from './Acadamic Fee Master/acadamic-year.component';


@NgModule({
  declarations: [StandardComponent, AcadamicYearComponent],
  imports: [
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
    UIModule,
    NgbNavModule,
    AngularEditorModule,
    NgxPrintModule,
    NgbAccordionModule,
    PerfectScrollbarModule,
    MatExpansionModule,
    StandardRoutingModule
  ]
})
export class StandardModule { }
