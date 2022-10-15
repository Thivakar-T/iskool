import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { AcademicSessionService } from '../academic-session/academic-session.service';
import { Router, ActivatedRoute } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AcadamicYearService } from 'src/app/pages/master/common-master/academic-year/acadamic-year.service';

declare let $: any;
@Component({
  selector: 'app-academic-session',
  templateUrl: './academic-session.component.html',
  styleUrls: ['./academic-session.component.scss']
})
export class AcademicSessionComponent implements OnInit {
  academicSessionObj: any = {};
  academicSessionForm: FormGroup;
  academicSessionSubmitted = false;
  buttonText: string = "";
  academicSessionlist: any = [];
  originArr: any = [];
  userName: any;
  rows: any;
  nameObj: any = {};
  RoutArr: any = [];
  yearArray:any = [];
   id:any;
  constructor(
    private formBuilder: FormBuilder,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService,
    private AcadamicYearService: AcadamicYearService,
    private academic_session: AcademicSessionService,
    private router: Router,
    private route: ActivatedRoute,

  ) {
    this.academicSessionObj.academicSessionlist = [];
  }

  ngOnInit(): void {
    this.id  = this.route.snapshot.params['id'];
    if (this.id) {
     this.getSingleAcademicSession();
   }
    this.academicSessionForm = this.formBuilder.group({
      academicYearId: [null, Validators.required],
      academicYearName: [null],
      endDate: [null,Validators.required],
      startDate: [null,Validators.required],
      id:[null],
      academicSessionDtlDTO: this.formBuilder.array(
        [this.createacademicSessionFormGroup()], [Validators.required]),
    
    });


    this.spinner.show();
    this.spinner.hide();
    this.getAcademicyear();
  }
  get f() { return this.academicSessionForm.controls };

  createacademicSessionFormGroup() {
    return this.formBuilder.group({
      name: [null, [Validators.required]],
      shortName: [null, [Validators.required]],
      startDate: [null, [Validators.required] ],
      endDate: [null, [Validators.required] ],
      
    })
  }
  get academicSessionArr(): FormArray {
    return this.academicSessionForm.get('academicSessionDtlDTO') as FormArray;
  }
  
  addterm() {
    let order = this.createacademicSessionFormGroup();
    this.academicSessionArr.push(order);
  }

  deleteterm(index) {
    if (this.academicSessionArr.length == 1) {
      this.toastr.error("Can't delete the row when there is only one row", 'Warning');

      return false;
    } else {
      this.academicSessionArr.removeAt(index);
      this.toastr.warning('Row deleted successfully', 'Delete row');
      return true;
    }
  }

getAcademicyear(){
  this.AcadamicYearService. getData().pipe(first()).subscribe(res =>{
    this.yearArray = res.data;
  })
}

