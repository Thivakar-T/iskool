import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../department.service';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
declare let $: any;
import { CasteService } from './../caste/caste.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  departmentSubmitted = false;
  buttonText:string = "";
  departmentObj: any = {};
  departmentArr: any = [];
  userName: any;
  departmentId:any;
  departmentForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder, 
    private modalService: NgbModal,
    private CasteService : CasteService,
    private DepartmentService : DepartmentService,

    public toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    public spinner: NgxSpinnerService,     ) { }

  ngOnInit(): void {
    this.departmentForm = this.formBuilder.group({
      name: [null, Validators.required],
      shortName: [null, Validators.required],
    })
    this.getdepartmentList() 
  }
  get f() { return this.departmentForm.controls };

  openModal(content: any) {
    this.buttonText = "Submit";
    this.departmentForm.reset({});
    this.departmentObj = {};
    this.departmentSubmitted = false;
    this.modalService.open(content, { size: 'sm' });

  }

  adddepartment(modal){
    this.departmentSubmitted = true;
    if (this.departmentForm.invalid) {
      return;
    }
    if(this.departmentObj.id){
      this.spinner.show();
      this.departmentForm.value.id = this.departmentObj.id;
      this.DepartmentService.updateData(this.departmentForm.value).pipe(first()).subscribe(async res => {
        this.getdepartmentList();
        this.toastr.success(res.data, 'Success!');
        modal.dismiss('Cross click');
      }, err => {
        this.spinner.hide();
        modal.dismiss('Cross click');
        if (err.error.error.reason) {
          this.toastr.error(err.error.error.reason);
          this.spinner.hide();
        }
      })
    }else{
      this.spinner.show();
      this.DepartmentService.createData(this.departmentForm.value).pipe(first()).subscribe(async res => {
        this.getdepartmentList();
        this.toastr.success(res.data, 'Success!');
        modal.dismiss('Cross click');
      },err =>{
        this.spinner.hide();
        modal.dismiss('Cross click');
        if(err.error.error.reason){
          this.toastr.error(err.error.error.reason);
          this.spinner.hide();
        }
      })
    }
  }
getdepartmentList() {
  this.spinner.show();
      $('#department').DataTable().clear().destroy();
  this.DepartmentService.getData().pipe(first()).subscribe(res => {
    this.departmentArr = res.data;
    $(document).ready(function () {
            $('#department').DataTable({
              "iDisplayLength": 30,
              "lengthMenu":  [10, 25, 30,50,100]

            });
          }); 
    this.spinner.hide();     
  }, err => {
    if (err.error.error.reason) {
      this.toastr.error(err.error.error.reason);
    }
    this.spinner.hide();
  })
}
editdepartment(values, content) {
  this.spinner.show();
  this.buttonText = "Update"
  this.departmentSubmitted = false;
  this.DepartmentService.getidData(values.id).pipe(first()).subscribe(res => {
    this.departmentObj = res.data;
    this.spinner.hide();
  })
  this.modalService.open(content, { size: 'sm' });
}
confirmdelete(data: any){
  this.buttonText = "Submit";
    this.departmentObj = {};
    this.departmentSubmitted = false;
  this.modalService.open(data, { size: 'sm' });

}
openModall(content, departmentId,){
  if(departmentId){
    this.departmentId = departmentId;
    this.modalService.open(content, { size: 'sm' });  
  }
}
deleteData(modal){
  this.spinner.show();
    
  this.DepartmentService.deleteData(this.departmentId).pipe(first()).subscribe((data :any)=>{
    this.toastr.success(data.data, 'Success!');
    modal.dismiss('Cross click');
    this.getdepartmentList(); 
  },err =>{
    if(err.error.error.reason){
      this.toastr.error(err.error.error.reason);
    }
    modal.dismiss('Cross click');
    this.spinner.hide();
  })
}

}
