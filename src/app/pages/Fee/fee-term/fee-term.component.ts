import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray,FormBuilder,Validators  } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FeesService } from './../fees.service';
import { Router, ActivatedRoute } from '@angular/router';
declare let $: any;


@Component({
  selector: 'app-fee-term',
  templateUrl: './fee-term.component.html',
  styleUrls: ['./fee-term.component.scss']
})
export class FeeTermComponent implements OnInit {
  feesObj: any = {};
  feesForm: FormGroup;
  feesSubmitted = false;
  id:any;
  buttonText:string = "";
  feesMasterComponentList: any = [];
  feeId: any;
  configData;

  constructor(
    private formBuilder: FormBuilder, 
    private modalService: NgbModal,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute,
    private _feesService: FeesService,

  ) {
    // this.feesObj.feesMasterComponentList = [];
   }
   ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.buttonText = "Update";
      this.getSingleId();
    }
    else {
      this.buttonText = "Save";
    }
    this.feesForm = this.formBuilder.group({

      feesName: [null, Validators.required],
      description: [''],
      feesMasterComponentList: this.formBuilder.array(
        [this.createfeesFormGroup()])
    })



  }
  

  addterm() {
    let order = this.createfeesFormGroup();
    this.feesArr.push(order);

  }

  
  createfeesFormGroup() {
    return this.formBuilder.group({
      name: [null, [Validators.required]],
      description: [''],
      id:[null]
    })
  }

  get f() { return this.feesForm.controls };

  
  get feesArr(): FormArray {
    return this.feesForm.get('feesMasterComponentList') as FormArray;

  }

  submit(){
    this.feesSubmitted = true;
    if( this.feesForm .invalid){
     return;
    }
      this.feesObj.feesMasterComponentList = this.feesArr.value;
    if (this.feesObj.id) {
      this.spinner.show();
      this._feesService.updateFees(this.feesObj).subscribe(res => {
        this.spinner.hide();
        this.router.navigate(['finance/fee-list']);
        this.toastr.success(res.data, 'Success!');
      }, err => {
        if (err.error.error.reason) {
          this.spinner.hide();
          this.toastr.error(err.error.error.reason);
        }
      })
    }
    else {
      this.spinner.show();
      this._feesService.createFee(this.feesObj).pipe(first()).subscribe(res => {
       this.toastr.success(res.data, 'Success!');
        this.router.navigate(['finance/fee-list']);
        this.spinner.hide();
      }, err => {
        if (err.error.error.reason) {
        this.spinner.hide();
          this.toastr.error(err.error.error.reason);
        }
      })
    }
    
  }

  
  getSingleId() {
    this.spinner.show();
    this._feesService.getSingleFees(this.id).pipe(first()).subscribe(res => {
      this.feesObj = res.data;


      const docArrList = <FormArray>this.feesForm.controls['feesMasterComponentList'];
      for (let i = 0; i < this.feesObj.feesMasterComponentList.length; i++) {
        docArrList.push(this.createfeesFormGroup());
      }
      docArrList.controls.splice(0, 1); 

      this.feesForm.patchValue({ feesMasterComponentList: this.feesObj.feesMasterComponentList });

      this.spinner.hide();
      this.toastr.success(res.message, 'Success!');
    }, err => {
      if (err.error.error.reason) {
        this.spinner.hide();
        this.toastr.error(err.error.error.reason);
      }
    })
  }
  
  deleteterm(index) {
    if (this.feesArr.length == 1) {
      this.toastr.error("Can't delete the row when there is only one row", 'Warning');

      return false;
    } else {
      this.feesArr.removeAt(index);
      this.toastr.warning('Row deleted successfully', 'Delete row');
      return true;
    }
  }




}
