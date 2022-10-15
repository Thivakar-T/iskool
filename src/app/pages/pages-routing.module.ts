import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministrationModule } from './administration/administration.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdmissionModule } from './admission/admission.module';
import { AcademicRoutingModule } from './master/academic_master/academic-routing.module';
import { CommonMasterRoutingModule } from './master/common-master/common-master-routing.module';
import { FeeRoutingModule } from './Fee/fee-routing.module';
import { StandardRoutingModule } from './Fee/standard-routing.module';
import { RouteRoutingModule } from './transport/route-routing.module';
import { SubjectRoutingModule } from './subject/subject-routing.module';
import { ExamRoutingModule } from './exam/exam-routing.module';
import { NotificationRoutingModule } from './notification/notification-routing.module';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'administration', loadChildren: () => import('./administration/administration.module').then(m=>AdministrationModule)},
  { path: 'admission', loadChildren: () => import('./admission/admission.module').then(m=>AdmissionModule)},
  { path: 'academic-master', loadChildren: () => import('./master/academic_master/academic-routing.module').then(m=>AcademicRoutingModule)},
  { path: 'common-master', loadChildren: () => import('./master/common-master/common-master-routing.module').then(m=>CommonMasterRoutingModule)},
  { path: 'fee', loadChildren: () => import('./Fee/fee-routing.module').then(m=>FeeRoutingModule)},
  { path: 'standard', loadChildren: () => import('./Fee/standard-routing.module').then(m=>StandardRoutingModule)},
  { path: 'transport', loadChildren: () => import('./transport/route-routing.module').then(m=>RouteRoutingModule)},
  { path: 'subject', loadChildren: () => import('./subject/subject-routing.module').then(m=>SubjectRoutingModule)},
  { path: 'exam', loadChildren: () => import('./exam/exam-routing.module').then(m=>ExamRoutingModule)},
  { path: 'notification', loadChildren: () => import('./notification/notification-routing.module').then(m=>NotificationRoutingModule)},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
