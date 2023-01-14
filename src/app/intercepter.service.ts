import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import {  Injectable } from "@angular/core";
import {  Observable } from "rxjs";
import {take, exhaustMap } from "rxjs/operators";
import { AuthService } from "./Auth.service";

@Injectable()
export class Intercepter implements HttpInterceptor{
    constructor(private auth : AuthService){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     
        return this.auth.UserData.pipe(take(1), exhaustMap(user=>{
            if (!user){
                return next.handle(req)
            }
           const modifiedreq = req.clone({
            headers: new HttpHeaders({
                'Authorization' : 'Bearer '+user?.token
              })
           })
           return next.handle(modifiedreq)
        }))
    }

}