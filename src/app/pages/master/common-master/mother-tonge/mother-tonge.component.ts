import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators  } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MothertongueService } from './mothertongue.service';
declare let $: any;
@Component({
  selector: 'app-mother-tonge',
  templateUrl: './mother-tonge.component.html',
  styleUrls: ['./mother-tonge.component.scss']
})
export class MotherTongeComponent implements OnInit {

  motherTongeObj: any = {};
  motherTongeForm: FormGroup;
  motherTongeSubmitted = false;
  buttonText:string = "";
  toungId:any;
  schemeId:any;
  constructor(
    private formBuilder: FormBuilder,
    private _mothertongService : MothertongueService,
     private modalService: NgbModal,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService,
    ) { }
  

  ngOnInit(): void {
    this.motherTongeForm = this.formBuilder.group({
      name: [null, Validators.required],
    })
    this. getmothertong();
  }
  mothertongArr: any = [];
  userName: any;

  get f() { return this.motherTongeForm.controls };

  openModal(content: any) {
    this.buttonText = "Submit";
    this.motherTongeForm.reset({});
    this.motherTongeObj = {};
    this.motherTongeSubmitted = false;
    this.modalService.open(content, { size: 'sm' });
  }
  
  // confirmdelete(data: any){
  //   this.modalService.open(data, { size: 'sm' });
 
  // }

  // addMotherTongue(modal){
  //   this.motherTongeSubmitted = true;
  //   if(this.motherTongeForm.invalid){
  //     return;
  //   }
  // }
  addmothertong(modal) {
    this.motherTongeSubmitted = true;
    if (this.motherTongeForm.invalid) {
      return;
    }
  if(this.motherTongeObj.id){
    this.motherTongeForm.value.id = this.motherTongeObj.id;
    this.userName = JSON.parse(localStorage.getItem('currentUser')).data.loginObj.userName;
  
    this._mothertongService.updatemothertong(this.motherTongeForm.value ,this.userName).pipe(first()).subscribe(async res => {
      this.getmothertong();
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
    this._mothertongService.createmothertong(this.motherTongeForm.value).pipe(first()).subscribe(async res => {
      this.getmothertong();
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
  getmothertong() {
    this.spinner.show();
    $('#mothertonge').DataTable().clear().destroy();
     this._mothertongService.getmothertong().pipe(first()).subscribe(res => {
      this.mothertongArr = res.data;
      $(document).ready(function () {
        $('#mothertonge').DataTable({
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
  editmothertong(values, content) {
    this.spinner.show();
    this.buttonText = "Update"
    this.motherTongeSubmitted = false;
    this._mothertongService.getSinglemothertong(values.id).pipe(first()).subscribe(res => {
      this.motherTongeObj = res.data;
      // this.motherTongeObj.degreeObj = res.data.degreeObj.id;
      this.spinner.hide();
    })
    this.modalService.open(content, { size: 'sm' });
  }
  confirmdelete(data: any){
    this.buttonText = "Submit";
    this.motherTongeObj = {};
    this.motherTongeSubmitted = false;
    this.modalService.open(data, { size: 'sm' });
  }
  openModall(content, schemeId,){
    if(schemeId){
      this.schemeId = schemeId;
      this.modalService.open(content, { size: 'sm' });  
    }
  }

deleteData(dModal){
  this.spinner.show();
    this.userName = JSON.parse(localStorage.getItem('currentUser')).data.loginObj.userName;
  this._mothertongService.deletemothertong(this.schemeId,this.userName).pipe(first()).subscribe(res =>{
    this.toastr.success(res.data, 'Success!');
    dModal.dismiss('Cross click');
    this.getmothertong();
  },err =>{
    if(err.error.error.reason){
      this.toastr.error(err.error.error.reason);
    }
    dModal.dismiss('Cross click');
    this.spinner.hide();
  })
}

}

