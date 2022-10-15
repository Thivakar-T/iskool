import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StandardService } from './../../master/common-master/standard.service';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-studand-address',
  templateUrl: './studand-address.component.html',
  styleUrls: ['./studand-address.component.scss']
})
export class StudandAddressComponent implements OnInit {
  AddressReport: FormGroup
  reportRollSubmitted = false;
  standardArr: any = [];
  stdId: any;
  id: any;

  constructor(private formBuilder: FormBuilder,
    private _StandardServive: StandardService,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService,) { }
    private _baseUrl = environment.API_URL;

  ngOnInit(): void {
    this.AddressReport = this.formBuilder.group({
      stdId: [null, Validators.required],
    });
    this.getStandard();
  }
  get f() { return this.AddressReport.controls; }

  getStandard() {
    this._StandardServive.getAllUsers().pipe(first()).subscribe(res => {
      this.standardArr = res.data;
    });
  }
  getSinglereport(event) {
    this.stdId = event.id ;
  }

  downloadPDF() {
    console.log(this.stdId)
    if(this.stdId == null || this.stdId == ""){
      this.reportRollSubmitted = true;
      this.toastr.error("Please fill mandatory field.", 'Warning');
      return;
    }
    else{
    this.spinner.show();
    var win = window.open(this._baseUrl + 'api/document/download/get/student/address/report' + '/' + this.stdId);
    win.focus();
    this.stdId = [];    
    this.AddressReport.controls['stdId'].reset();
    this.spinner.hide();
  }
  }

  reset() {
    this.reportRollSubmitted=false; 
  }

}
