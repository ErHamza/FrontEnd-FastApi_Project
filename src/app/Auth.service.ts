import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http"
import { User } from "./user.model";
import { BehaviorSubject, Subject } from "rxjs";
import {tap} from "rxjs/operators"
import { Router } from "@angular/router";

@Injectable({
    providedIn:'root'
})
export class AuthService{
  private expireTime:any;
  

  UserData= new BehaviorSubject<User|null>(null);

 server:string="https://memos-app.herokuapp.com";
    constructor(private http:HttpClient, private route :Router){}
login(data:{email:string , password:string})
{
                const formData = new FormData();
                formData.append('username',data.email);
                formData.append('password',data.password);
                
            
              return this.http.post
              <{access_token:string, token_type:string,email:string, expire_time:string,
              name:string}>(this.server+'/login',
              formData,{
                observe : "body"
              }
            
              
                ).pipe(tap(data=>{
                  
                  this.HandaleAuth(data.email, data.name, data.access_token, data.expire_time)
                  
                  
                }))

                }


autoLogin(){
        

        const Data:{email:string ; name:string ; _token :string ; _experation_date:string }
        =JSON.parse(localStorage.getItem('UserData') || '{}')
        if (!Data){
          
            return;
        }
        const loadedUser = new User(Data.email, Data.name 
          , Data._token, new Date(Data._experation_date)
          );
          if (loadedUser.token){
            this.UserData.next(loadedUser);
            const expTime= new Date(Data._experation_date).getTime() - new Date().getTime();
           
           
            //Calling auto logout here deletes the UserData form the localStorage
            this.autologout(expTime);
            
          }

          


       }



       private HandaleAuth(email: string, name :string,access_token :string, expTime :string )
       {

        const  experation_time =new Date(new Date().getTime() + +expTime * 60*1000)
        const user = new User(email, name, access_token,experation_time);
        this.UserData.next(user);
        
      this.autologout(+expTime * 60*1000);
        localStorage.setItem('UserData', JSON.stringify(user));

       }


       //new user

     NewUser(postData:{name:string , email: string , password:string}) {
      
      
      // Send Http request
     return this.http
        .post(
          this.server+'/users/adduser',
          postData,{
            observe:'response'
          }
        )
      
      }


  logout(){
    
    this.UserData.next(null);
    localStorage.removeItem('UserData');
    // localStorage.clear();
    if(this.expireTime){
      clearTimeout(this.expireTime);
    }
    this.expireTime=null;
    
  }

autologout(experationTime:number){
  
  this.expireTime=setTimeout(()=>{

    this.logout();
    

  },experationTime)

}


    }
