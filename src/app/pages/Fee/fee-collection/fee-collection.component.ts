import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs/operators';
import { FeeCollectionService } from './../fee-collection.service';
// import { StandardService } from './../../master/common-master/standard.service';
import { MetaService } from '../../meta.service';
import { CommonModule } from '@angular/common';
import { FeeCollectionCounterService } from './../../master/common-master/fee-collection-counter.service';
import { invalid } from '@angular/compiler/src/render3/view/util';

declare let $: any;

@Component({
  selector: 'app-fee-collection',
  templateUrl: './fee-collection.component.html',
  styleUrls: ['./fee-collection.component.scss']
})
export class FeeCollectionComponent implements OnInit {
  feeCollectionForm: FormGroup;
  feeForm: FormGroup;
  feeSubmitted = false;
  id: any;
  stdId: any;
  regNo: any;
  enableCard = false;
  feeObj: any = {};
  feeArray: any = [];
  feeListArr: any = [];
  standardArr: any = [];
  sectionArr: any = [];
  feeCollectionObj: any = {};
  counterArr: any = [];
  paymentObj: any;
  enableFeeCard: any = false;
  isddSelected = false;
  ischallenSelected = false;
  isbankSelected = false;
  isbranchSelected = false;
  showOnlyForDD = false;
  showOnlyChallan = false;
  pay: any;
  feesObj: any;
  feeRequestObj: any = {};
  configData;
  regNoSubmitted = false;
  paymentArr: any = [
    { disp: 'CASH', val: 'CASH' },
    { disp: 'CARD', val: 'CARD' },
    { disp: 'DD', val: 'DD' },
    { disp: 'CHALLAN', val: 'CHALLAN' },
  ]
  payIndex: any;

  constructor(
    private formBuilder: FormBuilder,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService,
    // public StandardService: StandardService,
    public FeeCollectionService: FeeCollectionService,
    private _metaService: MetaService,
    private feeCollectionCounterService: FeeCollectionCounterService
  ) { }

  ngOnInit(): void {
    this.showOnlyForDD = true;
    this.showOnlyChallan = true;
    this.feeCollectionForm = this.formBuilder.group({
      registrationNo: [null, Validators.required],
      // standard: [null, Validators.required],
      feeDtlList: this.formBuilder.array(
        [this.createfeesFormGroup()])
    });
    // this.getStandard();
    this.getSection();
    this.getCounter();

  }

  feeDtlList(): FormArray {
    return this.feeCollectionForm.get("feeDtlList") as FormArray
  }

  feeList(empIndex: number): FormArray {
    return this.feeDtlList().at(empIndex).get("feeList") as FormArray
  }

  get f() { return this.feeCollectionForm.controls };

  get b() { return this.feeCollectionForm.controls };

