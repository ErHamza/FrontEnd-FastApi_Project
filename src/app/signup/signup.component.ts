

import { AfterContentInit, Component, ElementRef, Inject, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../Auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit , AfterContentInit,OnDestroy{
  myerror?:string;
  errors?:any;
  success?:boolean;


  constructor(private auth:AuthService , private renderer : Renderer2, private el : ElementRef ) { }
  ngOnDestroy(): void {
    this.renderer.setStyle(this.el.nativeElement.ownerDocument.body,'backgroundColor', 'white');
    
  }




  ngAfterContentInit(): void {
    this.renderer.setStyle(this.el.nativeElement.ownerDocument.body,'backgroundColor', '#d8dee9');
  
  
  
  }


//Problem : after creating an account an reseting a form to null values to empty strings, the form become invalid so a red rectangle shows
//up
  
  
  @ViewChild('postForm') data: NgForm|undefined;
 

  ngOnInit(): void {
  }

  adduser(postData: { name: string; email: string, password:string }) {
  this.auth.NewUser(postData).subscribe(user=>{
    if(user)
    {this.myerror='';
      this.success=!this.success;
      this.data?.setValue({
        name:"",
        email:"",
        password:""
      })
      this.renderer.removeClass(this.el.nativeElement.ownerDocument.input,'ng-invalid');
      this.renderer.addClass(this.el.nativeElement.ownerDocument.input,'ng-valid');
      this.renderer.removeClass(this.el.nativeElement.ownerDocument.input,'ng-touched');
      this.renderer.addClass(this.el.nativeElement.ownerDocument.input,'ng-untouched');

      setTimeout(() => {
        this.success=false;
       
      }, 5000);
      
      
  
    }
  

  },error=>{
    
    this.errors= error.error.detail[0].type;
    
    
    this.success=false;
    
    this.data?.form.patchValue({
      
      "email":"",
      "password":""
     });

     if(this.errors="value.error.email"){
      this.myerror="this email is not valid"
     }
  })
  }

  




   
}

