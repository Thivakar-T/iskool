import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShiftService } from './shift.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
declare let $: any;
@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.scss']
})
export class ShiftComponent implements OnInit {
  countryArr: any = [];
  shiftObj: any = {};
  shiftArr: any = [];
  shiftForm: FormGroup;
  shiftSubmitted = false;
  buttonText:string = "";
  userName: any;
  shiftId:any;
  constructor(private formBuilder: FormBuilder,
    private modalService: NgbModal, private ShiftService: ShiftService, public toastr: ToastrService,
    public spinner: NgxSpinnerService,) { }

  ngOnInit(): void {
    this.getShiftList()
    this.shiftForm = this.formBuilder.group({
      name: [null, Validators.required]

    })

  }
  get f() { return this.shiftForm.controls };

  openGST(content: any) {
   
    this.buttonText = "Submit";
    this.shiftForm.reset({});
    this.shiftObj = {};
    this.shiftSubmitted = false;
    this.modalService.open(content, { size: 'sm' });
  }

  addShift(modal) {
    this.shiftSubmitted = true;
    if (this.shiftForm.invalid) {
      return;
    }
    if (this.shiftObj.id) {
      this.shiftForm.value.id = this.shiftObj.id;
      this.ShiftService.updateShift(this.shiftForm.value).pipe(first()).subscribe(async res => {
        this.getShiftList();
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
      this.ShiftService.createShift(this.shiftForm.value).pipe(first()).subscribe(async res => {
        this.getShiftList();
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
  getShiftList() {
    this.spinner.show();
    $('#example').DataTable().clear().destroy();
    this.ShiftService.getShift().pipe(first()).subscribe(res => {
      this.shiftArr = res.data;
      $(document).ready(function () {
        $('#example').DataTable({
          "iDisplayLength": 100
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
  editShift(values, content) {
    this.spinner.show();
    this.buttonText = "Update"
    this.shiftSubmitted = false;
    this.ShiftService.getSingleShift(values.id).pipe(first()).subscribe(res => {
      this.shiftObj = res.data;
      this.spinner.hide();
    })
    this.modalService.open(content, { size: 'sm' });
  }

  openModal(content, shiftId,){
    if(shiftId){
      this.shiftId = shiftId;
      this.modalService.open(content, { size: 'sm' });  
    }
  }

  deleteData(modal){
    this.spinner.show();
      this.userName = JSON.parse(localStorage.getItem('currentUser')).data.loginObj.userName;
    this.ShiftService.deleteData(this.shiftId,this.userName).pipe(first()).subscribe((res:any) =>{
      this.toastr.success(res.data, 'Success!');
      modal.dismiss('Cross click');
      this.getShiftList();
    },err =>{
      if(err.error.error.reason){
        this.toastr.error(err.error.error.reason);
      }
      modal.dismiss('Cross click');
      this.spinner.hide();
    })
  }
  
}
