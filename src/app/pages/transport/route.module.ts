import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouteRoutingModule } from './route-routing.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { UIModule } from './../../shared/ui/ui.module';
import {MatExpansionModule} from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule, NgbDropdownModule, NgbPaginationModule, NgbDatepickerModule, NgbCollapseModule, NgbNavModule ,NgbAccordionModule,} from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxPrintModule } from 'ngx-print';
import { RouteComponent } from './route/route.component';
import { RoutelistComponent } from './routelist/routelist.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { RouteMapingComponent } from './route-maping/route-maping.component';
import { RouteMapingListComponent } from './route-maping-list/route-maping-list.component';
import { DriversComponent } from './drivers/drivers.component';
import { RouteAllotmentComponent } from './route-allotment/route-allotment.component';
import { BusroutemapComponent } from './busroutemap/busroutemap.component';
import { RoutesListComponent } from './routes-list/routes-list.component';


@NgModule({
  declarations: [ RouteComponent,RoutelistComponent, RouteMapingComponent, RouteMapingListComponent,DriversComponent,RouteComponent,RoutelistComponent, VehicleComponent, RouteAllotmentComponent, BusroutemapComponent, RoutesListComponent],
  imports: [
    CommonModule,
    RouteRoutingModule,
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
    MatExpansionModule

  ]
})
export class RouteModule { }
