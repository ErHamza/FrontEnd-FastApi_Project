import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../Auth.service";
import {map} from 'rxjs/operators'

@Injectable({providedIn:'root'})

export class Auth implements CanActivate{
constructor(private auth : AuthService ,private router :Router){}

canActivate(route: ActivatedRouteSnapshot , router : RouterStateSnapshot):
boolean |UrlTree
| Promise<boolean | UrlTree>|
 Observable<boolean| UrlTree>
 {

 return  this.auth.UserData.pipe(map(user=>{
    const isAuth= !user;
    if (isAuth){
        return true
    }
    return this.router.createUrlTree(['/notes','mynotes'])

 }))
}

    



}