  createfeesFormGroup() {
    return this.formBuilder.group({
      ddno: [null],
      challenNo: [null],
      counterId: [null, Validators.required],
      receiptDate: [null, Validators.required],
      receiptNo: [null, Validators.required],
      payingAmount: [null, Validators.required],
      paymentMode: [null, Validators.required],
      bankName: [null],
      branchName: [null],
      stuId: [null],
      academicStdFeeComponetId: [null],
      academicStdFeeComponetName: [null],
      amount: [null],
      paid: [null],
      amountToPaid: [null],
      paidAmount: [null],
      payableAmount: [null],
      academicStdFeeId: [null],
      academicYearId: [null],
      sectionId: [null],
      stdId: [null],
      enableFeeCard:false,
      feeList: this.formBuilder.array([this.createTimingAllotment()])

    })
  }
  createTimingAllotment(): FormGroup {
    return this.formBuilder.group({
      amount: [null],
      feename: [null],
      id: [null]
    })
  }
  // getStandard() {
  //   this.StandardService.getAllUsers().pipe(first()).subscribe(res => {
  //     this.standardArr = res.data;
  //     console.log(this.standardArr);
  //   });
  // }
  getSection() {
    this._metaService.getSection().pipe(first()).subscribe(res => {
      this.sectionArr = res.data;
    });
  }
  getCounter() {
    this.feeCollectionCounterService.getFee().pipe(first()).subscribe(res => {
      this.counterArr = res.data;
    });
  }
  // selectStandard(event) {
  //   this.stdId = event.id;
  // }
  selectRegisterNo(event) {
    console.log(this.feeObj.registrationNo);
    if(this.feeObj.registrationNo == '' || this.feeObj.registrationNo == null){
      this.enableCard = false;
    }
    this.regNo = this.feeObj.registrationNo;
  }
  search() {
    this.regNoSubmitted = true;
    if ( (this.feeCollectionForm.value.registrationNo == null || this.feeCollectionForm.value.registrationNo == '') && (this.feeCollectionForm.value.registrationNo == undefined)) {
       this.toastr.error("Please fill anyone of the field.", 'Warning');
      return;
    }
    else {
      this.spinner.show();
      this.FeeCollectionService.getRegNo(this.regNo).pipe(first()).subscribe(res => {
        this.feeCollectionObj = res.data;
        const mappingList = <FormArray>this.feeCollectionForm.controls['feeDtlList'];
        mappingList.controls = [];
        for (let i = 0; i < this.feeCollectionObj.feeDtlList.length; i++) {
          mappingList.push(this.createfeesFormGroup());
          const mappingDTLList = this.feeDtlList().at(i).get("feeList") as FormArray
          mappingDTLList.controls = [];
          for (let j = 0; j < this.feeCollectionObj.feeDtlList[i].feeList.length; j++) {
            mappingDTLList.push(this.createTimingAllotment());
          }
        }
        this.feeCollectionForm.patchValue({ feeDtlList: this.feeCollectionObj.feeDtlList });
        this.enableCard = true;

        this.spinner.hide();
        this.toastr.success(res.message, 'Success!');
      }, err => {
        if (err.error.error.reason) {
          this.toastr.error(err.error.error.reason);
        }
        this.spinner.hide();
      })
    }
  }

  selectInput(event) {
    let selected = event.val;
    if (selected == "CARD") {
      this.showOnlyForDD = false;
      this.showOnlyChallan = false;
    } else if (selected == "CASH") {
      this.showOnlyForDD = false;
      this.showOnlyChallan = false;
    } else if (selected == "DD") {
      this.showOnlyForDD = true;
      this.showOnlyChallan = false;
    } else if (selected == "CHALLAN") {
      this.showOnlyChallan = true;
      this.showOnlyForDD = false;

    }
  }

  payCheck(index) {
    this.payIndex = index
    let feeDtlList = <FormArray>this.feeCollectionForm.get('feeDtlList');
    this.FeeCollectionService.getRegNo(this.regNo).pipe(first()).subscribe(res => {
      this.feeCollectionObj = res.data;
      for (let item of this.feeCollectionObj.feeDtlList) {
        this.pay = item.payButton;
        if (this.pay == true) {
          feeDtlList.at(index).patchValue({ enableFeeCard: true });
        }
       
      }
      for (let item of this.feeCollectionObj.feeDtlList) {
        this.pay = item.payButton;
        if(this.pay == false){
          this.toastr.error("There is no fees available for the Student.", 'Warning');
        }
      }
      for (let item of this.feeCollectionObj.feeDtlList) {
        this.feeRequestObj.stuId = item.stuId;
        this.feeRequestObj.academicStdFeeComponetId = item.academicStdFeeComponetId;
        this.feeRequestObj.academicStdFeeId = item.academicStdFeeId;
        this.feeRequestObj.academicYearId = item.academicYearId;
        this.feeRequestObj.sectionId = item.sectionId;
        this.feeRequestObj.stdId = item.stdId;
      }
    })
  }
  calculate() {
    for (let item of this.feeCollectionObj.feeDtlList) {
      if (item.payableAmount < this.feeRequestObj.payingAmount) {
        this.toastr.error("ReceiptAmount should be less than Amount to paid.", 'Warning');
      }
    }
  }

