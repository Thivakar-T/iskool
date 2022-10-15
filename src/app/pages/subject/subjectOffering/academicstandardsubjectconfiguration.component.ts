
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router'
import { StandardService } from '../../master/common-master/standard.service';
import { YearService } from '../../master/academic_master/yearlist/year.service';
import { SubjectService } from '../../../pages/master/academic_master/subject.service';
import { AcademicstandardsubjectconfigurationService } from '../academicstandardsubjectconfiguration.service'
declare let $: any;
@Component({
  selector: 'app-academicstandardsubjectconfiguration',
  templateUrl: './academicstandardsubjectconfiguration.component.html',
  styleUrls: ['./academicstandardsubjectconfiguration.component.scss']
})
export class AcademicstandardsubjectconfigurationComponent implements OnInit {
  subjectOfferDtlList: any = [];
  standardArr: any = [];
  sectionArr: any = [];
  buttonText: string = "";
  yearArr: any = [];
  configData;
  dayArr: any = [];
  FacultyArr: any = [];
  TimeArr: any = [];
  timeObj: any = {};
  enableCard = false;
  subjectOfferForm: FormGroup;
  subjectForm:FormGroup;
  subjectOfferObj: any = {};
  subjectObj: any = {};
  subjectSubmitted = false;
  subjectTimeSubmitted = false;
  subjectArrList: any = [];
  subArray: any = [];
  roomArr: any = [];
  yearId: any;
  stdId: any;
  id: any;
  showObj: any = {};
  nestedArrayObj: any = {};
  startTimeVar : any;
  endTimeVar : any;
  searchSubmitted = false;
  constructor(
    public toastr: ToastrService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private StandardService: StandardService,
    private _yearService: YearService,
    private SubjectService: SubjectService,
    private _AcademicStdSubConfiService: AcademicstandardsubjectconfigurationService,
  ) {
    this.subjectObj.subjectOfferDtlList = [];
  } 

  ngOnInit(): void {
      // this.spinner.show();
      // this.spinnerShow();
      // this.spinner.hide();
      this.subjectOfferForm = this.formBuilder.group({
      standardId: [null, [Validators.required]],
      yearId: [null, [Validators.required]],

    })
    this.subjectForm = this.formBuilder.group({
      subjectOfferDtlList: this.formBuilder.array(
        [this.createsubjectFormGroup()]),
      facultyMappingList: this.formBuilder.array([this.createFaculty()]),
    })
    
    this.getStandard();
    this.getyear();
    this.getSubjectList();
    this.getDaysList();
    this.getSectionList();
    this.getClassRooms();
    this.getFacultysList();
    this.getTimesList();

    //console.log(this.subjectObj.value.subjectType);
    
  }
// spinnerShow()
// {
//   console.log('show spinner')
// }


  createsubjectFormGroup() {
    return this.formBuilder.group({
      subjectId: [null, [Validators.required]],
      practicalMin: [null],
      practicalMax: [null],
      theoryMin: [null],
      theoryMax: [null],
      totalMarks: [null],
      id: [null],
      subjectType:[null]

    })
  }
  createFaculty(): FormGroup {
    return this.formBuilder.group({
      subjectId: [null, [Validators.required]],
      sectionId: [null, [Validators.required]],
      facultyId: [null, [Validators.required]],
      roomId: [null, [Validators.required]],
      id: [null],
      facultyName: [null],
      subjectName: [null],
      sectionName: [null],
      roomName: [null],
      facultyMappingDTLList: this.formBuilder.array([this.createTimingAllotment()])
    })
  }
  createTimingAllotment(): FormGroup {
    return this.formBuilder.group({
      dayId: [null, [Validators.required]],
      startTime: [null, [Validators.required]],
      endTime: [null, [Validators.required]],
      id: [null]
    })
  }
  get f() { return this.subjectOfferForm.controls };
  get b() { return this.subjectOfferForm.controls };

