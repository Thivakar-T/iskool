import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MetaService } from './../../meta.service';
import { StudentRegistrationService } from './../student-registration.service';
import { MothertongueService } from './../../master/common-master/mother-tonge/mothertongue.service';
import { OccupationService } from './../../master/common-master/occupation/occupation.service';
import { LocationService } from './../../master/common-master/location.service';
import { AcadamicYearService } from '../../master/common-master/academic-year/acadamic-year.service';
import { Globals } from 'src/app/globals';



@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.scss']
})
export class StudentRegistrationComponent implements OnInit {


  personalForm: FormGroup;
  personalSubmitted = false;
  addressSubmitted = false;
  parentSubmitted = false;

  degreeObj: any = {};
  personalObj: any = {};
  addressObj: any = {};

  motherTongueArr: any = [];
  buttonText: string = "";
  userObj: any = {};
  academicObj: any = {};
  parentDetailsList: any = [];
  addressInformationList: any = [];
  allObject: any = {};

  countryArr: any = [];
  StateArr: any = [];
  religionArr: any = [];
  casteArr: any = [];
  catergoryArr: any = [];
  stdArr: any = [];
  yearArr: any = [];
  admissionCategoryArr: any = [];
  cityArr: any = [];
  occupationArr: any = [];
  sessionArr: any = [];
  boardArr: any = [];
  subjectArr: any = [];
  locationArr: any = [];
  id: any;
  StudentObj: any = {};
  parent: any = [];
  address: any = [];
  parentProp: any = {};
  academicRecordObj: any = {};
  LcationCard = false;
  configData;
  transport:any;
  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private MetaService: MetaService,
    public toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    public spinner: NgxSpinnerService,
    private studentRegistrationService: StudentRegistrationService,
    private mothertongueService: MothertongueService,
    private _occupationService: OccupationService,
    private _locationService: LocationService,
    private _academicYearService: AcadamicYearService,
    public globals: Globals

  ) { }
  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];

    if (this.id) {
      this.getSingleStudentInformation();
    }



    this.personalForm = this.formBuilder.group({
      aadharNumber: [null, Validators.required],
      // accountHolderName: [null, Validators.required],
      // accountName:  [null, Validators.required],
      admissionCategoryId: [null, Validators.required],
      // bankBranch:  [null, Validators.required],
      // bankName:  [null, Validators.required],
      birthStateId: [null, Validators.required],
      birthTable: [null, Validators.required],
      casteId: [null, Validators.required],
      categoryId: [null, Validators.required],
      dateOfAdmission: [null, Validators.required],
      dateOfBirth: [null, Validators.required],
      fatherObj: this.formBuilder.group({
        annualIncome: [null],
        designation: [null],
        emailId: [null, [Validators.pattern("^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([A-Za-z]{2,6}(?:\\.[A-Za-z]{2,6})?)$")]],
        firstName: [null],
        lastName: [null],
        mobileNumber: [null, [Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(12)]],
        occupationId: [null],
        organizationName: [null],
        parentDetailsType: 'Father_Information',
        id: [null]
      }),
      motherObj: this.formBuilder.group({
        annualIncome: [null],
        designation: [null],
        emailId: [null, [Validators.pattern("^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([A-Za-z]{2,6}(?:\\.[A-Za-z]{2,6})?)$")]],
        firstName: [null],
        lastName: [null],
        mobileNumber: [null, [Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(12)]],
        occupationId: [null],
        organizationName: [null],
        parentDetailsType: 'Mother_Information',
        id: [null]

      }),
      guardianObj: this.formBuilder.group({
        annualIncome: [null, Validators.required],
        designation: [null],
        emailId: [null, [Validators.pattern("^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([A-Za-z]{2,6}(?:\\.[A-Za-z]{2,6})?)$")]],
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        mobileNumber: [null, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(12)]],
        occupationId: [null, Validators.required],
        organizationName: [null],
        parentDetailsType: 'Local_Guardian_Information',
        id: [null]


      }),
      permanentObj: this.formBuilder.group({
        address: [null, Validators.required],
        cityId: [null, Validators.required],
        countryId: [null, Validators.required],
        pincode: [null, Validators.required],
        stateId: [null, Validators.required],
        addressType: 'Permanent_Address',
        id: [null]


      }),
      localObj: this.formBuilder.group({
        address: [null, Validators.required],
        cityId: [null, Validators.required],
        countryId: [null, Validators.required],
        pincode: [null, Validators.required],
        stateId: [null, Validators.required],
        addressType: 'Local_Address',
        id: [null]
      }),
      domicileCountryId: [null, Validators.required],
      domicileStateId: [null, Validators.required],
      emailId: [null, [Validators.pattern("^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([A-Za-z]{2,6}(?:\\.[A-Za-z]{2,6})?)$")]],
      firstName: [null, Validators.required],
      gender: [null, Validators.required],
      identityMark: [null, Validators.required],
      lastName: [null, Validators.required],
      locationId: [null, Validators.required],
      maritalStatus: [null, Validators.required],
      middleName: [null],
      mobileNumber: [null, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(12)]],
      motherTongueId: [null, Validators.required],
      isTransportAvailable: [null, Validators.required],
      // name:  [null, Validators.required],
      nationality: [null, Validators.required],
      // panNumber:  [null, Validators.required],
      photo: null,
      registrationNumber: [null, Validators.required],
      religionId: [null, Validators.required],
      rollNumber: [null],
      sessionId: [null, Validators.required],
      stdId: [null, Validators.required],
      academicYearId: [null, Validators.required],
      documentList: this.formBuilder.array(
        [this.createacademicSessionFormGroup()])

    })
    this.getCountry();
    this.getMotherTongue();
    this.getState();
    this.getReligion();
    this.getCaste();
    this.getCategory();
    this.getCity();
    this.getOccupation();
    this.getStandard();
    this.getAcademicYear();
    this.getAdmissionCategory();
    this.getSession();
    this.getBoard();
    this.getLocation();
  }

  get f() { return this.personalForm.controls };
  get g() { return this.personalForm.controls.permanentObj as FormGroup };
  get h() { return this.personalForm.controls.localObj as FormGroup };
  get j() { return this.personalForm.controls.guardianObj as FormGroup };
  get i() { return this.personalForm.controls.fatherObj as FormGroup };
  get k() { return this.personalForm.controls.motherObj as FormGroup };


  createacademicSessionFormGroup() {
    return this.formBuilder.group({
      document: [null],
      status: "pending",
      uploadDate : [null]
    })
  }
  get documentListArr(): FormArray {
    return this.personalForm.get('documentList') as FormArray;
  }


  addRow() {
    let order = this.createacademicSessionFormGroup();
    this.documentListArr.push(order);

  }


  deleteRow(index) {
    if (this.documentListArr.length == 1) {
      this.toastr.error("Can't delete the row when there is only one row", 'Warning');

      return false;
    } else {
      this.documentListArr.removeAt(index);
      this.toastr.warning('Row deleted successfully', 'Delete row');
      return true;
    }
  }

  academicData(event) {
    this.academicObj = event;
  }
  selectTransport(event){
    this.transport = event;
    if (this.transport == 'YES') {
      this.personalForm.addControl('locationId', this.formBuilder.control('', Validators.required));
    }
    if (this.transport == 'NO') {
      this.personalForm.removeControl('locationId');
    }
  }
  getAllData() {
    this.personalSubmitted = true;
    this.addressSubmitted = true;
    this.parentSubmitted = true;
    if (this.transport == 'NO') {
      this.personalForm.removeControl('locationId');
    }
    if (this.personalForm.invalid) {
      this.toastr.error("Please fill all mandatory fields.", 'Warning');
      return;
    }
   this.spinner.show();
  
    if (this.personalForm.value.isTransportAvailable === "NO") {
      this.personalForm.value.locationId = null;
      this.personalForm.value.isTransportAvailable = false;
    } else {
      this.personalForm.value.isTransportAvailable = true;

    }

    if (this.academicObj.academicYearId == null) {
      this.personalForm.value.academicRecord = null;
    } else {
      this.personalForm.value.academicRecord = this.academicObj;
    }
    this.personalForm.value.dateOfAdmission = this.personalForm.value.dateOfAdmission.day + '/' + this.personalForm.value.dateOfAdmission.month + '/' + this.personalForm.value.dateOfAdmission.year;
    this.personalForm.value.dateOfBirth = this.personalForm.value.dateOfBirth.day + '/' + this.personalForm.value.dateOfBirth.month + '/' + this.personalForm.value.dateOfBirth.year;
    this.personalForm.value.parentDetailsList = [this.personalForm.value.fatherObj, this.personalForm.value.motherObj, this.personalForm.value.guardianObj];
    this.personalForm.value.addressInformationList = [this.personalForm.value.localObj, this.personalForm.value.permanentObj];
    this.personalForm.value.documentList = this.documentListArr.value;
    this.studentRegistrationService.createStudentRegistration(this.personalForm.value).pipe(first()).subscribe(async res => {
      this.spinner.hide();
      this.toastr.success(res.data, 'Success!');
      if (this.transport == 'NO') {
        this.personalForm.addControl('locationId', this.formBuilder.control('', Validators.required));
      }
      this.personalForm.reset({});
      this.personalObj = {};
      this.personalSubmitted = false;
      this.addressSubmitted = false;
      this.parentSubmitted = false;
    }, err => {
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
        this.spinner.hide();
      }
    })
  }
  getSingleStudentInformation() {
    this.spinner.show();
    this.studentRegistrationService.getSingleStudentInformation(this.id).pipe(first()).subscribe(res => {
      this.personalObj = res.data;
      console.log( this.personalObj.rollNumber);
      if (this.personalObj.isTransportAvailable == true) {
        this.personalObj.isTransportAvailable = 'YES';
        this.LcationCard = true;
      } else if (this.personalObj.isTransportAvailable == false) {
        this.personalObj.isTransportAvailable = 'NO';
        this.LcationCard = false;

      }
      this.parent = this.personalObj.parentDetailsList;
      this.address = this.personalObj.addressInformationList;
      this.academicRecordObj = this.personalObj.academicRecord;
      for (var val of this.address) {
        if (val.addressType == "Permanent_Address") {
          this.personalForm.controls['permanentObj'].patchValue({
            address: val.address,
            cityId: val.cityId,
            countryId: val.countryId,
            pincode: val.pincode,
            stateId: val.stateId,
            id: val.id
          })
        }
        else if (val.addressType == "Local_Address") {
          this.personalForm.controls['localObj'].patchValue({
            address: val.address,
            cityId: val.cityId,
            countryId: val.countryId,
            pincode: val.pincode,
            stateId: val.stateId,
            id: val.id
          })
        }
      }

      for (var val of this.parent) {
        if (val.parentDetailsType == "Father_Information") {
          this.personalForm.controls['fatherObj'].patchValue({
            firstName: val.firstName,
            lastName: val.lastName,
            emailId: val.emailId,
            mobileNumber: val.mobileNumber,
            organizationName: val.organizationName,
            occupationId: val.occupationId,
            designation: val.designation,
            annualIncome: val.annualIncome,
            id: val.id

          })
        }
        else if (val.parentDetailsType == "Mother_Information") {
          this.personalForm.controls['motherObj'].patchValue({
            firstName: val.firstName,
            lastName: val.lastName,
            emailId: val.emailId,
            mobileNumber: val.mobileNumber,
            organizationName: val.organizationName,
            occupationId: val.occupationId,
            designation: val.designation,
            annualIncome: val.annualIncome,
            id: val.id

          })
        }
        else if (val.parentDetailsType == "Local_Guardian_Information") {
          this.personalForm.controls['guardianObj'].patchValue({
            firstName: val.firstName,
            lastName: val.lastName,
            emailId: val.emailId,
            mobileNumber: val.mobileNumber,
            organizationName: val.organizationName,
            occupationId: val.occupationId,
            designation: val.designation,
            annualIncome: val.annualIncome,
            id: val.id

          })
        }

      }
      if (this.personalObj.dateOfAdmission) {
        var toDate = this.personalObj.dateOfAdmission.split('/');
        let date1 = new Date(toDate[1] + '-' + toDate[0] + ' ' + toDate[2]);
        this.personalObj.dateOfAdmission = { year: date1.getFullYear(), month: date1.getMonth() + 1, day: date1.getDate() };
      }
      if (this.personalObj.dateOfBirth) {
        var date = this.personalObj.dateOfBirth.split('/');
        let date2 = new Date(date[1] + '-' + date[0] + ' ' + date[2]);
        this.personalObj.dateOfBirth = { year: date2.getFullYear(), month: date2.getMonth() + 1, day: date2.getDate() };
      }
      this.spinner.hide();
      // this.toastr.success(res.message, 'Success!');
    }, err => {
      if (err.error.error.error) {
        this.toastr.error(err.error.error.error);
      }
      this.spinner.hide();
    })
  }

  checkCPPValue(event) {
    if (event.target.checked == true) {

      this.personalForm.controls['localObj'].patchValue({
        address: this.personalForm.value.permanentObj.address,
        cityId: this.personalForm.value.permanentObj.cityId,
        countryId: this.personalForm.value.permanentObj.countryId,
        pincode: this.personalForm.value.permanentObj.pincode,
        stateId: this.personalForm.value.permanentObj.stateId,
      })

    } else if (event.target.checked == false) {
      this.personalForm.controls['localObj'].reset({});
    }
  }
  selectLocation() {
    if (this.personalObj.isTransportAvailable == 'YES') {
      this.LcationCard = true;
    } else {
      this.LcationCard = false;
    }
  }

  personalUpdate(taptype) {
    if (this.personalObj.isTransportAvailable === "NO") {
      this.personalObj.locationId = null;
      this.personalObj.isTransportAvailable = false;
    } else {
      this.personalObj.isTransportAvailable = true;
    }
    
    this.personalObj.dateOfAdmission = this.personalObj.dateOfAdmission.day + '/' + this.personalObj.dateOfAdmission.month + '/' + this.personalObj.dateOfAdmission.year;
    this.personalObj.dateOfBirth = this.personalObj.dateOfBirth.day + '/' + this.personalObj.dateOfBirth.month + '/' + this.personalObj.dateOfBirth.year;
    this.personalObj.addressInformationList = [this.personalForm.value.localObj, this.personalForm.value.permanentObj];
    this.personalObj.parentDetailsList = [this.personalForm.value.fatherObj, this.personalForm.value.motherObj, this.personalForm.value.guardianObj];
   
  // if(this.personalForm.invalid){
  //     this.toastr.error("Please fill all mandatory fields.", 'Warning');
  //   return;
  // }
  this.spinner.show();
    this.studentRegistrationService.updateRegistration(this.id, taptype, this.personalObj).pipe(first()).subscribe(res => {
      this.spinner.hide();
      this.toastr.success(res.data, 'Success!');
      // this.personalForm.reset({});
      // this.personalObj.reset({});
      // this.personalSubmitted = false;
      // this.addressSubmitted = false;
      // this.parentSubmitted = false;
      this.getSingleStudentInformation();
    }, err => {
      if (err.error.error.error) {
        this.toastr.error(err.error.error.error);
      }
      this.spinner.hide();
    })
  }
  getCountry() {
    this.MetaService.getCountry().pipe(first()).subscribe(res => {
      this.countryArr = res.data;
    });
  }

  getState() {
    this.MetaService.getState().pipe(first()).subscribe(res => {
      this.StateArr = res.data;
    });
  }
  getLocation() {
    this._locationService.getLocation().pipe(first()).subscribe(res => {
      this.locationArr = res.data;
    });
  }
  getMotherTongue() {
    this.mothertongueService.getmothertong().pipe(first()).subscribe(res => {
      this.motherTongueArr = res.data;
    });
  }

  getReligion() {
    this.MetaService.getReligion().pipe(first()).subscribe(res => {
      this.religionArr = res.data;
    });
  }
  getCaste() {
    this.MetaService.getCaste().pipe(first()).subscribe(res => {
      this.casteArr = res.data;
    });
  }
  getCategory() {
    this.MetaService.getCategory().pipe(first()).subscribe(res => {
      this.catergoryArr = res.data;
    });
  }
  getStandard() {
    this.MetaService.getStd().pipe(first()).subscribe(res => {
      this.stdArr = res.data;
    });
  }
  getAcademicYear() {
    this._academicYearService.getData().pipe(first()).subscribe(res => {
      this.yearArr = res.data;
    });
  }
  getCity() {
    this.MetaService.getCity().pipe(first()).subscribe(res => {
      this.cityArr = res.data;
    });
  }
  getAdmissionCategory() {
    this.MetaService.getAdmissionCategory().pipe(first()).subscribe(res => {
      this.admissionCategoryArr = res.data;
    });
  }
  getOccupation() {
    this._occupationService.getOccupation().pipe(first()).subscribe(res => {
      this.occupationArr = res.data;
    });
  }
  getSession() {
    this.MetaService.getSession().pipe(first()).subscribe(res => {
      this.sessionArr = res.data;
    });
  }

  getBoard() {
    this.MetaService.getBoard().pipe(first()).subscribe(res => {
      this.boardArr = res.data;
    });
  }
  getSubject() {
    this.MetaService.getSubject().pipe(first()).subscribe(res => {
      this.subjectArr = res.data;
    });
  }

}