import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchStudentService } from '../search-student.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-student-information',
  templateUrl: './student-information.component.html',
  styleUrls: ['./student-information.component.scss']
})
export class StudentInformationComponent implements OnInit {

  id : any ;
informationObj:any = {};
address:any;
permanentAddressObj: any = {};
localAddressObj: any = {};
parent: any = [];
fatherObj : any = {};
motherrObj : any = {};
localGuardianObj : any = {};
enableFather = false;
enableMother = false;
enableLocal = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _SearchStudentService : SearchStudentService,    
    public toastr: ToastrService,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if(this.id){
      this.getSingleStudentInformation();
    }
  }

  getSingleStudentInformation() {
    this.spinner.show();
    this._SearchStudentService.getStudentInformation(this.id).pipe(first()).subscribe((res:any) => {
      this.informationObj = res.data;         
      this.address = this.informationObj.addressInformationList;
      this.parent = this.informationObj.parentDetailsList;
      this.spinner.hide(); 

for (var val of this.address) {
if(val.addressType == "Permanent_Address"){ 
this.permanentAddressObj.address= val.address;
this.permanentAddressObj.pincode= val.pincode;
this.permanentAddressObj.cityName= val.cityName;
this.permanentAddressObj.stateName= val.stateName;
this.permanentAddressObj.countryName= val.countryName;
}
 else if(val.addressType == "Local_Address"){
  this.localAddressObj.address= val.address;
  this.localAddressObj.pincode= val.pincode;
  this.localAddressObj.cityName= val.cityName;
  this.localAddressObj.stateName= val.stateName;
  this.localAddressObj.countryName= val.countryName;
  }
  }

  for (var val of this.parent) {
    if(val.parentDetailsType == "Father_Information"){
      this.fatherObj.firstName= val.firstName;
      this.fatherObj.lastName= val.lastName;
      this.fatherObj.emailId= val.emailId;
      this.fatherObj.mobileNumber= val.mobileNumber;
      this.fatherObj.designation= val.designation;
      this.fatherObj.occupationName= val.occupationName;
      this.fatherObj.organizationName= val.organizationName;
      this.fatherObj.annualIncome= val.annualIncome;
    }
     else if(val.parentDetailsType == "Mother_Information"){
      this.motherrObj.firstName= val.firstName;
      this.motherrObj.lastName= val.lastName;
      this.motherrObj.emailId= val.emailId;
      this.motherrObj.mobileNumber= val.mobileNumber;
      this.motherrObj.designation= val.designation;
      this.motherrObj.occupationName= val.occupationName;
      this.motherrObj.organizationName= val.organizationName;
      this.motherrObj.annualIncome= val.annualIncome;
      }
      else if(val.parentDetailsType == "Local_Guardian_Information"){
          this.localGuardianObj.firstName= val.firstName;
          this.localGuardianObj.lastName= val.lastName;
          this.localGuardianObj.emailId= val.emailId;
          this.localGuardianObj.mobileNumber= val.mobileNumber;
          this.localGuardianObj.designation= val.designation;
          this.localGuardianObj.occupationName= val.occupationName;
          this.localGuardianObj.organizationName= val.organizationName;
          this.localGuardianObj.annualIncome= val.annualIncome;
        }
        }


})

  }
  
    }

