import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators,FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NONE_TYPE } from '@angular/compiler';
import { StandardService } from './../../master/common-master/standard.service';
import { NotificationService } from '../notification.service';
import { Router, ActivatedRoute } from '@angular/router';


declare let $: any;

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  notifyObj: any = {};
  notificationForm: FormGroup;
  notificationSubmitted = false;
  buttonText:string = "Submit";
  notifyArr:any=[];
  standardArr:any=[];
  userName:any;
  id:any;
  enableTriggerDate = false;
allValue:any;
stdId:any;
transport:any;
  
  constructor(private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public toastr: ToastrService,
    private notifyService: NotificationService,
    public spinner: NgxSpinnerService,
    public StandardService:StandardService, 
    private router: Router,
    private route: ActivatedRoute,
    ) { }


  ngOnInit(): void {
    this.notificationForm = this.formBuilder.group({
    title: [null, Validators.required],
    message:[null,Validators.required],
    isapplicableforEmail: [false, Validators.requiredTrue],
    isapplicableforWhatsapp: [false, Validators.requiredTrue],
    isapplicableforParent: [false, Validators.requiredTrue],
    isapplicableforFaculty: [false, Validators.requiredTrue],
    isapplicableforSms: [false, Validators.requiredTrue],
    isapplicableforStudent: [false, Validators.requiredTrue],
    triggerDate:[null, Validators.required],
    triggerTime:[null, Validators.required],
    triggerType:[null, Validators.required],
    notificationDtlList: this.formBuilder.array(
      [this.createNotificationFormGroup()]),
  })

    this.getStandard();
  }
  get f() { return this.notificationForm.controls };
  createNotificationFormGroup() {
    return this.formBuilder.group({
      standardId:[null, Validators.required]
     
    })
  }
  get notifyDocumentArr(): FormArray {
    return this.notificationForm.get('notificationDtlList') as FormArray;
  }

  
  getStandard() {
    this.StandardService.getAllUsers().pipe(first()).subscribe(res => {
     this.standardArr = res.data;
     this.standardArr.unshift('All');
   });
  }


  

  /**Select Trigger Type */
  selectType(event){
    this.transport = event;
    if(this.transport == "Now"){
      this.enableTriggerDate = false;
    }
    if(this.transport == "Schedule"){
      this.enableTriggerDate = true;
    }
    if (this.transport == 'Schedule') {
      this.notificationForm.addControl('triggerDate', this.formBuilder.control('', Validators.required));
    }
    if (this.transport == 'Now') {
      this.notificationForm.removeControl('triggerDate');
    }
    if (this.transport == 'Schedule') {
      this.notificationForm.addControl('triggerTime', this.formBuilder.control('', Validators.required));
    }
    if (this.transport == 'Now') {
      this.notificationForm.removeControl('triggerTime');
    }
  }

  select(event) {
 if(event == 'All'){
   this.allValue = null;
 }else{
  this.stdId = event.id;

 }

  }



submit(){
  this.notificationSubmitted = true;
  if(this.notificationForm.invalid){
  return;
  
  }
  if (this.transport == 'Now') {
    this.notificationForm.removeControl('triggerDate');
  }
  if (this.transport == 'Now') {
    this.notificationForm.removeControl('triggerTime');
  }
  for(var val of this.notifyDocumentArr.value){
    if(val.standardId == 'All'){
      this.notificationForm.value.notificationDtlList.standardId = null;
    }else{
      this.notificationForm.value.notificationDtlList.standardId =  val.standardId;
  
    }
  }
 console.log(this.notificationForm.value.triggerType);
 if(this.notificationForm.value.triggerType == 'Schedule'){
  this.notificationForm.value.triggerDate = this.notificationForm.value.triggerDate.day + '/' + this.notificationForm.value.triggerDate.month + '/' + this.notificationForm.value.triggerDate.year;
 }
  this.notifyService.createNotification(this.notificationForm.value).pipe(first()).subscribe(async res => {
    this.toastr.success(res.data, 'Success!');
    this.router.navigate(['notification/notification-list']);
    this.spinner.hide();
    this.enableTriggerDate = false;
    if (this.transport == 'Schedule') {
      this.notificationForm.addControl('triggerDate', this.formBuilder.control('', Validators.required));
    }
    if (this.transport == 'Schedule') {
      this.notificationForm.addControl('triggerTime', this.formBuilder.control('', Validators.required));
    }
    this.spinner.hide();
  }, err => {
    this.spinner.hide();
    if (err.error.error.reason) {
      this.toastr.error(err.error.error.reason);
    }
  })
}

}
  

