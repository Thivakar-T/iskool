import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeesService } from './../fees.service';

declare let $: any;

@Component({
  selector: 'app-fee',
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.component.scss']
})
export class FeeComponent implements OnInit {

  feelist: any = [];
  feesObj: any = {};
  id: any;
  categoryData: any;
  userName: any;
  userId: any;

  constructor(
    // private formBuilder: FormBuilder, 
    private modalService: NgbModal,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService,
    private _feesService: FeesService,
  ) { }

  ngOnInit(): void {
    this.getFeesList();
    this.userId = JSON.parse(localStorage.getItem('currentUser')).data.loginObj.userId;

  }

  getFeesList() {
    this.spinner.show();
    $('#feelist').DataTable().clear().destroy();
    this._feesService.getFees().pipe(first()).subscribe(res => {
      this.feelist = res.data;
      this.spinner.hide();
      $(document).ready(function () {
        $('#feelist').DataTable({
          "iDisplayLength": 30,
          "lengthMenu":  [10, 25, 30,50,100]

        });
      });
    }, err => {
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
        this.spinner.hide();
      }
    })
  }
  openCat(content, categoryData,) {
    if (categoryData) {
      this.categoryData = categoryData;
      this.modalService.open(content, { size: 'sm' });
    }
  }


  deletedata(modal) {
    this.spinner.show();
    this.userName = JSON.parse(localStorage.getItem('currentUser')).data.loginObj.userName;
    this._feesService.deleteFees(this.categoryData, this.userName).pipe(first()).subscribe(res => {
      this.toastr.success(res.data, 'Success!');
      modal.dismiss('Cross click');
      this.getFeesList();
    }, err => {
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
      }
      modal.dismiss('Cross click');
      this.spinner.hide();
    })
  }


}
