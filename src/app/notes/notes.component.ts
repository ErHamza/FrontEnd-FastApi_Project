
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../Auth.service';
import { ManipulationService } from '../Manipulation.service';
import { Notes } from '../Notes.model';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NotesComponent implements OnInit, OnDestroy {
  posts?:Notes[];
  NoteSub?: Subscription;
  isAuth?:boolean=false;

  constructor(private manipulate : ManipulationService,private auth:AuthService , private route : Router) { }

  




  isLogged(){
    this.auth.UserData.subscribe(user=>{
      if (user?.token){
        this.isAuth=true;
      }
      else{
        this.isAuth=false;
      }
      
    })
  }


  fetchPosts(){
    
    if (this.isAuth){
      this.manipulate.ShowNotes().subscribe(post=>{
        this.manipulate.MyMemos?.next(post);
      })

      
   
    }
    


   

  }


  getPosts(){
    this.manipulate.MyMemos?.subscribe(data=>{
      this.posts= data

    })
  }
 
  
  

  ngOnInit(): void {
    
    
    this.isLogged();
    this.fetchPosts();
    this.getPosts();
    
    
    
  }
  ngOnDestroy(): void {
    this.NoteSub?.unsubscribe();
  }

}
