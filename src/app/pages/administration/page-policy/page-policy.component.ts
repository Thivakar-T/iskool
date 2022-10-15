import { Component, OnInit } from '@angular/core';
import { ModuleService } from './../../module.service'
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-page-policy',
  templateUrl: './page-policy.component.html',
  styleUrls: ['./page-policy.component.scss']
})
export class PagePolicyComponent implements OnInit {

  modulePageForm: FormGroup;
  moduleArr: any = [];
  userId: any;
  modulePageArr: any = [];
  policyArr: any = [];
  policySubmitted = false;
  moduleMasterPage: any = [];
  moduleObj: any = {};
  enableCard = false;
  pageId: any;

  constructor(
    private moduleService: ModuleService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    public toastr: ToastrService,


  ) { }

  ngOnInit(): void {
    this.modulePageForm = this.formBuilder.group({
      module: [null, Validators.required],
      page: [null, Validators.required],
      pagePolicyList: this.formBuilder.array(
        [this.createModulePageFormGroup()],
        [Validators.required]),

    });
    this.getModule();
  }

  get f() { return this.modulePageForm.controls };

  get moduleMasterPageArr(): FormArray {
    return this.modulePageForm.get('pagePolicyList') as FormArray;
  }
  get g() { return this.modulePageForm.controls.pageActionMaster as FormGroup };

  createModulePageFormGroup() {
    return this.formBuilder.group({
      isChecked: [''],
    })
  }

  createPurchaseOrder() {
    this.policySubmitted = true;
    if (this.modulePageForm.invalid) {
      return;
    }
    for (let list of this.moduleMasterPageArr.value) {
      this.pageId = list.pageId
    }
    this.pageId;
    this.spinner.show();
    this.moduleService.updateMasterPagePolicyModule(this.pageId, this.modulePageForm.value).pipe(first()).subscribe(res => {
      this.toastr.success(res.data, 'Success!');
      this.spinner.hide();
    }), err => {
      if (err.error.error.reason) {
        this.spinner.hide();
      }

    }
  }
  getModule() {
    this.moduleService.getModule().pipe(first()).subscribe(res => {
      this.moduleArr = res.data;
    })
  }
  selectModule(event) {
    this.moduleService.getPageModule(event.id).pipe(first()).subscribe(res => {
      this.modulePageArr = res.data;

    })

  }

  selectPageModule(event) {
    this.spinner.show();
    const purchaseOrderArrList = this.modulePageForm.controls.pagePolicyList as FormArray;
    purchaseOrderArrList.controls = [];
    this.moduleService.getMasterPageModule(event.id).pipe(first()).subscribe(res => {
      this.moduleMasterPage = res.data;
      this.moduleMasterPage.forEach(x => {
        purchaseOrderArrList.push(this.formBuilder.group(x));
      });

      this.selectValue(event);
      this.spinner.hide();
    })
  }

  selectValue(event) {
    if (event == undefined) {
      this.enableCard = false;
    } else {
      this.spinner.show();
      this.enableCard = true;
      this.spinner.hide();
    }
  }
}