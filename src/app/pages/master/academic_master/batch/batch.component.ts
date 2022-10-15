import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BatchService } from '../batch.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

declare let $: any;

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.scss']
})
export class BatchComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private _batchService: BatchService,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.batchform = this.formBuilder.group({
      name: [null, Validators.required]
    });
    this.getBatchList();
  }

  batchform: FormGroup;
  batchObj: any = {};
  batchArr: any = [];
  batchSubmitted = false;
  buttonText: string = "";
  userName: any;
  BatchId:any;
  get b() { return this.batchform.controls };

  openbatch(content: any) {
    this.buttonText = "Submit";
    this.batchform.reset({});
    this.batchObj = {};
    this.batchSubmitted = false;
    this.modalService.open(content, { size: 'sm' });
  }

  addBatch(modal) {
    this.batchSubmitted = true;
    if (this.batchform.invalid) {
      return;
    }
    if (this.batchObj.id) {
      this.batchform.value.id = this.batchObj.id;
      this._batchService.updateBatch(this.batchform.value).pipe(first()).subscribe(async res => {
        this.getBatchList();
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
    } else {
      this._batchService.createBatch(this.batchform.value).pipe(first()).subscribe(async res => {
        this.getBatchList();
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
    }

  }

  getBatchList() {
    this.spinner.show();
    $('#batch').DataTable().clear().destroy();
    this._batchService.getBatch().pipe(first()).subscribe(res => {
      this.batchArr = res.data;
      $(document).ready(function () {
        $('#batch').DataTable({
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
    this.batchSubmitted = false;
    this._batchService.getSingleBatch(values.id).pipe(first()).subscribe(res => {
      this.batchObj = res.data;
      this.spinner.hide();
    })
    this.modalService.open(content, { size: 'sm' });
  }

  openModal(content, BatchId,){
    if(BatchId){
      this.BatchId = BatchId;
      this.modalService.open(content, { size: 'sm' });  
    }
  }

  deleteData(modal){
    this.spinner.show();
        this.userName = JSON.parse(localStorage.getItem('currentUser')).data.loginObj.userName;
    this._batchService.deleteBatch(this.BatchId,this.userName).pipe(first()).subscribe(res =>{
      this.toastr.success(res.data, 'Success!');
      modal.dismiss('Cross click');
      this.getBatchList();
    },err =>{
      if(err.error.error.reason){
        this.toastr.error(err.error.error.reason);
      }
      modal.dismiss('Cross click');
      this.spinner.hide();
    })
  }
 
}
