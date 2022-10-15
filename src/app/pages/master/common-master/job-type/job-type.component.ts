import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators  } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobTypeService } from './../job-type.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

declare let $: any;
@Component({
  selector: 'app-job-type',
  templateUrl: './job-type.component.html',
  styleUrls: ['./job-type.component.scss']
})
export class JobTypeComponent implements OnInit {

  jobTypeObj: any = {};
  jobTypeForm: FormGroup;
  jobTypeSubmitted = false;
  buttonText:string = "";
  array:any = []
name:any
jobid:any

  constructor(private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService, private JobTypeService: JobTypeService,) { }
  

  ngOnInit(): void {
    this.jobTypeForm = this.formBuilder.group({
      name: [null, Validators.required],
    })
    this.getjob();
  }

  get f() { return this.jobTypeForm.controls };

  openModal(content: any) {
    this.buttonText = "Submit";
    this.jobTypeForm.reset({});
    this.jobTypeObj = {};
    this.jobTypeSubmitted = false;
    this.modalService.open(content, { size: 'sm' });
  }
  confirmdelete(data: any){
    this.modalService.open(data, { size: 'sm' });
 
  }

  addJobType(modal){
    this.jobTypeSubmitted = true;
    if(this.jobTypeForm.invalid){
      return;
    }
    if(this.jobTypeObj.id){
      this.jobTypeForm.value.id = this.jobTypeObj.id;
      this.JobTypeService.updateData(this.jobTypeForm.value).pipe(first()).subscribe(async res => {
        this.getjob();
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
    this.JobTypeService.createData(this.jobTypeForm.value).pipe(first()).subscribe(async res => {
      this.getjob();
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
  getjob(){
    this.spinner.show();
    $('#jobtype').DataTable().clear().destroy();
      this.JobTypeService.getData().pipe(first()).subscribe(res => {
        this.array = res.data;
    
        $(document).ready(function () {
          $('#jobtype').DataTable({
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
  editjob(values, content){
    this.spinner.show();
      this.buttonText = "Update"
      this.jobTypeSubmitted = false;
      this.JobTypeService.getidData(values.id).pipe(first()).subscribe(res => {
        this.jobTypeObj = res.data;
        this.spinner.hide();
      })
      this.modalService.open(content, { size: 'sm' });
  }
  opendModal(content, jobid){
    if(jobid){
      this.jobid = jobid;
      this.modalService.open(content, { size: 'sm' });  
    }
  }
  deleteData(modal){
    this.JobTypeService.deleteData(this.jobid, this.name).subscribe((data :any) => {
      this.toastr.success(data.data, 'Success!');
      modal.dismiss('Cross click');
      this.getjob();
    });      
}

}