  feePay(index) {
     this.feeSubmitted=true;
     let feeDtlList = <FormArray>this.feeCollectionForm.get('feeDtlList');
    
    console.log(this.feeCollectionForm.value.paymentMode)
    if (this.feeCollectionForm.value.paymentMode === "DD") {
      this.showOnlyForDD = true;
      this.showOnlyChallan = false;
     this.feeCollectionForm.addControl('ddno', this.formBuilder.control('', [Validators.required]));
      this.feeCollectionForm.removeControl('challenNo');
      this.feeCollectionForm.removeControl('bankName');
      this.feeCollectionForm.removeControl('branchName');
      // this.feeCollectionForm.value.challenNo = null;
      // this.feeCollectionForm.value.bankName = null;
      // this.feeCollectionForm.value.branchName = null;
    } 
    // else if (this.feeCollectionForm.value.paymentMode === "CHALLAN") {
    //   this.showOnlyForDD = false;
    //   this.showOnlyChallan = true;
    //   // this.feeCollectionForm.value.ddno = null;
    //   this.feeCollectionForm.addControl('challenNo', this.formBuilder.control('', [Validators.required]));
    //  this.feeCollectionForm.addControl('bankName', this.formBuilder.control('', [Validators.required]));
    //   this.feeCollectionForm.addControl('branchName', this.formBuilder.control('', [Validators.required]));
    //   this.feeCollectionForm.removeControl('ddno');    
    // } 
    // else if (this.feeCollectionForm.value.paymentMode === "CASH") {
    //   this.showOnlyForDD = false;
    //   this.showOnlyChallan = false;
    //   // this.feeCollectionForm.value.ddno = null;
    //   // this.feeCollectionForm.value.challenNo = null;
    //   // this.feeCollectionForm.value.bankName = null;
    //   // this.feeCollectionForm.value.branchName = null;
    //   this.feeCollectionForm.removeControl('ddno');
    //   this.feeCollectionForm.removeControl('challenNo');
    //   this.feeCollectionForm.removeControl('bankName');
    //   this.feeCollectionForm.removeControl('branchName');
    // } 
    // else if (this.feeCollectionForm.value.paymentMode == 'CARD') {
    //   this.showOnlyForDD = false;
    //   this.showOnlyChallan = false;
    //   // this.feeCollectionForm.value.ddno = null;
    //   // this.feeCollectionForm.value.challenNo = null;
    //   // this.feeCollectionForm.value.bankName = null;
    //   // this.feeCollectionForm.value.branchName = null;
    //   this.feeCollectionForm.removeControl('ddno');
    //   this.feeCollectionForm.removeControl('challenNo');
    //   this.feeCollectionForm.removeControl('bankName');
    //   this.feeCollectionForm.removeControl('branchName');
    // }
    // if(this.feeCollectionForm.invalid){
    //   this.toastr.error("Please fill all mandatory fields", 'Warning');
    //   this.feeSubmitted=true;
    //   return; 
    // }  

      feeDtlList.value[index].receiptDate =  feeDtlList.value[index].receiptDate.day + '/' +  feeDtlList.value[index].receiptDate.month + '/' +  feeDtlList.value[index].receiptDate.year;
        this.FeeCollectionService.createFee(feeDtlList.value[index]).pipe(first()).subscribe(res => {
      // this.feesObj = res.data;
      this.enableCard = false;
      this.toastr.success(res.data, 'Success!');
      this.feeSubmitted=false;
      this.feeCollectionForm.reset({});
      this.regNoSubmitted = false;
      this.spinner.hide();
    }, err => {
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
      }
      this.spinner.hide();
    })
    //  this.feeCollectionForm.addControl('challenNo', this.formBuilder.control('', [Validators.required]));
    //   this.feeCollectionForm.addControl('bankName', this.formBuilder.control('', [Validators.required]));
    //   this.feeCollectionForm.addControl('branchName', this.formBuilder.control('', [Validators.required]));
    //  this.feeCollectionForm.addControl('ddno', this.formBuilder.control('', [Validators.required]));
    }
}
