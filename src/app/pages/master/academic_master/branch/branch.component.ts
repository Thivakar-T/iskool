import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { DegreeService } from '../degree.service';
import { BranchService } from '../branch.service';

declare let $: any; 

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html', 
  styleUrls: ['./branch.component.scss']
}) 
export class BranchComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private _degreeService : DegreeService,
    private _branchService : BranchService,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService,
  ) { }
   

  ngOnInit(): void {
    this.branchform = this.formBuilder.group({
      longName: [null, Validators.required],
      shortName: [null, Validators.required],
      degreeObj: this.formBuilder.group({
        id: [null, Validators.required],
      }),
    })
    this.getDegree();
    this.getBranchList();
  }

  branchform: FormGroup
  branchObj: any = {};
  branchArr: any = [];
  degreeArr:any = [];
  branchSubmitted = false;
  buttonText:string = "";
  userName: any;
  branchId:any;

  get b() { return this.branchform.controls };
  get g() { return this.branchform.controls.degreeObj as FormGroup };

  openbranch(content: any) {
    this.buttonText = "Submit";
    this.branchform.reset({});
     this.branchSubmitted = false;
      this.branchObj = {};
      this.modalService.open(content, { size: 'sm' });
    }
  
    getDegree(){
      this.spinner.show();
      this._degreeService.getDegree().pipe(first()).subscribe(res =>{
        this.degreeArr = res.data;
        this.spinner.hide();
      })
    }

    addBranch(modal) {
      this.branchSubmitted = true;
      if (this.branchform.invalid) {
        return;
      }
      this.spinner.show();
    if(this.branchObj.id){
      this.branchform.value.id = this.branchObj.id;
      this._branchService.updateBranch(this.branchform.value).pipe(first()).subscribe(async res => {
        this.getBranchList();
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
      this._branchService.createBranch(this.branchform.value).pipe(first()).subscribe(async res => {
        this.getBranchList();
        this.toastr.success(res.data, 'Success!');
        modal.dismiss('Cross click');
      }, err => {
        this.spinner.show();
        if (err.error.error.reason) {
          this.toastr.error(err.error.error.reason);
        }
        this.spinner.hide();
      })
    }
    }

    getBranchList() {
      this.spinner.show();
      $('#branch').DataTable().clear().destroy();
      this._branchService.getBranch().pipe(first()).subscribe(res => {
        this.branchArr = res.data;
        $(document).ready(function () {
          $('#branch').DataTable({
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

    editBranch(values, content) {
      this.spinner.show();
      this.buttonText = "Update"
      this.branchSubmitted = false;
      this._branchService.getSingleBranch(values.id).pipe(first()).subscribe(res => {
        this.branchObj = res.data;
        this.branchObj.degreeObj = res.data.degreeObj.id;
        this.spinner.hide();
      })
      this.modalService.open(content, { size: 'sm' });
    }

    openModal(content, branchId,){
      this.spinner.show();
      if(branchId){
        this.branchId = branchId;
        this.modalService.open(content, { size: 'sm' });  
      }
      this.spinner.hide();
    }
  
    deleteData(modal){
      this.spinner.show();
        this.userName = JSON.parse(localStorage.getItem('currentUser')).data.loginObj.userName;
      this._branchService.deleteBranch(this.branchId,this.userName).pipe(first()).subscribe(res =>{
        this.toastr.success(res.data, 'Success!');
        modal.dismiss('Cross click');
        this.getBranchList();
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
