import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SessionService } from '../session.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionTypeService } from '../session-type/session-type.service';
declare let $: any;

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {

  sessionArr:any = [];
  sessionTypeArr:any = [];
  sessionObj: any = {};
  sessionForm: FormGroup;
  sessionSubmitted = false;
  buttonText:string = "";
  userName: any;
  sessionId:any;
  
  constructor(private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private _sessionService : SessionService,
    private _sessionTypeService : SessionTypeService,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService, ) { }

  ngOnInit(): void {
    this.sessionForm = this.formBuilder.group({
      sessionTypeObj: this.formBuilder.group({
        id: [null, Validators.required],
      }),
      longName: [null, Validators.required],
      shortName: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    })
    this.getSessionTyepList();
    this.getSessionList();
  }

  get f() { return this.sessionForm.controls };
  get g() { return this.sessionForm.controls.sessionTypeObj as FormGroup };
  
  openSession(content: any) {
    this.buttonText = "Submit";
    this.sessionForm.reset({});
    this.sessionObj = {};
    this.sessionSubmitted = false;
    this.modalService.open(content, { size: 'md' });
  }

  getSessionTyepList() {
    this.spinner.show();
    this._sessionTypeService.getSession().pipe(first()).subscribe(res => {
      this.sessionTypeArr = res.data;
      this.spinner.hide();     
    }, err => {
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
      }
      this.spinner.hide(); 
    })
  }

  addSession(modal) {
    this.sessionSubmitted = true;
    if (this.sessionForm.invalid) {
      return;
    }
    this.sessionForm.value.startDate = this.sessionForm.value.startDate.day + '/' + this.sessionForm.
    value.startDate.month + '/' + this.sessionForm.value.startDate.year;
  this.sessionForm.value.endDate = this.sessionForm.value.endDate.day + '/' + this.sessionForm.value.endDate.month + '/' + this.sessionForm.value.endDate.year;
  if(this.sessionObj.id){
    this.sessionForm.value.id = this.sessionObj.id;
    this._sessionService.updateSession(this.sessionForm.value).pipe(first()).subscribe(async res => {
      this.getSessionList();
      this.toastr.success(res.data, 'Success!');
      modal.dismiss('Cross click');
    },err => {
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
      }
      this.spinner.hide();
    })
  }else{
    this._sessionService.createSession(this.sessionForm.value).pipe(first()).subscribe(async res => {
      this.getSessionList();
      this.toastr.success(res.data, 'Success!');
      modal.dismiss('Cross click');
    },err => {
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
      }
      this.spinner.hide();
    })
  }
  }

  editSession(values, content) {
    this.spinner.show();
    this.buttonText = "Update"
    this.sessionSubmitted = false;
    this._sessionService.getSingleSession(values.id).pipe(first()).subscribe(res => {
      this.sessionObj = res.data;
      if(this.sessionObj.startDate){
        var toDate = this.sessionObj.startDate.split('/');
        let date1 = new Date(toDate[1]+'-'+toDate[0]+' '+toDate[2]);
        this.sessionObj.startDate = { year: date1.getFullYear(), month: date1.getMonth() + 1, day: date1.getDate() };
      }
      if(this.sessionObj.endDate){
        var date = this.sessionObj.endDate.split('/');
        let date2 = new Date(date[1]+'-'+date[0]+' '+date[2]);
        this.sessionObj.endDate = { year: date2.getFullYear(), month: date2.getMonth() + 1, day: date2.getDate() };
      }
      this.sessionObj.sessionTypeObj = res.data.sessionTypeObj.id;
      this.spinner.hide();
    })
    this.modalService.open(content, { size: 'md' });
  }

  getSessionList() {
    this.spinner.show();
    $('#session').DataTable().clear().destroy();
    this._sessionService.getSession().pipe(first()).subscribe(res => {
      this.sessionArr = res.data;
      $(document).ready(function () {
        $('#session').DataTable({
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

  openModal(content, sessionId,){
    if(sessionId){
      this.sessionId = sessionId;
      this.modalService.open(content, { size: 'sm' });  
    }
  }

  deleteData(modal){
    this.spinner.show();
      this.userName = JSON.parse(localStorage.getItem('currentUser')).data.loginObj.userName;
    this._sessionService.deleteSession(this.sessionId,this.userName).pipe(first()).subscribe(res =>{
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
