import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AcadamicYearService } from './../../master/common-master/academic-year/acadamic-year.service';
import { StandardService } from './../../master/common-master/standard.service';
import { SectionService } from './../../master/common-master/section/section.service';
import { FeeCollectionService } from '../fee-collection.service';
import { FeeCollectionCounterService } from './../../master/common-master/fee-collection-counter.service';

declare let $: any;
@Component({
  selector: 'app-fee-collection-report',
  templateUrl: './fee-collection-report.component.html',
  styleUrls: ['./fee-collection-report.component.scss']
})
export class FeeCollectionReportComponent implements OnInit {
  feeForm: FormGroup;
  academicYearId;
  stdId;
  sectionId;
  counterId;
  yearArr: any = [];
  feeArr: any = [];
  stdArr: any = [];
  secArr: any = [];
  enableFeeCard = false;
  feeSubmitted = false;
  filtersubmit = false;
  acadamicArray: any = [];
  feeObj:any;
  counterArr:any;
  Obj:any;
  reportObj:any;
  configData;
  reportTypeArr: any = [
    { disp: 'DAY WISE COLLECTION SUMMARY', val: 'DAY_WISE_COLLECTION_SUMMARY' },
    { disp: 'STANDARD WISE COLLECTION SUMMARY', val: 'STANDARD_WISE_COLLECTION_SUMMARY' }
  ]
  paymentModeArr: any = [
    { disp: 'CASH', val: 'CASH' },
    { disp: 'CARD', val: 'CARD' },
    { disp: 'DD', val: 'DD' },
    { disp: 'CHALLAN', val: 'CHALLAN' }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    public spinner: NgxSpinnerService,
    private AcadamicYearService: AcadamicYearService,
    private StandardService: StandardService,
    private SectionService: SectionService,
    private FeeCollectionService: FeeCollectionService,
    private FeeCollectionCounterService : FeeCollectionCounterService
  ) { }

