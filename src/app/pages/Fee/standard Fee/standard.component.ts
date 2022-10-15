import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { StandardFeesAmountService } from '../standard-fees-amount.service';
import { first } from 'rxjs/operators';
import { FeesService } from '../fees.service';
import { StandardService } from '../../master/common-master/standard.service';

interface FeedCompList {
  amount: number;
  id: string;
  name: string;
}

interface FeedDtlList {
  feeId: string;
  total: number;
  feeCompList: FeedCompList[]
}

@Component({
  selector: 'app-standard',
  templateUrl: './standard.component.html',
  styleUrls: ['./standard.component.scss']
})
export class StandardComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private StandardService: StandardService,
    private StandardFeesAmountService: StandardFeesAmountService,
    private _feesService: FeesService

  ) { }

  mainForm: FormGroup;
  feesObj: any = {};
  configData;
  submitted = false;
  standardArr: any = [];
  feeArr: any = [];
  standardFeeObj: any = {};
  enableCard = false;
  enableFeeCard = false;
  totalArr: any = [];
  stdId;
  feeDtlList: FormArray;

  ngOnInit() {
    this.mainForm = this.formBuilder.group({
      feeDtlList: this.formBuilder.array(
        [this.createfeeAmountArryFormGroup()],
        [Validators.required]),
      stdId: [null, Validators.required],
    });
    this.getStandardList();
    this.getFeesList();
  }

  get f() { return this.mainForm.controls; }

  addFee() {
    this.feesObj = this.createfeeAmountArryFormGroup();
    this.feeCompoLists.push(this.feesObj);
    return true;
  }
  /**
  * To get the feeDtlList array
  */
  get feeCompoLists(): FormArray {
    return this.mainForm.get('feeDtlList') as FormArray;
  }

  /**
  * @param fees object from feeDtlList
  * To get the feeCompList array from fees
  */
  feelistComponent(fees) {
    return fees.controls.feeCompList.controls as FormArray;
  }

  /*-------for update------*/

  generateDtlList(feedDtlList: FeedDtlList) {
    return this.formBuilder.group({
      feeId: [feedDtlList.feeId, [Validators.required]],
      total: feedDtlList.total,
      enableCard: true,
      feeCompList: this.formBuilder.array(feedDtlList.feeCompList.map(feedCompList => this.generateFeedComposeList(feedCompList)))
    })
  }

  generateFeedComposeList(feedCompositList: FeedCompList) {
    return this.formBuilder.group({
      amount: [feedCompositList.amount, [Validators.required]],
      id: feedCompositList.id,
      name: feedCompositList.name
    })
  }




  /*---------------------*/

  /**
  * build first object for form group
  */
  createfeeAmountArryFormGroup() {
    return this.formBuilder.group({
      feeId: [null, [Validators.required]],
      enableCard: false,
      total: 0,
      feeCompList: this.formBuilder.array([
        this.feeListArry()])
    })

  }

  /**
  * build inner array object
  */
  feeListArry() {
    return this.formBuilder.group({
      name: [null],
      amount: [null, Validators.required],
    })
  }

  getStandardFeeList(event) {
    this.enableFeeCard = false;
    
    const feeDtlList = <FormArray>this.mainForm.controls['feeDtlList'];
    feeDtlList.controls = [];
     feeDtlList.push(this.createfeeAmountArryFormGroup());

    if (event != undefined) {
      this.mainForm.controls.feeDtlList.reset({});
      this.StandardFeesAmountService.getStandardFeeAmount(event.id).pipe(first()).subscribe(res => {
        this.mainForm = this.formBuilder.group({
          feeDtlList: this.formBuilder.array(res.data.feeDtlList.map(feeDtlList => this.generateDtlList(feeDtlList))),
          stdId: res.data.stdId
        })
        this.toastr.success(res.message, 'Success!');
      },err => {
        if (err.error.error.reason) {
          // this.enableFeeCard = false;
          this.toastr.error(err.error.error.reason);
          this.spinner.hide();
        }
      })
      this.enableFeeCard = true;
    } else {
      this.enableFeeCard = false;

    }

  }

  selectFeeComponents(event, index, fees) {
    let feeDtlList = <FormArray>this.mainForm.get('feeDtlList');
    const feeComponentList = fees.controls.feeCompList as FormArray;
    feeComponentList.controls = [];
    if (event != undefined) {
      this._feesService.getSingleFees(event.id).pipe(first()).subscribe(res => {

        feeDtlList.at(index).patchValue({ enableCard: true });
        // this.mainForm = this.formBuilder.group({
        // feeCompList: this.formBuilder.array(res.data.feesMasterComponentList.map(feeDtlList.feeCompList => this.generateFeedComposeList(feedCompList))),
        // stdId : res.data.stdId
        // })
        // feeCompList: this.formBuilder.array(feedDtlList.feeCompList.map(feedCompList =>this.generateFeedComposeList(feedCompList)))

        res.data.feesMasterComponentList.forEach(x => {
          feeComponentList.push(this.formBuilder.group(x));
        });
        let total = 0;
        feeDtlList.at(index).patchValue({ total: total });

      })
    } else {
      feeDtlList.at(index).patchValue({ enableCard: false });
      let total = 0;
      feeDtlList.at(index).patchValue({ total: total });
    }
  }

  calculate(list, index) {
    if (list.value) {
      let total = 0;
      this.totalArr = list.value.feeCompList;
      for (let i = 0; i < this.totalArr.length; i++) {
        total = total + this.totalArr[i].amount;
      }
      let feeDtlList = <FormArray>this.mainForm.get('feeDtlList');
      feeDtlList.at(index).patchValue({ total: total });
    }
  }

  deleteRow(index, fees) {
    if (fees.value.id) {
      this.feeCompoLists.removeAt(index);
      if (this.feeCompoLists.length == 0) {
        this.feesObj = this.createfeeAmountArryFormGroup();
        this.feeCompoLists.push(this.feesObj);
      }

    } else {
      if (this.feeCompoLists.length == 1) {
        this.spinner.hide();
        this.toastr.error("Can't delete the row when there is only one row", 'Warning');
        return false;
      } else {
        this.feeCompoLists.removeAt(index);
        this.spinner.hide();
        this.toastr.warning('Row deleted successfully', 'Delete row');
        return true;
      }
    }
  }

  getStandardList() {
    this.spinner.show();
    this.StandardService.getAllUsers().pipe(first()).subscribe(res => {
      this.standardArr = res.data;
      this.spinner.hide();
    }, err => {
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
      }
      this.spinner.hide();
    })
  }

  getFeesList() {
    this.spinner.show();
    this._feesService.getFees().pipe(first()).subscribe(res => {
      this.feeArr = res.data;
      this.spinner.hide();
    }, err => {
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
        this.spinner.hide();
      }
    })
  }

  submit() {
    this.submitted = true;
    console.log(this.mainForm.value);

    console.log(this.mainForm.valid);
    if (this.mainForm.invalid) {
      this.toastr.error("Please fill fee details.", 'Warning');
      return;
    }
    console.log(this.feeCompoLists.value);
    for(let item of this.feeCompoLists.value){
      for(let list of item.feeCompList){
        console.log(list);
      console.log(list.amount);
      if(list.amount==null){
        this.toastr.error("Please fill amount field.", 'Warning');
        return;
      }
    }
  }
    this.standardFeeObj.feeDtlList = this.feeCompoLists.value;
    this.StandardFeesAmountService.createFeeAmount(this.mainForm.value).pipe(first()).subscribe(async res => {
      this.enableFeeCard = false;
      this.toastr.success(res.data, 'Success!');
      this.mainForm.reset({});
      this.submitted = false;
      this.ngOnInit();
      this.getStandardList();
      this.getFeesList();
    }, err => {
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
      }
      this.spinner.hide();
    })

  }

}
