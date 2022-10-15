import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators  } from '@angular/forms';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { CasteService } from './caste.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
declare let $: any;

@Component({
  selector: 'app-caste',
  templateUrl: './caste.component.html',
  styleUrls: ['./caste.component.scss']
})
export class CasteComponent implements OnInit {

  casteForm: FormGroup;
  // public obj:any = {};
  casteSubmitted = false;
  buttonText:string = "";
  casteObj: any = {};
  casteArr: any = [];
  userName: any;
  schemeId:any;
  constructor(
    private formBuilder: FormBuilder, 
    private modalService: NgbModal,
    private CasteService : CasteService,
    public toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    public spinner: NgxSpinnerService,     ) { }

  ngOnInit(): void {
    this.casteForm = this.formBuilder.group({
      name: [null, Validators.required],
    })
    this.getcasteList() 
  }
  get f() { return this.casteForm.controls };

  openModal(content: any) {
    this.buttonText = "Submit";
    this.casteForm.reset({});
    this.casteObj = {};
    this.casteSubmitted = false;
    this.modalService.open(content, { size: 'sm' });

  }

  addcaste(modal){
    this.casteSubmitted = true;
    if (this.casteForm.invalid) {
      return;
    }
    if(this.casteObj.id){
      this.casteForm.value.id = this.casteObj.id;
      this.CasteService.updateCaste(this.casteForm.value).pipe(first()).subscribe(async res => {
        this.getcasteList();
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
      this.CasteService.createCaste(this.casteForm.value).pipe(first()).subscribe(async res => {
        this.getcasteList();
        this.toastr.success(res.data, 'Success!');
        modal.dismiss('Cross click');
       
      },err =>{
        if (err.error.error.reason) {
          this.toastr.error(err.error.error.reason);
        }
        this.spinner.hide();
        });
    }
  }
getcasteList() {
  this.spinner.show();
      $('#caste').DataTable().clear().destroy();
  this.CasteService.getCaste().pipe(first()).subscribe(res => {
    this.casteArr = res.data;
    $(document).ready(function () {
            $('#caste').DataTable({
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
editcaste(values, content) {
  this.spinner.show();
  this.buttonText = "Update"
  this.casteSubmitted = false;
  this.CasteService.getSingleCaste(values.id).pipe(first()).subscribe(res => {
    this.casteObj = res.data;
    this.spinner.hide();
  })
  this.modalService.open(content, { size: 'sm' });
}
confirmdelete(data: any){
  this.buttonText = "Submit";
    this.casteObj = {};
    this.casteSubmitted = false;
  this.modalService.open(data, { size: 'sm' });

}
openModall(content, schemeId,){
  if(schemeId){
    this.schemeId = schemeId;
    this.modalService.open(content, { size: 'sm' });  
  }
}
deleteData(modal){
  this.spinner.show();
    this.userName = JSON.parse(localStorage.getItem('currentUser')).data.loginObj.userName;
  this.CasteService.deleteData(this.schemeId,this.userName).pipe(first()).subscribe((data :any)=>{
    this.toastr.success(data.data, 'Success!');
    modal.dismiss('Cross click');
    this.getcasteList(); 
  },err =>{
    if(err.error.error.reason){
      this.toastr.error(err.error.error.reason);
    }
    modal.dismiss('Cross click');
    this.spinner.hide();
  })
}

}