  addTime(content, obj) {
    this.timeObj = obj;
    this.spinner.show();
    this.buttonText = "Update"
  if(this.timeObj.value.id !== null){
    this.showObj.facultyName = this.timeObj.value.facultyName;
    this.showObj.subjectName = this.timeObj.value.subjectName;
    this.showObj.sectionName = this.timeObj.value.sectionName;
    this.showObj.roomName = this.timeObj.value.roomName;
  }else{
    this.showObj.subjectName = this.nestedArrayObj.subjectName;
    this.showObj.sectionName = this.nestedArrayObj.sectionName;
    this.showObj.facultyName = this.nestedArrayObj.facultyName;
    this.showObj.roomName = this.nestedArrayObj.roomName;
 
  }
    // obj.controls.facultyMappingDTLList.reset({});
    this.subjectSubmitted = false;
    this.modalService.open(content, { size: 'lg' });
    this.spinner.hide();
    this.getDaysList();
  }

  selectSubject(event){
 this.nestedArrayObj.subjectName = event.name ;
  }
  selectSection(event){
    this.nestedArrayObj.sectionName = event.name ;
  }
  selectFaculty(event){
    this.nestedArrayObj.facultyName = event.name ;
  }
  selectRoom(event){
    this.nestedArrayObj.roomName = event.name ;
  }
  selectSubjectType(event,i,subjectObj){
    
    if(event){
      this.subjectArr.at(i).get('practicalMax').reset();
   this.subjectArr.at(i).get('practicalMin').reset();
   this.subjectArr.at(i).get('theoryMax').reset();
   this.subjectArr.at(i).get('theoryMin').reset();
   this.subjectArr.at(i).get('totalMarks').reset();
    }else if(event == undefined){
      this.subjectArr.at(i).get('practicalMax').reset();
      this.subjectArr.at(i).get('practicalMin').reset();
      this.subjectArr.at(i).get('theoryMax').reset();
      this.subjectArr.at(i).get('theoryMin').reset();
      this.subjectArr.at(i).get('totalMarks').reset();

    }
    console.log(i);
    if(event.subjectType  ==  "Theory"){
   this.subjectArr.at(i).get('practicalMax').disable();
   this.subjectArr.at(i).get('practicalMin').disable();
   this.subjectArr.at(i).get('theoryMax').enable();
   this.subjectArr.at(i).get('theoryMin').enable();
  //  if (event.subjectType =='Theory' && (this.subjectArr.at(i).get('theoryMax') == null || this.subjectArr.at(i).get('theoryMin') == null)) {
  //   this.toastr.error("Theory mark should be filled", 'Warning');
  //   return false;
  // } 
    }else if(event.subjectType  ==  "Practical"){
      this.subjectArr.at(i).get('practicalMax').enable();
      this.subjectArr.at(i).get('practicalMin').enable();
      this.subjectArr.at(i).get('theoryMax').disable();
      this.subjectArr.at(i).get('theoryMin').disable();
      // if (event.subjectType =='Practical' && (this.subjectArr.at(i).get('practicalMax') == null || this.subjectArr.at(i).get('practicalMin') == null)) {
      //   this.toastr.error("Practical mark should be filled", 'Warning');
      //   return false;
      // } 
    }else if(event.subjectType  ==  "Theory_and_Practical"){
      this.subjectArr.at(i).get('practicalMax').enable();
      this.subjectArr.at(i).get('practicalMin').enable();
      this.subjectArr.at(i).get('theoryMax').enable();
      this.subjectArr.at(i).get('theoryMin').enable();
    }
    console.log( subjectObj.value)
    subjectObj.value={}
    console.log( subjectObj.value)
    // this.subjectArr.controls=[]
  }

  addSubject() {
    let order = this.createsubjectFormGroup();
    this.subjectArr.push(order);

  }
  get subjectArr(): FormArray {
    return this.subjectForm.get('subjectOfferDtlList') as FormArray;
  }

