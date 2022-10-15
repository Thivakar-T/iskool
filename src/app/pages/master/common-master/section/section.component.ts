import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators  } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { SectionService } from './section.service';

declare let $: any;
@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})

export class SectionComponent implements OnInit {
  sectionForm: FormGroup;
  sectionobj:any = {};
  sectionSubmitted = false;
  buttonText:string = "";
  sectionArr: any = [];
sectionId :any ;
schemeId:any;

  constructor(
    private formBuilder: FormBuilder, 
    private modalService: NgbModal,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService,
    private _sectionService : SectionService,

    ) { }

  ngOnInit(): void {
    this.sectionForm = this.formBuilder.group({
      name: [null, Validators.required],
    })
    this.getsection() ;
  }
  userName: any;

  get f() { return this.sectionForm.controls };

  openModal(content: any) {
    this.buttonText = "Submit";
    this.sectionForm.reset({});
     this.sectionSubmitted = false;
      this.sectionobj = {};
    this.modalService.open(content, { size: 'sm' });
  }

  // addterm(modal){
  //   this.sectionSubmitted = true;
  //   if(this.sectionForm.invalid){
  //     return;
  //   }
  // }
  // confirmdelete(data: any){
  //   this.buttonText = "Submit";
  //   this.obj = {};
  //   this.sectionSubmitted = false;
  //   this.modalService.open(data, { size: 'sm' });
 
  // }
  
  addsection(modal) {
    this.sectionSubmitted = true;
    if (this.sectionForm.invalid) {
      return;
    }
  if(this.sectionobj.id){
    this.sectionForm.value.id = this.sectionobj.id;
    this._sectionService.updatesection(this.sectionForm.value).pipe(first()).subscribe(async res => {
      this.getsection();
      this.toastr.success(res.data, 'Success!');
      modal.dismiss('Cross click');
    }, err => {
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
      }
      this.spinner.hide();
    })
  }else{
    this._sectionService.createsection(this.sectionForm.value).pipe(first()).subscribe(async res => {
      this.getsection();
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

  getsection() {
    this.spinner.show();
    $('#section').DataTable().clear().destroy();
    this._sectionService.getsection().pipe(first()).subscribe(res => {
      this.sectionArr = res.data;
      $(document).ready(function () {
        $('#section').DataTable({
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

  editsection(values, content) {
    this.spinner.show();
    this.buttonText = "Update"
    this.sectionSubmitted = false;
    this._sectionService.getSinglesection(values.id).pipe(first()).subscribe(res => {
      this.sectionobj = res.data;
      // this.sectionobj.degreeObj = res.data.degreeObj.id;
      this.spinner.hide();
    })
    this.modalService.open(content, { size: 'sm' });
  }

  confirmdelete(data: any){
    this.buttonText = "Submit";
    this.sectionobj = {};
    this.sectionSubmitted = false;
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
this._sectionService.deletesection(this.schemeId,this.userName).pipe(first()).subscribe(res =>{
  this.toastr.success(res.data, 'Success!');
  dModal.dismiss('Cross click');
  this.getsection();
},err =>{
  if(err.error.error.reason){
    this.toastr.error(err.error.error.reason);
  }
  dModal.dismiss('Cross click');
  this.spinner.hide();
})
}

}


