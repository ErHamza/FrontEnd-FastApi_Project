import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Auth.service';

import { take, tap } from 'rxjs/operators';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.Emulated
  
})

export class LoginComponent implements OnInit, OnDestroy {
  error?:any;
  token?:string;
  fetching:boolean=false;
  
  

 
  constructor(private auth : AuthService, private route: Router , private renderer: Renderer2, private el:ElementRef) { }
 
  ngAfterContentInit(): void {
    this.renderer.setStyle(this.el.nativeElement.ownerDocument.body,'backgroundColor', '#d8dee9');
  
  
  
  }

  login(data:{email:string, password:string}){
    this.fetching=true;
    
    this.auth.login(data).pipe(take(1),
    
      
    
      
    ).subscribe(logged=>{
      this.fetching=false;
      console.log(this.fetching)
      
      
      
      if (logged.access_token)
      {
        this.token=logged.access_token;
        this.route.navigate(['notes'])

      }
      
    }, error=>{
      this.error= error.error.detail;
      
      this.fetching=false;
    }
    )

    
  }

  ngOnInit() {
    
    
    
  }

  ngOnDestroy(): void {
    this.renderer.setStyle(this.el.nativeElement.ownerDocument.body,'backgroundColor', 'white');
    
  }

 

}
