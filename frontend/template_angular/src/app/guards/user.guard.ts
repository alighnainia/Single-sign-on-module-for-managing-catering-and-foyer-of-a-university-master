import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../components/shared/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private loginService:LoginService,private router:Router){}
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    const requiredRoles=route.data.requiredRoles;
    if(!this.loginService.getIsLoggedIn()){
      this.router.navigate(['/']);
      return false;

    }
    const realmRoles=this.loginService.getIsAdmin()?'ROLE_ADMIN':'User';
    if(requiredRoles.indexOf(realmRoles)=== -1){
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

}
