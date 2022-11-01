import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Auth.service';

import { take } from 'rxjs/operators';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  token?:string;
  
  

 
  constructor(private auth : AuthService, private route: Router) { }
  

  login(data:{email:string, password:string}){
    
    this.auth.login(data).pipe(take(1)).subscribe(logged=>{
      
      
      if (logged.access_token)
      {
        this.token=logged.access_token;
        this.route.navigate(['notes'])

      }
      
    })

    
  }

  ngOnInit() {
  }

}
