import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators'; 
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner'; 
import { StandardService } from './../../master/common-master/standard.service';
import { AcadamicYearService } from '../../master/common-master/academic-year/acadamic-year.service';
import { SectionService } from '../../master/common-master/section/section.service';
import { OutstandingService } from '../outstanding.service';

declare let $: any; 

@Component({
  selector: 'app-outstandingfeereport',
  templateUrl: './outstandingfeereport.component.html',
  styleUrls: ['./outstandingfeereport.component.scss']
})
export class OutstandingfeereportComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
   public toastr: ToastrService,
    public spinner: NgxSpinnerService, 
    private _StandardServive: StandardService,
    private _academicYearService : AcadamicYearService,
    private SectionService: SectionService,
    private outstandingService: OutstandingService,



  ) { }
  enableCard = false;
  obj: any = {};

  id: any;
  reportform: FormGroup 
  reportObj: any = {}; 
  reportSubmitted = false;
  buttonText:string = "";
  standardArr: any = [];
  acadamicArr: any = [];
  // ReportArr: any = ['DAY_WISE_COLLECTION_SUMMARY'];
  sectionArr: any = [];
  ngOnInit(): void {
    this.reportform = this.formBuilder.group({
      // reportType : [null,Validators.required],
      sectionId :[null,Validators.required],
      academicYearId :[null,Validators.required],
            stdId :[null,Validators.required] ,
            // fromDate:[null,Validators.required] ,
            // toDate:[null,Validators.required] ,
            // id:[null,Validators.required] ,
          })
this. getstandard();
this.getAcademicYear();
this. getSection();
  }
  get f() { return this.reportform.controls; }

  selectstdId(event){
if(event == undefined){
  this.enableCard  = false;
}
  }
  selectsectionId(event){
  if(event == undefined){
    this.enableCard  = false;
  }
}
  selectAcadamicYear(event){
    if(event == undefined){
      this.enableCard  = false;
    }
  }
  getstandard() {
    this._StandardServive.getAllUsers().pipe(first()).subscribe(res => {
      this.standardArr = res.data;
    })
  }
  getAcademicYear() {
    this._academicYearService.getData().pipe(first()).subscribe(res => {
      this.acadamicArr = res.data;
    });
  }
  getSection() {
    this.SectionService.getsection().pipe(first()).subscribe(res => {
      this.sectionArr = res.data;
    });
  }
  updatereport(event){
    this.enableCard  = false;
    this.reportSubmitted = true;
    if ((this.reportform.invalid)) {
       this.toastr.error("Please fill the mandatory fields.", 'Warning');
      return;
    }
    if(event.id == undefined) {
      this.spinner.show();
      $('#outstanding').DataTable().clear().destroy();
    this.outstandingService.updatereport(this.reportform.value).pipe(first()).subscribe(async res => {
      this.obj = res.data;
      $(document).ready(function () {
        $('#outstanding').DataTable({
          "iDisplayLength": 30,
          "lengthMenu":  [10, 25, 30,50,100]
        });
      });
      if(this.obj.responseList.length == 0){
        this.enableCard  = false;
        this.spinner.hide();
        // this.reportform.reset({});
        this.reportSubmitted = false;
        this.toastr.error("Report not found ", 'Warning');
      }
      else{
       this.enableCard  = true;
      this.toastr.success(res.message, 'Success!');
       this.spinner.hide();
      }
    },err => {
      this.spinner.show();
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
      }
      this.spinner.hide();
      this.enableCard  = false;
      // this.reportform.reset({});
      this.reportSubmitted = false;
    })
  }else{
    // this.reportform.reset({});
    this.reportSubmitted = false;
    this.enableCard  = false;
  }
  }

}






