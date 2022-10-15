import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner'; 
import { first } from 'rxjs/operators';
import { AcadamicYearService } from './../../master/common-master/academic-year/acadamic-year.service';
import { StandardService } from './../../master/common-master/standard.service';
import { ExamService } from './../../master/academic_master/exam.service';
import { ManageExamService } from './../manage-exam.service';
import { environment } from 'src/environments/environment';

declare let $: any;

@Component({
  selector: 'app-manage-exam-time-table',
  templateUrl: './manage-exam-time-table.component.html',
  styleUrls: ['./manage-exam-time-table.component.scss']
})
export class ManageExamTimeTableComponent implements OnInit {

  markEntryForm: FormGroup;
  id: any ;
  academicYearId: any ;
  stdId: any ;
  examId: any ;
  enableMarkCard = false;
  academicArr: any=[];
  allotObj: any = {} ;
  Obj: any = {};
  examArr: any=[];
  standardArr: any=[];
  sectionArr: any = [];
  totalStudent:any;
  sectionObj:any={};
  examTimeSubmitted = false; 
  buttonText: string = "Submit";
  totalObj:any={};
  activeNavId:any;
  isEnabled = false;
  examTimeTableObj:any = [];
  configData:any;
  TimeArr:any = [];
  enableDownload = false;
  submitted = false;
  private _baseUrl = environment.API_URL;

  acsendingArr: any = [
    { disp: 'STUDENT NAME ASC ORDER', val: 'STUDENT_NAME_ASC_ORDER' },
    { disp: 'REG NO ASC ORDER', val: 'REG_NO_ASC_ORDER' },
    { disp: 'RANDOM', val: 'RANDOM' },
  ]

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService, 
    public AcadamicYearService:AcadamicYearService,
    public StandardService:StandardService,
    public ExamService:ExamService,
    public ManageExamService:ManageExamService,
  ) { }

   ngOnInit(): void {
    this.spinner.show();
    this.markEntryForm = this.formBuilder.group({
      academicYearId: [null, Validators.required],
      stdId: [null, Validators.required],
      examId: [null, Validators.required],
      id: [null],
      examTimeTableDtlDTO: this.formBuilder.array(
        [this.createmarkFormGroup()])
    });
    this. getAcademicYear();
     this. getStandard();
     this.getExam();
     this.getTimesList();
     this.spinner.hide();
  }

  createmarkFormGroup() {
    return this.formBuilder.group({
      startTime: [null, Validators.required],
      endTime: [null, Validators.required],
      examDate: [null, Validators.required],
      subjectName: [null, Validators.required],
      subjectId:[null],
      id: [null],
    })
    
  }

  get timeTableArr(): FormArray {
    return this.markEntryForm.get('examTimeTableDtlDTO') as FormArray;
  }
  get b() { return this.markEntryForm.controls };
 
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
      this.enableMarkCard = false;
      this.enableDownload = false;
      this.academicYearId = undefined;
    }else{
      this.academicYearId = event.id;
    }
  }  
  selectStandard(event) {
    if(event == undefined){
      this.enableMarkCard = false;
      this.enableDownload = false;
    }
    this.stdId = event.id;
  }
  selectExam(event) {
    if(event == undefined){
      this.enableMarkCard = false;
      this.enableDownload = false;
    }
    this.examId = event.id;
  }

  getTimesList() {
    this.ManageExamService.getTimes().pipe(first()).subscribe(res => {
      this.TimeArr = res.data;
    });
  }

  selectExamId(event) {
    this.examId = event.id;
    this.activeNavId = '';
      if(event == undefined){
        this.isEnabled = false;
      }else{
        this.stdId = event.id;
      }
  }
    calculate() {
      if(this.sectionObj.maxStudent > this.sectionObj.totalStudent ){
        this.toastr.error("Maximum Students should be less than Total Students.", 'Warning');
      }
    }
