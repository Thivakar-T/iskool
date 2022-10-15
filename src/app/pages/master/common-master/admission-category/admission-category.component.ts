import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators  } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { AdmissionCategoryService } from '../admission-category.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
declare let $: any;
@Component({
  selector: 'app-admission-category',
  templateUrl: './admission-category.component.html',
  styleUrls: ['./admission-category.component.scss']
})
export class AdmissionCategoryComponent implements OnInit {

  
  admissionObj: any = {};
  admissionForm: FormGroup;
  admissionSubmitted = false;
  buttonText:string = "";
  array:any=[];
  userName:any;
  Id:any;
  constructor(private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService, private AdmissionCategoryService: AdmissionCategoryService) { }
  

  ngOnInit(): void {
    this.admissionForm = this.formBuilder.group({
      name: [null, Validators.required],
    })
    this.getCategory();
  }

  get f() { return this.admissionForm.controls };

  openModal(content: any) {
    this.buttonText = "Submit";
    this.admissionForm.reset({});
    this.admissionObj = {};
    this.admissionSubmitted = false;
    this.modalService.open(content, { size: 'sm' });
  }
  
  

  addAdmission(modal){
    this.admissionSubmitted = true;
    if(this.admissionForm.invalid){
      return;
    }
    if(this.admissionObj.id){
      this.admissionForm.value.id = this.admissionObj.id;
      this.AdmissionCategoryService.updateData(this.admissionForm.value).pipe(first()).subscribe(async res => {
        this.getCategory();
        this.toastr.success(res.data, 'Success!');
        modal.dismiss('Cross click');
      }, err => {
        if (err.error.error.reason) {
          this.toastr.error(err.error.error.reason);
        }
        this.spinner.hide();
      });
    }
    else{
    this.AdmissionCategoryService.createData(this.admissionForm.value).pipe(first()).subscribe(async res => {
      this.getCategory();
      this.toastr.success(res.data, 'Success!');
        modal.dismiss('Cross click');
      }, err => {
        if (err.error.error.reason) {
          this.toastr.error(err.error.error.reason);
        }
        this.spinner.hide();
      });
    }
  }
  getCategory(){
    this.spinner.show();
    $('#admissioncategory').DataTable().clear().destroy();
      this.AdmissionCategoryService.getData().pipe(first()).subscribe(res => {
        this.array = res.data;
        $(document).ready(function () {
          $('#admissioncategory').DataTable({
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
  editCategory(values, content){
    this.spinner.show();
      this.buttonText = "Update"
      this.admissionSubmitted = false;
      this.AdmissionCategoryService.editData(values.id).pipe(first()).subscribe(res => {
        this.admissionObj = res.data;
        // this.toastr.success(res.message, 'Success!');
        this.spinner.hide();
      }, err => {
        if (err.error.error.reason) {
          this.toastr.error(err.error.error.reason);
        }
        this.spinner.hide();
      })
      this.modalService.open(content, { size: 'sm' });
  }
  deleteCategory(data,Id){
    if(Id){
      this.Id = Id;
   this.modalService.open(data, { size: 'sm' });
    }
  }
    Ok(modal){
      this.spinner.show();
      this.userName = JSON.parse(localStorage.getItem('currentUser')).data.loginObj.userName;
      this.AdmissionCategoryService.deleteData(this.Id, this.userName).subscribe(async res => {
        this.toastr.success(res.data, 'Success!');
        modal.dismiss('Cross click');
        this.getCategory();
       
    },err =>{
      if(err.error.error.reason){
        this.toastr.error(err.error.error.reason);
      }
      modal.dismiss('Cross click');
      this.spinner.hide();
    });
    
}
}
