import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

declare let $: any;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  configData;
  
  constructor(
  ) { }

  ngOnInit() {
  
  }
 
}