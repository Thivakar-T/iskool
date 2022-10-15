import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StateService } from '../state.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { CityService } from '../city.service';

declare let $: any;
@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {

 

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private _stateService: StateService,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService,
    private _cityService: CityService,

  ) { }

  ngOnInit(): void {
    this.cityForm = this.formBuilder.group({
      name: [null, Validators.required],
      shortName: [null, Validators.required],
      stateObj: this.formBuilder.group({
        id: [null, Validators.required],
      }),
    });
    this.getcityList();
    this.getStateList();
    // this.spinner.hide();

  }

  cityForm: FormGroup;
  cityObj: any = {};
  stateArr: any = [];
  cityArr:any = [];
  countryArr:any =[];
  citySubmitted = false;
  buttonText: string = "";
  userName: any;
  cityId:any;

  get f() { return this.cityForm.controls };
  get d() { return this.cityForm.controls.stateObj as FormGroup };

  openModal(content: any) {
    this.buttonText = "Submit";
    this.cityForm.reset({});
    this.cityObj = {};
    this.citySubmitted = false;
    this.modalService.open(content, { size: 'sm' });
  }

  addCity(modal) {
    this.citySubmitted = true;
    if (this.cityForm.invalid) {
      return;
    }
    if (this.cityObj.id) {
      this.cityForm.value.id = this.cityObj.id;
      this._cityService.updateCity(this.cityForm.value).pipe(first()).subscribe(async res => {
        this.getcityList();
        this.toastr.success(res.data, 'Success!');
        modal.dismiss('Cross click');
      }, err => {
        if (err.error.error.reason) {
          this.toastr.error(err.error.error.reason);
        }
        this.spinner.hide();
      })
    } else {
      this._cityService.createCity(this.cityForm.value).pipe(first()).subscribe(async res => {
        this.getcityList();
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

  getStateList() {
    this.spinner.show();
    this._stateService.getState().pipe(first()).subscribe(res => {
      this.stateArr = res.data;
      // this.toastr.success(res.message, 'Success!');
      this.spinner.hide();
    }, err => {
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
      }
      this.spinner.hide();
    })
  }

  getcityList() {
    this.spinner.show();
    $('#city').DataTable().clear().destroy();       
    this._cityService.getCity().pipe(first()).subscribe(res => {
      this.cityArr = res.data;
      // this.toastr.success(res.message, 'Success!');
      this.spinner.hide();
      $(document).ready(function () {
        $('#city').DataTable({
          "iDisplayLength": 30,
          "lengthMenu":  [10, 25, 30,50,100]

        });
      });
    }, err => {
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
      }
      this.spinner.hide();
    })
  }

  editCity(values, content) {
    this.spinner.show();
    this.buttonText = "Update"
    this.citySubmitted = false;
    this._cityService.getSingleCity(values.id).pipe(first()).subscribe(res => {
    this.cityObj = res.data;
    this.cityObj.stateObj= res.data.stateObj.id;
    
    // this.toastr.success(res.message, 'Success!');
    this.spinner.hide();
    })
    this.modalService.open(content, { size: 'sm' });
    }
}
