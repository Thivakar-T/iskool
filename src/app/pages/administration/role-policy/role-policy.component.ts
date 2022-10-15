import { Component, OnInit } from '@angular/core';
import { RolePolicyMasterService } from './../../role-policy-master.service'
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-role-policy',
  templateUrl: './role-policy.component.html',
  styleUrls: ['./role-policy.component.scss']
})
export class RolePolicyComponent implements OnInit {
  panelOpenState = false;
  RolePageArr: any = [];
  roleForm: FormGroup;
  policyobj:any = { 
  
  };
  roomObj:any = {}
  roleDto:any = { }
  id :  any ;
  showButton1 =  false ;
  showButton =  false ;

  rolepolicyArr: any = [];
  listArr:any;
  configData;

  roleSubmitted = false;
  buttonText:string = "";
  roleArr:any=[];
  roleName:any;
  subList: any;
  list: any;
  constructor(
    private rolePolicyMasterService : RolePolicyMasterService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.roleName = this.route.snapshot.params['roleName'];
    this.id = this.route.snapshot.params['id'];

      this.roleForm = this.formBuilder.group({
        roleDto: this.formBuilder.group({
          roleName:[null, Validators.required],
        }),
  
      })
        this.addPolicy();
        this.show();
    if(this.id){
      this.getSingledata();
    }
  }
  get g() { return this.roleForm.controls.roleDto as FormGroup };

  selectModule(event){
    this.policyobj=this.roleForm.value;
    this.policyobj.list = this.listArr;
    console.log(this.listArr)
    this.spinner.show();
    this.rolePolicyMasterService.getRolePolicy(this.roleForm.value).pipe(first()).subscribe(res => {
      this.rolepolicyArr = res.data;
       this.router.navigate(['/administration/role-policy']);
       this.spinner.hide();
      this.toastr.success(res.message, 'Success!');
    }, err => {
      if (err.error.error.reason) {
        this.spinner.hide();
        this.toastr.error(err.error.error.reason);
      }
    })
  }

  addPolicy() {
    // this.roleForm.value.roleName = null;
    // this.roleForm.value.roleId = null;
    this.spinner.show();

    this.rolePolicyMasterService.getRolePolicy(this.roleForm.value).pipe(first()).subscribe(async res => {
     this.policyobj = res.data;
      this.listArr = res.data.list;
      this.spinner.hide();
      this.toastr.success(res.message, 'Success!');
    }, err => {
      if (err.error.error.reason) {
        this.spinner.hide();
        this.toastr.error(err.error.error.reason);
      }
    })
  }
  selectValue(event){
    if(event.isChecked = true){
      for (let listObj of this.listArr) {
                 for(let subListobj of listObj.subModules){
                             subListobj.isChecked= true;
                             


        }
      }
    }
  }

  show(){
    if(this.roleName == null){
      this.showButton = true;
    }else if(this.roleName !== null){
      this.showButton1 =  true ;
    }
  }


  updatePolicy(){
    this.roleSubmitted = true;
    if(this.roleForm.invalid){
    return;
    }
    if(this.id){
    this.policyobj.roleDto.roleName = this.roleForm.value.roleDto.roleName;
    this.policyobj.roleDto.roleId = this.id;
    this.policyobj.list = this.listArr;
    this.spinner.show();
   this.policyobj.id= this.roleForm.value.roleDto.id 
    this.rolePolicyMasterService.updateRolePolicy(this.policyobj).pipe(first()).subscribe(async res => {
      this.spinner.hide();
      this.toastr.success(res.message, 'Success!');
      this.router.navigate(['/administration/role']);
    }, err => {
      if (err.error.error.reason) {
        this.spinner.hide();
        this.toastr.error(err.error.error.reason);
      }
    })
  }else{
    this.roleForm.value.roleDto.roleId =  null ;
    this.roleForm.value.list = this.listArr;
    this.spinner.show();
    this.rolePolicyMasterService.updateRolePolicy(this.roleForm.value).pipe(first()).subscribe(async res => {
      this.spinner.hide();
      this.toastr.success(res.message, 'Success!');
      this.router.navigate(['/administration/role']);

    }, err => {
      if (err.error.error.reason) {
        this.spinner.hide();
        this.toastr.error(err.error.error.reason);
      }
    })
  }
  } 


  getSingledata(){
    this.roleForm.value.roleDto.roleId = this.id;
    this.roleForm.value.roleDto.roleName = this.roleName;
    this.spinner.show();
    this.rolePolicyMasterService.getRolePolicy( this.roleForm.value).pipe(first()).subscribe(async res => {
      this.roleForm.patchValue({
        roleDto: res.data.roleDto,
      })
      this.policyobj = res.data;
      this.policyobj.roleDto.roleName = res.data.roleDto.roleName;
      this.listArr = res.data.list;

      this.spinner.hide();
      // this.toastr.success(res.message, 'Success!');
    }, err => {
      if (err.error.error.reason) {
        this.spinner.hide();
        this.toastr.error(err.error.error.reason);
      }
    })
  }
}
  
