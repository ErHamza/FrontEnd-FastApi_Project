
import { AfterContentInit, Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../Auth.service';
import { ManipulationService } from '../Manipulation.service';
import { Notes } from '../Notes.model';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  
})
export class NotesComponent implements OnInit, OnDestroy , AfterContentInit{
  posts?:Notes[];
  NoteSub?: Subscription;
  isAuth?:boolean=false;

  constructor(private manipulate : ManipulationService,private auth:AuthService 
    , private route : Router,private renderer : Renderer2, private el : ElementRef) { }
  
  
    ngAfterContentInit(): void {
    this.renderer.setStyle(this.el.nativeElement.ownerDocument.body,'backgroundColor', '#d8dee9');
  }

  




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
    this.renderer.setStyle(this.el.nativeElement.ownerDocument.body,'backgroundColor', 'white');
  }

}
