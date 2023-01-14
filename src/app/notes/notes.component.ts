
import { AfterContentInit, Component, DoCheck, ElementRef, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/Auth.service';
import { ManipulationService } from '../services/Manipulation.service';
import { Notes } from '../models/Notes.model';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { DeletedNotes } from '../models/deleted.model';
import {map} from 'rxjs/operators'


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
  
})
export class NotesComponent implements OnInit,
  OnDestroy,
  AfterContentInit,
  DoCheck
  {
  posts?:Notes[] | [];
  deletedNotes?: DeletedNotes[];
  NoteSub?: Subscription;
  isAuth?:boolean=false;
  LightMode?:Boolean;
  DetecteMode? : Subscription;
  isFetching?=false;
  show?:Boolean= false;
  AddNote:Boolean=false;
  toanimate?:Boolean;
  showDeleted=false;

 //Icons 
  faBars= faBars;
  faPlus=faPlus;
  faTrash= faTrash;
  faBookOpen=faBookOpen

//this function track the click in the dark div, to cancel the add note 
  showaddnote(){
    this.AddNote=false;
  

  
  
  

}

//show the side bar menu
  showMenu(data:any ){
    this.show= data
  }   

  //function ivoked when click on show the box to add new note
  addnote(){
    // this.toanimate=false;
    this.AddNote=true;
    

  }

  addedNote(){
    this.toanimate=false;
    this.AddNote=false;
    this.fetchPosts();
     this.getPosts();
     
     
  
     setTimeout(()=>this.toanimate=undefined, 2000)

  }
  
  constructor(private manipulate : ManipulationService,private auth:AuthService 
    , private route : Router,private renderer : Renderer2, private el : ElementRef) { }
 
 
  
  
    ngAfterContentInit(): void {
    this.mode()
    if (this.LightMode){
      this.renderer.setStyle(this.el.nativeElement.ownerDocument.body,'backgroundColor', 'white');
     
      
      
    }
    else {
      this.renderer.setStyle(this.el.nativeElement.ownerDocument.body,'backgroundColor', '#303030');
      
     
    }
    
    
  }

  




  isLogged(){
    this.auth.UserData.subscribe(user=>{
      if (user?.token){
        this.isAuth=true;
      }
      else{
        this.isAuth=false;
        this.route.navigate(['/'])

      }
      
    })
  }


  fetchPosts(){
    
    if (this.isAuth){
      this.isFetching=true;
      this.manipulate.ShowNotes().subscribe(post=>{
        this.manipulate.MyMemos?.next(post);
      })

      
   
    }

  }

  

  

  getPosts(){
   this.NoteSub= this.manipulate.MyMemos?.subscribe(data=>{
      this.posts= data
      
      this.isFetching=false;

    })
    
  }

  mode(){
    this.manipulate.isLight.subscribe( light=>{
     this.LightMode= light
   }
   )
 }

// getDeletedPost(){
//   this.manipulate.trash().subscribe(
//     data=>{
//       this.deletedNotes= data;
//     }
//   )
// }

  ngOnInit(): void {

    
    
    
    this.isLogged();
    this.fetchPosts();
    this.getPosts();
    // this.getDeletedPost()
    
   
    
    
  }

  ngDoCheck(): void {
    console.log("laaaa: ",this.posts)
    if (this.LightMode){
      this.renderer.setStyle(this.el.nativeElement.ownerDocument.body,'backgroundColor', 'white');
    
      // color normal #d8dee9
      //#303030' color dark
    }
    else {
      this.renderer.setStyle(this.el.nativeElement.ownerDocument.body,'backgroundColor', '#303030');
      
     
    }
    
  }
  ngOnDestroy(): void {
    this.NoteSub?.unsubscribe();
    this.renderer.removeStyle(this.el.nativeElement.ownerDocument.body,'backgroundColor');
    
  }

}
