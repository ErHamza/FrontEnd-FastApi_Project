import { Component, DoCheck, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Subscription } from 'rxjs';
import { ManipulationService } from 'src/app/services/Manipulation.service';
import { Notes } from 'src/app/models/Notes.model';
import { faExclamation,  } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Moment } from 'moment';


import { state, transition, trigger, style, animate } from '@angular/animations';
import * as moment from 'moment';


@Component({
  selector: 'app-mynotes',
  templateUrl: './mynotes.component.html',
  styleUrls: ['./mynotes.component.css'],
  // animations:[
  //   trigger('firstAnimation' , [
  //     transition(':leave',[
  //     style({
  //     position: 'relative',
  //     right:0
      
  //     }) ,
  //     animate(1000 , style({
        
  //       position: 'relative',
  //       right: '80px',
  //       opacity:0
      
  //     })
  //     )
  //   ])])]
  animations:[
    trigger('firstAnimation',[
      state('state',style({transform:'translateX(0)'
    ,
  opacity:1})),
    state('void', style({transform:'translateX(-50px)'
  ,opacity:0})), transition('state=>void' ,animate('1s') )
  // transition('void=>*', animate('2s'))


    ])
  ]



})

export class MynotesComponent implements OnInit, OnDestroy, DoCheck {
  exlamation= faExclamation;
  faTrash= faTrash;
  faPenToSquare= faPenToSquare;
  faCheck=faCheck;
  faXmark=faXmark;
  faHeart=faHeart;
  
  
  


  @Input() toAnimate? : any;
  @Input() postsList : Notes[] | undefined;
  @ViewChild('newName') name?:ElementRef;
  @ViewChild('newContent') content?:ElementRef;
  //this animate to start an animation
 

animate?:Boolean;
toModifyId?:number;
listener1?: Subscription;
editMode? : boolean=false;
default=true;

  constructor(private manipulate: ManipulationService) { }

  P(dateString :string){
    // const format1 = "YYYY-MM-DD HH:mm:ss";
    // const date1 = new Date(S);
    // const t =moment(date1).format(format1);
    // console.log(t)
    
  return  new Date(dateString)
  
}
 
  

  

  ngOnInit(): void {
    
    this.animate= this.toAnimate ?? true;
    
    
    console.log("animate from init",this.animate)
   
  }

  ngDoCheck(): void {
    
    this.animate= this.toAnimate ?? true;
    console.log("animate from check",this.animate)
  }






ToDelete(index :number)
  {
  this.animate=true  
  console.log("delete try")
  const newList =  this.postsList?.filter(post=>
          {
          return post.post_id!=index
        })
     this.postsList= newList;
     this.manipulate.MyMemos?.next(newList)
     this.manipulate.send_to_trash(index).subscribe(error=>{
      console.log(error)
     }); 
  }


Modify(index :number, i:number){
  this.toModifyId= index;
  
  this.editMode=!this.editMode
  this.default=false;



}

Toedit(){
  return this.toModifyId;
}

httpModify(post_id_ :number){
  // this.manipulate.UpdatePost()
  // console.log(this.name?.nativeElement.value)
  // console.log(this.content?.nativeElement.value)
  // console.log(this.name)
  const name =this.name?.nativeElement.value
  const content = this.content?.nativeElement.value
  this.editMode=false
  this.manipulate.UpdatePost({name,content},post_id_).subscribe(data=>{

    const new_note = this.postsList?.map(post=>{
      post.post_id ===post_id_? post.post_name=name:'' ;
      post.post_id ===post_id_? post.content=content:'' ;
      
    }
    )
    this.manipulate.MyMemos?.next(this.postsList);
    //not good way
    
    
  })

}

liker(post_id :number ,dir=1){


this.manipulate.like({ post_id , dir  }).subscribe()
}

likes(id:number){
   return this.manipulate.getLikes(id).subscribe();
}


ngOnDestroy(): void {
  this.listener1?.unsubscribe()
  
}



}
