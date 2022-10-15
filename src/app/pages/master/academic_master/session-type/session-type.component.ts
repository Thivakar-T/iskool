import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators  } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SessionTypeService } from './session-type.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare let $: any;

@Component({
  selector: 'app-session-type',
  templateUrl: './session-type.component.html',
  styleUrls: ['./session-type.component.scss']
})
export class SessionTypeComponent implements OnInit {
  sessionForm: FormGroup;
  sessionSubmitted = false;
  buttonText:string = "";
  sessionObj: any = {};
  sessionArr: any = [];
  userName: any;
  id: any;
  schemeId:any;


  constructor(
    private formBuilder: FormBuilder, 
    private modalService: NgbModal,
    private SessionTypeService : SessionTypeService,
    public toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    public spinner: NgxSpinnerService, 
    ) { }

  ngOnInit(): void {
    this.sessionForm = this.formBuilder.group({
      name: [null, Validators.required],
    })
    this. getSessionList()
  }
  

  get f() { return this.sessionForm.controls };
  openModal(content: any) {
    this.buttonText = "Submit";
      this.sessionForm.reset({});
      this.sessionObj = {};
      this.sessionSubmitted = false;
      this.modalService.open(content, { size: 'sm' });
  }
  addsession(modal){
    this.sessionSubmitted = true;
    if (this.sessionForm.invalid) {
      return;
    }
    if(this.sessionObj.id){
      this.sessionForm.value.id = this.sessionObj.id;
      this.SessionTypeService.updateSession(this.sessionForm.value).pipe(first()).subscribe(async res => {
        this.getSessionList();
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
      this.SessionTypeService.createSession(this.sessionForm.value).pipe(first()).subscribe(async res => {
        this.getSessionList();
        modal.dismiss('Cross click');
        this.toastr.success(res.data, 'Success!');
        this.spinner.hide();
      },err =>{
        this.spinner.hide();
        modal.dismiss('Cross click');
        if(err.error.error.reason){
          this.toastr.error(err.error.error.reason);
        }
      })
  }
}

  getSessionList() {
    this.spinner.show();
    $('#sessiontype').DataTable().clear().destroy();
    this.SessionTypeService.getSession().pipe(first()).subscribe(res => {
    this.sessionArr = res.data;
    $(document).ready(function () {
    $('#sessiontype').DataTable({
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
  editSession(values, content) {
    this.spinner.show();
    this.buttonText = "Update"
    this.sessionSubmitted = false;
    this.SessionTypeService.getSingleSession(values.id).pipe(first()).subscribe(res => {
      this.sessionObj = res.data;
      this.spinner.hide();
    })
    this.modalService.open(content, { size: 'sm' });
  }
  confirmdelete(data: any){
    this.buttonText = "Submit";
      this.sessionObj = {};
      this.sessionSubmitted = false;
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
    this.SessionTypeService.deleteData(this.schemeId,this.userName).pipe(first()).subscribe((res:any) =>{
      this.toastr.success(res.data, 'Success!');
      modal.dismiss('Cross click');
      this.getSessionList();
    },err =>{
      if(err.error.error.reason){
        this.toastr.error(err.error.error.reason);
      }
      modal.dismiss('Cross click');
      this.spinner.hide();
    })
  }
  
  }
  
