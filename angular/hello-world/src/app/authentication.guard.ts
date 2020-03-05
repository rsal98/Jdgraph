import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { JavaconnService } from './javaconn.service'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private javaConn: JavaconnService,
    private router : Router
  )
  {}
  canActivate(): boolean{
    if(this.javaConn.isLoggedIn()){
      return true
    }
    else{
      this.router.navigate(['/'])
      return false
    }
  }
}
