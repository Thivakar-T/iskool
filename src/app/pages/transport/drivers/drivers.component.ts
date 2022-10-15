import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DriversService } from './drivers.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NONE_TYPE } from '@angular/compiler';

declare let $: any;

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit {
  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
};
  
  countryArr: any = [];
  driverObj: any = {};
  driverArr: any = [];
  driverForm: FormGroup;
  driverSubmitted = false;  
  buttonText:string = "";
  userName: any;
  configData;
  driverId:any;
  constructor(private formBuilder: FormBuilder,
    private modalService: NgbModal,  public toastr: ToastrService,
    private driverService: DriversService,

    public spinner: NgxSpinnerService,) { }

  ngOnInit(): void {
    this.driverForm = this.formBuilder.group({ 
      name: [null, Validators.required],
      address: [null, Validators.required],
      phoneNumber: [null, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(12)]],
      experience: [null, Validators.required],
      age: [null, Validators.required],
      licenseNumber: [null, Validators.required],
      driverDocumentList: this.formBuilder.array(
        [this.createDocument()], [Validators.required]),
    })
    this.getdriverList();

  }
  get f() { return this.driverForm.controls };
  createDocument() {
    return this.formBuilder.group({
      documentName: [''],
      documentUpload: [''],
      // startDate: [null, [Validators.required] ],
      // endDate: [null, [Validators.required] ],
    })
  }
  get driverDocumentArr(): FormArray {
    return this.driverForm.get('driverDocumentList') as FormArray;
  }
  addDocument() {
    let order = this.createDocument();
    this.driverDocumentArr.push(order);
  }
  deleteterm(index) {
    if (this.driverDocumentArr.length == 1) {
      this.toastr.error("Can't delete the row when there is only one row", 'Warning');

      return false;
    } else {
      this.driverDocumentArr.removeAt(index);
      this.toastr.warning('Row deleted successfully', 'Delete row');
      return true;
    }
  }
  openGST(content: any) {
    this.driverDocumentArr.controls=[];
    let order = this.createDocument();
    this.driverDocumentArr.push(order);  
    this.buttonText = "Submit";
    this.driverForm.reset({});
    this.driverObj = {};
    this.driverSubmitted = false;
    this.modalService.open(content, { size: 'lg' });
  }

  adddriver(modal) {
    this.driverSubmitted = true;
  
      if (this. driverObj.id) {
        this.driverForm.value.id = this. driverObj.id;
      } if (this.driverObj.id) {
        this.driverForm.value.id = this.driverObj.id;
  
        this.driverService.updatedriver(this.driverForm.value).pipe(first()).subscribe(async res => {
          this.getdriverList();
          this.toastr.success(res.data, 'Success!');
          modal.dismiss('Cross click');
        }, err => {
          if (err.error.error.reason) {
            this.toastr.error(err.error.error.reason);
          }
          this.spinner.hide();
        })
      } else {
        this.driverService.createdriver(this.driverForm.value).pipe(first()).subscribe(async res => {
          this.getdriverList();
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
  
  getdriverList() {
    this.spinner.show();
    $('#driver').DataTable().clear().destroy();
    this.driverService.getdriver().pipe(first()).subscribe(res => {
      this.driverArr = res.data;
      $(document).ready(function () {
        $('#driver').DataTable({
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
  editdriver(values, content) {
    this.spinner.show();
    this.buttonText = "Update"
    this.driverSubmitted = false;
    this.driverService.getSingledriver(values.id).pipe(first()).subscribe(res => {
      this.driverObj = res.data;
  
      this.spinner.hide();
    })
    
    this.modalService.open(content, { size: 'lg' });
  }

  openModal(content, driverId,){
    if(driverId){
      this.driverId = driverId;
      this.modalService.open(content, { size: 'sm' });  
    }
  }

  deleteData(modal){
    this.spinner.show();
      this.userName = JSON.parse(localStorage.getItem('currentUser')).data.loginObj.userName;
    this.driverService.deleteData(this.driverId,this.userName).pipe(first()).subscribe((data: any) =>{
      this.toastr.success(data.data, 'Success!');
      modal.dismiss('Cross click');
      this.getdriverList();
    },err =>{
      if(err.error.error.reason){
        this.toastr.error(err.error.error.reason);
      }
      modal.dismiss('Cross click');
      this.spinner.hide();
    })
  }
  
}
