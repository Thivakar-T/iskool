import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../../core/services/auth.service';

import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordFrom: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService,
    public spinner: NgxSpinnerService,
    public toastr: ToastrService
  ) { }

 ngOnInit(): void {
    this.forgotPasswordFrom = this.formBuilder.group({
      userNameOrEmailOrPhoneNumber: [null, [Validators.required]],
    });
  }
  year: number = new Date().getFullYear();

  get f() { return this.forgotPasswordFrom.controls; }

  onSubmit() {
    this.submitted = true;
      if(this.forgotPasswordFrom.invalid){
        return;
      }
    this.spinner.show();
    this.authenticationService.forgotPassword(this.forgotPasswordFrom.value).pipe(first()).subscribe(res =>{
      this.toastr.success(res.message, 'Success!');
      this.router.navigate(['/account/login']); 
      this.spinner.hide();
    },err =>{
      if(err){
        this.toastr.error(err.error.error.message, 'Error!');
      }
      this.spinner.hide();
    });
  }

}
