import { NgFor } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../Auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private auth:AuthService) { }
  success?:boolean;
  errors?:string;
  @ViewChild('postForm') data: NgForm|undefined;
 

  ngOnInit(): void {
  }

  adduser(postData: { name: string; email: string, password:string }) {
  this.auth.NewUser(postData).subscribe(user=>{
    if(user){
      this.success=!this.success;
      
      

    }
   this.data?.setValue({
    "name":"",
    "email":"",
    "password":""
   })

  },error=>{
    console.log(error);
    this.errors= error.error;
  })
  }

  

   
}

