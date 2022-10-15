import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { OutstandingService } from '../outstanding.service';
import { StandardService } from '../../master/common-master/standard.service';
import { environment } from 'src/environments/environment';

declare let $: any;

@Component({
  selector: 'app-termfeereport',
  templateUrl: './termfeereport.component.html',
  styleUrls: ['./termfeereport.component.scss']
})
export class TermfeereportComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService,
    private outstandingService: OutstandingService,
    private StandardService: StandardService,

  ) { }
  id: any;
  reportform: FormGroup
  reportObj: any = {};
  reportSubmitted = false;
  buttonText: string = "";
  standardArr: any = [];
  stdId: any;
  termObj: any;
  enableCard = false;
  configData;
  private _baseUrl = environment.API_URL;
  ngOnInit(): void {
    this.reportform = this.formBuilder.group({
      stdId: [null, Validators.required],
    })
    this.getStandard()
  }
  
  get f() { return this.reportform.controls; }


  getStandard() {
    this.StandardService.getAllUsers().pipe(first()).subscribe(res => {
      this.standardArr = res.data;
    });
  }
  search(){
    this.reportSubmitted=true;
    if(this.reportform.value.stdId==null || this.reportform.value.stdId==""){     
      this.toastr.error("Please fill standard");
      return;
    }
    this.spinner.show();
    $('#example').DataTable().clear().destroy();
    this.outstandingService.getSinglereport(this.stdId).pipe(first()).subscribe(res => {
      this.id = res.data.id;
      this.termObj = res.data;
      $(document).ready(function () {
        $('#example').DataTable({
          "iDisplayLength": 30,
          "lengthMenu":  [10, 25, 30,50,100]

        });
      });  
      if (this.termObj.responseList == '' || this.termObj.responseList == null) {
        this.toastr.error('current Term fees not found!');
        this.enableCard = false;
        this.reportSubmitted = false;
        this.spinner.hide();

      }
      else {
        this.enableCard = true;
        this.toastr.success(res.message, 'Success!');
        this.spinner.hide();
      }

    }, err => {
       this.spinner.show();
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
      }
      this.enableCard = false;
      this.reportSubmitted = false;
      this.spinner.hide();
    });
}

  getSinglereport(event) {
    if(event == undefined){
      this.enableCard = false;
    }
    this.stdId = event.id;

  }

  downloadPDF() {
    this.spinner.show();
    var win = window.open(this._baseUrl + 'api/student/fees/receipt/get/term/unpaid/report/download' + '/' + this.stdId);
    win.focus();
    this.spinner.hide();
  }
}







// @Component({
//   selector: 'app-outstandingfeereport',
//   templateUrl: './outstandingfeereport.component.html',
//   styleUrls: ['./outstandingfeereport.component.scss']
// })
// export class OutstandingfeereportComponent implements OnInit {

//   constructor(
//     private formBuilder: FormBuilder,
//     private modalService: NgbModal,
//    public toastr: ToastrService,
//     public spinner: NgxSpinnerService, 
//     private _StandardServive: StandardService,
//     private _academicYearService : AcadamicYearService,
//     private SectionService: SectionService,
//     private outstandingService: OutstandingService,



//   ) { }
//   enableCard = false;
//   responseListArr: any = [];

//   id: any;
//   reportform: FormGroup 
//   reportObj: any = {}; 
//   reportSubmitted = false;
//   buttonText:string = "";
//   standardArr: any = [];
//   acadamicArr: any = [];
//   ReportArr: any = ['DAY_WISE_COLLECTION_SUMMARY'];
//   sectionArr: any = [];
//   ngOnInit(): void {
//     this.reportform = this.formBuilder.group({
//       reportType : [null,Validators.required],
//       sectionId :[null,Validators.required],
//       academicYearId :[null,Validators.required],
//             stdId :[null,Validators.required] ,
//             fromDate:[null,Validators.required] ,
//             toDate:[null,Validators.required] ,
//             id:[null,Validators.required] ,
//           })
// this. getstandard();
// this.getAcademicYear();
// this. getSection();
//   }

//   getstandard() {
//     this._StandardServive.getAllUsers().pipe(first()).subscribe(res => {
//       this.standardArr = res.data;
//     })
//   }
//   getAcademicYear() {
//     this._academicYearService.getData().pipe(first()).subscribe(res => {
//       this.acadamicArr = res.data;
//     });
//   }
//   getSection() {
//     this.SectionService.getsection().pipe(first()).subscribe(res => {
//       this.sectionArr = res.data;
//     });
//   }
//   updatereport(event){
//     if ((this.reportform.invalid)) {
//       this.toastr.error("Please fill atleast one mandatory fields.", 'Warning');
//       return;
//     }
//     if(event.id == undefined) {
//       this.spinner.show();
//     this.outstandingService.updatereport(this.reportform.value).pipe(first()).subscribe(async res => {
//       this.responseListArr = res.data
//        this.enableCard  = true;

//       this.toastr.success(res.message, 'Success!');
//        this.spinner.hide();

//     },err => {
//       this.spinner.show();
//       if (err.error.error.reason) {
//         this.toastr.error(err.error.error.reason);
//       }
//       this.spinner.hide();
//     })
//   }else{
//     this.enableCard  = false;
//   }
//   }

// }


