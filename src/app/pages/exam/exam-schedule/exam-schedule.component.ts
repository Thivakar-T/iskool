import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { StandardService } from '../../master/common-master/standard.service';
import { YearService } from '../../master/academic_master/yearlist/year.service';
import { AcadamicYearService } from './../../master/common-master/academic-year/acadamic-year.service';
import { NgxSpinnerService } from 'ngx-spinner'; 
import { ToastrService } from 'ngx-toastr';
import { ExamService } from '../../master/academic_master/exam.service';
import { ExamScheduleService } from '../../exam/exam-schedule.service';
declare let $: any;

@Component({
  selector: 'app-exam-schedule',
  templateUrl: './exam-schedule.component.html',
  styleUrls: ['./exam-schedule.component.scss']
})

export class ExamScheduleComponent implements OnInit {
  examForm: FormGroup;
  acadamicArray: any = [];
  detail: any = [];
  yearId: any;
  examArr: any = [];
  id:any;
  academicYearId: any;
  stdId: any;
  enableCard = false;
  buttonText: string = "Submit";
  yearArr: any = [];
  scheduleSubmitted = false;
  searchSubmitted = false;
  examObj: any = {};
  examComponentList: any = [];
  examId:any;
  scheduleObj:any={};
  configData:any;
  constructor(
    private formBuilder: FormBuilder,
    private StandardService: StandardService,
    public spinner: NgxSpinnerService, 
    private examScheduleService: ExamScheduleService,
    public toastr: ToastrService,
    private examService : ExamService,
    private AcadamicYearService: AcadamicYearService,
  ) { }

  ngOnInit(): void {
    this.examForm = this.formBuilder.group({
      stdId: [null, Validators.required],
      academicYearId: [null, Validators.required],
      id:[null],
      examScheduleDtlDTOList: this.formBuilder.array(
        [this.createexamscheduleFormGroup()])
      })
  this.getAcademicYear();
  this.getStandad();
    this.exam();

  }

  get f() { return this.examForm.controls };
 
  createexamscheduleFormGroup() {
    return this.formBuilder.group({
      examId: [null, Validators.required],
      startDate: [null, Validators.required],
      exam:[''],
      endDate: [null, Validators.required],
      id:[null]
    })
  }
  addexam() {
    let order = this.createexamscheduleFormGroup();
    this.examscheduleArr.push(order);
    console.log(order);
    console.log( this.examscheduleArr);
  
  }
  get examscheduleArr(): FormArray {
    return this.examForm.get('examScheduleDtlDTOList') as FormArray;

  }

  selectModule(event){
    if(event == undefined){
      this.enableCard = false;
    }else{
    this.academicYearId = event.id;
    }
  }
  selectStdModule(event){
    if(event == undefined){
      this.enableCard = false;
    }else{
      this.stdId = event.id;
    }
  }
  selectExamModule(event){
    this.examId = event.id;
  }
 
  getAcademicYear() {
    this.AcadamicYearService.getData().pipe(first()).subscribe(res => {
     this.acadamicArray = res.data;
   });
  }
  
  getStandad() {
    this.StandardService.getAllUsers().pipe(first()).subscribe(res => {
      this.yearArr = res.data;
    });
  }
  exam(){
    this.examService.getData().pipe(first()).subscribe(res => {
      this.examArr = res.data;
    });
  }
  
  searchSubjectOffer(){
    this.searchSubmitted = true;
    if ((this.examForm.value.stdId == null || this.examForm.value.stdId == '') || (this.examForm.value.academicYearId == null || this.examForm.value.academicYearId == '')) {
      this.toastr.error("Please fill all mandatory fields.", 'Warning');
      return;
    }
    // this.examObj.startDate = this.examObj.startDate.day + '/' + this.examObj.startDate.month + '/' + this.examObj.startDate.year;
    // this.examObj.endDate = this.examObj.endDate.day + '/' + this.examObj.endDate.month + '/' + this.examObj.endDate.year;

    this.spinner.show();
    // $('#example').DataTable().clear().destroy();
    this.searchSubmitted = false;
    this.examScheduleService.getSchedule(this.stdId, this.academicYearId).pipe(first()).subscribe(async res => {
      this.examObj = res.data;
      // $(document).ready(function () {
      //   $('#example').DataTable({
      //     "iDisplayLength": 30,
      //     "lengthMenu":  [10, 25, 30,50,100]
      //   });
      // });  
      this.id = this.examObj.id;
      let docArrList = <FormArray>this.examForm.controls['examScheduleDtlDTOList'];
      docArrList.controls=[];
      if(this.examObj.examScheduleDtlDTOList.length > 0){
       
      for (let val of this.examObj.examScheduleDtlDTOList) {
        if (val.startDate) {
          var endDate = val.startDate.split('/');
          let date1 = new Date(endDate[1] + '-' + endDate[0] + ' ' + endDate[2]);
          val.startDate = { year: date1.getFullYear(), month: date1.getMonth() + 1, day: date1.getDate() };
        }
        if (val.endDate) {
          var endDate = val.endDate.split('/');
          let date1 = new Date(endDate[1] + '-' + endDate[0] + ' ' + endDate[2]);
          val.endDate = { year: date1.getFullYear(), month: date1.getMonth() + 1, day: date1.getDate() };
        }
        docArrList.push(this.createexamscheduleFormGroup());
      }
      this.examForm.patchValue({ examScheduleDtlDTOList: this.examObj.examScheduleDtlDTOList });
      }else{
        docArrList.push(this.createexamscheduleFormGroup());
      }
     
      this.enableCard = true;
      this.spinner.hide();
      this.toastr.success(res.message, 'Success!');
    }, err => {
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
        this.enableCard = false;
        this.spinner.hide();
      }
    })
}

submit(){
  this.scheduleSubmitted = true;
  for (var val of this.examscheduleArr.value) {
    val.startDate = val.startDate.day + '/' + val.startDate.month + '/' + val.startDate.year;
    val.endDate = val.endDate.day + '/' + val.endDate.month + '/' + val.endDate.year;
  };
  this.spinner.show();
  this.examForm.value.id = this.id;
  this.examScheduleService.createSchedule(this.examForm.value).pipe(first()).subscribe(res => {
    this.scheduleObj = res.data;
    this.examForm.reset({});
    this.scheduleSubmitted = false;
    this.enableCard = false;
    this.spinner.hide();
    this.toastr.success(res.data, 'Success!');
  }, err => {
    if (err.error.error.reason) {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
    }
  })

}


deleteterm(index) {
  if (this.examscheduleArr.length == 1) {
    this.toastr.error("Can't delete the row when there is only one row", 'Warning');

    return false;
  } else {
    this.examscheduleArr.removeAt(index);
    this.toastr.warning('Row deleted successfully', 'Delete row');
    return true;
  }
}

}
