import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormGroup, FormBuilder, Validators,FormArray } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FeeMasterService } from './feemaster.service';
import { StandardService } from './../../master/common-master/standard.service';
import { AcadamicYearService } from './../../master/common-master/academic-year/acadamic-year.service';

declare let $: any;

@Component({
  selector: 'app-acadamic-year',
  templateUrl: './acadamic-year.component.html',
  styleUrls: ['./acadamic-year.component.scss']
})
export class AcadamicYearComponent implements OnInit {
  acadamicForm: FormGroup;
  acadForm: FormGroup;
  acadamicSubmitted = false;
 
  buttonText: string = "";
  acadamicObj: any = {};  
  acadamicArr: any = []; 
  acadamicArray: any = [];
  acadamiArray: any = [];
  moduleMasterPage: any = []; 
  academicStandardFeeComponentList: any = [];
  userName: any;
  schemeId: any;
  day:any;
  enableFeeCard = false;

  // schemeId: any;
  // userName: any;

  degreeObj: any = {};
  degreObj: any = {};
  stdId;
  yearId;
  id:any;
  modulMasterPage: any = [];
  totalArr: any = [];
  totalArray: any = []; 
  feeListArry: any = [];
  constructor(private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    public spinner: NgxSpinnerService, 
    private MeService: StandardService,
    private MetaService: FeeMasterService,
    private AcadamicYearService: AcadamicYearService,

  ) { }

  ngOnInit(): void {

    this.acadamicForm = this.formBuilder.group({
      stdId: [null, Validators.required],
      yearId: [null, Validators.required],

      academicStandardFeeComponentList: this.formBuilder.array(
        [this.createfeesFormGroup()])
    })



    this.getAcademicYear();
    this.getStandad();
  }
  get f() { return this.acadamicForm.controls; }
  get b() { return this.acadamicForm.controls; }

  get g() { return this.acadamicForm.controls.degreeObj as FormGroup };
  get h() { return this.acadamicForm.controls };
  // get f() { return this.acadamicForm.controls.degreObj as FormGroup };

  get academicStandardFeeComponentListArr(): FormArray {
    return this.acadamicForm.get('academicStandardFeeComponentList') as FormArray;

  }
  search(){
      this.acadamicSubmitted=true;
    if (  (this.acadamicForm.value.stdId == null || this.acadamicForm.value.stdId == '') || (this.acadamicForm.value.yearId == null || this.acadamicForm.value.yearId == '')) {
      this.toastr.error("Please fill all mandatory fields.", 'Warning');
      return;
    }    
    $('#example').DataTable().clear().destroy();
    this.MetaService.getPageModule( this.stdId,this.yearId).pipe(first()).subscribe(res => {
      this.acadamicSubmitted = false;
      this.acadamicObj = res.data ;
      $(document).ready(function () {
        $('#example').DataTable({
          "iDisplayLength": 30,
          "lengthMenu":  [10, 25, 30,50,100]
        });
      });  
      if(this.acadamicObj.academicStandardFeeComponentList==null || this.acadamicObj.academicStandardFeeComponentList==''){
        this.spinner.hide();
        this.toastr.error("No value present.", 'Warning');
        this.enableFeeCard = false;
        return;
      }
      this.id = res.data.id;     
      const docArrList = <FormArray>this.acadamicForm.controls['academicStandardFeeComponentList'];
      docArrList.controls=[];
      for (let i = 0; i < this.acadamicObj.academicStandardFeeComponentList.length; i++) {        
        docArrList.push(this.createfeesFormGroup());
      }
      this.acadamicForm.patchValue({ academicStandardFeeComponentList: this.acadamicObj.academicStandardFeeComponentList });
      
      for(let list of res.data.academicStandardFeeComponentList){
        if(list.fromDate){
          var toDate = list.fromDate.split('/');
          let date1 = new Date(toDate[1]+'-'+toDate[0]+' '+toDate[2]);
          list.fromDate = { year: date1.getFullYear(), month: date1.getMonth() + 1, day: date1.getDate() };
        }
        if(list.dueDate){
          var toDate = list.dueDate.split('/');
          let date1 = new Date(toDate[1]+'-'+toDate[0]+' '+toDate[2]);
          list.dueDate = { year: date1.getFullYear(), month: date1.getMonth() + 1, day: date1.getDate() };
        }
      }
      this.toastr.success(res.message, 'Success!');
      this.spinner.show();
      this.acadamicForm.patchValue({ academicStandardFeeComponentList: this.acadamicObj.academicStandardFeeComponentList });
      this.spinner.hide();
      this.enableFeeCard = true;
    }, err => {
      if (err.error.error.reason) {
        this.spinner.hide();
        this.toastr.error(err.error.error.reason);
        this.enableFeeCard = false;
      }
    })
  }
  acadamic() {
    this.acadamicSubmitted = true;
    if(this.acadamicForm.invalid){
     this.toastr.error("Please fill mandatory fields.", 'Warning');
      return;
    }
    for (var val of this.academicStandardFeeComponentListArr.value) {
     val.fromDate = val.fromDate.day + '/' + val.fromDate.month + '/' + val.fromDate.year;
     val.dueDate = val.dueDate.day + '/' + val.dueDate.month + '/' + val.dueDate.year;

    //  if(val.fromDate > val.dueDate){
    //   this.toastr.error("ToDate should be greater than FromDate", 'Warning');
    //   return;
    //  }
    }
    this.acadamicForm.value.id = this.id ;
    this.spinner.show();
      this.MetaService.updatePagModule(this.acadamicForm.value).pipe(first()).subscribe(res => {
        this.toastr.success(res.data, 'Success!');
        this.spinner.hide();
        this.acadamicSubmitted = false ;
        this.enableFeeCard = false;
        this.acadamicForm.reset({});

      }, err => {
        if (err.error.error.reason) {
          this.spinner.hide();
          this.toastr.error(err.error.error.reason);
        }
      })
  }
  createfeesFormGroup() {
    return this.formBuilder.group({
      feeName: [null, [Validators.required]],
      feeId:[null],
      amount: [null, [Validators.required]],
      fromDate: [null, [Validators.required]],
      dueDate: [null, [Validators.required]],
      id: [null,],

    })
  }
  getAcademicYear() {
    this.AcadamicYearService.getData().pipe(first()).subscribe(res => {
     this.acadamicArray = res.data;
   });
  }
  
  getStandad() {
    this.MeService.getAllUsers().pipe(first()).subscribe(res => {
      this.acadamicArr = res.data;
    });
  }

  selectModule(event){
    if(event == undefined){
      this.enableFeeCard = false;
    }
    this.yearId = event.id;
  }

  
  
  selectPageModule(event) {
    if(event == undefined){
      this.enableFeeCard = false;
    }
    this.stdId = event.id  ;
  }
  
  calculate(list, index) {
    if (list.value) {
      let total = 0;
      this.totalArr = list.value.feeCompList;
      for (let i = 0; i < this.totalArr.length; i++) {
        total = total + this.totalArr[i].amount;
      }
      let feeDtlList = <FormArray>this.acadamicForm.get('feeDtlList');
      feeDtlList.at(index).patchValue({ total: total });

    }
  }

  }