import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ClickOutsideModule } from 'ng-click-outside';

import { UIModule } from '../shared/ui/ui.module';
import { LayoutComponent } from './layout.component';
import { FooterComponent } from './footer/footer.component';
import { HorizontalComponent } from './horizontal/horizontal.component';
import { HorizontaltopbarComponent } from './horizontaltopbar/horizontaltopbar.component';
import {LanguageService} from '../core/services/language.service';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { LayoutRoutingModule } from './layout-routing.module'

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [LayoutComponent, FooterComponent, HorizontalComponent, HorizontaltopbarComponent],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    NgbDropdownModule,
    ClickOutsideModule,
    UIModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    LayoutRoutingModule
  ],
  providers:[LanguageService]
})
export class LayoutsModule { }