  facultyMappingList(): FormArray {
    return this.subjectForm.get("facultyMappingList") as FormArray
  }


  addFaculty() {
    this.facultyMappingList().push(this.createFaculty());
  }

  facultyMappingDTLList(empIndex: number): FormArray {
    return this.facultyMappingList().at(empIndex).get("facultyMappingDTLList") as FormArray
  }



  addFaucultyTime(empIndex: number) {
    this.facultyMappingDTLList(empIndex).push(this.createTimingAllotment());
  }


  deleteFaculty(empIndex) {
    if (this.facultyMappingList().length == 1) {
      this.toastr.error("Can't delete the row when there is only one row", 'Warning');
      return false;
    } else {
      this.facultyMappingList().removeAt(empIndex);
      this.toastr.warning('Row deleted successfully', 'Delete row');
      return true;
    }
  }


  // deleteTimeRow(facultyIndex:number,i:number) {
  //     this.addNewTimes(facultyIndex).removeAt(i);
  //   }

  deleteTimeRow(facultyIndex: number, i: number) {
    if (i) {
      this.facultyMappingDTLList(facultyIndex).removeAt(i);
      if (this.facultyMappingDTLList(facultyIndex).length == 0) {
        let timeObj = this.createTimingAllotment();
        this.facultyMappingDTLList(facultyIndex).push(timeObj);
      }

    } else {
      if (this.facultyMappingDTLList(facultyIndex).length == 1) {
        this.spinner.hide();
        this.toastr.error("Can't delete the row when there is only one row", 'Warning');
        return false;
      } else {
        this.facultyMappingDTLList(facultyIndex).removeAt(i);
        this.spinner.hide();
        this.toastr.warning('Row deleted successfully', 'Delete row');
        return true;
      }
    }
  }

  deleteterm(index) {
    if (this.subjectArr.length == 1) {
      this.toastr.error("Can't delete the row when there is only one row", 'Warning');
      return false;
    } else {
      this.subjectArr.removeAt(index);
      this.toastr.warning('Row deleted successfully', 'Delete row');
      return true;
    }
  }

  submit(modal) {
    this.subjectTimeSubmitted = true;
    for(let item of this.facultyMappingList().value){
      for(let list of item.facultyMappingDTLList){
        if ((list.dayId == null ||list.dayId == '') || (list.startTime == null || list.startTime == '') || (list.endTime == null || list.endTime == '')) {
          this.toastr.error("Please fill all mandatory fields.", 'Warning');
          return;
      }
    }
  }
    this.subjectSubmitted = true;
    modal.dismiss('Cross click'); 
  }
  getYearId(event) {
    if (event == undefined) {
      this.enableCard = false;
    }
    this.yearId = event.id;
  }
  getStdId(event) {
    if (event == undefined) {
      this.enableCard = false;
    }
    this.stdId = event.id;
  }

