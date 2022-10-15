import { Component, OnInit } from '@angular/core';
import { StandardService } from './../standard.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs/operators'; 
declare let $: any;

@Component( {
  selector: 'app-standard',
  templateUrl: './standard.component.html',
  styleUrls: ['./standard.component.scss']
})
export class StandardComponent implements OnInit {
  countArr: any = [];
  degreeArr: any = ['b.sc', 'b.com'];
  standardObj: any = {};
  standardForm: FormGroup;
  BatchSubmitted = false;
  id: any;
  buttonText: string = "";
  userName: any;
  rows: any;
  constructor(private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private StandardService: StandardService,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService,) { }

    ngOnInit(): void {
      this.standardForm = this.formBuilder.group({
        name: [null, Validators.required]
      })
      this.getBatchList();
  
  
    }
    get f() { return this.standardForm.controls };
  
    openGST(content: any) {
      this.buttonText = "Submit";
      this.standardForm.reset({});
      this. standardObj = {};
      this.BatchSubmitted = false;
      this.modalService.open(content, { size: 'sm' });
    }
  
    submit(modal) {
      this.BatchSubmitted = true;
    if (this.standardForm.invalid) {
      return;
    }
       if (this.standardObj.id) {
        this.standardForm.value.id = this.standardObj.id;
  
        this.StandardService.updateBatch(this.standardForm.value).pipe(first()).subscribe(async res => {
          this.getBatchList();
          this.toastr.success(res.data, 'Success!');
          modal.dismiss('Cross click');
        }, err => {
          if (err.error.error.reason) {
            this.toastr.error(err.error.error.reason);
          }
          this.spinner.hide();
        })
      } else {
        this.StandardService.createBatch(this.standardForm.value).pipe(first()).subscribe(async res => {
          this.getBatchList();
          this.toastr.success(res.data, 'Success!');
          modal.dismiss('Cross click');
        }, err => {
          if (err.error.error.reason) {
            this.toastr.error(err.error.error.reason);
          }
          this.spinner.hide();
        })
      }
  
    }
  
    getBatchList() {
      this.spinner.show();
      $('#standard').DataTable().clear().destroy();
      this.StandardService.getAllUsers().pipe(first()).subscribe(res => {
        this.countArr = res.data;
        $(document).ready(function () {
          $('#standard').DataTable({
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
  
  
  
    editStandard(values, content) {
      this.spinner.show();
      this.buttonText = "Update"
      this.BatchSubmitted = false;
      this.StandardService.getSingleBatch(values.id).pipe(first()).subscribe(res => {
        this.standardObj = res.data;
        // this.toastr.success(res.message, 'Success!');
        this.spinner.hide();
      })
      this.modalService.open(content, { size: 'sm' });
    }
  
    confirmdelete(data: any) {
      this.buttonText = "Submit";
      this.standardObj = {};
      this.BatchSubmitted = false;
      this.modalService.open(data, { size: 'sm' });
    }
  
    // deleteData(id:any,data){
    //   var userName = JSON.parse(localStorage.getItem('currentUser')).data.loginObj.userName;
    //   this.modalService.open(data, { size: 'sm' });
    //   this.BloodgroupService.deleteData(id , userName ).subscribe((data :any) => {
    //     this.ngOnInit();
    //   });
    //   }
  
    openModal(content, rows,) {
      if (rows) {
        this.rows = rows;
        this.modalService.open(content, { size: 'sm' });
      }
    }
  
    deleteData(modal) {
      this.spinner.show();
      this.userName = JSON.parse(localStorage.getItem('currentUser')).data.loginObj.userName;
      this.StandardService.deleteData(this.rows, this.userName).pipe(first()).subscribe((res:any) => {
        this.toastr.success(res.data, 'Success!');
        modal.dismiss('Cross click');
        this.getBatchList();
      }, err => {
        if (err.error.error.reason) {
          this.toastr.error(err.error.error.reason);
        }
        modal.dismiss('Cross click');
        this.spinner.hide();
      })
    }

}
