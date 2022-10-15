import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SchemeService } from '../scheme.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { BranchService } from '../branch.service';
import { DegreeService } from '../degree.service';
declare let $: any;

@Component({
  selector: 'app-scheme',
  templateUrl: './scheme.component.html',
  styleUrls: ['./scheme.component.scss']
})
export class SchemeComponent implements OnInit {


  schemeObj: any = {};
  branchArr: any = [];
  degreeArr: any = [];
  schemeArr:any = [];
  schemeForm: FormGroup;
  schemeSubmitted = false;
  buttonText:string = "";
  userName: any;
  schemeId:any;
  constructor(private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private _schemeService : SchemeService,
    private _branchService : BranchService,
    private _degreeService : DegreeService,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService, 
    ) { }

  ngOnInit(): void {
    this.schemeForm = this.formBuilder.group({
      degreeObj: this.formBuilder.group({
        id: [null, Validators.required],
      }),
      branchObj: this.formBuilder.group({
        id: [null, Validators.required],
      }),
      name: [null, Validators.required]
    })
    this.getBranchList();
    this.getdegree();
    this.getSchemeList();
    this.spinner.hide();

  }

  get f() { return this.schemeForm.controls };
  get d() { return this.schemeForm.controls.degreeObj as FormGroup };
  get b() { return this.schemeForm.controls.branchObj as FormGroup };


  openScheme(content: any) {
    this.buttonText = "Submit";
    this.schemeForm.reset({});
    this.schemeObj = {};
    this.schemeSubmitted = false;
    this.modalService.open(content, { size: 'sm' });
  }

  getBranchList() {
    this.spinner.show();
    this._branchService.getBranch().pipe(first()).subscribe(res => {
      this.branchArr = res.data;
      this.spinner.hide();     
    })
  }

  getdegree() {
    this.spinner.show();
    this._degreeService.getDegree().pipe(first()).subscribe(res => {
      this.degreeArr = res.data;
      this.spinner.hide();
    })
  }

  addScheme(modal) {
    this.schemeSubmitted = true;
    if (this.schemeForm.invalid) {
      return;
    }
  if(this.schemeObj.id){
    this.schemeForm.value.id = this.schemeObj.id;
    this._schemeService.updateScheme(this.schemeForm.value).pipe(first()).subscribe(async res => {
      this.getSchemeList();
      this.toastr.success(res.data, 'Success!');
      modal.dismiss('Cross click');
    }, err => {
      this.spinner.hide();
      modal.dismiss('Cross click');
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
        this.spinner.hide();
      }
    })
  }else{
    this._schemeService.createScheme(this.schemeForm.value).pipe(first()).subscribe(async res => {
      this.getSchemeList();
      this.toastr.success(res.data, 'Success!');
      modal.dismiss('Cross click');
    },err => {
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
      }
      this.spinner.hide();
    })
  }
  }
 
  editScheme(values, content) {
    this.spinner.show();
    this.buttonText = "Update"
    this.schemeSubmitted = false;
    this._schemeService.getSingleScheme(values.id).pipe(first()).subscribe(res => {
      this.schemeObj = res.data;
      this.schemeObj.degreeObj = res.data.branchObj.degreeObj.id;
      this.schemeObj.branchObj = res.data.branchObj.id;
      this.spinner.hide();
    })
    this.modalService.open(content, { size: 'sm' });
  }

  getSchemeList() {
    this.spinner.show();
    $('#scheme').DataTable().clear().destroy();
    this._schemeService.getScheme().pipe(first()).subscribe(res => {
      this.schemeArr = res.data;
      $(document).ready(function () {
        $('#scheme').DataTable({
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

  openModal(content, schemeId,){
    if(schemeId){
      this.schemeId = schemeId;
      this.modalService.open(content, { size: 'sm' });  
    }
  }

  deleteData(modal){
    this.spinner.show();
      this.userName = JSON.parse(localStorage.getItem('currentUser')).data.loginObj.userName;
    this._schemeService.deleteScheme(this.schemeId,this.userName).pipe(first()).subscribe(res =>{
      this.toastr.success(res.data, 'Success!');
      modal.dismiss('Cross click');
      this.getSchemeList();
    },err =>{
      if(err.error.error.reason){
        this.toastr.error(err.error.error.reason);
      }
      modal.dismiss('Cross click');
      this.spinner.hide();
    })
  }
  
}
