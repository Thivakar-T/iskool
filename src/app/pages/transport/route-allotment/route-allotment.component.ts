import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms'
import { RoutelistService } from 'src/app/pages/transport/routelist/routelist.service';
import { first } from 'rxjs/operators';
import { VehicleService } from 'src/app/pages/transport/vehicle.service';
import { RouteAllotmentService } from './route-allotment.service';
import { ToastrService } from 'ngx-toastr';
declare let $: any;

@Component({
  selector: 'app-route-allotment',
  templateUrl: './route-allotment.component.html',
  styleUrls: ['./route-allotment.component.scss']
})
export class RouteAllotmentComponent implements OnInit {
  routeForm: FormGroup;
  routeSubmitted = false;
  routeData: any;
  RouteArr: any = [];
  busArr: any = [];
  transportRouteHdrId: any;
  transportRouteDtlList: any = [];
  routeObj: any = {}
  vehicleId: any;
  routeId: any;
  object: any = {};
  student: any = [];
  reportArr: any = [];
  Obj:any = {};
  studentObj:any = {};
  select = 0;
  alltotal = 0;
  enableCard = false;
  configData;
  constructor(
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private RoutelistService: RoutelistService,
    private VehicleService: VehicleService,
    private RouteAllotmentService: RouteAllotmentService,
    public toastr: ToastrService,

  ) { }
  ngOnInit(): void {
   
    this.routeForm = this.formBuilder.group({
      transportRouteHdrId: [null, Validators.required],
      routes: [null, Validators.required],
      vehicleId: [null,Validators.required],
      origin: [null, Validators.required],
      destination: [null, Validators.required],

    });
    this.getRoute()
  }
  get b() { return this.routeForm.controls };

  openCat(content) {

    this.modalService.open(content, { size: 'sm' });
  }
  getRoute() {
    this.spinner.show();
    this.RoutelistService.getRoute().pipe(first()).subscribe(res => {
      this.RouteArr = res.data;
      this.spinner.hide();
    })
  }
  getAllot(event) { 
    this.transportRouteHdrId = event.id;
    this.busArr = [];
    this.routeForm.patchValue({
      vehicleId: null
    })
    this.busArr = event.vehicleList;
    this.routeForm.get('origin').setValue(event.originName);
    this.routeForm.get('destination').setValue(event.destName);
  }
  changed(){
    this.select= 0;
    this.Obj.Selected = 0;
    this.student.forEach(item=>{
      if(item.isChecked == true){
        this.select= this.select +1;
         this.Obj.Selected = this.select;
      }  
     } )
  }
  getAllotment(event) {
    // $('#routeallotment').DataTable().clear().destroy();
    if(event == undefined){
      this.enableCard = false;
    }else{
      this.spinner.show();
      this.vehicleId = event.id;
      this.RouteAllotmentService.getPageModule(this.transportRouteHdrId, this.vehicleId).pipe(first()).subscribe(res => {
        this.transportRouteDtlList = res.data;
        // $(document).ready(function () {
        //   $('#routeallotment').DataTable({
        //     "iDisplayLength": 30,
        //     "lengthMenu":  [10, 25, 30,50,100]
        //   });
        // });  
          if(this.transportRouteDtlList.studentList==''){
            this.toastr.error("No student found", 'Warning');
            this.enableCard = false;
            this.spinner.hide();
          }
        else{
        this.student = this.transportRouteDtlList.studentList
        for (let j = 0; j < this.student.length; j++) {
          this.alltotal = this.student.length;
          this.Obj.total = this.alltotal;       
        } 
        this.changed();
        this.spinner.hide();
        this.toastr.success(res.message, 'Success!');
        this.enableCard = true;
      }
      }, err => {
        if (err.error.error.error) {
          this.toastr.error(err.error.error.error);
        }
        this.spinner.hide();
      });
    }
   
  }
  submit() {
    this.spinner.show();
    this.routeSubmitted = true;
    this.object = this.transportRouteDtlList;
    this.RouteAllotmentService.createAllot(this.object).pipe(first()).subscribe(async res => {

      this.spinner.hide();
      this.routeForm.reset({});
      this.enableCard = false;
      this.routeSubmitted = false;
      this.toastr.success(res.data, 'Success!');
    }, err => {
      if (err.error.error.error) {
        this.toastr.error(err.error.error.error);
      }
      this.spinner.hide();
    });
  }


}
