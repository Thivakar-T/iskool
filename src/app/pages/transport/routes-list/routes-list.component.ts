import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoutelistService } from '../routelist/routelist.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocationService } from './../../master/common-master/location.service';
import { VehicleService } from '../vehicle.service';
import { DriversService } from '../drivers/drivers.service';
import { AcademicstandardsubjectconfigurationService } from '../../subject/academicstandardsubjectconfiguration.service';
declare let $: any;

@Component({
  selector: 'app-routes-list',
  templateUrl: './routes-list.component.html',
  styleUrls: ['./routes-list.component.scss']
})
export class RoutesListComponent implements OnInit {

  routeObj: any = {};
  obj:any = {};
  routeForm: FormGroup;
  routeSubmitted = false;
  buttonText: string = "";
  routelist: any = [];
  originArr: any = [];
  userName: any;
  rows: any;
  nameObj: any = {};
  routArr: any = [];
  vehicleArray: any = [];
  driverArray: any = [];
  ScheduleArray: any = [];
  originObj : any  = {};
  destinationObj : any  = {};
  TimeArr:any;
  configData;
  id: any ;
  showSubmitButton = true ;
  constructor(
    private formBuilder: FormBuilder,
    private RoutelistService: RoutelistService,
    private router: Router,
    private locationService: LocationService,
    private route: ActivatedRoute,
    private modalService: NgbModal, 
    public toastr: ToastrService,
    public spinner: NgxSpinnerService,
    private vehicleService : VehicleService,
    private driverService : DriversService,
    private _AcademicStdSubConfiService: AcademicstandardsubjectconfigurationService
  ) { 
    this.routeObj.routelist = [];
  }

  selectOriginLocation(event){
    this.originObj.locationName =  event.locationName ;
    }
  
    selectDestinationLocation(event){
      this.destinationObj.locationName =  event.locationName ;
    this.comparingOriginDestination();
    }
  
    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      if (this.id) {
        this.showSubmitButton = false;
        this.getsingle();
      }
  
      this.routeForm = this.formBuilder.group({
  
        routeName: [null, Validators.required],
        originLocationId: [null, Validators.required],
        destinationLocationId: [null, Validators.required],
        description: [null, Validators.required],
        transportRouteDtlList: this.formBuilder.array(
          [this.createrouteFormGroup()], [Validators.required]),
            transportRouteDriverList: this.formBuilder.array(
              [this.createdriverFormGroup()], [Validators.required]),
              vehicleAndScheduleDTOList: this.formBuilder.array(
                [this.createscheduleFormGroup()], [Validators.required])
    
  
      });
  
  this.getLocation();
      this.getVehicle();
      this.getDrivers();
  this.getTimesList();
    }
    get f() { return this.routeForm.controls };

    addterm() {
      let order = this.createrouteFormGroup();
      this.routeArr.push(order);
    
    }
    getTimesList() {
      this._AcademicStdSubConfiService.getTimes().pipe(first()).subscribe(res => {
        this.TimeArr = res.data;
      });
    }
    adddriver() {
      let order = this.createdriverFormGroup();
      this.driverArr.push(order);
    
    }
    addschedule() {
      let order = this.createscheduleFormGroup();
      this.scheduleArr.push(order);
    
    }
  

    // ****** ARRAY VALIDATION  ****//
      createrouteFormGroup() {
        return this.formBuilder.group({
          sequence: [null, [Validators.required]], 
          stopLocationId: [null, [Validators.required]],
          mins: [null, [Validators.required]],
        })
      }
    
    
      createdriverFormGroup() {
        return this.formBuilder.group({
                id: [null, [Validators.required]],
        })
      }
      createscheduleFormGroup() {
        return this.formBuilder.group({
          onwardsStartingTime: [null, [Validators.required]],
          towardsStartingTime: [null, [Validators.required]],
          vehicleId: [null, [Validators.required]],
    
    
        })
      }
    // ******   ARRAY GET ARRAY  ********//
      get routeArr(): FormArray { 
        return this.routeForm.get('transportRouteDtlList') as FormArray;
      }
      get scheduleArr(): FormArray { 
        return this.routeForm.get('vehicleAndScheduleDTOList') as FormArray;
      }
      get driverArr(): FormArray { 
        return this.routeForm.get('transportRouteDriverList') as FormArray;
      }
    
  getVehicle() {
    this.vehicleService.getVehicle().pipe(first()).subscribe(res => {
        this.vehicleArray = res.data;
    });
}
getLocation(){
this.locationService.getLocation().pipe(first()).subscribe(res => {
  this.routArr = res.data;
});
}
getDrivers(){
  this.driverService.getdriver().pipe(first()).subscribe(res => {
    this.driverArray = res.data;
  });
  }

  comparingOriginDestination(){
    if( this.originObj.locationName == this.destinationObj.locationName){
      this.toastr.error("Origin Location & Destination Location can't be same ", 'Warning');
return;
    }
  }

  getsingle() {
    this.spinner.show();
    this.RoutelistService.getSingleRoute(this.id).pipe(first()).subscribe(async res => {
      this.routeObj = res.data;
      const RoleArrList = <FormArray>this.routeForm.controls['transportRouteDtlList'];
      RoleArrList.controls = [];
      for (let i = 0; i < this.routeObj.transportRouteDtlList.length; i++) {
        RoleArrList.push(this.createrouteFormGroup());
      }
      this.routeForm.patchValue({ transportRouteDtlList: this.routeObj.transportRouteDtlList });

      const diverList = <FormArray>this.routeForm.controls['transportRouteDriverList'];
      diverList.controls = [];
      for (let i = 0; i < this.routeObj.transportRouteDriverList.length; i++) {
        diverList.push(this.createdriverFormGroup());
      }
      this.routeForm.patchValue({ transportRouteDriverList: this.routeObj.transportRouteDriverList });

      const timeList = <FormArray>this.routeForm.controls['vehicleAndScheduleDTOList'];
      timeList.controls = [];
      for (let i = 0; i < this.routeObj.vehicleAndScheduleDTOList.length; i++) {
        timeList.push(this.createscheduleFormGroup());
      }
      this.routeForm.patchValue({ vehicleAndScheduleDTOList: this.routeObj.vehicleAndScheduleDTOList });
      this.toastr.success(res.message, 'Success!');
      this.spinner.hide();
    }, err => {
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
      }
      this.spinner.hide();
    })
  }
}
