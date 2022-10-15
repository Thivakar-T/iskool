import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators  } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReligionService } from './religion.service';
declare let $: any;

@Component({
  selector: 'app-religion',
  templateUrl: './religion.component.html',
  styleUrls: ['./religion.component.scss']
})
export class ReligionComponent implements OnInit {

  
  religionObj: any = {};
  religionForm: FormGroup;
  religionSubmitted = false;
  buttonText:string = "";
  religionId:any;

  constructor(
    private _religionService : ReligionService,

    private formBuilder: FormBuilder, 
    private modalService: NgbModal,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService,
    ) { }
  

  ngOnInit(): void {
    this.religionForm = this.formBuilder.group({
      name: [null, Validators.required],
    })
   this.getreligion(); 
  }
  religionArr: any = [];
  userName: any;
  get f() { return this.religionForm.controls };

  openModal(content: any) {
    this.buttonText = "Submit";
    this.religionForm.reset({});
    this.religionObj = {};
    this.religionSubmitted = false;
    this.modalService.open(content, { size: 'sm' });
  }
  // openModall(content, religionId,){
  //   if(religionId){
  //     this.religionId = religionId;
  //     this.modalService.open(content, { size: 'md' });  
  //   }
  // }
  // confirmdelete(data: any){
  //   this.modalService.open(data, { size: 'sm' });
 
  // }

  // addReligion(modal){
  //   this.religionSubmitted = true;
  //   if(this.religionForm.invalid){
  //     return;
  //   }
  // }
  addreligion(modal) {
    this.religionSubmitted = true;
    if (this.religionForm.invalid) {
      return;
    }
  if(this.religionObj.id){
    this.religionForm.value.id = this.religionObj.id;
    this.userName = JSON.parse(localStorage.getItem('currentUser')).data.loginObj.userName;
  
    this._religionService.updatereligion(this.religionForm.value ,this.userName).pipe(first()).subscribe(async res => {
      this.getreligion();
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
    this._religionService.createreligion(this.religionForm.value).pipe(first()).subscribe(async res => {
      this.getreligion();
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
  getreligion() {
    this.spinner.show();
    $('#religion').DataTable().clear().destroy();
    this._religionService.getreligion().pipe(first()).subscribe(res => {
      this.religionArr = res.data;
      this.religionObj.degreeObj = res.data.degreeObj;
      $(document).ready(function () {
        $('#religion').DataTable({
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
 

  editreligion(values, content) {
    this.spinner.show();
    this.buttonText = "Update"
    this.religionSubmitted = false;
    this._religionService.getSinglereligion(values.id).pipe(first()).subscribe(res => {
      this.religionObj = res.data;
      // this.religionObj.degreeObj = res.data.degreeObj.id;
      this.spinner.hide();
    })
    this.modalService.open(content, { size: 'sm' });
  }
  confirmdelete(data: any){
    this.buttonText = "Submit";
    this.religionObj = {};
    this.religionSubmitted = false;
    this.modalService.open(data, { size: 'sm' });
  }
//   deleteData(modal,){
//     this.spinner.show();
//       this.userName = JSON.parse(localStorage.getItem('currentUser')).data.loginObj.userName;
//     this._religionService.deletereligion(this.religionId,this.userName).pipe(first()).subscribe(res =>{
//       // this.toastr.success(res.data, 'Success!');
//       modal.dismiss('Cross click');
//       this.getreligion();
//     },err =>{
//       if(err.error.error.reason){
//         this.toastr.error(err.error.error.reason);
//       }
//       modal.dismiss('Cross click');
//       this.spinner.hide();
//     })
//   }
  
// }
openModall(content, schemeId,){
  if(schemeId){
    this.religionId = schemeId;
    this.modalService.open(content, { size: 'sm' });  
  }
}

deleteData(dModal){
this.spinner.show();
  this.userName = JSON.parse(localStorage.getItem('currentUser')).data.loginObj.userName;
this._religionService.deletereligion(this.religionId,this.userName).pipe(first()).subscribe(res =>{
  this.toastr.success(res.data, 'Success!');
  dModal.dismiss('Cross click');
  this.getreligion();
},err =>{
  if(err.error.error.reason){
    this.toastr.error(err.error.error.reason);
  }
  dModal.dismiss('Cross click');
  this.spinner.hide();
})
}

}


