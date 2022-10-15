import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AcadamicBatchService } from '../acadamic-batch.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs/operators';
declare let $: any;

@Component({
  selector: 'app-acadamic-batch',
  templateUrl: './acadamic-batch.component.html',
  styleUrls: ['./acadamic-batch.component.scss']
})
export class AcadamicBatchComponent implements OnInit {
  countryArr: any = [];
  degreeArr: any = ['b.sc', 'b.com'];
  batchObj: any = {};
  BatchForm: FormGroup;
  BatchSubmitted = false;
  id: any;
  buttonText: string = "";
  userName: any;
  schemeId: any;
  constructor(private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private AcadamicBatchService: AcadamicBatchService,
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
    if (this.BatchForm.invalid) {
      return;
    }
    if (this.batchObj.id) {
      this.BatchForm.value.id = this.batchObj.id;
    } if (this.batchObj.id) {
      this.BatchForm.value.id = this.batchObj.id;

      this.AcadamicBatchService.updateBatch(this.BatchForm.value).pipe(first()).subscribe(async res => {
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
      this.AcadamicBatchService.createBatch(this.BatchForm.value).pipe(first()).subscribe(async res => {
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
    $('#acadamicbatch').DataTable().clear().destroy();
    this.AcadamicBatchService.getAllUsers().pipe(first()).subscribe(res => {
      this.countryArr = res.data;
      $(document).ready(function () {
        $('#acadamicbatch').DataTable({
          "iDisplayLength": 30,
          "lengthMenu":  [10, 25, 30,50,100]

        });
      });
      this.spinner.hide();
    }, err => {
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
      } this.spinner.hide();
    })
  }


  editBatch(values, content) {
    this.spinner.show();
    this.buttonText = "Update"
    this.BatchSubmitted = false;
    this.AcadamicBatchService.getSingleBatch(values.id).pipe(first()).subscribe(res => {
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
  openModal(content, schemeId,) {
    if (schemeId) {
      this.schemeId = schemeId;
      this.modalService.open(content, { size: 'sm' });
    }
  }

  deleteData(modal) {
    this.userName = JSON.parse(localStorage.getItem('currentUser')).data.loginObj.userName;
    this.AcadamicBatchService.deleteData(this.schemeId, this.userName).pipe(first()).subscribe((res:any) => {
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
