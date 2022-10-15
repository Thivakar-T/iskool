import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner'; 
import { first } from 'rxjs/operators';
import { AcadamicYearService } from './../../master/common-master/academic-year/acadamic-year.service';
import { StandardService } from './../../master/common-master/standard.service';
import { ExamService } from './../../master/academic_master/exam.service';
import { ManageExamService } from './../manage-exam.service';
import { environment } from 'src/environments/environment';
import {StudentPromotionService} from './../../exam/student-promotion.service'
declare let $: any;

@Component({
  selector: 'app-student-promotion',
  templateUrl: './student-promotion.component.html',
  styleUrls: ['./student-promotion.component.scss']
})
export class StudentPromotionComponent implements OnInit {

  studentPromotionForm: FormGroup;
  academicArr: any=[];
  allotObj: any = {} ;
  Obj: any = {};
  examArr: any=[];
  standardArr: any=[];
  academicYearId:any;
  stdId:any;
  promotionObj:any;
  id: any ;
  studentPromotionSubmitted = false;
  promotionSubmitted = false;
  enablePromotionCard = false;
  isChecked=false;
  configData:any;
  constructor(
    private formBuilder: FormBuilder,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService, 
    public AcadamicYearService:AcadamicYearService,
    public StandardService:StandardService,
    public ExamService:ExamService,
    public ManageExamService:ManageExamService,
    public StudentPromotionService:StudentPromotionService,
  ) { }

  ngOnInit(): void {
    this.studentPromotionForm = this.formBuilder.group({
      newAcademicYearId: [null, Validators.required],
      newStdId: [null, Validators.required],
      academicYearId: [null, Validators.required],
      stdId: [null, Validators.required],
      id: [null],    
      studentPromotionDtlDtoList: this.formBuilder.array(
        [this.createpromotionFormGroup()])
    });
    this.getAcademicYear();
    this.getStandard();
  }

  get b() { return this.studentPromotionForm.controls };
  createpromotionFormGroup() {
    return this.formBuilder.group({
      rollNumber: [null, Validators.required],
      studentName: [null, Validators.required],
      standardName: [null, Validators.required],
      sectionName: [null, Validators.required],
      totalMark: [null],
      optainedMark: [null],
      result: [null],
      stdId: [null],
      id: [null],
      studentId:[null],
      isChecked: [null],
    })
    
  }
  get promotionArr(): FormArray {
    return this.studentPromotionForm.get('studentPromotionDtlDtoList') as FormArray;
  }
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
  getExam() {
    this.ExamService.getData().pipe(first()).subscribe(res => {
     this.examArr = res.data;
   });
  }
  selectYear(event){
    if(event == undefined){
      this.enablePromotionCard = false;
    }else{
      this.academicYearId = event.id;
    }
  }  
  selectStandard(event) {
    if(event == undefined){
      this.enablePromotionCard = false;
    }else{
      this.stdId = event.id;
    }
}
  

  checkEvent(event){
    if(event){
      this.isChecked=true;
    }
    else{
      this.isChecked=false;
    }
  }
  search(){
    this.studentPromotionSubmitted = true;
    // this.enablePromotionCard = false;

      if ((this.studentPromotionForm.value.academicYearId == null || this.studentPromotionForm.value.academicYearId == '') || (this.studentPromotionForm.value.stdId == null || this.studentPromotionForm.value.stdId == '')) {
        this.toastr.error("Please fill all mandatory fields.", 'Warning');
      return;
    }
  //  this.StudentPromotionService.getPromotion(this.academicYearId,this.stdId).pipe(first()).subscribe(async res => {
  //   this.promotionObj = res.data;
  //  });
  // $('#studentpromotion').DataTable().clear().destroy();
    this.StudentPromotionService.getPromotion(this.academicYearId,this.stdId).pipe(first()).subscribe(async res => {
      this.promotionObj = res.data;
      // $(document).ready(function () {
      //   $('#studentpromotion').DataTable({
      //     "iDisplayLength": 30,
      //     "lengthMenu":  [10, 25, 30,50,100]

      //   });
      // });
      console.log(this.promotionObj)
      this.id = this.promotionObj.id;
      const docArrList = <FormArray>this.studentPromotionForm.controls['studentPromotionDtlDtoList'];
      docArrList.controls = [];
      for (let i = 0; i < this.promotionObj.studentPromotionDtlDtoList.length; i++) {
        docArrList.push(this.createpromotionFormGroup());
      }
      this.studentPromotionForm.patchValue({ studentPromotionDtlDtoList: this.promotionObj.studentPromotionDtlDtoList });
     
      this.toastr.success(res.message, 'Success!');
      this.enablePromotionCard = true;
      this.spinner.hide();
    },
     err => {
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
        this.enablePromotionCard = false;
        this.spinner.hide();
      }
    })
  }
  
  submit(){
    this.promotionSubmitted = true;
    if(this.studentPromotionForm.value.newAcademicYearId == null && this.studentPromotionForm.value.newStdId == null){
      this.toastr.error("Please fill all mandatory fields.", 'Warning');
      return;
    }  
   
    this.spinner.show();
    this.studentPromotionForm.value.id = this.id;
    this.StudentPromotionService.createPromotion(this.studentPromotionForm.value).pipe(first()).subscribe(res => {
      this.promotionObj = res.data;
      this.studentPromotionForm.reset({});
      this.promotionSubmitted = false;
      this.enablePromotionCard = false;
      this.spinner.hide();
      this.toastr.success(res.data, 'Success!');
      this.studentPromotionSubmitted = false; 
    }, err => {
      if (err.error.error.reason) {
        this.spinner.hide();
        this.toastr.error(err.error.error.reason);
      }
    })
  
  }
}
