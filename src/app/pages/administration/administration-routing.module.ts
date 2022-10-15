import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { RoleComponent } from './role/role.component';
import { PagePolicyComponent } from './page-policy/page-policy.component';
import { RolePolicyComponent } from './role-policy/role-policy.component';
import { CalendarComponent } from '../administration/calendar/calendar.component';
import { HolidayCalendarComponent } from '../administration/holiday-calendar/holiday-calendar.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [

  {
    path: 'user',
    component: UserListComponent
  },
  {
    path: 'user/new/:id',
    component: UserComponent
  },
  {
    path: 'user/new',
    component: UserComponent
  },
  {
    path: 'role',
    component: RoleComponent
  }, {
    path: 'page-policy',
    component: PagePolicyComponent
  },
  {
    path: 'role-policy',
    component: RolePolicyComponent
  },
  {
    path: 'role-policy/:id',
    component: RolePolicyComponent
  },
  {
    path: 'role-policy/:id/:roleName',
    component: RolePolicyComponent
  },
  {
    path: 'calendar',
    component: CalendarComponent
  },
  {
    path: 'holiday-calendar',
    component: HolidayCalendarComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
