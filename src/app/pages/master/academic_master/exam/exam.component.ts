import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators  } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ExamService } from '../exam.service';
declare let $: any;


@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {
  
  examForm: FormGroup;
  CategoryArr: any = [];
  detail: any = [];

  examObj: any = {};
  termSubmitted = false;
  userName: any;
  categoryData:any;
  userId: any;
  examId:any;
  buttonText:string = "";

  constructor(
    private formBuilder: FormBuilder, 
    private examService : ExamService,
    private modalService: NgbModal,
    public toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }

 
  ngOnInit(): void {
    this.examForm = this.formBuilder.group({
      examName: [null, Validators.required],
      shortName: [null, Validators.required],
      description: [null,Validators.required],

    })
    this.userId = JSON.parse(localStorage.getItem('currentUser')).data.loginObj.userId;
  this. examtable();
  }
  get f() { return this.examForm.controls };

  openModal(content: any) {
    this.buttonText = "Submit";
    this.termSubmitted = false;
    this.examForm.reset({});
      this.examObj = {};
    this.modalService.open(content, { size: 'sm' });
  }
  

  openCat(content, categoryData,){
    if(categoryData){
    this.categoryData = categoryData;
    this.modalService.open(content, { size: 'sm' });
    }
    }
    
    examtable() {
      this.spinner.show();
      $('#exam').DataTable().clear().destroy();
      this.examService.getData().pipe(first()).subscribe(res => {
        this.detail = res.data;
        $(document).ready(function () {
          $('#exam').DataTable({
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
    addExam(modal){
      this.termSubmitted = true;
      if (this.examForm.invalid) {
        return;
      }
    if(this.examObj.id){
      this.examForm.value.id = this.examObj.id;
      this.examService.updateexam(this.examForm.value).pipe(first()).subscribe(async res => {
        this.examtable();
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
      this.examService.createData(this.examForm.value).pipe(first()).subscribe(async res => {
        this.examtable();
        this.toastr.success(res.data, 'Success!');
        modal.dismiss('Cross click');
      },err => {
        if (err.error.error.reason) {
          this.toastr.error(err.error.error.reason);
        }
        this.spinner.hide();
      })
    }
  
  }
  editExam(values, content) {
    this.spinner.show();
    this.buttonText = "Update"
    this.termSubmitted = false;
    this.examService.getidData(values.id).pipe(first()).subscribe(res => {
      this.examObj = res.data;
      this.spinner.hide();
    },err => {
      this.spinner.show();
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
      }
      this.spinner.hide();
    })
    this.modalService.open(content, { size: 'sm' });
  }

  openmodal(content, examId,) {
    if (examId) {
      this.examId = examId;
      this.modalService.open(content, { size: 'sm' });
    }
  }

  deleteData(modal) {
    this.userName = JSON.parse(localStorage.getItem('currentUser')).data.loginObj.userName;
    this.examService.deleteexam(this.examId,this.userName).pipe(first()).subscribe((data: any) =>{
      this.toastr.success(data.data, 'Success!');
      modal.dismiss('Cross click');
      this.examtable();
    },err => {
      this.spinner.show();
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
      }
      this.spinner.hide();
    })
  }
}
