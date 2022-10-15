import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner'; 
import { first } from 'rxjs/operators';
import { AcadamicYearService } from './../../master/common-master/academic-year/acadamic-year.service';
import { StandardService } from './../../master/common-master/standard.service';
import { MetaService } from '../../meta.service';
import { ExamService } from '../../master/academic_master/exam.service';
import { StudentMarkEntryService } from '../../exam/student-mark-entry.service';
declare let $: any;
@Component({
  selector: 'app-student-mark-entry',
  templateUrl: './student-mark-entry.component.html',
  styleUrls: ['./student-mark-entry.component.scss']
})
export class StudentMarkEntryComponent implements OnInit {

  markEntryForm: FormGroup;
  id: any ;
  examId:any;
  academicYearId: any ;
  stdId: any ;
  sectionId:any;
  enableMarkCard = false;
  sectionAllotment = false; 
  practicalSubmitted = false;
  theorySubmitted = false;
  examArr:any;
  markEntryArr:any;
  academicArr: any=[];
  subjectArr:any;
  allotObj: any = {} ;
  standardArr: any=[];
  sectionArr: any = [];
  totalStudent:any;
  sectionObj:any={};
  totalObj:any={};
  activeNavId:any;
  isEnabled = false;
  isChecked=false;
  entryObj:any={};
  markObj:any={};
  subjectOfferArr:any;
  subjectObj:any = {};
  subjectOfferingDtlId:any;
  configData;
  constructor(private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService, 
    public AcadamicYearService:AcadamicYearService,
    public StandardService:StandardService,
    public examService:ExamService,
    public studentMarkEntryService:StudentMarkEntryService,
    private _metaService : MetaService) { }

  ngOnInit(): void {
    this.markEntryForm = this.formBuilder.group({
      id: [null],
      examId: [null, Validators.required],
      academicYearId: [null, Validators.required],
      standardId: [null, Validators.required],
      subjectOfferingDtlId: [null, Validators.required],
      sectionId: [null, Validators.required],
      subjectType:[null],
      markEntryDtlDtoList: this.formBuilder.array(
        [this.createmarkFormGroup()])
    });
    this.getExam()
    this. getAcademicYear();
     this. getStandard();
     this.getSection();
  }
  createmarkFormGroup() {
    return this.formBuilder.group({
      rollNumber: [null, Validators.required],
      studentName: [null, Validators.required],
      standardName: [null, Validators.required],
      sectionName: [null, Validators.required],
      maxPracticalMark: [null, Validators.required],
      practicalMark: [null, Validators.required],
      maxTheoryMark: [null, Validators.required],
      theoryMark: [null, Validators.required],
      id: [null],
      studentId:[null],
      isChecked: [null],
      subjectType:[null]

    })
    
  }

  get markArr(): FormArray {
    return this.markEntryForm.get('markEntryDtlDtoList') as FormArray;
  }
  get b() { return this.markEntryForm.controls };
 
