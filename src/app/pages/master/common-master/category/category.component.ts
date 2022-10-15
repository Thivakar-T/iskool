import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators  } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../category.service';

declare let $: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  termForm: FormGroup;
  CategoryArr: any = [];

  categoryObj: any = {};
  termSubmitted = false;
  userName: any;
  categoryData:any;
  userId: any;
  buttonText:string = "";

  constructor(private formBuilder: FormBuilder, 
    private modalService: NgbModal,
    public toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private _categoryService: CategoryService,

    ) { }

  ngOnInit(): void {
    this.termForm = this.formBuilder.group({
      name: [null, Validators.required],
    })
    this.getcategory();
    this.userId = JSON.parse(localStorage.getItem('currentUser')).data.loginObj.userId;

  }
  get f() { return this.termForm.controls };

  openModal(content: any) {
    this.buttonText = "Submit";
    this.termSubmitted = false;
    this.termForm.reset({});
      this.categoryObj = {};
    this.modalService.open(content, { size: 'sm' });
  }
  
  getcategory() {
    this.spinner.show();
    $('#category').DataTable().clear().destroy();
    this._categoryService.getCategory().pipe(first()).subscribe(res => {
      this.CategoryArr = res.data;
      $(document).ready(function () {
        $('#category').DataTable({
          "iDisplayLength": 30,
          "lengthMenu":  [10, 25, 30,50,100]

        });
      });
      this.spinner.hide();
    }, err => {
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
        this.spinner.hide();
      }
    })
  }

  addterm(modal){
    this.termSubmitted = true;
    if(this.termForm.invalid){
      return;
    }
    
    if (this.categoryObj.id) {
      this._categoryService.updateCategory(this.categoryObj).pipe(first()).subscribe(res => {
        this.getcategory();
        this.toastr.success(res.data, 'Success!');
        modal.dismiss('Cross click');
        this.spinner.hide();
      }, err => {
        if (err.error.error.reason) {
          this.toastr.error(err.error.error.reason);
        }
        this.spinner.hide();
      })
    }
    else {
      // this.degreeform.value.createdBy = this.userId;
      this._categoryService.createCategory(this.categoryObj).pipe(first()).subscribe(res => {
        this.getcategory();
        this.toastr.success(res.data, 'Success!');
        modal.dismiss('Cross click');
        this.spinner.hide();
      }, err => {
        if (err.error.error.reason) {
          this.toastr.error(err.error.error.reason);
        }
        this.spinner.hide();
      })
    }
  }
 
 
  editCategory(values, content) {
    this.spinner.show()
    this.buttonText = "Update"
    this.termSubmitted = false;
    this._categoryService.getSingleCategory(values.id).pipe(first()).subscribe(res => {
      this.categoryObj = res.data;
      this.spinner.hide();
    })
    this.modalService.open(content, { size: 'sm' });
  }
  openCat(content, categoryData,){
    if(categoryData){
    this.categoryData = categoryData;
    this.modalService.open(content, { size: 'sm' });
    }
    }
    
    deleteData(modal){
    this.spinner.show();
    this.userName = JSON.parse(localStorage.getItem('currentUser')).data.loginObj.userName;
    this._categoryService.deleteCategory(this.categoryData,this.userName).pipe(first()).subscribe(res =>{
    this.toastr.success(res.data, 'Success!');
    modal.dismiss('Cross click');
    this.getcategory();
  },err =>{
    if(err.error.error.reason){
    this.toastr.error(err.error.error.reason);
    }
    modal.dismiss('Cross click');
    this.spinner.hide();
    })
    }
  // deleteData(values){
  //   this.userName = JSON.parse(localStorage.getItem('currentUser')).data.loginObj.userName;
  //   if(confirm("Are you sure want to delete ")) {
  //   this._categoryService.deleteCategory(values.id, this.userName).pipe(first()).subscribe(res => {
  //   this.ngOnInit();
  //   });
  //   }
  //   }

}
