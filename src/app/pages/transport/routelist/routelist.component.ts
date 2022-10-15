import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoutelistService } from './routelist.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocationService } from './../../master/common-master/location.service';
import { VehicleService } from '../vehicle.service';
import { DriversService } from '../drivers/drivers.service';
import { AcademicstandardsubjectconfigurationService } from '../../subject/academicstandardsubjectconfiguration.service';
declare let $: any;

@Component({
  selector: 'app-routelist',
  templateUrl: './routelist.component.html',
  styleUrls: ['./routelist.component.scss']
})
export class RoutelistComponent implements OnInit {
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

  // ******ADD ROW******//
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


// *******DELETE ROW*******//

  deleteterm(index) {
    if (this.routeArr.length == 1) {
      this.toastr.error("Can't delete the row when there is only one row", 'Warning');

      return false;
    } else {
      this.routeArr.removeAt(index);
      this.toastr.warning('Row deleted successfully', 'Delete row');
      return true;
    }
  }

  deletedriver(index) {
    if (this.driverArr.length == 1) {
      this.toastr.error("Can't delete the row when there is only one row", 'Warning');

      return false;
    } else {
      this.driverArr.removeAt(index);
      this.toastr.warning('Row deleted successfully', 'Delete row');
      return true;
    }
  }

  deleteschedule(index) {
    if (this.scheduleArr.length == 1) {
      this.toastr.error("Can't delete the row when there is only one row", 'Warning');

      return false;
    } else {
      this.scheduleArr.removeAt(index);
      this.toastr.warning('Row deleted successfully', 'Delete row');
      return true;
    }
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
      // this.routeForm.disable()
      this.getsingle();
    }

    // ******* */ FORM VALIDATION *****//
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



  submit() {
    this.routeSubmitted = true;
  if(this.routeForm.invalid){
    this.toastr.error("Please fill all mandatory fields.", 'Warning');
    return;
  }
      this.RoutelistService.create(this.routeForm.value).pipe(first()).subscribe(async res => {
        this.toastr.success(res.data, 'Success!');
        this.router.navigate(['/route-list'])

      }, err => {
        if (err.error.error.reason) {
          this.toastr.error(err.error.error.reason);
        }
        this.spinner.hide();
      })
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