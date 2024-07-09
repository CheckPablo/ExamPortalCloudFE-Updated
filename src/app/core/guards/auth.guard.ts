import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import { User } from '../models/user';

@Injectable()
export class AuthGuard  {
  user: User | null;
  
  constructor(
    private router: Router,
    private storage: TokenStorageService
  ) {
    this.user = this.storage.getUser();
    
    
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.user = this.storage.getUser();
    if (this.user) return true;

    // Not logged in so redirect to login page with the return url
    this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
