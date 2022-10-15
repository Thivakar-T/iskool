import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CountryService } from '../country.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

declare let $: any;

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

 
  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private _countryService: CountryService,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.countryForm = this.formBuilder.group({
      name: [null, Validators.required],
      shortName: [null, Validators.required]
    });
    this.getcountryList();
  }

  countryForm: FormGroup;
  countryObj: any = {};
  countryArr: any = [];
  countrySubmitted = false;
  buttonText: string = "";
  userName: any;
  countryId:any;

  get f() { return this.countryForm.controls };

  openModal(content: any) {
    this.buttonText = "Submit";
    this.countryForm.reset({});
    this.countryObj = {};
    this.countrySubmitted = false;
    this.modalService.open(content, { size: 'sm' });
  }

  addcountry(modal) {
    this.countrySubmitted = true;
    if (this.countryForm.invalid) {
      return;
    }
    if (this.countryObj.id) {
      this.countryForm.value.id = this.countryObj.id;
      this._countryService.updateCountry(this.countryForm.value).pipe(first()).subscribe(async res => {
        this.getcountryList();
        this.toastr.success(res.data, 'Success!');
        modal.dismiss('Cross click');
      }, err => {
        if (err.error.error.reason) {
          this.toastr.error(err.error.error.reason);
        }
        this.spinner.hide();
      })
    } else {
      this._countryService.createCountry(this.countryForm.value).pipe(first()).subscribe(async res => {
        this.getcountryList();
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
    $('#country').DataTable().clear().destroy();
    this._countryService.getCountry().pipe(first()).subscribe(res => {
      this.countryArr = res.data;
      $(document).ready(function () {
        $('#country').DataTable({
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

  editcountry(values, content) {
    this.spinner.show();
    this.buttonText = "Update"
    this.countrySubmitted = false;
    this._countryService.getSingleCountry(values.id).pipe(first()).subscribe(res => {
      this.countryObj = res.data;
      // this.toastr.success(res.message, 'Success!');
      this.spinner.hide();
    })
    this.modalService.open(content, { size: 'sm' });
  }

}
