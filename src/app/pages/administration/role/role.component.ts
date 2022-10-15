import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { RolePolicyMasterService } from './../../role-policy-master.service'
import { Router, ActivatedRoute } from '@angular/router';

declare let $: any;

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  rolepolicyArr: any = [];
  buttonText: string = "";
  policyobj: any;
  listArr: any;


  constructor(
    public toastr: ToastrService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private rolePolicyMasterService: RolePolicyMasterService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }
  roleForm: FormGroup
  roleSubmitted = false;
  userId: any;
  roleobj: any = {
    roleDto: {}
  };
  id: any

  ngOnInit(): void {
    this.roleForm = this.formBuilder.group({
      roleDto: this.formBuilder.group({
        roleName:[null, Validators.required],
      })
    });
    this.getrolemaster();

  }

  get g() { return this.roleForm.controls.roleDto as FormGroup };
  
  openRole(content: any) {
    this.buttonText = "Submit";
    this.roleForm.reset({});
    this.roleobj = {};
    this.roleSubmitted = false;
    this.modalService.open(content, { size: 'sm' });
  }

  submit(modal){
    this.roleSubmitted = true;
    if(this.roleForm.invalid){
    return;
    }
    if(this.id){
    this.policyobj.roleDto.roleName = this.roleForm.value.roleDto.roleName;
    this.policyobj.roleDto.roleId = this.id;
    this.policyobj.list = this.listArr;
   this.policyobj.id= this.roleForm.value.roleDto.id 
    this.rolePolicyMasterService.updateRolePolicy(this.policyobj).pipe(first()).subscribe(async res => {
      this.toastr.success(res.message, 'Success!');
      modal.dismiss('Cross click');
      this.spinner.hide();
      // this.router.navigate(['/administration/role']);
    }, err => {
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
      }
      this.spinner.hide();
    })
  }else{
    this.roleForm.value.roleDto.roleId =  null ;
    this.roleForm.value.list = this.listArr;
    this.rolePolicyMasterService.updateRolePolicy(this.roleForm.value).pipe(first()).subscribe(async res => {
      this.toastr.success(res.message, 'Success!');
      modal.dismiss('Cross click');
      // this.router.navigate(['/administration/role']);

    }, err => {
      if (err.error.error.reason) {
        this.spinner.hide();
        this.toastr.error(err.error.error.reason);
      }
      this.spinner.hide();
    })
  }
  } 
  
  // getSingledata(){
  //   this.roleForm.value.roleDto.roleId = this.id;
  //   this.roleForm.value.roleDto.roleName = this.roleName;
  //   this.spinner.show();
  //   this.rolePolicyMasterService.getRolePolicy( this.roleForm.value).pipe(first()).subscribe(async res => {
  //     this.roleForm.patchValue({
  //       roleDto: res.data.roleDto,
  //     })
  //     this.policyobj = res.data;
  //     this.policyobj.roleDto.roleName = res.data.roleDto.roleName;
  //     this.listArr = res.data.list;

  //     this.spinner.hide();
  //     // this.toastr.success(res.message, 'Success!');
  //   }, err => {
  //     if (err.error.error.reason) {
  //       this.spinner.hide();
  //       this.toastr.error(err.error.error.reason);
  //     }
  //   })
  // }

  editRole(values, content) {
    this.spinner.show();
    this.buttonText = "Update"
    this.roleSubmitted = false;
    this.rolePolicyMasterService.getRolePolicy(values).pipe(first()).subscribe(res => {
      this.roleForm.patchValue({
        roleDto: res.data.roleDto,
      })
      this.policyobj = res.data;
      this.policyobj.roleDto.roleName = res.data.roleDto.roleName;
      this.listArr = res.data.list;
      this.spinner.hide();
    }, err => {
      if (err.error.error.reason) {
        this.spinner.hide();
        this.toastr.error(err.error.error.reason);
      }
    })
    this.modalService.open(content, { size: 'sm' });
  }

  getrolemaster() {
    this.spinner.show();
    $('#example').DataTable().clear().destroy();
    this.rolePolicyMasterService.getrolemaster().pipe(first()).subscribe(res => {
      this.rolepolicyArr = res.data;
      $(document).ready(function () {
        $('#example').DataTable({
          "iDisplayLength": 30
        });
      });
    });
    this.spinner.hide();

  }


}
