import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DegreeService } from '../degree.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

declare let $: any;

@Component({
  selector: 'app-degree',
  templateUrl: './degree.component.html',
  styleUrls: ['./degree.component.scss']
})
export class DegreeComponent implements OnInit {
  
  degreeArr: any = [];
  userId: any;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private _degreeService: DegreeService,


  ) {

   }
   degreeform: FormGroup
   degreeSubmitted = false;
   degreeObj: any = {};
   userName: any;
   degreeData: any;
   buttonText:string = "";

  ngOnInit(): void {
    this.degreeform = this.formBuilder.group({
      name: [null, Validators.required]
    
    })
    this.userId = JSON.parse(localStorage.getItem('currentUser')).data.loginObj.userId;

    this.getdegree();
  }
  get b() { return this.degreeform.controls };


  opendegree(content: any) {
    this.buttonText = "Submit";
    this.degreeform.reset({});
    this.degreeSubmitted = false;
      this.degreeObj = {};
      this.modalService.open(content, { size: 'sm' });
    }
    
    
  getdegree( ) {
    this.spinner.show();
    $('#degree').DataTable().clear().destroy();
    this._degreeService.getDegree().pipe(first()).subscribe(res => {
      this.degreeArr = res.data;
      $(document).ready(function () {
        $('#degree').DataTable({
          "iDisplayLength": 30,
          "lengthMenu":  [10, 25, 30,50,100]

        });
      });
      this.spinner.hide();
    }, err => {
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
        this.spinner.hide();
      }
    })
  }

  adddegree(modal) {
    this.degreeSubmitted = true;
    
    if (this.degreeform.invalid) {
      return;
    }
    if (this.degreeObj.id) {
      this.spinner.show();
      this._degreeService.updateDegree(this.degreeObj).pipe(first()).subscribe(res => {
        this.getdegree();
        this.toastr.success(res.message, 'Success!');
        modal.dismiss('Cross click');
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
        modal.dismiss('Cross click');
        if (err.error.error.reason) {
          this.toastr.error(err.error.error.reason);
          this.spinner.hide();
        }
      })
    }
    else {
      this.spinner.show();
      this._degreeService.createDegree(this.degreeObj).pipe(first()).subscribe(res => {
        this.getdegree();
        this.toastr.success(res.data, 'Success!');
        modal.dismiss('Cross click');
        this.spinner.hide();
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

 
  editDegree(values, content) {
    this.spinner.show()
    this.buttonText = "Update"
    this.degreeSubmitted = false;
    this._degreeService.getSingleDegree(values.id).pipe(first()).subscribe(res => {
      this.degreeObj = res.data;
      this.spinner.hide();
    })
    this.modalService.open(content, { size: 'sm' });
  }

  openModal(content, degreeData,){
    this.spinner.show();
    if(degreeData){
    this.degreeData = degreeData;
    this.modalService.open(content, { size: 'sm' });
    this.spinner.hide();
    }
    }
    
    deleteData(modal){
    this.spinner.show();
    this.userName = JSON.parse(localStorage.getItem('currentUser')).data.loginObj.userName;
    this._degreeService.deleteDegree(this.degreeData,this.userName).pipe(first()).subscribe(res =>{
    this.toastr.success(res.data, 'Success!');
    modal.dismiss('Cross click');
    this.getdegree();
  },err =>{
    if(err.error.error.reason){
    this.toastr.error(err.error.error.reason);
    }
    modal.dismiss('Cross click');
    this.spinner.hide();
    })
    }
  }
