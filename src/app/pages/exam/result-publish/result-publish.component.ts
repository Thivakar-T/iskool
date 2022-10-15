import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs/operators';
import { AcadamicYearService } from './../../master/common-master/academic-year/acadamic-year.service';
import { StandardService } from './../../master/common-master/standard.service';
import { ExamService } from './../../master/academic_master/exam.service';
import { ResultPublishService } from '../../exam/result-publish.service';
import { environment } from 'src/environments/environment';
declare let $: any;

@Component({
  selector: 'app-result-publish',
  templateUrl: './result-publish.component.html',
  styleUrls: ['./result-publish.component.scss']
})
export class ResultPublishComponent implements OnInit {

  resultForm: FormGroup;
  id: any;
  academicYearId: any;
  stdId: any;
  examId: any;
  enableresultCard = false;
  academicArr: any = [];
  examArr: any = []
  standardArr: any = [];
  sectionArr: any = [];
  totalStudent: any;
  resultObj: any = [];
  resultSubmitted = false;
  buttonText: string = "Publish";
  Obj: any;
  configData;
  studentMarkObj: any = {};
  publish: any;
  readOnly = false;
  markSubmitted = false;
  private _baseUrl = environment.API_URL;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService,
    public AcadamicYearService: AcadamicYearService,
    public StandardService: StandardService,
    public ExamService: ExamService,
    public resultPublishService: ResultPublishService
  ) { }

  ngOnInit(): void {
    this.resultForm = this.formBuilder.group({
      academicYearId: [null, Validators.required],
      stdId: [null, Validators.required],
      examId: [null, Validators.required],
      studentId: [null],
      studentDtlArr: this.formBuilder.array(
        [this.createStudentMarkArrFormGroup()]),
    })

    this.getAcademicYear();
    this.getStandard();
    this.getExam();
    this.spinner.hide();
  }
  get b() { return this.resultForm.controls };

  createStudentMarkArrFormGroup() {
    return this.formBuilder.group({
      rollNumber: [null],
      standardName: [null],
      name: [null],
      sectionName: [null],
      totalMark: [null],
      optainedMark: [null],
      percentage: [null],
      studentMarkList: this.formBuilder.array([this.createexamscheduleFormGroup()])
    })
  }

  createexamscheduleFormGroup() {
    return this.formBuilder.group({
      markEntryDtlId: [null],
      practicalOptaindeMark: [null],
      practicalTotalMark: [null],
      subjectName: [null],
      theroryOptaindeMark: [null],
      theroryTotalMark: [null],
      optainedMark: 0,
      subjectType: [null]
    })
  }

  studentDtlArr(): FormArray {
    return this.resultForm.get('studentDtlArr') as FormArray;
  }

  studentMarkList(empIndex: number): FormArray {
    return this.studentDtlArr().at(empIndex).get("studentMarkList") as FormArray
  }

  getAcademicYear() {
    this.spinner.show();
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
  selectYear(event) {
    if (event) {
      this.enableresultCard = false;
    } else if (event == undefined) {
      this.enableresultCard = false;
    }
    this.academicYearId = event.id;
  }
  selectStandard(event) {
    if (event) {
      this.enableresultCard = false;
    } else if (event == undefined) {
      this.enableresultCard = false;
    }
    this.stdId = event.id;
  }
  selectExam(event) {
    if (event) {
      this.enableresultCard = false;
    } else if (event == undefined) {
      this.enableresultCard = false;
    }
    this.examId = event.id;

  }
  search() {
    this.resultSubmitted = true;
    if ((this.resultForm.value.examId == null || this.resultForm.value.examId == '') || (this.resultForm.value.stdId == null || this.resultForm.value.stdId == '') || (this.resultForm.value.academicYearId == null || this.resultForm.value.academicYearId == '')) {
      this.toastr.error("Please fill all mandatory fields.", 'Warning');
      return;
    }
    // $('#result').DataTable().clear().destroy();
    this.resultPublishService.getResult(this.examId, this.academicYearId, this.stdId).pipe(first()).subscribe(async res => {
      this.resultObj = res.data.resultPublishList;
      this.publish = res.data.isPublished;
      if(this.publish){
        this.readOnly = false;
      }else{
        this.readOnly = true;
      }
      this.id = this.resultObj.id;
      // $(document).ready(function () {
      //   $('#result').DataTable({
      //     "iDisplayLength": 30,
      //     "lengthMenu":  [10, 25, 30,50,100]

      //   });
      // });
      if (this.resultObj.length == 0) {
        this.toastr.success(res.message, 'Success!');
        this.enableresultCard = false;
      } else {
        const mappingList = <FormArray>this.resultForm.controls['studentDtlArr'];
        mappingList.controls = [];
        for (let i = 0; i < this.resultObj.length; i++) {
          mappingList.push(this.createStudentMarkArrFormGroup());
          const mappingDTLList = this.studentDtlArr().at(i).get("studentMarkList") as FormArray
          mappingDTLList.controls = [];
          for (let j = 0; j < this.resultObj[i].studentMarkList.length; j++) {
            mappingDTLList.push(this.createexamscheduleFormGroup());
          }
        }
        this.resultForm.patchValue({ studentDtlArr: this.resultObj });
        this.toastr.success(res.message, 'Success!');
        this.enableresultCard = true;
      }
      this.spinner.hide();
    }, err => {
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
        this.enableresultCard = false;
        this.spinner.hide();
      }
    })

  }

  updateStudentMark(modal, index) {
    this.markSubmitted = true;
    this.resultSubmitted = true;
    let feeDtlList = <FormArray>this.resultForm.get('studentDtlArr');

    // let studentMarkList = this.studentDtlArr().at(index).get("studentMarkList") as FormArray;
    // for (let i = 0; i < studentMarkList.controls.length; i++) {
    //   const control = (<FormArray>((<FormArray>this.resultForm.get("studentDtlArr")).at(index).get("studentMarkList"))).at(i) as FormGroup;
    //   if(control.get("subjectType").value === "Theory"){
    //     control.removeControl('practicalOptaindeMark');
    //   }
    // }

    if (this.resultForm.invalid) {
      return;
    }

    this.resultPublishService.updateResult(feeDtlList.value[index]).pipe(first()).subscribe(async res => {
      this.toastr.success(res.data, 'Success!');
      modal.dismiss('Cross click');
      setTimeout(() => {
        console.log('hide');
        this.search();
      }, 3000);
      // for (let i = 0; i < studentMarkList.controls.length; i++) {
      //   const control = (<FormArray>((<FormArray>this.resultForm.get("studentDtlArr")).at(index).get("studentMarkList"))).at(i) as FormGroup;
      //   if(control.get("subjectType").value === "Theory"){
      //     control.addControl('practicalOptaindeMark', this.formBuilder.control(null, Validators.required));
      //   }
      // }

      this.spinner.hide();
    }, err => {
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
        this.spinner.hide();
      }
    })
  }

  openModal(content: any, obj) {
    this.studentMarkObj = obj.value;
    this.spinner.hide();
    this.buttonText = "Submit";
    this.resultSubmitted = false;
    this.modalService.open(content, { size: 'lg' });
  }

  resultPublish() {
    this.resultSubmitted = true;
    if ((this.resultForm.value.examId == null || this.resultForm.value.examId == '') || (this.resultForm.value.stdId == null || this.resultForm.value.stdId == '') || (this.resultForm.value.academicYearId == null || this.resultForm.value.academicYearId == '')) {
      this.toastr.error("Please fill all mandatory fields.", 'Warning');
      return;
    }
    this.resultPublishService.publishTheResult(this.examId, this.academicYearId, this.stdId, this.resultForm.value).pipe(first()).subscribe(async res => {
      this.spinner.hide();
      this.toastr.success(res.data, 'Success!');
      this.resultForm.reset({});
      this.resultSubmitted = false;
      this.markSubmitted = false;
      this.enableresultCard = false;
    }, err => {
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
        this.spinner.hide();
      }
    })
  }

}
