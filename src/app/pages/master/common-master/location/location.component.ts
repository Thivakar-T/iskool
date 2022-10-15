
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators'; 
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocationService } from '../location.service';
import { MetaService} from './../../../meta.service';
declare let $: any;
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
   public toastr: ToastrService,
    public spinner: NgxSpinnerService,
    private _LocationService : LocationService,
    private _MetaService : MetaService,
  ) { 
    
  }

  ngOnInit(): void {
    this.locationform = this.formBuilder.group({
      locationName: [null, Validators.required],
      cityId: [null, Validators.required],
      

    })
    this.getLocationList();
     this.getCity();
  }

  locationform: FormGroup
  locationObj: any = {};
  locationArr: any = [];
 locationSubmitted = false;
  buttonText:string = "";
  userName: any;
  locationId:any;
  cityArr:any =[];
   

  get b() { return this.locationform.controls };


  openlocation(content: any) {
    this.buttonText = "Submit";
    this.locationform.reset({});
     this.locationSubmitted = false;
      this.locationObj = {};
      this.modalService.open(content, { size: 'sm' });
    }
  
  
    addLocation(modal) {
      // this.spinner.show();
      this.locationSubmitted = true;
      if (this.locationform.invalid) {
        return;
      }
      this.spinner.show();
    if(this.locationObj.id){
      this.locationform.value.id = this.locationObj.id; 
      this._LocationService.updateLocation(this.locationform.value).pipe(first()).subscribe(async res => {
        this.getLocationList();
        this.toastr.success(res.data, 'Success!');
        modal.dismiss('Cross click');
      }, err => {
        if (err.error.error.reason) {
          this.toastr.error(err.error.error.reason);
        }
        this.spinner.hide();
      })
    }else{
      this._LocationService.createLocation(this.locationform.value).pipe(first()).subscribe(async res => {
        this.getLocationList();
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
    getLocationList() {
      this.spinner.show();
      $('#location').DataTable().clear().destroy();
      this._LocationService.getLocation().pipe(first()).subscribe(res => {
        this.locationArr = res.data;
        $(document).ready(function () {
          $('#location').DataTable({
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
  
    editLocation(values, content) {
      this.spinner.show();
      this.buttonText = "Update"
      this.locationSubmitted = false;
      this._LocationService.getSingleLocation(values.id).pipe(first()).subscribe(res => {
        this.locationObj = res.data;
      //  this.toastr.success(res.message, 'Success!');
        this.spinner.hide();
      })
      this.modalService.open(content, { size: 'sm' });
    }
    openModal(content, locationId,){
      this.spinner.show();
      if(locationId){
        this.locationId = locationId;
        this.modalService.open(content, { size: 'sm' });  
      }
      this.spinner.hide();
    }
  

    deleteData(modal){
      this.spinner.show();
        this.userName = JSON.parse(localStorage.getItem('currentUser')).data.loginObj.userName;
      this._LocationService.deleteLocation(this.locationId,this.userName).pipe(first()).subscribe(res =>{
        this.toastr.success(res.data, 'Success!');
        modal.dismiss('Cross click');
        this.getLocationList();
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
    getCity() {
         this._MetaService.getCity().pipe(first()).subscribe(res => {
          this.cityArr = res.data;
        });
       }
   
}
 