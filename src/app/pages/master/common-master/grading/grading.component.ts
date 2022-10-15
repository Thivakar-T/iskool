import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { GradeListService } from '../grade-list.service';

declare let $: any;


@Component({
  selector: 'app-grading',
  templateUrl: './grading.component.html',
  styleUrls: ['./grading.component.scss']
})
export class GradingComponent implements OnInit {
  routeObj: any = {};
  gradeForm: FormGroup;
  routeSubmitted = false;
  buttonText: string = "";
  routelist: any = [];
  originArr: any = [];
  userName: any;
  rows: any;
  configData;
  gradeObj: any = {};
  nameObj: any = {};
  RoutArr: any = [];
  rangeFromValue: any;
  rangeToValue: any;
  rangeArr: any = [];
  previousIndex: number;
  id = this.route.snapshot.params['id'];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private GradingService: GradeListService,
    private modalService: NgbModal,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService,
  ) {
    this.routeObj.routelist = [];
  }
  addterm() {
    let order = this.creategradeFormGroup();
    this.routeArr.push(order);

  }
  deleteterm(index) {
    if (this.routeArr.length == 1) {
      this.toastr.error("Can't delete the row when there is only one row", 'Warning');

      return false;
    } else {
      this.routeArr.removeAt(index);
      this.toastr.warning('Row deleted successfully', 'Delete row');
      return true;
    }
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.buttonText = "Update";
      this.edit();
    }
    else {
      this.buttonText = "Save";
    }
    this.gradeForm = this.formBuilder.group({

      schemeName: [null, Validators.required],
      schemeDetails: [null, Validators.required],
      gradingDtlDTOList: this.formBuilder.array(
        [this.creategradeFormGroup()], [Validators.required])

    });


    this.spinner.show();
    this.spinner.hide();
    // this.edit(this.id);



  }
  get f() { return this.gradeForm.controls };

  creategradeFormGroup() {
    return this.formBuilder.group({
      gradeName: [null, [Validators.required]],
      rangeFrom: [null, [Validators.required]],
      rangeTo: [null, [Validators.required]],
      gradePoints: [null, [Validators.required]],

    })
  }
  get routeArr(): FormArray {
    return this.gradeForm.get('gradingDtlDTOList') as FormArray;
  }

  submit() {
    // this.routeObj = {};
    this.routeSubmitted = true;
    if (this.gradeForm.invalid) {
      // this.toastr.error("Please fill mandatory fields.", 'Warning');
      return;
    }
    this.routeObj.gradingDtlDTOList = this.routeArr.value;
    if (this.routeObj.id) {
      this.spinner.show();
      this.GradingService.updateGrade(this.routeObj).subscribe(res => {
        this.spinner.hide();
        this.router.navigate(['/grade-list']);
        this.toastr.success(res.data, 'Success!');
      }, err => {
        if (err.error.error.reason) {
          this.spinner.hide();
          this.toastr.error(err.error.error.reason);
        }
      })
    }
    else {
      this.spinner.show();
      this.GradingService.createGrading(this.routeObj).pipe(first()).subscribe(res => {
        this.toastr.success(res.data, 'Success!');
        this.router.navigate(['/grade-list']);
        this.spinner.hide();
      }, err => {
        if (err.error.error.reason) {
          this.spinner.hide();
          this.toastr.error(err.error.error.reason);
        }
      })
    }
  }
  
  calculate() {
    this.rangeArr = this.routeArr.value;
    for (let i = 0; i < this.rangeArr.length; i++) {
      const productObj = this.rangeArr[i];
      if (this.rangeArr[i].rangeTo < this.rangeArr[i].rangeFrom) {
        this.toastr.error("Rangeto is too low", 'Warning');
        return false;
      }

    }
  }

  edit() {

    this.spinner.show();
    this.GradingService.getSingleGrading(this.id).pipe(first()).subscribe(res => {
      this.routeObj = res.data;
      const docArrList = <FormArray>this.gradeForm.controls['gradingDtlDTOList'];
      for (let i = 0; i < this.routeObj.gradingDtlDTOList.length; i++) {
        docArrList.push(this.creategradeFormGroup());
      }
      docArrList.controls.splice(0, 1);

      this.gradeForm.patchValue({ gradingDtlDTOList: this.routeObj.gradingDtlDTOList });

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


  selectInput(event, i) {
    this.previousIndex = i - 1;
    if (this.routeArr.value[this.previousIndex].rangeTo >= event.target.value) {
      this.toastr.error('Grade range from should be greater then previous row range to.', 'Error!');
      return false;
    }
    
  }
}

