import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class VsoftOnlyGuard  {
  constructor(
    private storage: TokenStorageService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const user = this.storage.getUser();

    if (user.role === 1) {
      return true;
    } else {
      this.router.navigate(['/portal']);
      return false;
    }
  }
}
