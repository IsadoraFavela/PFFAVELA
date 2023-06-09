import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.obtenerUsuarioAutenticado().pipe(
      map((usuarioAutenticado) => {
        if (usuarioAutenticado) {
          //alert('No tienes permiso')
          //return false;
          return true;
        } else {
          alert('No tienes permiso');
          return false;
        }
      })
    );
    // return true;
  }
}
