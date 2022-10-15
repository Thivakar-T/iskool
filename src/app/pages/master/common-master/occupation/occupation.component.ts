import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OccupationService } from './occupation.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
declare let $: any;
@Component({
  selector: 'app-Occupation',
  templateUrl: './Occupation.component.html',
  styleUrls: ['./Occupation.component.scss']
})
export class OccupationComponent implements OnInit {
  countryArr: any = [];
  degreeArr: any = ['b.sc', 'b.com'];
  OccupationObj: any = {};
  OccupationArr: any = [];
  OccupationForm: FormGroup;
  OccupationSubmitted = false;
  buttonText: string = "";
  userName: any;
  OccupationId:any;

  constructor(private formBuilder: FormBuilder,
    private modalService: NgbModal, 
    private OccupationService: OccupationService,
     public toastr: ToastrService,
    public spinner: NgxSpinnerService,) { }

  ngOnInit(): void {
    this.getOccupationList()
    this.OccupationForm = this.formBuilder.group({
      name: [null, Validators.required]
    })

  }
  get f() { return this.OccupationForm.controls };

  openGST(content: any) {
    this.buttonText = "Submit";
    this.OccupationForm.reset({});
    this.OccupationObj = {};
    this.OccupationSubmitted = false;
    this.modalService.open(content, { size: 'sm' });
  }

  addOccupation(modal) {
    this.OccupationSubmitted = true;
    if (this.OccupationForm.invalid) {
      return;
    }
    if (this.OccupationObj.id) {
      this.OccupationForm.value.id = this.OccupationObj.id;
      this.OccupationService.updateOccupation(this.OccupationForm.value).pipe(first()).subscribe(async res => {
        this.getOccupationList();
        this.toastr.success(res.data, 'Success!');
        modal.dismiss('Cross click');
      }, err => {
        if (err.error.error.reason) {
          this.toastr.error(err.error.error.reason);
        }
        this.spinner.hide();
      })
    } else {
      this.OccupationService.createOccupation(this.OccupationForm.value).pipe(first()).subscribe(async res => {
        this.getOccupationList();
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

  getOccupationList() {
    this.spinner.show();
    $('#occupation').DataTable().clear().destroy();
    this.OccupationService.getOccupation().pipe(first()).subscribe(res => {
      this.OccupationArr = res.data;
     $(document).ready(function () {
        $('#occupation').DataTable({
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
  editOccupation(values, content) {
    this.spinner.show();
    this.buttonText = "Update"
    this.OccupationSubmitted = false;
    this.OccupationService.getSingleOccupation(values.id).pipe(first()).subscribe(res => {
      this.OccupationObj = res.data;
      this.spinner.hide();
    })
    this.modalService.open(content, { size: 'sm' });
  }

  openModal(content, OccupationId,){
    if(OccupationId){
      this.OccupationId = OccupationId;
      this.modalService.open(content, { size: 'sm' });  
    }
  }

  deleteData(modal){
    this.spinner.show();
      this.userName = JSON.parse(localStorage.getItem('currentUser')).data.loginObj.userName;
    this.OccupationService.deleteData(this.OccupationId,this.userName).pipe(first()).subscribe((data: any) =>{
      this.toastr.success(data.data, 'Success!');
      modal.dismiss('Cross click');
      this.getOccupationList();
    },err =>{
      if(err.error.error.reason){
        this.toastr.error(err.error.error.reason);
      }
      modal.dismiss('Cross click');
      this.spinner.hide();
    })
  }
  
}