  searchSubjectOffer() {
    this.enableCard = false;
    this.searchSubmitted = true;
    if(this.subjectOfferForm.invalid){
      this.toastr.error("Please fill all mandatory fields.", 'Warning');
      return;
    }
    // if ((this.subjectOfferForm.value.yearId == null || this.subjectOfferForm.value.yearId == '') || (this.subjectOfferForm.value.standardId == null || this.subjectOfferForm.value.standardId == '')) {
    //   this.toastr.error("Please fill all mandatory fields.", 'Warning');
    //   return;
    // }
    let subjectOfferDtlList = <FormArray>this.subjectForm.controls['subjectOfferDtlList'];
    subjectOfferDtlList.controls = [];
      subjectOfferDtlList.push(this.createsubjectFormGroup());
    
    let mappingList = <FormArray>this.subjectForm.controls['facultyMappingList'];
    mappingList.controls = [];
    mappingList.push(this.createFaculty());
    // for (let i = 0; i < mappingList.length; i++) {
    //   let mappingDTLList = this.facultyMappingList().at(i).get("facultyMappingDTLList") as FormArray
    //   mappingDTLList.controls = [];
    //   for (let j = 0; j < mappingDTLList[i].facultyMappingDTLList.length; j++) {
    //     mappingDTLList.push(this.createTimingAllotment());
    //   }
    // }
     this.spinner.show();
    this.subjectOfferObj = {};
    this.subjectForm.reset({});
    this.subjectSubmitted = false;
    this._AcademicStdSubConfiService.searchSubOffer(this.yearId, this.stdId).pipe(first()).subscribe(async res => {
      this.subjectOfferObj = res.data;
      this.id = this.subjectOfferObj.id;
      if (this.subjectOfferObj.id !== null) {
        //   for (let i = 0; i < this.subjectOfferObj.subjectOfferDtlList.length; i++) {
        //     for (let item of this.subjectOfferObj.subjectOfferDtlList) {
        //   if(item.subjectType  ==  "Theory"){
        //     this.subjectArr.at(i).get('practicalMax').disable();
        //     this.subjectArr.at(i).get('practicalMin').disable();
        //     this.subjectArr.at(i).get('theoryMax').enable();
        //     this.subjectArr.at(i).get('theoryMin').enable();
        //      }else if(item.subjectType  ==  "Practical"){
        //        this.subjectArr.at(i).get('practicalMax').enable();
        //        this.subjectArr.at(i).get('practicalMin').enable();
        //        this.subjectArr.at(i).get('theoryMax').disable();
        //        this.subjectArr.at(i).get('theoryMin').disable();
        //      }
        //      if(item.subjectType  ==  "Theory_and_Practical"){
        //        this.subjectArr.at(i).get('practicalMin').enable();
        //        this.subjectArr.at(i).get('theoryMax').enable();
        //        this.subjectArr.at(i).get('theoryMin').enable();
        //      }
        // }
        //   }
        const subjectOfferDtlList = <FormArray>this.subjectForm.controls['subjectOfferDtlList'];
        for (let i = 1; i < this.subjectOfferObj.subjectOfferDtlList.length; i++) {
          subjectOfferDtlList.push(this.createsubjectFormGroup());
        }
        this.subjectForm.patchValue({ subjectOfferDtlList: this.subjectOfferObj.subjectOfferDtlList });

        const mappingList = <FormArray>this.subjectForm.controls['facultyMappingList'];
        mappingList.controls = [];
        for (let i = 0; i < this.subjectOfferObj.facultyMappingList.length; i++) {
          mappingList.push(this.createFaculty());
          const mappingDTLList = this.facultyMappingList().at(i).get("facultyMappingDTLList") as FormArray
          mappingDTLList.controls = [];
          for (let j = 0; j < this.subjectOfferObj.facultyMappingList[i].facultyMappingDTLList.length; j++) {
            mappingDTLList.push(this.createTimingAllotment());
          }
        }
        this.subjectForm.patchValue({ facultyMappingList: this.subjectOfferObj.facultyMappingList });
        this.spinner.hide();
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

  copyAcademicYear() {
    this.spinner.show();
    this._AcademicStdSubConfiService.updateAcademicSub(this.subjectOfferObj).pipe(first()).subscribe(async res => {
      this.subjectOfferObj = res.data;
      this.subjectOfferForm.patchValue({
        yearId: this.subjectOfferObj.yearId,
        standardId: this.subjectOfferObj.standardId
      })

      const subjectOfferDtlList = <FormArray>this.subjectForm.controls['subjectOfferDtlList'];
      subjectOfferDtlList.controls = [];
        for (let i = 0; i < this.subjectOfferObj.subjectOfferDtlList.length; i++) {
          subjectOfferDtlList.push(this.createsubjectFormGroup());
        }
        this.subjectForm.patchValue({ subjectOfferDtlList: this.subjectOfferObj.subjectOfferDtlList });

        const mappingList = <FormArray>this.subjectForm.controls['facultyMappingList'];
        mappingList.controls = [];
        for (let i = 0; i < this.subjectOfferObj.facultyMappingList.length; i++) {
          mappingList.push(this.createFaculty());
          const mappingDTLList = this.facultyMappingList().at(i).get("facultyMappingDTLList") as FormArray
          mappingDTLList.controls = [];
          for (let j = 0; j < this.subjectOfferObj.facultyMappingList[i].facultyMappingDTLList.length; j++) {
            mappingDTLList.push(this.createTimingAllotment());
          }
        }
        this.subjectForm.patchValue({ facultyMappingList: this.subjectOfferObj.facultyMappingList });
      this.spinner.hide();
      this.toastr.success(res.message, 'Success!');
    }, err => {
      if (err.error.error.error) {
        this.toastr.error(err.error.error.error);
      }
      this.spinner.hide();
    });
  }
  createSubjectOffering() {
    this.subjectSubmitted = true; 
   
    if (this.subjectForm.invalid) {
      this.toastr.error("Please fill all mandatory fields.", 'Warning');
      return;
    }
    this.spinner.show();
    this.subjectForm.value.id = this.id;
    this.subjectForm.value.yearId = this.subjectOfferForm.value.yearId; 
    this.subjectForm.value.standardId = this.subjectOfferForm.value.standardId;
    this._AcademicStdSubConfiService.createAcademicStandardSubject(this.subjectForm.value).pipe(first()).subscribe(async res => {
      this.spinner.hide();
      this.toastr.success(res.data, 'Success!');
    }, err => {
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
      }
      this.spinner.hide();
    });
  }

  updateSubjectOffering() {
    this.subjectSubmitted = true;
    // const subjectOfferDtlList = <FormArray>this.subjectForm.controls['subjectOfferDtlList']; 
    // for(let i = 0; i < this.subjectForm.value.subjectOfferDtlList.length;i++){
    //   if(this.subjectForm.value.subjectOfferDtlList[i].subjectType === "Theory"){
    //     alert(1);
    //     console.log( this.subjectForm.value.subjectOfferDtlList[i].practicalMin);
    //   this.subjectForm.value.subjectOfferDtlList.removeControl('practicalMin');
    //   // this.createsubjectFormGroup().removeControl('practicalMin');
    //   }
    //   if(this.subjectForm.value.subjectOfferDtlList[i].subjectType === "Theory"){
    //     alert(2);
    //     this.subjectForm.value.subjectOfferDtlList.removeControl('practicalMax');
    //     // this.createsubjectFormGroup().removeControl('practicalMax');
    //     }
    // }
    if (this.subjectForm.invalid) {
      this.toastr.error("Please fill all mandatory fields.", 'Warning');
      return;
    }  
    // if (this.subjectArr.value) {
    //   this.subArray = this.subjectArr.value;
    //   for (let i = 0; i < this.subArray.length; i++) {
    //     const subObj = this.subArray[i];

    //     let subjectId = (this.subArray[i].subjectId);
    //     let subjectType = (this.subArray[i].subjectType);
    //     let practicalMin = (this.subArray[i].practicalMin);
    //     let practicalMax = (this.subArray[i].practicalMax);
    //     let theoryMin = (this.subArray[i].theoryMin);
    //     let theoryMax = (this.subArray[i].theoryMax);
    //     console.log(subjectType);
    //     if (subjectType =='Theory' && (theoryMin == null || theoryMax == null)) {
    //       this.toastr.error("Theory mark should be filled", 'Warning');
    //       return false;
    //     } 
    //     if (subjectType =='Practical' && (practicalMin == null || practicalMax == null)) {
    //       this.toastr.error("Practical mark should be filled", 'Warning');
    //       return false;
    //     } 
    //   }
    // } 

    this.spinner.show();
    this.subjectForm.value.id = this.id;
    this.subjectForm.value.yearId = this.subjectOfferForm.value.yearId; 
    this.subjectForm.value.standardId = this.subjectOfferForm.value.standardId;
    this._AcademicStdSubConfiService.createAcademicStandardSubject(this.subjectForm.value).pipe(first()).subscribe(async res => {
      this.toastr.success(res.data, 'Success!');
      this.spinner.hide();
      // this.toastr.success(res.data, 'Success!');
    }, err => {
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
      }
      this.spinner.hide();
    });
  }


  getSubjectList() {
    this._AcademicStdSubConfiService.getSubject().pipe(first()).subscribe(res => {
      this.subjectArrList = res.data;
    });
  }

  getSectionList() {
    this._AcademicStdSubConfiService.getSections().pipe(first()).subscribe(res => {
      this.sectionArr = res.data;
    });
  }

  getFacultysList() {
    this._AcademicStdSubConfiService.getFacultys().pipe(first()).subscribe(res => {
      this.FacultyArr = res.data;
    });
  }

  getTimesList() {
    this._AcademicStdSubConfiService.getTimes().pipe(first()).subscribe(res => {
      this.TimeArr = res.data;
    });
  }

  getClassRooms() {
    this._AcademicStdSubConfiService.getClassRoom().pipe(first()).subscribe(res => {
      this.roomArr = res.data;

    });
  }
  getDaysList() {
    this._AcademicStdSubConfiService.getdaymaster().pipe(first()).subscribe(res => {
      this.dayArr = res.data;
    });
  }

  getStandard() {
    this.StandardService.getAllUsers().pipe(first()).subscribe(res => {
      this.standardArr = res.data;
    });
  }

  getyear() {
    this._AcademicStdSubConfiService.getAcademicYear().pipe(first()).subscribe(res => {
      this.yearArr = res.data;
    });
  }

  calculate() {
    if (this.subjectArr.value) {
      this.subArray = this.subjectArr.value;
      for (let i = 0; i < this.subArray.length; i++) {
        const subObj = this.subArray[i];

        let practicalMin = (this.subArray[i].practicalMin);
        let practicalMax = (this.subArray[i].practicalMax);
        let theoryMin = (this.subArray[i].theoryMin);
        let theoryMax = (this.subArray[i].theoryMax);
        // if (practicalMax < practicalMin) {
        //   this.toastr.error("Practical Minimum Mark is too high", 'Warning');
        //   return false;
        // }     
        // if (theoryMax < theoryMin) {
        //   this.toastr.error("Theory Minimum Marks is too high", 'Warning');
        //   return false;
        // }
      // if(practicalMin == undefined){
      //   let totalMarks = (theoryMin);
      //   let subjectOfferDtlList = this.subjectForm.get('subjectOfferDtlList') as FormArray;
      //   subjectOfferDtlList.at(i).patchValue({ totalMarks: totalMarks });
      // }else if(theoryMin == undefined){
      //   let totalMarks = (practicalMin);
      //   let subjectOfferDtlList = this.subjectForm.get('subjectOfferDtlList') as FormArray;
      //   subjectOfferDtlList.at(i).patchValue({ totalMarks: totalMarks });
      // }else {
        let totalMarks = ((practicalMin) + (theoryMin));
        let subjectOfferDtlList = this.subjectForm.get('subjectOfferDtlList') as FormArray;
        subjectOfferDtlList.at(i).patchValue({ totalMarks: totalMarks });
      // }
      }
    }
  }

  selectStartTime(event){
    this.startTimeVar =  event;

  }

  selectEndTime(event){
    this.endTimeVar =  event;
this.comparingStartEndTime();
  }

  enabletabs(event) {
    if (event != undefined) {
      this.enableCard = true;
    } else {
      this.enableCard = false
    }
  }


comparingStartEndTime(){
if(this.startTimeVar == this.endTimeVar){
  this.toastr.error("Start Time & End Time can't be same", 'Warning');
}
  }

}
