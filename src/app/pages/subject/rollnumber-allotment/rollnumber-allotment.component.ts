import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { RollnumberAllotmentService } from '../rollnumber-allotment.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AcadamicYearService } from './../../master/common-master/academic-year/acadamic-year.service';
import { StandardService } from './../../master/common-master/standard.service';
import { SectionService } from './../../master/common-master/section/section.service';

declare let $: any;

@Component({
  selector: 'app-rollnumber-allotment',
  templateUrl: './rollnumber-allotment.component.html',
  styleUrls: ['./rollnumber-allotment.component.scss']
})
export class RollnumberAllotmentComponent implements OnInit {
  rollNumberAllotmentObj: any = {};
  rollNumberObj: any = {};
  rollForm: FormGroup;
  rollArray: any = [];
  yearArr: any = [];
  rollNumArr: any = [];
  stdArr: any = [];
  secArr: any = [];
  enableFeeCard = false;
  rollSubmitted = false;
  applySubmitted=false;
  feeSubmitted = false;
  academicyearId;
  standardId;
  sectionId;
  acadamicArray: any = [];
  configData;

  acsendingArr: any = [
    { disp: 'STUDENT NAME ASC ORDER', val: 'STUDENT_NAME_ASC_ORDER' },
    { disp: 'REG NO ASC ORDER', val: 'REG_NO_ASC_ORDER' },
    { disp: 'MALE TO FEMALE ASC', val: 'MALE_TO_FEMALE_ASC' },
    { disp: 'FEMALE TO MALE ASC', val: 'FEMALE_TO_MALE_ASC' },
  ]

  constructor(private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    public spinner: NgxSpinnerService,
    private rollService: RollnumberAllotmentService,
    private AcadamicYearService: AcadamicYearService,
    private StandardService: StandardService,
    private SectionService: SectionService
  ) { }

  ngOnInit(): void {
    this.rollForm = this.formBuilder.group({
      academicyearId: [null, Validators.required],
      standardId: [null, Validators.required],
      sectionId: [null, Validators.required],
      sortType: [null, Validators.required],
      prefix: [null, Validators.required],
      index: [null, Validators.required],
      responseList: this.formBuilder.array(
        [this.createfeesFormGroup()])
    })
    this.getAcademicYear();
    this.getStandard();
    this.getSection();
  }
  get f() { return this.rollForm.controls };
  addterm() {
    let order = this.createfeesFormGroup();
    this.rollArr.push(order);

  }
  get rollArr(): FormArray {
    return this.rollForm.get('responseList') as FormArray;
  }
  createfeesFormGroup() {
    return this.formBuilder.group({
      newRollNumber: [null, Validators.required],
      oldRollNumber: [null, Validators.required],
      regNo: [null, Validators.required],
      stuName: [null, Validators.required],
      id: [null]
    })
  }

  submit() {
    this.feeSubmitted = false;
    this.applySubmitted = false;
    for(let item of this.rollArr.value){
    
        console.log(item.newRollNumber)
        if (item.newRollNumber == null ||item.newRollNumber == '')  {
          this.toastr.error("Please give new roll number.", 'Warning');
          return;
      
    }
  }
    this.spinner.show();
    this.rollService.update(this.rollForm.value).pipe(first()).subscribe(res => {
      this.rollNumberAllotmentObj = res.data;
      this.spinner.hide();
      this.enableFeeCard = false ;
      this.rollForm.reset({});
      this.toastr.success(res.data, 'Success!');
    }, err => {
      if (err.error.error.error) {
        this.toastr.error(err.error.error.error);
      }
      this.spinner.hide();
    });

  }


  select(event) {
    this.academicyearId = event.id;
  }
  selectModule(event) {
    this.standardId = event.id;
  }
  getCountry(event) {
    this.sectionId = event.id;
  }
  reset() {
   // this.rollForm.controls['academicYearId'].reset();
    this.feeSubmitted=false; 
    this.applySubmitted = false;
    this.rollNumArr = [];
    this.enableFeeCard = false;
  }

  search() {
    this.feeSubmitted = true;
    if ((this.rollForm.value.sectionId == null || this.rollForm.value.sectionId == '') && (this.rollForm.value.standard == null || this.rollForm.value.standard == '') && (this.rollForm.value.stdId == null || this.rollForm.value.stdId == '')) {
      this.toastr.error("Please fill all mandatory fields.", 'Warning');
      return;
    }
    this.spinner.show();
    // $('#roll').DataTable().clear().destroy();
    this.rollService.get(this.academicyearId, this.standardId, this.sectionId).pipe(first()).subscribe(res => {
      this.rollNumberObj = res.data;
      // $(document).ready(function () {
      //   $('#roll').DataTable({
      //     "iDisplayLength": 30,
      //     "lengthMenu":  [10, 25, 30,50,100]
      //   });
      // });  
      if(this.rollNumberObj.responseList=='' || this.rollNumberObj.responseList== null){
        this.spinner.hide();
        this.toastr.error(res.data);
        this.enableFeeCard = false;
        return;
      }
      else{
      const docArrList = <FormArray>this.rollForm.controls['responseList'];
      docArrList.controls = [];
      for (let i = 0; i < this.rollNumberObj.responseList.length; i++) {
        docArrList.push(this.createfeesFormGroup());
      }
      this.rollForm.patchValue({ responseList: this.rollNumberObj.responseList });
     
      this.toastr.success(res.message, 'Success!');
      this.enableFeeCard = true;
    } this.spinner.hide();
    }
    , err => {
      if (err.error.error.error) {
        this.toastr.error(err.error.error.error);
      }
      this.spinner.hide();
    });
  }

  apply() {
    if(this.rollNumberObj =='' || this.rollNumberObj == null){
      this.toastr.error("There is no student found.");
      this.spinner.hide();
      return;
    }
    this.applySubmitted = true;
    if ((this.rollForm.value.sortType == null || this.rollForm.value.sortType == '') || (this.rollForm.value.index == null || this.rollForm.value.index == '') || (this.rollForm.value.prefix == null || this.rollForm.value.prefix == '')) {
      this.toastr.error("Please fill all the mandatory fields.", 'Warning');
      return;
    } 
    this.enableFeeCard = false;
    this.spinner.show();
    this.rollService.updateNewRollNumber(this.rollForm.value).pipe(first()).subscribe(res => {
      this.rollNumberAllotmentObj = res.data;
      const docArrList = <FormArray>this.rollForm.controls['responseList'];
      docArrList.controls = [];
      for (let i = 0; i < res.data.responseList.length; i++) {
        docArrList.push(this.createfeesFormGroup());
      }
      this.rollForm.patchValue({ responseList: this.rollNumberAllotmentObj.responseList });
      this.spinner.hide();
      // this.toastr.success(res.message, 'Success!');
      this.enableFeeCard = true;
    }, err => {
      if (err.error.error.error) {
        this.toastr.error(err.error.error.error);
      }
      this.spinner.hide();
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

}
