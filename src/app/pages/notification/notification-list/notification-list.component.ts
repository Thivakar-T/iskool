import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NONE_TYPE } from '@angular/compiler';
import { StandardService } from './../../master/common-master/standard.service';
import { NotificationService } from '../notification.service';
declare let $: any;

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {
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
    ) { }


  ngOnInit(): void {
    this.notificationForm = this.formBuilder.group({
    title: [null, Validators.required],
    message:[null,Validators.required],
    isapplicableforWhatsapp:false,
    isapplicableforEmail: false,
    isapplicableforFaculty: false,
    isapplicableforParent: false,
    isapplicableforSms: false,
    isapplicableforStudent: false,
    triggerDate:[null, Validators.required],
    triggerTime:[null, Validators.required],
    triggerType:[null, Validators.required],
    notificationDtlList: this.formBuilder.array(
      [this.createNotificationFormGroup()]),
  })

    this.getStandard();
    this.getNotificationList();
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

  // selectLocation() {
  //   if (this.notifyObj.triggerType == 'Schedule') {
  //     this.enableTriggerDate = true;
  //   } else {
  //     this.enableTriggerDate = false;
  //   }
  // }

  // selectLocation(event){
  //   this.transport = event;
  //   if (this.transport == 'Schedule') {
  //     this.notificationForm.addControl('triggerDate', this.formBuilder.control('', Validators.required));
  //   }
  //   if (this.transport == 'Now') {
  //     this.notificationForm.removeControl('triggerDate');
  //   }
  // }
  

  /**Select Trigger Type */
//   selectType(event){
//     this.transport = event;
//     if(this.transport == "Now"){
//       this.enableTriggerDate = false;
//     }
//     if(this.transport == "Schedule"){
//       this.enableTriggerDate = true;
//     }
//     if (this.transport == 'Schedule') {
//       this.notificationForm.addControl('triggerDate', this.formBuilder.control('', Validators.required));
//     }
//     if (this.transport == 'Now') {
//       this.notificationForm.removeControl('triggerDate');
//     }
//     if (this.transport == 'Schedule') {
//       this.notificationForm.addControl('triggerTime', this.formBuilder.control('', Validators.required));
//     }
//     if (this.transport == 'Now') {
//       this.notificationForm.removeControl('triggerTime');
//     }
//   }

//   select(event) {
//  if(event == 'All'){
//    this.allValue = null;
//  }else{
//   this.stdId = event.id;

//  }

//   }
    
// openModal(content: any) {
//   this.buttonText = "Submit";
//   this.notificationForm.reset({});
//   this.notifyObj = {};
//   this.enableTriggerDate = false;
//   this.notificationSubmitted = false;
//   this.modalService.open(content, { size: 'lg' });
// }

getNotificationList() {
  this.spinner.show();
  $('#board').DataTable().clear().destroy();
  this.notifyService.getAllNotify().pipe(first()).subscribe(res => {
  this.notifyArr = res.data;
  $(document).ready(function () {
  $('#notification').DataTable({
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

// submit(modal){
//   this.notificationSubmitted = true;
//   if(this.notificationForm.invalid){
//   return;
  
//   }
//   if (this.transport == 'Now') {
//     this.notificationForm.removeControl('triggerDate');
//   }
//   if (this.transport == 'Now') {
//     this.notificationForm.removeControl('triggerTime');
//   }
//   for(var val of this.notifyDocumentArr.value){
//     if(val.standardId == 'All'){
//       this.notificationForm.value.notificationDtlList.standardId = null;
//     }else{
//       this.notificationForm.value.notificationDtlList.standardId =  val.standardId;
  
//     }
//   }
//  console.log(this.notificationForm.value.triggerType);
//  if(this.notificationForm.value.triggerType == 'Schedule'){
//   this.notificationForm.value.triggerDate = this.notificationForm.value.triggerDate.day + '/' + this.notificationForm.value.triggerDate.month + '/' + this.notificationForm.value.triggerDate.year;
//  }
//   this.notifyService.createNotification(this.notificationForm.value).pipe(first()).subscribe(async res => {
//     this.getNotificationList();
//     this.toastr.success(res.data, 'Success!');
//     this.enableTriggerDate = false;
//     if (this.transport == 'Schedule') {
//       this.notificationForm.addControl('triggerDate', this.formBuilder.control('', Validators.required));
//     }
//     if (this.transport == 'Schedule') {
//       this.notificationForm.addControl('triggerTime', this.formBuilder.control('', Validators.required));
//     }
//     modal.dismiss('Cross click');
//     this.spinner.hide();
//   }, err => {
//     this.spinner.hide();
//     modal.dismiss('Cross click');
//     if (err.error.error.reason) {
//       this.toastr.error(err.error.error.reason);
//     }
//   })
// }


}






  
  

  