  getAcademicYear() {
    this.AcadamicYearService.getData().pipe(first()).subscribe(res => {
     this.academicArr = res.data;
   });
  }
  getExam() {
    this.examService.getData().pipe(first()).subscribe(res => {
     this.examArr = res.data;
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
    this.activeNavId = '';
      if(event == undefined){
        this.enableMarkCard = false;
      }else{
        this.academicYearId = event.id;
      }
  }
  
  selectExam(event){
    if(event == undefined){
      this.enableMarkCard = false;
    }else{
      this.examId = event.id;
    }
}
  selectStandard(event) {
      if(event == undefined){
        this.enableMarkCard = false;
      }else{
        this.stdId = event.id;
      }
      this.studentMarkEntryService.getSubOffering(this.academicYearId, event.id, this.examId).pipe(first()).subscribe(res => {
        this.subjectOfferArr = res.data;
      })
     
  }


  selectSubject(event){
      if(event == undefined){
        this.enableMarkCard = false;
      }else{
        this.subjectObj = event;
        this.subjectOfferingDtlId = event.subjectOfferingDtlId;
      }
  }

  selectSection(event){
      if(event == undefined){
        this.enableMarkCard = false;
      }else{
        this.sectionId = event.id;
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

    // calculate() {
    //   if (this.markArr.value) {
    //     this.markEntryArr = this.markArr.value;
    //     for (let i = 0; i < this.markEntryArr.length; i++) {
    //       const subObj = this.markEntryArr[i];
  
    //       let practicalMark = (this.markEntryArr[i].practicalMark);
    //       let maxPracticalMark = (this.markEntryArr[i].maxPracticalMark);
    //       let theoryMark = (this.markEntryArr[i].theoryMark);
    //       let maxTheoryMark = (this.markEntryArr[i].maxTheoryMark);
    //       if (maxPracticalMark < practicalMark) {
    //         this.toastr.error("Practical Minimum Mark is too high", 'Warning');
    //         return false;
    //       }     
    //       if (maxTheoryMark < theoryMark) {
    //         this.toastr.error("Theory Minimum Marks is too high", 'Warning');
    //         return false;
    //       }
    //     }
    //   }
    // }


search(){
  this.sectionAllotment = true; 
  if ((this.markEntryForm.value.examId == null || this.markEntryForm.value.examId == '') || (this.markEntryForm.value.academicYearId == null || this.markEntryForm.value.academicYearId == '') || (this.markEntryForm.value.standardId == null || this.markEntryForm.value.standardId == '') || (this.markEntryForm.value.subjectOfferingDtlId == null || this.markEntryForm.value.subjectOfferingDtlId == '') || (this.markEntryForm.value.sectionId == null || this.markEntryForm.value.sectionId == '')) {
    this.toastr.error("Please fill all mandatory fields.", 'Warning');
    return;
  }
  this.spinner.show();
  // $('#markentry').DataTable().clear().destroy();
    this.entryObj = {};
   
    this.studentMarkEntryService.getEntry(this.academicYearId,this.stdId, this.sectionId, this.subjectOfferingDtlId, this.examId).pipe(first()).subscribe(async res => {
      this.entryObj = res.data;
      // $(document).ready(function () {
      //   $('#markentry').DataTable({
      //     "iDisplayLength": 30,
      //     "lengthMenu":  [10, 25, 30,50,100]
      //   });
      // });  
      if( this.entryObj .length ==0 ){
        this.enableMarkCard = false;

      }
      this.id = this.entryObj.id;
      const docArrList = <FormArray>this.markEntryForm.controls['markEntryDtlDtoList'];
      docArrList.controls = [];
      if(this.entryObj.markEntryDtlDtoList.length > 0){
      for (let i = 0; i < this.entryObj.markEntryDtlDtoList.length; i++) {
        docArrList.push(this.createmarkFormGroup());
      }
      this.markEntryForm.patchValue({ markEntryDtlDtoList: this.entryObj.markEntryDtlDtoList });
    }else{
      docArrList.push(this.createmarkFormGroup());
    }
      this.toastr.success(res.message, 'Success!');
      this.enableMarkCard = true;
      this.spinner.hide();
    }, err => {
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
        this.enableMarkCard = false;
        this.spinner.hide();
      }
    })
}
submit(){
  this.sectionAllotment = true;
  // this.practicalSubmitted = true;
  // this.theorySubmitted = true;
  this.spinner.show();
  this.markEntryForm.value.id = this.id;
  this.studentMarkEntryService.createEntry(this.markEntryForm.value).pipe(first()).subscribe(res => {
    this.markObj = res.data;
    this.markEntryForm.reset({});
    this.sectionAllotment = false;
    this.enableMarkCard = false;
    this.spinner.hide();
    this.toastr.success(res.data, 'Success!');
  }, err => {
    if (err.error.error.reason) {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
    }
  })
}

}

