import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BloodgroupService } from '../bloodgroup.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs/operators';
declare let $: any;

@Component({
  selector: 'app-./blood-group.',
  templateUrl: './blood-group.component.html',
  styleUrls: ['./blood-group.component.scss']
})
export class BloodGroupComponent implements OnInit {
  countArr: any = [];
  degreeArr: any = ['b.sc', 'b.com'];
  batchObj: any = {};
  BatchForm: FormGroup;
  BatchSubmitted = false;
  id: any;
  buttonText: string = "";
  userName: any;
  rows: any;
  // shiftSubmitted = true;
  constructor(private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private BloodgroupService: BloodgroupService,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.BatchForm = this.formBuilder.group({
      name: [null, Validators.required]
    })
    this.getBatchList();


  }
  get f() { return this.BatchForm.controls };

  openGST(content: any) {
    this.buttonText = "Submit";
    this.BatchForm.reset({});
    this.batchObj = {};
    this.BatchSubmitted = false;
    this.modalService.open(content, { size: 'sm' });
  }

  submit(modal) {
    this.BatchSubmitted = true;
    if(this.BatchForm.invalid){
      return;
      }
    if (this.batchObj.id) {
      this.BatchForm.value.id = this.batchObj.id;
      this.BloodgroupService.updateBatch(this.BatchForm.value).pipe(first()).subscribe(async res => {
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
      this.BloodgroupService.createBatch(this.BatchForm.value).pipe(first()).subscribe(async res => {
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
    $('#bloodgroup').DataTable().clear().destroy();
    this.BloodgroupService.getAllUsers().pipe(first()).subscribe(res => {
      this.countArr = res.data;
       $(document).ready(function () {
        $('#bloodgroup').DataTable({
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



  editBatch(values, content) {
    this.spinner.show();
    this.buttonText = "Update"
    this.BatchSubmitted = false;
    this.BloodgroupService.getSingleBatch(values.id).pipe(first()).subscribe(res => {
      this.batchObj = res.data;
      this.spinner.hide();
    })
    this.modalService.open(content, { size: 'sm' });
  }

  confirmdelete(data: any) {
    this.buttonText = "Submit";
    this.batchObj = {};
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

  deleteData(dmodal) {
    this.spinner.show();
    this.userName = JSON.parse(localStorage.getItem('currentUser')).data.loginObj.userName;
    this.BloodgroupService.deleteData(this.rows, this.userName).pipe(first()).subscribe((data: any) => {
      this.toastr.success(data.data, 'Success!');
      dmodal.dismiss('Cross click');
      this.getBatchList();
    }, err => {
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
      }
      dmodal.dismiss('Cross click');
      this.spinner.hide();
    })
  }
}
