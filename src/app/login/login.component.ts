import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/Auth.service';

import { take, tap } from 'rxjs/operators';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.Emulated
  
})

export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('data') form? : NgForm;
  
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
  check(data:any){
console.log(data)
  }

  ngOnInit() {
    console.log(this.form?.statusChanges)
    
    
    
  }

  ngOnDestroy(): void {
    this.renderer.setStyle(this.el.nativeElement.ownerDocument.body,'backgroundColor', 'white');
    
  }

 

}
