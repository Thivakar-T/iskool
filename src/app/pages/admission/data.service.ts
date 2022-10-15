import { Injectable , OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DataService   {
 public personalForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    ) { }
  
  
  start(){
    this.personalForm = this.formBuilder.group({
    
      aadharNumber:  [null, Validators.required],
      academicRecord: {
        acadmicRecordDtlDTOList: [
          {
            id:  [null, Validators.required],
            obtainedMark: 0,
            subjectId:  [null, Validators.required],
            totelMark: 0
          }
        ],
    boardId: [null, Validators.required],
        id: [null, Validators.required],
        percentage: [null, Validators.required],
        rollNumber:  [null, Validators.required],
        schoolName:  [null, Validators.required],
        stdId:  [null, Validators.required],
        yearId: [null, Validators.required],
      },
      accountHolderName: [null, Validators.required],
      accountName:  [null, Validators.required],
      addressInformationList: [
        {
          address:  [null, Validators.required],
          addressType:  [null, Validators.required],
          cityId:  [null, Validators.required],
          countryId:  [null, Validators.required],
          id:  [null, Validators.required],
          pincode:  [null, Validators.required],
          stateId:  [null, Validators.required],
        }
      ],
      admissionBatchId:  [null, Validators.required],
      admissionCategoryId:  [null, Validators.required],
      bankBranch:  [null, Validators.required],
      bankName:  [null, Validators.required],
    birthStateId:  [null, Validators.required],
      birthTable: [null, Validators.required],
      branchId:  [null, Validators.required],
      casteId:  [null, Validators.required],
      categoryId:  [null, Validators.required],
      dateOfAdmission:  [null, Validators.required],
      dateOfBirth:  [null, Validators.required],
      documentList: [
        {
          document:  [null, Validators.required],
          id:  [null, Validators.required],
          status:  [null, Validators.required],
          uploadDate: "2021-03-02T12:03:55.156Z"
        }
      ],
      domicileCountryId:  [null, Validators.required],
      domicileStateId:  [null, Validators.required],
      emailId:  [null, Validators.required],
      firstName:  [null, Validators.required],
      gender:  [null, Validators.required],
      id:  [null, Validators.required],
      identityMark:  [null, Validators.required],
      isTransportAvailable: true,
      lastName:  [null, Validators.required],
      locationId: [null, Validators.required],
      maritalStatus:  [null, Validators.required],
      middleName:  [null, Validators.required],
      mobileNumber:  [null, Validators.required],
      motherTongueId:  [null, Validators.required],
      name:  [null, Validators.required],
      nationality:  [null, Validators.required],
      panNumber:  [null, Validators.required],
      parentDetailsList: [
        {
          annualIncome:  [null, Validators.required],
          designation:  [null, Validators.required],
          emailId:  [null, Validators.required],
          firstName:  [null, Validators.required],
          id:  [null, Validators.required],
          lastName:  [null, Validators.required],
          mobileNumber:  [null, Validators.required],
          occupationId:  [null, Validators.required],
          organizationName:  [null, Validators.required],
          parentDetailsType: "string"
        }
      ],
      photo:  [null, Validators.required],
      registrationNumber:  [null, Validators.required],
      religionId:  [null, Validators.required],
      rollNumber:  [null, Validators.required],
      schemeId:  [null, Validators.required],
      sectionId:  [null, Validators.required],
      semesterId:  [null, Validators.required],
      sessionId:  [null, Validators.required],
      shiftId:  [null, Validators.required],
      stdId:  [null, Validators.required],
      yearId: "string"
  
})
}
}
