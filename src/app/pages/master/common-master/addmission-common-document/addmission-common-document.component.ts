import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators  } from '@angular/forms';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { AdmissionCommonDocumentService } from './../admission-common-document.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { DocumentService } from '../document/document.service';
declare let $: any;

@Component({
  selector: 'app-addmission-common-document',
  templateUrl: './addmission-common-document.component.html',
  styleUrls: ['./addmission-common-document.component.scss']
})
export class AddmissionCommonDocumentComponent implements OnInit {

  documentForm: FormGroup;
  // public obj:any = {};
  documentSubmitted = false;
  buttonText:string = "";
  documentObj: any = {};
  documentArr: any = [];
  userName: any;
  documentId:any;
  doctArr: any = [];

  constructor(
    private formBuilder: FormBuilder, 
    private modalService: NgbModal,
    private AdmissionCommonDocumentService : AdmissionCommonDocumentService,
    private DocumentService : DocumentService,
    public toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.documentForm = this.formBuilder.group({
      documentId: [null, Validators.required],
    })
    this.getdocumentList() 
    this.getDocument()
  }
  get f() { return this.documentForm.controls };

  openModal(content: any) {
    this.buttonText = "Submit";
    this.documentForm.reset({});
    this.documentObj = {};
    this.documentSubmitted = false;
    this.modalService.open(content, { size: 'sm' });

  }
  getDocument()
  {
    this.DocumentService.getdocument().pipe(first()).subscribe(res => {
      this.doctArr = res.data;
    });
  }

  adddocument(modal){
    this.documentSubmitted = true;
    if (this.documentForm.invalid) {
      return;
    } 
      this.AdmissionCommonDocumentService.createDocument(this.documentForm.value).pipe(first()).subscribe(async res => {
        this.getdocumentList();
        this.toastr.success(res.data, 'Success!');
        modal.dismiss('Cross click');
        this.spinner.hide();
      },err =>{
        this.spinner.hide();
        modal.dismiss('Cross click');
        if(err.error.error.reason){
          this.toastr.error(err.error.error.reason);
        }
      })    
  }
  getdocumentList() {
    this.spinner.show();
        $('#document').DataTable().clear().destroy();
    this.AdmissionCommonDocumentService.getDocument().pipe(first()).subscribe(res => {
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
  openModall(content, documentId,){
    if(documentId){
      this.documentId = documentId;
      this.modalService.open(content, { size: 'sm' });  
    }
  }
  confirmdelete(data: any){
    this.buttonText = "Submit";
      this.documentObj = {};
      this.documentSubmitted = false;
    this.modalService.open(data, { size: 'sm' });  
  }
  deleteDocument(modal){
    this.spinner.show();
     // this.userName = JSON.parse(localStorage.getItem('currentUser')).data.loginObj.userName;
    this.AdmissionCommonDocumentService.deleteDocument(this.documentId).pipe(first()).subscribe((data :any)=>{
      this.toastr.success(data.data, 'Success!');
      modal.dismiss('Cross click');
      this.getdocumentList(); 
    },err =>{
      if(err.error.error.reason){
        this.toastr.error(err.error.error.reason);
      }
      modal.dismiss('Cross click');
      this.spinner.hide();
    })
  }
}
