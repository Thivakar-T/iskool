import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner'; 
import { first } from 'rxjs/operators';
import {SectionAllotmentService} from './../section-allotment.service';
import { AcadamicYearService } from './../../master/common-master/academic-year/acadamic-year.service';
import { StandardService } from './../../master/common-master/standard.service';
import { MetaService } from '../../meta.service';
declare let $: any;
@Component({
  selector: 'app-section-allotment',
  templateUrl: './section-allotment.component.html',
  styleUrls: ['./section-allotment.component.scss']  
})
export class SectionAllotmentComponent implements OnInit {
  sectionAllotForm: FormGroup;
  sectionForm: FormGroup;
  id: any ;
  yearId: any ;
  stdId: any ;
  enableCard = false;
  sectionAllotment = false; 
  academicArr: any=[];
  allotObj: any = {} ;
  standardArr: any=[];
  sectionArr: any = [];
  totalStudent:any;
  sectionObj:any={};
  sectionSubmitted = false;
  totalObj:any={};
  activeNavId:any;
  isEnabled = false;
  configData;
  
  acsendingArr: any = [
    { disp: 'STUDENT NAME ASC ORDER', val: 'STUDENT_NAME_ASC_ORDER' },
    { disp: 'REG NO ASC ORDER', val: 'REG_NO_ASC_ORDER' },
    { disp: 'RANDOM', val: 'RANDOM' },
  ]
  
  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private SectionAllotmentService : SectionAllotmentService,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService, 
    public AcadamicYearService:AcadamicYearService,
    public StandardService:StandardService,
    private _metaService : MetaService
  ) { }

  ngOnInit(): void {
    this.sectionAllotForm = this.formBuilder.group({
      academicYear: [null, Validators.required],
      standard: [null, Validators.required],
      responseList: this.formBuilder.array(
        [this.createfeesFormGroup()])
    });
    this.sectionForm = this.formBuilder.group({
      maxStudent: [null, Validators.required],
      sortType: [null, Validators.required],
      responseList: this.formBuilder.array(
        [this.createsectionFormGroup()])
    })
    this. getAcademicYear();
     this. getStandard();
     this.getSection();
    
  }

  createfeesFormGroup() {
    return this.formBuilder.group({
      name: [null, Validators.required],
      regNo: [null, Validators.required],
      sectionId: [null, Validators.required],
      id: [null],
    })
    
  }

  createsectionFormGroup() {
    return this.formBuilder.group({
      maxStudent: [null, Validators.required],
      sortType: [null, Validators.required]
 });
}

  get rollArr(): FormArray {
    return this.sectionAllotForm.get('responseList') as FormArray;
  }
  get b() { return this.sectionAllotForm.controls };
  get f() { return this.sectionForm.controls };

  getAcademicYear() {
    this.AcadamicYearService.getData().pipe(first()).subscribe(res => {
     this.academicArr = res.data;
   });
  }
  getStandard() {
    this.StandardService.getAllUsers().pipe(first()).subscribe(res => {
     this.standardArr = res.data;
   });
  }

  getSection() {
    this._metaService.getSection().pipe(first()).subscribe(res => {
     this.sectionArr = res.data;
   });
  }
  selectYear(event){
    this.yearId = event.id;
    this.stdId = event.id;
    this.activeNavId = '';
      if(event == undefined){
        this.isEnabled = false;
      }else{
        this.yearId = event.id;
      }
  }
  
  selectStandard(event) {
    this.stdId = event.id;
    this.activeNavId = '';
      if(event == undefined){
        this.isEnabled = false;
      }else{
        this.stdId = event.id;
      }
  }

  openSection(content: any) {
    if ((this.sectionAllotForm.value.academicYear == null || this.sectionAllotForm.value.academicYear == '') || (this.sectionAllotForm.value.standard == null || this.sectionAllotForm.value.standard == '')) {
      this.toastr.error("Please fill all mandatory fields.", 'Warning');
      this.sectionAllotment = true;
      return;
    }
    this.spinner.show();
    this.sectionObj = {};
    this.sectionForm.reset({});
    this.sectionAllotment = false;
    this.sectionSubmitted = false;
    this.enableCard  = false;
      this.SectionAllotmentService.getSingleAllotment(this.yearId ,this.stdId).pipe(first()).subscribe(res => {
        this.sectionObj = res.data;
        if(this.sectionObj.responseList=='' || this.sectionObj.responseList== null){
          this.toastr.error(res.data);
        }
        else{
          this.modalService.open(content, { size: 'md' });
        this.spinner.hide();
      this.toastr.success(res.message, 'Success!');
        }
        this.spinner.hide();
    }, err => {
      if (err.error.error.reason) {
        this.spinner.hide();
        this.toastr.error(err.error.error.reason);
      }
    })

    }

    calculate() {
      if(this.sectionObj.maxStudent > this.sectionObj.totalStudent ){
        this.toastr.error("Maximum Students should be less than Total Students.", 'Warning');
        return;
      }
    }

  submit(modal){
    
  if ((this.sectionForm.value.maxStudent == null || this.sectionForm.value.maxStudent == '') || (this.sectionForm.value.sortType == null || this.sectionForm.value.sortType == '')) {
   this.sectionSubmitted = true;
    this.toastr.error("Please fill all mandatory fields.", 'Warning');    
    return;
  }
  if(this.sectionObj.maxStudent > this.sectionObj.totalStudent ){
    this.toastr.error("Maximum Students should be less than Total Students.", 'Warning');
    return;
  }
  this.spinner.show();
  // $('#sectionallotment').DataTable().clear().destroy();
  this.SectionAllotmentService.createAllotment( this.sectionObj).pipe(first()).subscribe(res => {
    modal.dismiss('Cross click');
      this.allotObj = res.data;
      // $(document).ready(function () {
      //   $('#sectionallotment').DataTable({
      //     "iDisplayLength": 30,
      //     "lengthMenu":  [10, 25, 30,50,100]
      //   });
      // });    
      const docArrList = <FormArray>this.sectionAllotForm.controls['responseList'];
      docArrList.controls=[];
      for (let i = 0; i < this.allotObj.responseList.length; i++) {
        docArrList.push(this.createfeesFormGroup());
      }
     
      this.sectionAllotForm.patchValue({ responseList: this.allotObj.responseList });
      this.enableCard  = true;
      this.spinner.hide();
      this.toastr.success(res.message, 'Success!');
    }, err => {
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
      }
      this.spinner.hide();
    })
  }

  allowNow(){
    this.spinner.show();
    this.SectionAllotmentService.updateAllotment(this.sectionAllotForm.value).pipe(first()).subscribe(res => {
      this.spinner.hide();
      this.toastr.success(res.data, 'Success!');      
      this.sectionAllotForm.reset({});
      this.enableCard  = false;
    }, err => {
      if (err.error.error.reason) {
        this.spinner.hide();
        this.toastr.error(err.error.error.reason);
      }
    })
  
  }

}
