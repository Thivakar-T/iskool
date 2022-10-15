import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { RolePolicyMasterService } from './../../role-policy-master.service'
import { CountryService } from './../../master/common-master/country.service';
import { StateService } from './../../master/common-master/state.service';
import { CityService } from './../../master/common-master/city.service';
import { DepartmentService } from './../../master/common-master/department.service';
import { StandardService } from './../../master/common-master/standard.service';
import { Globals } from 'src/app/globals';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  roomObj: any = {};
  roomForm: FormGroup;
  roomSubmitted = false;
  id: any;
  roleobj: any = {
    roleDto: {}
  };
  panelOpenState = false;
  userObj: any = {};
  standObj: any = {};
  countryArr: any = [];
  configData;
  rolepolicyArr: any = [];
  rolrArr: any = [];
  standardFeeObj: any = {};
  enableCard: any;
  stateArr: any = [];
  departmentArr: any = [];
  cityArr: any = [];
  obj: any = {};
  listArr: any;

  allRoleArr: any = [];
  pageArr: any = [];
  authTypeArr: any = ['IP'];
  statusArr: any = ['FACULTY', 'STUDENT', 'PARENT'];
  genderArr: any = ['MALE', 'FEMALE'];
  // breadCrumbItems: Array<{}>;
  // roleName: any;

  constructor(private formBuilder: FormBuilder,
    private User: UserService,
    private toastr: ToastrService,
    private rolePolicyMasterService: RolePolicyMasterService,
    private _countryService: CountryService,
    private _stateService: StateService,
    private _cityService: CityService,
    private DepartmentService: DepartmentService,
    private StandardService: StandardService,
    private route: ActivatedRoute,
    public globals: Globals,
    private router: Router,



    private spinner: NgxSpinnerService) {

    this.roomObj.multiFactorAuthList = [];
    this.roomObj.roleIdList = [];
    this.roomObj.standardList = [];

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    // this.breadCrumbItems = [{ label: 'Users' }, { label: 'Add User', active: true, link: '/administration/user-list' }];
    this.roomForm = this.formBuilder.group({
      userDto: this.formBuilder.group({
        title: [null, Validators.required],
        dateOfBirth: [null, Validators.required],
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        gender: [null, Validators.required],
        street: [null, Validators.required],
        id: [null],
        stateId: [null, Validators.required],

        countryId: [null, Validators.required],
        cityId: [null, Validators.required],

        postalCode: [null, Validators.required],
        phoneNo: [null, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(12)]],
        emergencyContactNumber: [null, [Validators.required,Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(12)]],
        email: [null, [Validators.pattern("^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([A-Za-z]{2,6}(?:\\.[A-Za-z]{2,6})?)$")]],
        userName: [null, Validators.required],
        password: [null, Validators.required],
        userType: [null, Validators.required],
        departmentId: [null, Validators.required],
        designation: [null, Validators.required],
        experience: 0,
        status: [null, Validators.required],

      }),
      multiFactorAuthList: this.formBuilder.array(
        [this.createsubjectFormGroup()]),
      // standardList: this.formBuilder.array(
      //   [this.createstandardFormGroup()], [Validators.required]),
      // roleIdList: this.formBuilder.array(
      //   [this.createfeeAmountArryFormGroup()],
      //   [Validators.required])
      standardList: this.formBuilder.array([this.formBuilder.control(null, Validators.required)],
      ),
      roleIdList: this.formBuilder.array([this.formBuilder.control(null, Validators.required)]
),
    });
    this.configData = {
      suppressScrollX: true,
      wheelSpeed: 0.3
    };
    this.getAuthtype();
    this.getrolemaster();
    this.getCountry();
    this.getState();
    this.getCity();
    this.getDepartment();
    this.getstandard();
    if (this.id) {
      this.getsingle();
    }

  
  }

  addUser() {
    const formArray = <FormArray>this.roomForm.get('roleIdList');
    formArray.push(this.formBuilder.control(null, Validators.required));

  }

  get roleIdList() {
    return (<FormArray>this.roomForm.get('roleIdList'));
  }

  addstand() {
    const formArray = <FormArray>this.roomForm.get('standardList');
    formArray.push(this.formBuilder.control(null, Validators.required));
  }
  get standardList() {
    return (<FormArray>this.roomForm.get('standardList'));
  }


  createstandardFormGroup() {
    return
  }

  deletestand(index) {
    if (this.standardList.length == 1) {
      this.toastr.error("Can't delete the row when there is only one row", 'Warning');

      return false;
    } else {
      this.standardList.removeAt(index);
      this.toastr.warning('Row deleted successfully', 'Delete row');
      return true;
    }
  }



  // selectModule(event) {
  //   this.id = event.id;
  //   this.roleobj.roleDto.roleName = event.roleName;
  //   this.roleobj.roleDto.roleId = event.id;
  // }



  createfeeAmountArryFormGroup() {
    return
  }

  delete(index) {
    if (this.roleIdList.length == 1) {
      this.toastr.error("Can't delete the row when there is only one row", 'Warning');

      return false;
    } else {
      this.roleIdList.removeAt(index);
      this.toastr.warning('Row deleted successfully', 'Delete row');
      return true;
    }
  }




  selectRole(event, roleObj) {
    console.log(event.id);
    this.roleobj.roleDto.roleId = event.id;
    this.roleobj.roleDto.roleName = event.roleName;
    this.rolePolicyMasterService.getRolePolicy(this.roleobj).pipe(first()).subscribe(res => {
      this.rolepolicyArr = res.data;
      roleObj.enableCard = true;
      // this.listArr = res.data.list;

    })

  }



  getAuthtype() {
    this.User.getUsers().pipe(first()).subscribe(res => {
      this.authTypeArr = res.data;
      this.spinner.hide();
    }, err => {
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
      }
      this.spinner.hide();
    })
  }
  getCountry() {
    this._countryService.getCountry().pipe(first()).subscribe(res => {
      this.countryArr = res.data;
    })
  }

  getrolemaster() {
    this.rolePolicyMasterService.getrolemaster().pipe(first()).subscribe(res => {

      this.allRoleArr = res.data;

    })
  }
  getstandard() {
    this.StandardService.getAllUsers().pipe(first()).subscribe(res => {
      this.pageArr = res.data;
    })
  }
  getState() {
    this._stateService.getState().pipe(first()).subscribe(res => {
      this.stateArr = res.data;
    })
  }
  getCity() {
    this._cityService.getCity().pipe(first()).subscribe(res => {
      this.cityArr = res.data;
    })
  }
  getDepartment() {
    this.DepartmentService.getData().pipe(first()).subscribe(res => {
      this.departmentArr = res.data;
    })
  }
  get f() { return this.roomForm.controls.userDto as FormGroup };
  addterm() {
    let order = this.createsubjectFormGroup();
    this.subjectArr.push(order);

  }
  get subjectArr(): FormArray {
    return this.roomForm.get('multiFactorAuthList') as FormArray;
  }
  createsubjectFormGroup() {
    return this.formBuilder.group({
      authType: [null],
      authValue: [null],
      toDate: [null],
      fromDate: [null],

    })
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

  submit() {
    this.roomSubmitted = true;
    // if (!this.id || this.id == undefined) {
    //   this.f.addControl('password', this.formBuilder.control('', Validators.required));
    // }
    if (this.id) {
      this.f.removeControl('password');
    }else{
      this.f.addControl('password', this.formBuilder.control('', Validators.required));
       this.roomForm.value.userDto.password = this.roomForm.value.userDto.password;
    }
   
    if (this.roomForm.invalid) {
      this.toastr.error("Please fill all mandatory fields.", 'Warning');
      return;
    }

    this.spinner.show();
    this.roomForm.value.userDto.dateOfBirth =  this.roomForm.value.userDto.dateOfBirth.day + '/' + this.roomForm.value.userDto.dateOfBirth.month + '/' + this.roomForm.value.userDto.dateOfBirth.year;
   
      for (var val of this.subjectArr.value) {
        if(val.authType != null ){
        val.fromDate = val.fromDate.day + '/' + val.fromDate.month + '/' + val.fromDate.year;
        val.toDate = val.toDate.day + '/' + val.toDate.month + '/' + val.toDate.year;
        }
      };
      this.roomForm.value.multiFactorAuthList = this.subjectArr.value;
      this.roomForm.value.standardList = this.standardList.value;

    if (this.id) {
      this.roomForm.value.multiFactorAuthList = this.subjectArr.value;
      this.roomForm.value.standardList = this.standardList.value;
      // console.log(this.standardList.value)
      // alert("your good luck.....!")
      // console.log(this.roomForm.value)
      // alert("your bad luck.....!")

      this.User.createUsers(this.roomForm.value).pipe(first()).subscribe(async res => {
        this.toastr.success(res.data, 'Success!');
        if (this.id) {
          this.f.addControl('password', this.formBuilder.control('', Validators.required));
        }
        this.router.navigate(['/administration/user']);
        this.spinner.hide();
        this.roomSubmitted = false;
        this.roomForm.reset({});
      },err => {
        if (err.error.error.reason) {
          this.toastr.error(err.error.error.reason);
          this.spinner.hide();
        }
      })
    }
    else {
      this.roomForm.value.userDto.password = this.roomForm.value.userDto.password;
      this.User.createUsers(this.roomForm.value).pipe(first()).subscribe(res => {
        this.toastr.success(res.data, 'Success!');
        // this.enableCard = true;
        this.router.navigate(['/administration/user']);
        this.spinner.hide();
        this.roomForm.reset({});
      }, err => {
        if (err.error.error.reason) {
          this.toastr.error(err.error.error.reason);
          this.spinner.hide();
        }
      })
    }
  }


  getsingle() {

    this.spinner.show();
    this.User.getsingle(this.id).pipe(first()).subscribe(async res => {
      this.obj = res.data;

      if (this.obj.userDto.dateOfBirth) {
        var toDate = this.obj.userDto.dateOfBirth.split('/');
        let date1 = new Date(toDate[1] + '-' + toDate[0] + ' ' + toDate[2]);
        this.obj.userDto.dateOfBirth = { year: date1.getFullYear(), month: date1.getMonth() + 1, day: date1.getDate() };
      }
      this.roomForm.controls['userDto'].patchValue({
        title: this.obj.userDto.title,
        firstName: this.obj.userDto.firstName,
        dateOfBirth: this.obj.userDto.dateOfBirth,
        lastName: this.obj.userDto.lastName,
        gender: this.obj.userDto.gender,
        street: this.obj.userDto.street,
        stateId: this.obj.userDto.stateId,
        countryId: this.obj.userDto.countryId,
        cityId: this.obj.userDto.cityId,
        postalCode: this.obj.userDto.postalCode,
        phoneNo: this.obj.userDto.phoneNo,
        emergencyContactNumber: this.obj.userDto.emergencyContactNumber,
        email: this.obj.userDto.email,
        userName: this.obj.userDto.userName,
        password: this.obj.userDto.password,
        userType: this.obj.userDto.userType,
        departmentId: this.obj.userDto.departmentId,
        designation: this.obj.userDto.designation,
        experience: this.obj.userDto.experience,
        status: this.obj.userDto.status,
        id: this.obj.userDto.id,
      })
      this.roomObj = res.data;
      this.roomObj.id = this.obj.userDto.id

      let docArrList = <FormArray>this.roomForm.controls['multiFactorAuthList'];
      docArrList.controls = [];
      if(this.roomObj.multiFactorAuthList.length > 0){
        for (let val of this.roomObj.multiFactorAuthList) {
          if (val.fromDate) {
            var toDate = val.fromDate.split('/');
            let date1 = new Date(toDate[1] + '-' + toDate[0] + ' ' + toDate[2]);
            val.fromDate = { year: date1.getFullYear(), month: date1.getMonth() + 1, day: date1.getDate() };
          }
          if (val.toDate) {
            var toDate = val.toDate.split('/');
            let date1 = new Date(toDate[1] + '-' + toDate[0] + ' ' + toDate[2]);
            val.toDate = { year: date1.getFullYear(), month: date1.getMonth() + 1, day: date1.getDate() };
          }
          docArrList.push(this.createsubjectFormGroup());
        }
        this.roomForm.patchValue({ multiFactorAuthList: this.roomObj.multiFactorAuthList });
      }else{
        docArrList.push(this.createsubjectFormGroup());

      }
     

      const ArrList = <FormArray>this.roomForm.controls['standardList'];
      ArrList.controls = [];
      for (let i = 0; i < this.roomObj.standardList.length; i++) {
        ArrList.push(this.formBuilder.control(null, Validators.required));
      }
      this.roomForm.patchValue({ standardList: this.roomObj.standardList });
      const RoleArrList = <FormArray>this.roomForm.controls['roleIdList'];
      RoleArrList.controls = [];
      for (let i = 0; i < this.roomObj.roleIdList.length; i++) {
        RoleArrList.push(this.formBuilder.control(null, Validators.required));
      }
      this.roomForm.patchValue({ roleIdList: this.roomObj.roleIdList });


      this.spinner.hide();
      this.toastr.success(res.message, 'Success!');
    }, err => {
      if (err.error.error.reason) {
        this.spinner.hide();
        this.toastr.error(err.error.error.reason);
      }
    })
  }


}