  ngOnInit(): void {
    this.feeForm = this.formBuilder.group({
      academicYearId: [null, Validators.required],
      stdId: [null, Validators.required],
      sectionId: [null, Validators.required],
      reportType: [null, Validators.required],
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required],
      paymentMode: [null, Validators.required],
      counterId: [null, Validators.required],
      responseList: this.formBuilder.array(
        [this.createfeeFormGroup()], [Validators.required])
    })
    this.getAcademicYear();
    this.getStandard();
    this.getSection();
    this.getCounterName();
  }
  get f() { return this.feeForm.controls };
  createfeeFormGroup() {
    return this.formBuilder.group({
    
      stuName: [null, [Validators.required]],
      rollNumber:[null,[Validators.required]],
      sectionName: [null, [Validators.required]],
      stdName: [null, [Validators.required]],
      paidAmount: [null, [Validators.required]],
      receiptDate: [null, [Validators.required]]

    })
  }
  get rollArr(): FormArray {
    return this.feeForm.get('responseList') as FormArray;
  }

  select(event) {
    console.log(event);
    console.log(event.id);
    this.academicYearId = event.id;
  }
  selectModule(event) {
    this.stdId = event.id;
  }
  getCountry(event) {
    this.sectionId = event.id;
  }
  getCounter(event) {
    this.counterId = event.id;
  }
  getCounterName(){
    this.FeeCollectionCounterService.getFee().pipe(first()).subscribe(res => {
      this.counterArr = res.data;
    });
  }
  getAcademicYear() {
    this.AcadamicYearService.getData().pipe(first()).subscribe(res => {
      this.yearArr = res.data;
    });
  }
  getStandard() {
    this.StandardService.getAllUsers().pipe(first()).subscribe(res => {
      this.stdArr = res.data;
    });
  }
  getSection() {
    this.SectionService.getsection().pipe(first()).subscribe(res => {
      this.secArr = res.data;
    });
  }
 
  reset() {
    this.feeForm.controls['academicYearId'].reset();
    this.feeForm.controls['sectionId'].reset();
    this.feeForm.controls['stdId'].reset();
    this.feeSubmitted=false; 
    this.enableFeeCard = false;
    this.feeForm.reset({});
    this.filtersubmit=false;
  }
  search() {
    if ((this.feeForm.value.reportType == null || this.feeForm.value.reportType == '') || (this.feeForm.value.fromDate == null || this.feeForm.value.fromDate == '') || (this.feeForm.value.toDate == null || this.feeForm.value.toDate == '') || (this.feeForm.value.counterId == null || this.feeForm.value.counterId == '') || (this.feeForm.value.paymentMode == null || this.feeForm.value.paymentMode == '')) {
      this.toastr.error("Please fill all the mandatory fields.", 'm');
      this.feeSubmitted=true;   
      return;
    }
    this.feeForm.value.fromDate = this.feeForm.value.fromDate.day + '/' + this.feeForm.value.fromDate.month + '/' + this.feeForm.value.fromDate.year;
    this.feeForm.value.toDate = this.feeForm.value.toDate.day + '/' + this.feeForm.value.toDate.month + '/' + this.feeForm.value.toDate.year;
    
    this.spinner.show();
    // $('#example').DataTable().clear().destroy();
    this.FeeCollectionService.getReport(this.feeForm.value).pipe(first()).subscribe(res => {
      this.feeObj = res.data;
      // $(document).ready(function () {
      //   $('#example').DataTable({
      //     "iDisplayLength": 30,
      //     "lengthMenu":  [10, 25, 30,50,100]

      //   });
      // });
      this.feeSubmitted=false; 
      if ((this.feeObj.responseList == null || this.feeObj.responseList == '') ) {
        this.spinner.hide();
        this.toastr.error("No fee details available.", 'Warning');
        this.enableFeeCard = false;
        return;
      }
      const docArrList = <FormArray>this.feeForm.controls['responseList'];
      docArrList.controls = [];
      for (let i = 0; i < res.data.responseList.length; i++) {
        docArrList.push(this.createfeeFormGroup());
      }
      this.feeForm.patchValue({ responseList: this.feeObj.responseList });
      this.spinner.hide();
      this.toastr.success(res.message, 'Success!');
      this.enableFeeCard = true;
    }, err => {
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
      }
      this.spinner.hide();
    });
    // this.feeForm.reset({});
  }
  apply() {
    // this.feeSubmitted=true;
    // if ((this.feeObj == null || this.feeObj == '') ) {
    //   this.toastr.error("There is no student found.", 'Warning');
    //   this.spinner.hide();
    //   return;
    // }
    this.filtersubmit=true;
    if ((this.feeForm.value.academicYearId == null || this.feeForm.value.academicYearId == '') || (this.feeForm.value.stdId == null || this.feeForm.value.stdId == '') || (this.feeForm.value.sectionId == null || this.feeForm.value.sectionId == '')) {
      this.toastr.error("Please fill all the mandatory fields.", 'Warning');
      return;
    } 
       
    //this.feeForm.value.fromDate = this.feeForm.value.fromDate.day + '/' + this.feeForm.value.fromDate.month + '/' + this.feeForm.value.fromDate.year;
    //this.feeForm.value.toDate = this.feeForm.value.toDate.day + '/' + this.feeForm.value.toDate.month + '/' + this.feeForm.value.toDate.year;
    this.feeObj.academicYearId = this.academicYearId;
    this.feeObj.sectionId = this.sectionId;
    this.feeObj.stdId = this.stdId;
    this.enableFeeCard = false;
    this.spinner.show();
    this.FeeCollectionService.filterReport(this.feeObj).pipe(first()).subscribe(res => {
      this.reportObj = res.data;
      if ((this.reportObj.responseList == null || this.reportObj.responseList == '') ) {
        this.toastr.error("No fee details available.", 'Warning');
        this.spinner.hide();
        return;
      }
      const docArrList = <FormArray>this.feeForm.controls['responseList'];
      docArrList.controls = [];
      for (let i = 0; i < this.reportObj.responseList.length; i++) {
        docArrList.push(this.createfeeFormGroup());
      }
      this.feeForm.patchValue({ responseList: this.reportObj.responseList });
      this.spinner.hide();
      this.toastr.success(res.message, 'Success!');
      this.enableFeeCard = true;
    }, err => {
      if (err.error.error.error) {
        this.toastr.error(err.error.error.error);
      }
      this.spinner.hide();
    });
  }

}