  submit(){
    // var prevHf=$(this.academicSessionForm.value.academicSessionDtlDTO).parents('tr').prev().find('input:last');
    // var nextHf=$(this.academicSessionForm.value.academicSessionDtlDTO).parents('tr').next().find('input:first');
    this.academicSessionSubmitted = true;
    if (this.academicSessionForm.invalid) {
      return;
    }
  
    // for(var val of this.academicSessionForm.value.academicSessionDtlDTO){
    //   if((val.startDate) < ( val.endDate)){
    //     this.toastr.error('End date must after then start date');
    //     return;
    //   }
    // }
    for (var val of this.academicSessionForm.value.academicSessionDtlDTO) {
      val.endDate = val.endDate.day + '/' + val.endDate.month + '/' + val.endDate.year;
      val.startDate = val.startDate.day + '/' + val.startDate.month + '/' + val.startDate.year;
     }
     this.academicSessionForm.value.startDate = this.academicSessionForm.value.startDate.day + '/' + this.academicSessionForm.
     value.startDate.month + '/' + this.academicSessionForm.value.startDate.year;
   this.academicSessionForm.value.endDate = this.academicSessionForm.value.endDate.day + '/' + this.academicSessionForm.value.endDate.month + '/' + this.academicSessionForm.value.endDate.year;
    if(this.id){
      this.academicSessionForm.value.id= this.id;
      this.academic_session.createAcademicSession(this.academicSessionForm.value).pipe(first()).subscribe(res => {
        this.toastr.success(res.data, 'Success!');
        this.getAcademicyear();
         this.router.navigate(['/academic-master/academic-session-list']);
         this.spinner.hide();
       }, err => {
         if (err.error.error.reason) {
         this.spinner.hide();
           this.toastr.error(err.error.error.reason);
         }
       })
    }else{
      this.academic_session.createAcademicSession(this.academicSessionForm.value).pipe(first()).subscribe(res => {
        this.toastr.success(res.data, 'Success!');
        this.getAcademicyear();
         this.router.navigate(['/academic-master/academic-session-list']);
         this.spinner.hide();
       }, err => {
         if (err.error.error.reason) {
         this.spinner.hide();
           this.toastr.error(err.error.error.reason);
         }
       })
    }
      
}

getSingleAcademicSession() {
  this.spinner.show();
  this.academic_session.getSingleAcademicSession(this.id).pipe(first()).subscribe(res => {
    this.academicSessionObj = res.data;
    if(this.academicSessionObj.startDate){
      var toDate = this.academicSessionObj.startDate.split('/');
      let date1 = new Date(toDate[1]+'-'+toDate[0]+' '+toDate[2]);
      this.academicSessionObj.startDate = { year: date1.getFullYear(), month: date1.getMonth() + 1, day: date1.getDate() };
    }
    if(this.academicSessionObj.endDate){
      var date = this.academicSessionObj.endDate.split('/');
      let date2 = new Date(date[1]+'-'+date[0]+' '+date[2]);
      this.academicSessionObj.endDate = { year: date2.getFullYear(), month: date2.getMonth() + 1, day: date2.getDate() };
    }
    const academicSessionDtlDTO = this.academicSessionForm.controls.academicSessionDtlDTO as FormArray;
    if (
      this.academicSessionObj.academicSessionDtlDTO != "undefined"
      && this.academicSessionObj.academicSessionDtlDTO != null
      && this.academicSessionObj.academicSessionDtlDTO.length != null
      && this.academicSessionObj.academicSessionDtlDTO.length > 0
    ) {
      this.academicSessionObj.academicSessionDtlDTO.forEach(x => {
        if(x.startDate){
          var toDate = x.startDate.split('/');
          let date1 = new Date(toDate[1]+'-'+toDate[0]+' '+toDate[2]);
          x.startDate = { year: date1.getFullYear(), month: date1.getMonth() + 1, day: date1.getDate() };
        }
        if(x.endDate){
          var toDate = x.endDate.split('/');
          let date1 = new Date(toDate[1]+'-'+toDate[0]+' '+toDate[2]);
          x.endDate = { year: date1.getFullYear(), month: date1.getMonth() + 1, day: date1.getDate() };
        }
        academicSessionDtlDTO.push(this.formBuilder.group(x));
      });
      academicSessionDtlDTO.controls.splice(0, 1);
    }
    this.spinner.hide();
    this.toastr.success(res.message, 'Success!');
  }, err => {
    if (err.error.error.reason) {
      this.spinner.hide();
      this.toastr.error(err.error.error.reason);
    }
  })
  this.spinner.hide();
}

// var dateBefore = function () {
//   var directive = {
//       require: 'ngModel',
//       link: function (scope, el, attrs, ctrl) {
//           var isInclusive = attrs.dateOrEquals ? scope.$eval(attrs.dateOrEquals) : false,
//               validate = function (val1, val2) {
//                   if (val1 === undefined || val2 === undefined) return;
//                   var isArray = val2 instanceof Array;
//                   var isValid = true;
//                   var date1 = new Date(val1);
//                   if (isArray && val2.length > 0) {
//                       for (var i = 0; i < val2.length; i++) {
//                           if (val2[i] !== undefined) {
//                               var date2 = new Date(val2[i]);
//                               isValid = isValid && (isInclusive ? date1 <= date2 : date1 < date2);
//                           }
//                           if (!isValid)
//                               break;
//                       }
//                   }
//                   else {
//                       if (val2 !== undefined) {
//                           var date2 = new Date(val2);
//                           isValid = isInclusive ? date1 <= date2 : date1 < date2;
//                       }
//                   }
//                   ctrl.$setValidity('dateBefore', isValid);
//               };
//           // Watch the value to compare - trigger validate()
//           scope.$watch(attrs.dateBefore, function () {
//               validate(ctrl.$viewValue, scope.$eval(attrs.dateBefore));
//           });

//           ctrl.$parsers.unshift(function (value) {
//               validate(value, scope.$eval(attrs.dateBefore));
//               return value;
//           })
//       }
//   }
//   return directive
// };



                                                                                                                                                                           
}