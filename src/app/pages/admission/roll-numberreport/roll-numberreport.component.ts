import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchStudentService } from '../search-student.service';
import { StandardService } from './../../master/common-master/standard.service';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-roll-numberreport',
  templateUrl: './roll-numberreport.component.html',
  styleUrls: ['./roll-numberreport.component.scss']
})
export class RollNumberreportComponent implements OnInit {

  reportRoll: FormGroup
  reportRollSubmitted = false;
  standardArr: any = [];
  stdId: any;
  id: any;

  constructor(private formBuilder: FormBuilder,
    SearchStudentService: SearchStudentService,
    private _StandardServive: StandardService,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService,

  ) { }
  private _baseUrl = environment.API_URL;

  ngOnInit(): void {
    this.reportRoll = this.formBuilder.group({
      stdId: [null, Validators.required],
    });
    this.getStandard();
  }
  get f() { return this.reportRoll.controls; }

  getStandard() {
    this._StandardServive.getAllUsers().pipe(first()).subscribe(res => {
      this.standardArr = res.data;
      console.log(this.id)
    });
  }

  getSinglereport(event) {
    this.stdId = event.id ;

  }

  downloadPDF() {
    if(this.stdId == null || this.stdId == ""){
      this.reportRollSubmitted = true;
      this.toastr.error("Please fill mandatory field.", 'Warning');
      return;
    }
    else{
    this.spinner.show();
    console.log( this.stdId );
    var win = window.open(this._baseUrl + 'api/document/download/get/student/rollnumber/report' + '/' + this.stdId);
    win.focus();
    this.stdId = [];
    this.reportRoll.controls['stdId'].reset();
    this.spinner.hide();
  }
}

reset() {
   this.reportRollSubmitted=false; 
 }

}