search(){
  this.examTimeSubmitted = true;
  this.enableMarkCard = false;
  if ( (this.markEntryForm.value.academicYearId == null ||  this.markEntryForm.value.academicYearId == '' ) || (this.markEntryForm.value.stdId == null || this.markEntryForm.value.stdId == '') || (this.markEntryForm.value.examId == null || this.markEntryForm.value.examId == '')) {
    this.toastr.error("Please fill all mandatory fields.", 'Warning');
    return;
  }
  // if(this.markEntryForm.value.academicYearId == undefined){
  //   this.toastr.error("Please fill anyone of the field.", 'Warning');
  //   return;
  // }else if(this.markEntryForm.value.stdId == undefined){
  //   this.toastr.error("Please fill anyone of the field.", 'Warning');
  //   return;
  // }
  // else if(this.markEntryForm.value.examId == undefined){
  //   this.toastr.error("Please fill anyone of the field.", 'Warning');
  //   return;
  // }
  // $('#example').DataTable().clear().destroy();
  this.ManageExamService.gettimetable(this.academicYearId, this.stdId,this.examId).pipe(first()).subscribe(res => {
    this.examTimeTableObj = res.data;
    // $(document).ready(function () {
    //   $('#example').DataTable({
    //     "iDisplayLength": 30,
    //     "lengthMenu":  [10, 25, 30,50,100]
    //   });
    // });  
    this.id = this.examTimeTableObj.id;
    for(let val of this.examTimeTableObj.examTimeTableDtlDTO){
      if(val.startTime == null){
        this.enableDownload = false;
      }else{
        this.enableDownload = true;

      }
    }
   
      if(this.examTimeTableObj.examTimeTableDtlDTO.length == 0){
        this.toastr.error("No time table found", 'Warning');
        this.enableMarkCard = false;
        this.spinner.hide();
      }else{
        let examTimeTableDtlDTO = <FormArray>this.markEntryForm.controls['examTimeTableDtlDTO'];
        examTimeTableDtlDTO.controls = [];
        for (let val of this.examTimeTableObj.examTimeTableDtlDTO) {
          if (val.examDate) {
            var examDate = val.examDate.split('/');
            let date1 = new Date(examDate[1] + '-' + examDate[0] + ' ' + examDate[2]);
            val.examDate = { year: date1.getFullYear(), month: date1.getMonth() + 1, day: date1.getDate() };
          }
          examTimeTableDtlDTO.push(this.createmarkFormGroup());
        }

        this.markEntryForm.patchValue({ examTimeTableDtlDTO: this.examTimeTableObj.examTimeTableDtlDTO });
    this.spinner.hide();
    this.toastr.success(res.message, 'Success!');
    this.enableMarkCard = true;
      }
  }, err => {
    if (err.error.error.reason) {
      this.toastr.error(err.error.error.reason);
      this.enableDownload=false;
      this.spinner.hide();
    }
    this.enableMarkCard = false;
  });
}

updateExamTimeTable(){
  this.examTimeSubmitted = true;
  this.submitted = true;
  for (var val of this.timeTableArr.value) {
    val.examDate = val.examDate.day + '/' + val.examDate.month + '/' + val.examDate.year;
    console.log(val.examDate);
  };
  if(this.markEntryForm.invalid){
    this.toastr.error("Please fill all mandatory fields.", 'Warning');
    return;
  }

  // for (var val of this.timeTableArr.value) {
  //   if(val.startTime ==  val.endTime){
  //     this.toastr.error("Start and end time cannot be same ", 'Warning');
  //     console.log(val.examDate);
  //     return;
  //   }
  // }

  
  this.markEntryForm.value.examTimeTableDtlDTO = this.timeTableArr.value;
  this.markEntryForm.value.id = this.id;
  this.ManageExamService.createtimetable(this.markEntryForm.value).pipe(first()).subscribe(res => {
    this.toastr.success(res.data, 'Success!');
    this.enableMarkCard = false;
    this.enableDownload = false;
    this.markEntryForm.reset({});
    this.examTimeSubmitted = false;
    this.submitted = false;
    this.spinner.hide();
  }, err => {
    if (err.error.error.reason) {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
    }
  });
}

downloadPDF() {
  this.spinner.show();
  this.examTimeSubmitted = true;
  if ( (this.markEntryForm.value.academicYearId == null || this.markEntryForm.value.academicYearId == '') &&(this.markEntryForm.value.stdId == null || this.markEntryForm.value.stdId == '') && (this.markEntryForm.value.examId == null || this.markEntryForm.value.examId == '')) {
    this.toastr.error("Please fill all mandatory fields.", 'Warning');
    return;
  }
  var win = window.open(this._baseUrl + 'api/exam/time/table/get/download' + '/' + this.academicYearId + '/' + this.stdId + '/' + this.examId);
  win.focus();
  this.markEntryForm.reset({});
  this.examTimeSubmitted = false;
   this.enableMarkCard = false;
   this.enableDownload = false;
  this.spinner.hide();
}

}
