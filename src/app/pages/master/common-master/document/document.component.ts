import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators  } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { DocumentService } from './document.service';
declare let $: any;

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {
  documentForm: FormGroup
  documentObj: any = {};
  documentSubmitted = false;
  buttonText:string = "";
  documentArr: any = [];
  documentId:any;
  schemeId:any;
  constructor(
    private formBuilder: FormBuilder, 
    private modalService: NgbModal,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService,
    private _documentService : DocumentService,

  ) { }

  ngOnInit(): void {
    this.documentForm = this.formBuilder.group({
      name: [null, Validators.required]
     
    })
    this.getdocument();
  }
 
  userName: any;

  get f() { return this.documentForm.controls };

  opendocument(content: any) {
    this.buttonText = "Submit";
     this.documentSubmitted = false;
      this.documentObj = {};
      this.documentForm.reset({});
      this.modalService.open(content, { size: 'sm' });
    }
  // confirmdelete(data: any){
  //   this.modalService.open(data, { size: 'sm' });
 
  // }
  adddocument(modal) {
    this.documentSubmitted = true;
    if (this.documentForm.invalid) {
      return;
    }
  if(this.documentObj.id){
    this.documentForm.value.id = this.documentObj.id;
    this._documentService.updatedocument(this.documentForm.value).pipe(first()).subscribe(async res => {
      this.getdocument();
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
    this._documentService.createdocument(this.documentForm.value).pipe(first()).subscribe(async res => {
      this.getdocument();
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

  getdocument() {
    this.spinner.show();
    $('#document').DataTable().clear().destroy();
    this._documentService.getdocument().pipe(first()).subscribe(res => {
      this.documentArr = res.data;
      $(document).ready(function () {
        $('#document').DataTable({
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

  editdocument(values, content) {
    this.spinner.show();
    this.buttonText = "Update"
    this.documentSubmitted = false;
    this._documentService.getSingledocument(values.id).pipe(first()).subscribe(res => {
      this.documentObj = res.data;
      // this.documentObj.degreeObj = res.data.degreeObj.id;
      this.spinner.hide();
    })
    this.modalService.open(content, { size: 'sm' });
  }

  confirmdelete(data: any){
    this.buttonText = "Submit";
    this.documentObj = {};
    this.documentSubmitted = false;
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
this._documentService.deletedocument(this.schemeId,this.userName).pipe(first()).subscribe(res =>{
  this.toastr.success(res.data, 'Success!');
  dModal.dismiss('Cross click');
  this.getdocument();
},err =>{
  if(err.error.error.reason){
    this.toastr.error(err.error.error.reason);
  }
  dModal.dismiss('Cross click');
  this.spinner.hide();
})
} 

}


