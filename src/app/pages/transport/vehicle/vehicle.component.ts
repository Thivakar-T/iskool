import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormArray, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { VehicleService } from '../vehicle.service';

 
declare let $: any;

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
   public toastr: ToastrService,
    public spinner: NgxSpinnerService,
    private _vehicleService : VehicleService,

  ) { }
   

  ngOnInit(): void {
    this.vehicleform = this.formBuilder.group({
      vehicleName: [null, Validators.required],
      vehicleNumber: [null, Validators.required],
      numberOfSeats: [null, Validators.required],
      vehicleDocumentList: this.formBuilder.array(
        [this.createDocument()], [Validators.required]),
      
    })
    this.getVehicleList();   
  }

  vehicleform: FormGroup
  vehicleObj: any = {};
  vehicleArr: any = [];
 vehicleSubmitted = false;
  buttonText:string = "";
  userName: any;
  vehicleId:any;
  configData;
  // vehicleForm: FormGroup;  

  get b() { return this.vehicleform.controls };
  createDocument() {
    return this.formBuilder.group({
      documentName: [''],
      documentUpload: [''],
      // startDate: [null, [Validators.required] ],
      // endDate: [null, [Validators.required] ],
    })
  }
  get vehicleDocumentArr(): FormArray {
    return this.vehicleform.get('vehicleDocumentList') as FormArray;
  }

  addDocument() {    
    let order = this.createDocument();
    this.vehicleDocumentArr.push(order);  
  }

  deleteterm(index) {
    if (this.vehicleDocumentArr.length == 1) {
      this.toastr.error("Can't delete the row when there is only one row", 'Warning');
      return false;
    } else {
      this.vehicleDocumentArr.removeAt(index);
      this.toastr.warning('Row deleted successfully', 'Delete row');
      return true;
    }
  }
  openvehicle(content: any) {
  this.vehicleDocumentArr.controls=[];
  let order = this.createDocument();
  this.vehicleDocumentArr.push(order);  
    this.buttonText = "Submit";
    this.vehicleform.reset({});
     this.vehicleSubmitted = false;
      this.vehicleObj = {};
      this.modalService.open(content, { size: 'lg' });
    }  
 
    addVehicle(modal) {
      // this.spinner.show();
      this.vehicleSubmitted = true;
      if (this.vehicleform.invalid) {
        return;
      }
      this.spinner.show();
    if(this.vehicleObj.id){
      this.vehicleform.value.id = this.vehicleObj.id;
      this._vehicleService.updateVehicle(this.vehicleform.value).pipe(first()).subscribe(async res => {
        this.getVehicleList();
        this.toastr.success(res.data, 'Success!');
        modal.dismiss('Cross click');
      })
    }else{
      this._vehicleService.createVehicle(this.vehicleform.value).pipe(first()).subscribe(async res => {
        this.getVehicleList();
        this.toastr.success(res.data, 'Success!');
        modal.dismiss('Cross click');
        this.spinner.hide();

      }, err => {
        this.spinner.show();
        if (err.error.error.reason) {
          this.toastr.error(err.error.error.reason);
        }
        this.spinner.hide();
      })
    }
    }
    getVehicleList() {
      this.spinner.show();
      $('#vehicle').DataTable().clear().destroy();
      this._vehicleService.getVehicle().pipe(first()).subscribe(res => {
        this.vehicleArr = res.data;
      $(document).ready(function () {
          $('#vehicle').DataTable({
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
  
    editVehicle(values, content) {
      this.spinner.show();
      this.buttonText = "Update"
      this.vehicleSubmitted = false;
      this._vehicleService.getSingleVehicle(values.id).pipe(first()).subscribe(res => {
        this.vehicleObj = res.data;
        this.spinner.hide();
      })
      this.modalService.open(content, { size: 'lg' });
    }
    openModal(content, vehicleId,){
      this.spinner.show();
      if(vehicleId){
        this.vehicleId = vehicleId;
        this.modalService.open(content, { size: 'sm' });  
      }
      this.spinner.hide();
    }
  

    deleteData(modal){
      this.spinner.show();
        this.userName = JSON.parse(localStorage.getItem('currentUser')).data.loginObj.userName;
      this._vehicleService.deleteVehicle(this.vehicleId,this.userName).pipe(first()).subscribe(res =>{
        this.toastr.success(res.data, 'Success!');
        modal.dismiss('Cross click');
        this.getVehicleList();
      },err =>{
        this.spinner.show();
        if(err.error.error.reason){
          this.toastr.error(err.error.error.reason);
        }
        this.spinner.show();
        modal.dismiss('Cross click');
        this.spinner.hide();
      })
    }

   
} 
 