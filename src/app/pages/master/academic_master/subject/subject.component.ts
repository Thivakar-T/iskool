import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubjectService } from './../subject.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from '../../common-master/category.service';
import { DepartmentService } from '../../common-master/department.service';
// import { SchemeService } from '../scheme.service';
import { GradeListService } from 'src/app/pages/master/common-master/grade-list.service';

declare let $: any;
@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  categoryArr: any = [];
  schemeArr: any = [];
  subjectObj: any = {};
  subjectForm: FormGroup;
  subjectSubmitted = false;
  buttonText: string = "";
  detail: any = []
  userName: any;
  subjectId: any;
  departmentArr: any = [];
  constructor(private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private SubjectService: SubjectService,
    public toastr: ToastrService,
    private _categoryService: CategoryService,
    private DepartmentService: DepartmentService,
    public spinner: NgxSpinnerService,
    public _schemeService:GradeListService,
    ) { }

  ngOnInit(): void {
    this.subjectForm = this.formBuilder.group({
      gradingSchemeId: [null, Validators.required],
      // categoryId: [null, Validators.required],
      departmentId: [null, Validators.required],
      subjectType: [null, Validators.required],

      name: [null, Validators.required],
      code: [null, Validators.required],
      shortName: [null, Validators.required],
     
    })
    this.addsubjectForm();
this.getSchemeList();
    this._categoryService.getCategory().pipe(first()).subscribe(res => {
      this.categoryArr = res.data;
    })

    this.DepartmentService.getData().pipe(first()).subscribe(res => {
      this.departmentArr = res.data;
    })
  }
  get f() { return this.subjectForm.controls };
  // get h() { return this.subjectForm.controls.boardTypeObj as FormGroup };
  openSubject(content: any) {
    this.buttonText = "Submit";
    this.subjectForm.reset({});
    this.subjectObj = {};
    this.subjectSubmitted = false;
    this.modalService.open(content, { size: 'md' });
  }
  

  getSchemeList() {
    this._schemeService.getGrading().pipe(first()).subscribe(res => {
      this.schemeArr = res.data;
    })
  }
  // addsubjectForm(modal) {
  //   this.subjectSubmitted = true;
  //   if (this.subjectForm.invalid) {
  //     return;
  //   }


    // if (this.subjectObj.id) {
    // this.subjectForm.value.id = this.subjectObj.id;
    // this.SubjectService.updatesubject(this.subjectObj).pipe(first()).subscribe(async res => {
    // this.getsubject();
    // this.toastr.success(res.data, 'Success!');
    // modal.dismiss('Cross click');
    // }, err => {
    // if (err.error.error.reason) {
    // this.toastr.error(err.error.error.reason);
    // }
    // this.spinner.hide();
    // })
    // }
    // else {
    // this.SubjectService.createData(this.subjectObj).pipe(first()).subscribe(async res => {
    // this.toastr.success(res.data, 'Success!');
    // modal.dismiss('Cross click');
    // }, err => {
    // if (err.error.error.reason) {
    // this.toastr.error(err.error.error.reason);
    // }
    // this.spinner.hide();
    // })



  //   this.SubjectService.createData(this.subjectForm.value).pipe(first()).subscribe(async res => {
  //     this.getsubject();
  //     this.toastr.success(res.data, 'Success!');
  //     modal.dismiss('Cross click');
  //   }, err => {
  //     if (err.error.error.reason) {
  //       this.toastr.error(err.error.error.reason);
  //     }
  //     this.spinner.hide();
  //   })

  // }
  addsubjectForm() {
    this.spinner.show();
    $('#subject').DataTable().clear().destroy();
    this.SubjectService.getData().pipe(first()).subscribe(res => {
      this.detail = res.data;
      $(document).ready(function () {
        $('#subject').DataTable({
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
  addVehicle(modal) {
    // this.spinner.show();
    this.subjectSubmitted = true;
    if (this.subjectForm.invalid) {
      return;
    }
    this.spinner.show();
  if(this.subjectObj.id){
    this.subjectForm.value.id = this.subjectObj.id;
    this.SubjectService.createData(this.subjectForm.value).pipe(first()).subscribe(async res => {
      this.addsubjectForm();
      this.toastr.success(res.data, 'Success!');
      modal.dismiss('Cross click');
    },err => {
      this.spinner.show();
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
      }
      this.spinner.hide();
    })
  }else{
    this.SubjectService.createData(this.subjectForm.value).pipe(first()).subscribe(async res => {
      this.addsubjectForm();
      this.toastr.success(res.data, 'Success!');
      modal.dismiss('Cross click');
      this.spinner.hide();

    }, err => {
      this.spinner.show();
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
      }
      this.spinner.hide();
    })
  }
  }
  // addVehicle(modal) {
  //   this.subjectSubmitted = true;
  
  //     if (this. subjectObj.id) {
  //       this.addsubjectForm.value.id = this. subjectObj.id;
  //     } if (this.subjectObj.id) {
  //       this.addsubjectForm.value.id = this.subjectObj.id;
  
  //       this.SubjectService.updatesubject(this.addsubjectForm.value).pipe(first()).subscribe(async res => {
  //         this.addsubjectForm();
  //         this.toastr.success(res.data, 'Success!');
  //         modal.dismiss('Cross click');
  //       })
  //     } else {
  //       this.SubjectService.createData(this.addsubjectForm.value).pipe(first()).subscribe(async res => {
  //         this.addsubjectForm();
  //         this.toastr.success(res.data, 'Success!');
  //         modal.dismiss('Cross click');
  //       }), err => {
  //         if (err.error.error.reason) {
  //           this.toastr.error(err.error.error.reason);
  //           this.spinner.hide();
  //         }
  //       }
  //     }

  // }
  // editBatch(values, content) {
  //   this.spinner.show();
  //   this.buttonText = "Update"
  //   this.subjectSubmitted = false;
  //   this.SubjectService.getidData(values.id).pipe(first()).subscribe(res => {
  //     this.subjectObj = res.data;
  //     this.spinner.hide();
  //   })
  //   this.modalService.open(content, { size: 'md' });
  // }
  editBatch(values, content) {
    this.spinner.show();
    this.buttonText = "Update"
    this.subjectSubmitted = false;
    this.SubjectService.getidData(values.id).pipe(first()).subscribe(res => {
      this.subjectObj = res.data;
      this.spinner.hide();
    },err => {
      this.spinner.show();
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
      }
      this.spinner.hide();
    })
    this.modalService.open(content, { size: 'md' });
  }
  openModal(content, subjectId,) {
    if (subjectId) {
      this.subjectId = subjectId;
      this.modalService.open(content, { size: 'sm' });
    }
  }
  deleteData(modal) {
    // this.userName = JSON.parse(localStorage.getItem('currentUser')).data.loginObj.userName;
    this.SubjectService.deletesubject(this.subjectId).pipe(first()).subscribe(res => {
      this.toastr.success(res.data, 'Success!');
      modal.dismiss('Cross click');
      this.addsubjectForm();
    },err => {
      this.spinner.show();
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
      }
      this.spinner.hide();
    })
  }
}