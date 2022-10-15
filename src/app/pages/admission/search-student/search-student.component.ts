import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators'; 
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner'; 
import { SearchStudentService } from '../search-student.service';
import { StandardService } from './../../master/common-master/standard.service';
declare let $: any; 


@Component({
  selector: 'app-search-student',
  templateUrl: './search-student.component.html',
  styleUrls: ['./search-student.component.scss']
})
export class SearchStudentComponent implements OnInit {
  
  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
   public toastr: ToastrService,
    public spinner: NgxSpinnerService, 
    private _SearchStudentService : SearchStudentService,
    private _StandardServive: StandardService,
  ) { }
  enableCard = false;
  id: any;
  StandardId:any;
  studentform: FormGroup 
  studentObj: any = {}; 
  studentSubmitted = false;
  buttonText:string = "";
  standardArr: any = [];
  studentArr: any =[];
  searchStudentArr: any =[];
  get b() { return this.studentform.controls };
  ngOnInit(): void {
    this.studentform = this.formBuilder.group({
      name : [null,Validators.required],
      rollNumber :[null,Validators.required],
      stdId :[null,Validators.required] 
 
    })
    this.getStandard(); 
  }
  getStandard() {
    this._StandardServive.getAllUsers().pipe(first()).subscribe(res => {
      this.standardArr = res.data;
    });
  }
  nameonlyshow(event){
    if(event == undefined || event == ''){
      this.enableCard = false;
    }
        this.studentform.patchValue({
      rollNumber: null,
      stdId: null,     
  })
  this.studentform.controls['rollNumber'].reset();
  this.studentform.controls['stdId'].reset();
  this.studentSubmitted = false;
  }
  rollnoonlyshow(event){
    if(event == undefined || event == ''){
      this.enableCard = false;
    }
    this.studentform.patchValue({
  name: null,
  stdId: null,     
})
this.studentform.controls['name'].reset();
this.studentform.controls['stdId'].reset();
this.studentSubmitted = false;
}
stdonlyshow(){
  this.studentform.patchValue({
name: null,
rollNumber: null,     
})
this.studentform.controls['name'].reset();
this.studentform.controls['rollNumber'].reset();
this.studentSubmitted = false;
}

selectStandardModule(event){
  if(event == undefined){
    this.enableCard = false;
  }else{
  this.StandardId = event.id;
  }
}

  updateStudent(event){
    this.enableCard = false;
    if ((this.studentform.value.name == null || this.studentform.value.name == '') &&  (this.studentform.value.rollNumber == null || this.studentform.value.rollNumber == '') && (this.studentform.value.stdId == null || this.studentform.value.stdId == '')) {
      this.studentSubmitted = true;
      this.toastr.error("Please fill atleast one mandatory fields.", 'Warning');
      return;
    }
    if(event.id == undefined) {
      this.spinner.show();
    $('#student').DataTable().clear().destroy();
       this._SearchStudentService.updatestudent(this.studentform.value).pipe(first()).subscribe(async res => {
      this.searchStudentArr = res.data;
      $(document).ready(function () {
        $('#student').DataTable({
          "iDisplayLength": 30,
          "lengthMenu":  [10, 25, 30,50,100]

        });
      });
      if(this.searchStudentArr==''){
        this.toastr.error("No student found", 'Warning');
        this.enableCard = false;
        this.spinner.hide();
      }
      else{
      this.enableCard  = true;
      this.toastr.success(res.message, 'Success!');
       this.spinner.hide();
      }
    },err => {
      this.spinner.show();
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
      }
      this.spinner.hide();
    })
  }else{
    this.enableCard  = false;
  }
  }
  }





  



 