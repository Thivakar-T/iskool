import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../../core/services/auth.service';

import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login component
 */
export class LoginComponent implements OnInit, AfterViewInit {

  loginForm: FormGroup;
  submitted = false;
  error = '';
  returnUrl: string;

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService,
    public spinner: NgxSpinnerService,
    public toastr: ToastrService
    ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });

    // reset login status
    // this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngAfterViewInit() {
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } 
    this.spinner.show();
    this.authenticationService.login(this.loginForm.value).pipe(first()).subscribe(res =>{
      localStorage.setItem('currentUser', JSON.stringify(res));
      localStorage.setItem('token', res.data.jwt);
      // localStorage.setItem('isProductOwner', res.data.loginObj.isProductOwner);

      // this.toastr.success('Login Successfully!', 'Success!');
      this.toastr.success(res.data.message, 'Success!');
      this.router.navigate(['/dashboard']); 
      this.spinner.hide();
    },err =>{
      if(err){
        this.toastr.error(err.error.error.message, 'Error!');
      }
      this.spinner.hide();
    });
  }


}
