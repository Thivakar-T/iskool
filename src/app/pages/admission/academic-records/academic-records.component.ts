import { Component, OnInit, Input, EventEmitter, Output, OnDestroy  } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormArray,FormBuilder,Validators  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { SubjectService } from './../../master/academic_master/subject.service';
import { first } from 'rxjs/operators';
import { MetaService } from './../../meta.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AcadamicYearService } from '../../master/common-master/academic-year/acadamic-year.service';
import { StudentRegistrationService } from '../student-registration.service';


@Component({
  selector: 'app-academic-records',
  templateUrl: './academic-records.component.html',
  styleUrls: ['./academic-records.component.scss']
})
export class AcademicRecordsComponent implements OnInit {
  academicObj: any = {};
  academicForm: FormGroup;
  academicSubmitted = false;
  acadmicRecordDtlDTOList: any = [];
  subjectarr: any = [];
   buttonText:string = "";
   boardArr: any = [];
   standardArr: any = [];
   yearArr: any = [];
   id : any ;
   academicRecordObj: any = {};
   productArray: any = [];
 
   @Output('academicObj') sendData: EventEmitter<any> = new EventEmitter();
   // @Input('MyCount') academicRecordObj: any = { };
 
   constructor(
     private modalService: NgbModal,
     private formBuilder: FormBuilder, 
     public toastr: ToastrService,
     public spinner: NgxSpinnerService,
     private SubjectService : SubjectService,
     private router: Router,
     private route: ActivatedRoute,
     private metaService :  MetaService,
     private _academicYearService : AcadamicYearService,
     private _studentRegistrationService : StudentRegistrationService
 
   ) { }
 
   ngOnInit(): void {
 
     this.id = this.route.snapshot.params['id'];
 
     if(this.id){
       this.getSingleStudentInformation();
     }
 
     this.academicForm = this.formBuilder.group({
      
       stdId: [null, Validators.required],
       schoolName: [null, Validators.required],
       academicYearId: [null, Validators.required],
       rollNumber: [null, Validators.required],
       percentage: [null, Validators.required],
       boardId: [null, Validators.required],
       id:[null],
     
       acadmicRecordDtlDTOList: this.formBuilder.array(
         [this.createfeesFormGroup()])
      
     });
     this.getSubject();
     this.getBoard();
     this.getStandard();
     this.getAcademicYear();
   }
   get f() { return this.academicForm.controls };
 
 
   openWarehouse(content: any) {
     this.buttonText = "Submit";
     this.academicForm.reset({});
     this.academicObj = {};
     this.academicSubmitted = false;
     this.modalService.open(content, { size: 'lg' });
   }
 
   addterm() {
     let order = this.createfeesFormGroup();
     this.feesArr.push(order);
 
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
 
   createfeesFormGroup() {
     return this.formBuilder.group({
       subjectId: [null, [Validators.required]],
       obtainedMark: [null, [Validators.required]],
       totelMark: [null, [Validators.required]],
       id:[null]
      
     })
   }
   editDegree(values, content) {
     // this.spinner.show()
     this.buttonText = "Update"
     this.academicSubmitted = false;  
     this.academicForm.patchValue({
       stdId:  values.stdId,
       schoolName:  values.schoolName,
       academicYearId:  values.academicYearId,
       percentage: values.percentage ,
       rollNumber: values.rollNumber,
       boardId: values.boardId,
     })
     this.modalService.open(content, { size: 'lg' });
   }
 
 
   get feesArr(): FormArray {
     return this.academicForm.get('acadmicRecordDtlDTOList') as FormArray;
   }
 
    getSingleStudentInformation() {
 
     this._studentRegistrationService.getSingleStudentInformation(this.id).pipe(first()).subscribe(res => {
       this.academicObj = res.data;
       this.academicRecordObj = this.academicObj.academicRecord;
       const docArrList = <FormArray>this.academicForm.controls['acadmicRecordDtlDTOList'];
       for (let i = 0; i < this.academicRecordObj.acadmicRecordDtlDTOList.length; i++) {
         docArrList.push(this.createfeesFormGroup());
       }
       docArrList.controls.splice(0, 1); 
 
       this.academicForm.patchValue({ acadmicRecordDtlDTOList: this.academicRecordObj.acadmicRecordDtlDTOList });
 
       }); 
   
   }
 
 
   getSubject() {
     this.SubjectService.getData().pipe(first()).subscribe(res => {
         this.subjectarr = res.data;
     });
 }
 
 getBoard(){
   this.metaService.getBoard().pipe(first()).subscribe(res => {
     this.boardArr  = res.data;
   });
 }
 getStandard(){
   this.metaService.getStd().pipe(first()).subscribe(res => {
     this.standardArr  = res.data;
   });
 }
 getAcademicYear(){
   this._academicYearService.getData().pipe(first()).subscribe(res => {
     this.yearArr  = res.data;
   });
 }
  
 dismiss(modal ,taptype) {
   this.academicSubmitted = true;
   if(this.academicForm.invalid){
     return;
   }
   if(this.id){
     this.spinner.show();
     this.academicRecordObj.acadmicRecordDtlDTOList = this.feesArr.value;
     this._studentRegistrationService.updateRegistration(this.id ,taptype ,this.academicObj).pipe(first()).subscribe(res => {
       modal.dismiss('Cross click')
       this.spinner.hide();
     },err =>{
       if(err.error.error.message){
       this.toastr.error(err.error.error.message);
       }
       modal.dismiss('Cross click')
       this.spinner.hide();
     })
   }else{
 
     this.academicObj =  this.academicForm.value;
     
     this.sendData.emit(this.academicObj);
     modal.dismiss('Cross click')
   }
 }
 calculate() {
   if (this.feesArr.value) {
     for (let val of this.feesArr.value) {
       if (val.obtainedMark > val.totelMark) {
         this.toastr.error("Obtained Mark is too high", 'Warning');
         return false;
       }
     }
       }
   
   }
 }
 
 
 