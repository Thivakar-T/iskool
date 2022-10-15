import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr'; 
import { NgxSpinnerService } from 'ngx-spinner';
declare let $: any;
import { AcadamicYearService } from './acadamic-year.service';

@Component({
  selector: 'app-academic-year',
  templateUrl: './academic-year.component.html',
  styleUrls: ['./academic-year.component.scss']
})
export class AcademicYearComponent implements OnInit {
  batchObj: any = {};
  BatchSubmitted = false;
  BatchForm: FormGroup;
  buttonText: string = "";
  BatchArr: any = [];
  BatchId: any;
  constructor(private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private AcadamicYearService: AcadamicYearService,

    public toastr: ToastrService,  
    private router: Router,
    private route: ActivatedRoute ,
    public spinner: NgxSpinnerService,) { }

  ngOnInit(): void {
    this.BatchForm = this.formBuilder.group({
      name: [null, [Validators.required,Validators.pattern("^[0-9-]*$")]],
      shortName: [null, [Validators.required,Validators.pattern("^[0-9-]*$")]],
      fromDate: [null, Validators.required],
      toDate: [null,Validators.required]

    })
    this.getBatchList()
  }
  get f() { return this.BatchForm.controls };

  openModal(content: any) {
    this.buttonText = "Submit";
    this.BatchForm.reset({});
    this.batchObj = {};
    this.BatchSubmitted = false;
    this.modalService.open(content, { size: 'md' });
  }




  addYear(modal) {
    this.BatchSubmitted = true;
    if (this.BatchForm.invalid) {
      return;
    }
    // if(this.BatchForm.value.fromDate > this.BatchForm.value.toDate){
    //   this.spinner.show();
    //   this.toastr.success("From date must be lower than to date", 'Warning!');
    //   this.spinner.hide();
    //   return;
    // }
      this.BatchForm.value.fromDate = this.BatchForm.value.fromDate.day + '/' + this.BatchForm.value.fromDate.month + '/' + this.BatchForm.value.fromDate.year;
      this.BatchForm.value.toDate = this.BatchForm.value.toDate.day + '/' + this.BatchForm.value.toDate.month + '/' + this.BatchForm.value.toDate.year;
    this.BatchSubmitted = true;
    
    if (this.batchObj.id) {
      this.BatchForm.value.id = this.batchObj.id;
      this.AcadamicYearService.updateData(this.BatchForm.value).pipe(first()).subscribe(async res => {
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
      this.AcadamicYearService.createData(this.BatchForm.value).pipe(first()).subscribe(async res => {

        this.getBatchList();
        this.toastr.success(res.data, 'Success!');
        modal.dismiss('Cross click');
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
        modal.dismiss('Cross click');
        if (err.error.error.reason) {
          this.toastr.error(err.error.error.reason);
        }
      })
    }
  }
  getBatchList() {
     this.spinner.show();
    $('#academic').DataTable().clear().destroy();
    this.AcadamicYearService.getData().pipe(first()).subscribe(res => {
      this.BatchArr = res.data;
      $(document).ready(function () {
        $('#academic').DataTable({
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
    this.AcadamicYearService.getidData(values.id).pipe(first()).subscribe(res => {
      if (res.data.toDate) {
        var toDate = res.data.toDate.split('/');
        let date1 = new Date(toDate[1] + '-' + toDate[0] + ' ' + toDate[2]);
        res.data.toDate = { year: date1.getFullYear(), month: date1.getMonth() + 1, day: date1.getDate() };
      }
      if (res.data.fromDate) {
        var fromDate = res.data.fromDate.split('/');
        let date1 = new Date(fromDate[1] + '-' + fromDate[0] + ' ' + fromDate[2]);
        res.data.fromDate = { year: date1.getFullYear(), month: date1.getMonth() + 1, day: date1.getDate() };
      }
      this.batchObj = res.data;
      this.spinner.hide();
    })
    this.modalService.open(content, { size: 'md' });
  }
  confirmdelete(data: any) {
    this.buttonText = "Submit";
    this.batchObj = {};
    this.BatchSubmitted = false;
    this.modalService.open(data, { size: 'sm' });

  }
  openModall(content, BatchId,) {
    if (BatchId) {
      this.BatchId = BatchId;
      this.modalService.open(content, { size: 'sm' });
    }
  }
  deleteData(modal) {
    this.spinner.show();

    this.AcadamicYearService.deleteData(this.BatchId).pipe(first()).subscribe((data: any) => {
      this.toastr.success(data.data, 'Success!');
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

