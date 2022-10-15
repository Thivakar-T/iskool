import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators'; 
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { HolidayService} from 'src/app/pages/master/common-master/holiday.service';
import { AcadamicYearService } from './../../common-master/academic-year/acadamic-year.service';
import { DaymasterService } from './../../academic_master/daymasterlist/daymaster.service';

declare let $: any;
@Component({ 
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss']
})
export class HolidayComponent implements OnInit {

  holidayObj: any = {};
  holidaydate: any = {};
  holidayForm: FormGroup;
  holidaySubmitted = false;
  buttonText: string = "";
  academicArr : any =[];
   dayArr :any= [];
   id = this.route.snapshot.params['id'];
 constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal, 
    public toastr: ToastrService,
    public spinner: NgxSpinnerService,
    private HolidayService :HolidayService,
    private AcadamicYearService: AcadamicYearService,
    private _daymasterService: DaymasterService,
  ) { }


  addholiday() {
    let order = this.createholidayFormGroup();
    this.holidayArr.push(order);
  
  }

  ngOnInit(): void {
    this.holidayForm = this.formBuilder.group({

      academicYearId: [null, Validators.required],
      id : [null],
      holidayDtlDtoList: this.formBuilder.array(
        [this.createholidayFormGroup()], [Validators.required])

    });
    this.getAcademicYear();
    this.getDay();

    if(this.id != null){
      this.editholiday(this.id);
      }
      else {
        this.buttonText = "Submit";
      }
  }
  get f() { return this.holidayForm.controls };
  
  createholidayFormGroup() {
    return this.formBuilder.group({
      id : [null],
      name: [null, Validators.required],
      date: [null, Validators.required],
      dayId: [null, Validators.required],
      // dayName: [null, Validators.required],
      description: [null, Validators.required],
    })
  }
  get holidayArr(): FormArray { 
    return this.holidayForm.get('holidayDtlDtoList') as FormArray;
  }

  editholiday(id) {
    this.spinner.show();
    this.buttonText = "Update"
    this.holidaySubmitted = false;
    this.HolidayService.getSingleHoliday(id).pipe(first()).subscribe(res => {
      this.holidayObj= res.data;     
      this.holidayObj.id=this.id;
      const docArrList = <FormArray>this.holidayForm.controls['holidayDtlDtoList'];
      for (let i = 0; i < this.holidayObj.holidayDtlDtoList.length; i++) {
        docArrList.push(this.createholidayFormGroup());
      }
      docArrList.controls.splice(0, 1); 

      for(let list of res.data.holidayDtlDtoList){
        if(list.date){
          var toDate = list.date.split('/');
          let date1 = new Date(toDate[1]+'-'+toDate[0]+' '+toDate[2]);
          list.date = { year: date1.getFullYear(), month: date1.getMonth() + 1, day: date1.getDate() };
        }    
      }
      this.holidayForm.patchValue({ holidayDtlDtoList: this.holidayObj.holidayDtlDtoList });
      this.spinner.hide();
      this.toastr.success(res.message, 'Success!');
    }, err => {
      if (err.error.error.reason) {
        this.spinner.hide();
        this.toastr.error(err.error.error.reason);
      }
    })
  }

  deleteholiday(index) {
    if (this.holidayArr.length == 1) {
      this.toastr.error("Can't delete the row when there is only one row", 'Warning');

      return false;
    } else {
      this.holidayArr.removeAt(index);
      this.toastr.warning('Row deleted successfully', 'Delete row');
      return true;
    }
  }  
  getAcademicYear() {
    this.AcadamicYearService.getData().pipe(first()).subscribe(res => {
     this.academicArr = res.data;
   });
  }
  getDay()
  {
    this._daymasterService.getdaymaster().pipe(first()).subscribe(res => {
      this.dayArr = res.data;
    });
  }
  submit() {
    this.holidaySubmitted = true;
    if (this.holidayForm.invalid) {
      return;
    }
    if (this.holidayObj.id) {
      this.holidayForm.value.id=this.id;
    for (var val of this.holidayArr.value) {
      val.date = val.date.day + '/' + val.date.month + '/' + val.date.year;
     }
this.spinner.show();
      this.HolidayService.createHoliday(this.holidayForm.value).pipe(first()).subscribe(res => {
        this.spinner.hide();
        this.router.navigate(['/holiday-list']);
        this.toastr.success(res.data, 'Success!');
      }, err => {
        if (err.error.error.reason) {
          this.spinner.hide();
          this.toastr.error(err.error.error.reason);
        }
      })
    }else{
      for (var val of this.holidayArr.value) {
        val.date = val.date.day + '/' + val.date.month + '/' + val.date.year;
       }
       this.spinner.show();

      this.HolidayService.createHoliday(this.holidayForm.value).pipe(first()).subscribe(async res => {
        this.router.navigate(['/holiday-list']);
        this.spinner.hide();
        this.toastr.success(res.data, 'Success!');
        this.router.navigate(['/holiday-list'])
      }, err => {
        if (err.error.error.reason) {
          this.spinner.hide();
          this.toastr.error(err.error.error.reason);
        }
      })
  }
  }
}
 