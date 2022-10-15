import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
            var currentUser:any = this.authenticationService.currentUser();
            if (currentUser) {
                 // check if route is restricted by role
            if (route.data.roles && route.data.roles.indexOf(currentUser.data.loginObj.roleList[0].roleName) === -1) {
                // role not authorised so redirect to home page
                this.router.navigateByUrl('/dummy', { skipLocationChange: true });
                setTimeout(() => this.router.navigate(['/dashboard']),10);
                return false;
            }
            // authorised so return true
            return true;
            }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
