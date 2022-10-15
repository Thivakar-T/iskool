import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { SearchStudentService } from '../search-student.service';
import { StandardService } from './../../master/common-master/standard.service';
import { AcadamicYearService } from './../../master/common-master/academic-year/acadamic-year.service';
import { SectionService } from './../../master/common-master/section/section.service';
import { AcademicRecordService } from '../academic-record.service';
import { Routes, RouterModule } from '@angular/router';

declare let $: any;

@Component({
  selector: 'app-studentacademic-record',
  templateUrl: './studentacademic-record.component.html',
  styleUrls: ['./studentacademic-record.component.scss']
})
export class StudentacademicRecordComponent implements OnInit {
  enableCard = false;
  id: any;
  sectionId:any;
  StandardId: any;
  studentAcademicRecordform: FormGroup
  studentObj: any = {};
  studentSubmitted = false;
  buttonText: string = "";
  standardArr: any = [];
  studentArr: any = [];
  searchStudentArr: any = [];
  sectionArr: any = [];
  acadamicArray: any[];
  registrationNumber: number;
  name: string;
  SectionName: string;
  academicYearId: number;
  stdId: number;
  
  get b() { return this.studentAcademicRecordform.controls };

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService,
    private _SearchStudentService: SearchStudentService,
    private _StandardServive: StandardService,
    private AcadamicYearService: AcadamicYearService,
    private _sectionService: SectionService,
    private AcademicRecordService: AcademicRecordService,

  ) { }

  ngOnInit(): void {
    this.studentAcademicRecordform = this.formBuilder.group({
      studentName: [null, Validators.required],
      stdId: [null, Validators.required],
      registrationNumber: [null, Validators.required],
      sectionId: [null, Validators.required],
      academicYearId: [null, Validators.required],
    })
    this.getStandard();
    this.getAcademicYear();
    this.getsection();
  }
  getStandard() {
    this._StandardServive.getAllUsers().pipe(first()).subscribe(res => {
      this.standardArr = res.data;
    });
  }
  getAcademicYear() {
    this.AcadamicYearService.getData().pipe(first()).subscribe(res => {
      this.acadamicArray = res.data;
    });
  }
  getsection() {
    this._sectionService.getsection().pipe(first()).subscribe(res => {
      this.sectionArr = res.data;
    });
  }
  SearchByRegNo(event) {
    if (event == undefined || event == '') {
      this.enableCard = false;
    }
    this.studentAcademicRecordform.patchValue({
      studentName: null,
      stdId: null,
      academicYearId: null,
      sectionId: null,
    })
    this.studentAcademicRecordform.controls['studentName'].reset();
    this.studentAcademicRecordform.controls['academicYearId'].reset();
    this.studentAcademicRecordform.controls['sectionId'].reset();
    this.studentAcademicRecordform.controls['stdId'].reset();
    this.studentSubmitted = false;
  }
  /**Search student academic record use by name
   * when use name other fields to be reset
   */
  SearchByName(event) {
    if (event == undefined || event == '') {
      this.enableCard = false;
    }
    this.studentAcademicRecordform.patchValue({
      rollNregistrationNumberumber: null,
      stdId: null,
      academicYearId: null,
      sectionId: null,
    })
    this.studentAcademicRecordform.controls['registrationNumber'].reset();
    this.studentAcademicRecordform.controls['academicYearId'].reset();
    this.studentAcademicRecordform.controls['sectionId'].reset();
    this.studentAcademicRecordform.controls['stdId'].reset();
    this.studentSubmitted = false;
  }

  academicYearIdonlyshow() {
    this.studentAcademicRecordform.patchValue({
      rollNregistrationNumberumber: null,
      // stdId: null, 
      studentName: null,
      // SectionName: null,     
    })
    this.studentAcademicRecordform.controls['registrationNumber'].reset();
    this.studentAcademicRecordform.controls['studentName'].reset();
    // this.studentAcademicRecordform.controls['SectionName'].reset();
    // this.studentAcademicRecordform.controls['stdId'].reset();
    this.studentSubmitted = false;
  };
  SelectSectionModule(event){
    if(event == undefined){
      this.enableCard = false;
    }else{
    this.sectionId = event.id;
    }
  }
  stdonlyshow() {
    this.studentAcademicRecordform.patchValue({
      rollNregistrationNumberumber: null,
      // academicYearId: null, 
      studentName: null,
      // SectionName: null,     
    })
    this.studentAcademicRecordform.controls['registrationNumber'].reset();
    this.studentAcademicRecordform.controls['studentName'].reset();
    // this.studentAcademicRecordform.controls['SectionName'].reset();
    // this.studentAcademicRecordform.controls['academicYearId'].reset();
    this.studentSubmitted = false;
  };
  selectStandardModule(event){
    if(event == undefined){
      this.enableCard = false;
    }else{
    this.stdId = event.id;
    }
  }

  Sectiononlyshow() {
    this.studentAcademicRecordform.patchValue({
      rollNregistrationNumberumber: null,
      // stdId: null, 
      studentName: null,
      // academicYearId: null,     
    })
    this.studentAcademicRecordform.controls['registrationNumber'].reset();
    this.studentAcademicRecordform.controls['studentName'].reset();
    // this.studentAcademicRecordform.controls['academicYearId'].reset();
    // this.studentAcademicRecordform.controls['stdId'].reset();
    this.studentSubmitted = false;
  };
  SelectYearModule(event){
    if(event == undefined){
      this.enableCard = false;
    }else{
    this.academicYearId = event.id;
    }
  }
  SearchStudent(event) {
    if ((this.studentAcademicRecordform.value.studentName == null || this.studentAcademicRecordform.value.studentName == '') && (this.studentAcademicRecordform.value.registrationNumber == null || this.studentAcademicRecordform.value.registrationNumber == '') &&
      (this.studentAcademicRecordform.value.stdId == null || this.studentAcademicRecordform.value.stdId == '') && (this.studentAcademicRecordform.value.sectionId == null || this.studentAcademicRecordform.value.sectionId == '')) {
      this.studentSubmitted = true;
      this.toastr.error("Please fill all mandatory fields.", 'Warning');
      return;
    }
    this.enableCard = false;
    if (event.id == undefined) {
      this.spinner.show();
      $('#student').DataTable().clear().destroy();
      this.AcademicRecordService.updatestudent(this.studentAcademicRecordform.value).pipe(first()).subscribe(async res => {
        this.searchStudentArr = res.data;
        $(document).ready(function () {
          $('#student').DataTable({
            "iDisplayLength": 30,
            "lengthMenu": [10, 25, 30, 50, 100]

          });
        });
        if (this.searchStudentArr == '') {
          this.toastr.error("No student found", 'Warning');
          this.enableCard = false;
          this.spinner.hide();
        }
        else {
          this.enableCard = true;
          this.toastr.success(res.message, 'Success!');
          this.spinner.hide();
        }
      }, err => {
        this.spinner.show();
        if (err.error.error.reason) {
          this.toastr.error(err.error.error.reason);
        }
        this.spinner.hide();
      })
    } else {
      this.enableCard = false;
    }

  }

}
