import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteComponent } from './route/route.component';
import { RoutelistComponent } from './routelist/routelist.component';
import { VehicleComponent } from './vehicle/vehicle.component';

import { RouteMapingComponent } from './route-maping/route-maping.component';
import { RouteMapingListComponent } from './route-maping-list/route-maping-list.component';

import { DriversComponent } from './drivers/drivers.component';
import { RouteAllotmentComponent } from './route-allotment/route-allotment.component';
import { BusroutemapComponent } from './busroutemap/busroutemap.component';
import { RoutesListComponent } from './routes-list/routes-list.component';

const routes: Routes = [
  {
    path: 'route-list',
    component: RouteComponent
  },
  // {
  //   path: 'routelist/:id',
  //   component: RoutelistComponent
  // },
  {
    path: 'route',
    component: RoutelistComponent
  },
  {
    path: 'routemap',
    component: RouteMapingComponent
  },
  {
    path: 'routemaplist',
    component: RouteMapingListComponent
   
  },
  {
    path: 'drivers',
    component: DriversComponent
  },
  {
    path: 'route-allotment',
    component: RouteAllotmentComponent
  },

 
  {
    path: 'vehicle',
    component: VehicleComponent
  },

  {
    path: 'busroutemap',
    component: BusroutemapComponent
  },
  {
    path: 'route-view/:id',
    component: RoutesListComponent
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RouteRoutingModule { }
