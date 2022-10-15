import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../../core/services/auth.service';

import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from 'src/app/core/helpers/must-match.validators'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  chnagePasswordFrom: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService,
      public spinner: NgxSpinnerService,
      public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.chnagePasswordFrom = this.formBuilder.group({
      newPassword: [null, [Validators.required]],
      oldPassword: [null, [Validators.required]],
      // confirmPassword: [null, [Validators.required]],

    });
  }
  year: number = new Date().getFullYear();

  get f() { return this.chnagePasswordFrom.controls; }

  onSubmit() {
    this.submitted = true;
      if(this.chnagePasswordFrom.invalid){
        return;
      }
    this.spinner.show();
    this.authenticationService.changePassword(this.chnagePasswordFrom.value).pipe(first()).subscribe(res =>{
      this.toastr.success(res.message, 'Success!');
      this.router.navigate(['/login']); 
      this.spinner.hide();
    },err =>{
      if(err){
        this.toastr.error(err.error.error.message, 'Error!');
      }
      this.spinner.hide();
    });
  }

}
