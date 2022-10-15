import { Component, OnInit } from '@angular/core';
import { RoutelistService } from 'src/app/pages/transport/routelist/routelist.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
declare let $: any;

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})
export class RouteComponent implements OnInit {

  RouterlistArr: any = [];
  RouterlistObj :  any = {};

  constructor(
    private RoutelistService: RoutelistService,
    private modalService: NgbModal,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService,

  ) { }

  ngOnInit(): void {
    this.getRoutleist();
    
  }

  getRoutleist() {
    this.spinner.show();
    $('#route').DataTable().clear().destroy();
    this.RoutelistService.getRoute().pipe(first()).subscribe(res => {
      this.RouterlistArr = res.data;
      $(document).ready(function () {
        $('#route').DataTable({
          "iDisplayLength": 30,
          "lengthMenu":  [10, 25, 30,50,100]

        });
      });
      this.spinner.hide();   
    }, err => {
      if (err.error.error.reason) {
        this.spinner.hide();
        this.toastr.error(err.error.error.reason);
      }
    })
  }
}
