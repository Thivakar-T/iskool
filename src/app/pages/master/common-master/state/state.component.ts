import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StateService } from '../state.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { CountryService } from '../country.service';

declare let $: any;

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {


  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private _stateService: StateService,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService,
    private _countryService: CountryService,

  ) { }

  ngOnInit(): void {
    this.stateForm = this.formBuilder.group({
      name: [null, Validators.required],
      shortName: [null, Validators.required],
      countryObj: this.formBuilder.group({
        id: [null, Validators.required],
      }),
    });
    this.getstateList();
    this.getcountryList();
    // this.spinner.hide();

  }

  stateForm: FormGroup;
  stateObj: any = {};
  stateArr: any = [];
  countryArr:any =[];
  stateSubmitted = false;
  buttonText: string = "";
  userName: any;
  stateId:any;

  get f() { return this.stateForm.controls };
  get d() { return this.stateForm.controls.countryObj as FormGroup };

  openModal(content: any) {
    this.buttonText = "Submit";
    this.stateForm.reset({});
    this.stateObj = {};
    this.stateSubmitted = false;
    this.modalService.open(content, { size: 'sm' });
  }

  addstate(modal) {
    this.stateSubmitted = true;
    if (this.stateForm.invalid) {
      return;
    }
    if (this.stateObj.id) {
      this.spinner.show();
      this.stateForm.value.id = this.stateObj.id;
      this._stateService.updateState(this.stateForm.value).pipe(first()).subscribe(async res => {
        this.getstateList();
        this.toastr.success(res.data, 'Success!');
        modal.dismiss('Cross click');
      }, err => {
        if (err.error.error.reason) {
          this.toastr.error(err.error.error.reason);
        }
        this.spinner.hide();
      })
    } else {
      this.spinner.show();
      this._stateService.createState(this.stateForm.value).pipe(first()).subscribe(async res => {
        this.getstateList();
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

  getcountryList() {
    this.spinner.show();
    this._countryService.getCountry().pipe(first()).subscribe(res => {
      this.countryArr = res.data;   
      this.spinner.hide();
    }, err => {
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
      }
      this.spinner.hide();
    })
  }

  getstateList() {
    this.spinner.show();
    $('#state').DataTable().clear().destroy();
    this._stateService.getState().pipe(first()).subscribe(res => {
      this.stateArr = res.data;
     $(document).ready(function () {
        $('#state').DataTable({
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

  // editstate(values, content) {
  //   this.spinner.show();
  //   this.buttonText = "Update"
  //   this.stateSubmitted = false;
  //   this._stateService.getSingleState(values.id).pipe(first()).subscribe(res => {
  //     this.stateObj = res.data;
  //     // this.toastr.success(res.message, 'Success!');
  //     this.spinner.hide();
  //   })
  //   this.modalService.open(content, { size: 'sm' });
  // }
  editstate(values, content) {
    this.spinner.show();
    this.buttonText = "Update"
    this.stateSubmitted = false;
    this._stateService.getSingleState(values.id).pipe(first()).subscribe(res => {
    this.stateObj = res.data;
    this.stateObj.countryObj= res.data.countryObj.id;
    
    // this.toastr.success(res.message, 'Success!');
    this.spinner.hide();
    })
    this.modalService.open(content, { size: 'sm' });
    }

}
