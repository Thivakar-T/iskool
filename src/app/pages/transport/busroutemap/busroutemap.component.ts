import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { BusroutemapService } from '../busroutemap.service';
import { VehicleService } from './../../transport/vehicle.service';
import { RoutelistService } from './../../transport/routelist/routelist.service';


declare let $: any;
@Component({
  selector: 'app-busroutemap',
  templateUrl: './busroutemap.component.html',
  styleUrls: ['./busroutemap.component.scss']
})
export class BusroutemapComponent implements OnInit {
  busrouteObj: any = {};
  Obj: any = {};
  busrouteForm: FormGroup;
  busrouteSubmitted = false;
  buttonText: string = "";
  detail: any = []
  userName: any;
  subjectId: any;
  busArr: any = [];
  locaArr: any = [];
  id: any
  constructor(private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private busroutemapService: BusroutemapService,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService,
    private routelistService: RoutelistService,
    private vehicleService: VehicleService,

  ) { }

  ngOnInit(): void {

    this.busrouteForm = this.formBuilder.group({
      vehicleId: [null, Validators.required],
      transportRouteHdrId: [null, Validators.required],

    })

    this.getRoute();
    this.getBus();
    this.getsubject();
  }

  get f() { return this.busrouteForm.controls };

  openSubject(content: any) {
    this.buttonText = "Submit";
    this.busrouteForm.reset({});
    this.busrouteObj = {};
    this.busrouteSubmitted = false;
    this.modalService.open(content, { size: 'sm' });
  }
  getsubject() {
    this.spinner.show();
    $('#bus').DataTable().clear().destroy();
    this.busroutemapService.getData().pipe(first()).subscribe(res => {
      this.detail = res.data;
      $(document).ready(function () {
        $('#bus').DataTable({
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
  getBus() {
    this.vehicleService.getVehicle().pipe(first()).subscribe(res => {
      this.busArr = res.data;

    })

  }
  getRoute() {
    this.routelistService.getRoute().pipe(first()).subscribe(res => {
      this.locaArr = res.data;
    })
  }
  openModal(content, subjectId, ) {
    if (subjectId) {
      this.subjectId = subjectId;
      this.modalService.open(content, { size: 'sm' });
    }
  }
  addbusrouteForm(modal) {
    this.busrouteSubmitted = true;
    if (this.busrouteForm.invalid) {
      return;
    }
    this.busrouteForm.value.id = this.busrouteObj.id;
      this.busroutemapService.updatesubject(this.busrouteForm.value).pipe(first()).subscribe(async res => {
        this.toastr.success(res.data, 'Success!');
        modal.dismiss('Cross click');
        this.getsubject();

      }, err => {
        if (err.error.error.reason) {
          this.spinner.hide();
          this.toastr.error(err.error.error.reason);
        }
      })
  }
  editBatch(values, content) {
    // this.spinner.show();
    this.buttonText = "Update"
    this.busroutemapService.getidData(values.id).pipe(first()).subscribe(res => {
      this.Obj = res.data;

      for (let i = 0; i < this.Obj.length; i++) {
        this.busrouteObj = this.Obj[i];
      }
    
      this.spinner.hide();
    })
    this.modalService.open(content, { size: 'sm' });
  }

  deleteData(modal) {
    this.spinner.show();
    this.busroutemapService.deletesubject(this.subjectId).pipe(first()).subscribe(res => {
      this.toastr.success(res.data, 'Success!');
      modal.dismiss('Cross click');
      this.getsubject();
    }, err => {
      this.spinner.show();
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
      }
      this.spinner.show();
      modal.dismiss('Cross click');
      this.spinner.hide();
    })

  }


  submit() {
  }
}
