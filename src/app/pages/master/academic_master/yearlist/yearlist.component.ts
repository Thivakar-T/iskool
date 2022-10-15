import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { YearService } from './year.service';
declare let $: any;

@Component({
  selector: 'app-yearlist',
  templateUrl: './yearlist.component.html',
  styleUrls: ['./yearlist.component.scss']
})
export class YearlistComponent implements OnInit {

  buttonText:string = "";
  yearArr: any = [];
  constructor(
    private _yearService: YearService,
    public toastr: ToastrService,
    private formBuilder: FormBuilder, 
     private modalService: NgbModal,
     private spinner: NgxSpinnerService
  ) { }
  yearForm: FormGroup
  yearObj: any = {};
  yearSubmitted = false;
  userId:any;

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('currentUser')).data.loginObj.userId;
    this. getyear();
  }
  getyear() {
    this.spinner.show();
    $('#example').DataTable().clear().destroy();
     this._yearService.getyear().pipe(first()).subscribe(res => {
      this.yearArr = res.data;
      $(document).ready(function () {
        $('#example').DataTable({
          "iDisplayLength": 100
        });
      }); 
     
      });
      this.spinner.hide();
    
  }


}
