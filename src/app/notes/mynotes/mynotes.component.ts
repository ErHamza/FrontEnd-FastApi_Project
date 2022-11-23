import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { flush } from '@angular/core/testing';
import { Subscription } from 'rxjs';
import { ManipulationService } from 'src/app/Manipulation.service';
import { Notes } from 'src/app/Notes.model';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';

import { state, transition, trigger, useAnimation, style, animate } from '@angular/animations';


@Component({
  selector: 'app-mynotes',
  templateUrl: './mynotes.component.html',
  styleUrls: ['./mynotes.component.css'],
  animations:[
    trigger('firstAnimation' , [
      transition(':leave',[
      style({
      position: 'relative',
      right:0
      
      }) ,
      animate(1000 , style({
        
        position: 'relative',
        right: '80px',
        opacity:0
      
      })
      )
    ])])]



})

export class MynotesComponent implements OnInit, OnDestroy {
  exlamation= faExclamation;



  @Input() postsList? : Notes[];
  @ViewChild('newName') name?:ElementRef;
  @ViewChild('newContent') content?:ElementRef;
  //this animate to start an animation
animate=false;

toModifyId?:number;
listener1?: Subscription;
editMode? : boolean=false;

default=true;

  constructor(private manipulate: ManipulationService) { }

  

  ngOnInit(): void {
    console.log("list: ",this.postsList)
  }




  ToDelete(index :number)
  {
    this.animate=true;

    
  //  this.listener1= this.manipulate.DeletPost(index).subscribe(()=>{
      
  //     const newList =  this.postsList?.filter(post=>
  //       {
  //       return post.post_id!=index
  //     })
  //     this.manipulate.MyMemos?.next(newList)

  //   });
  // this.listener1= this.manipulate.DeletPost(index).subscribe()




  const newList =  this.postsList?.filter(post=>
          {
          return post.post_id!=index
        })
      this.postsList= newList;
     this.manipulate.MyMemos?.next(newList)
     this.manipulate.DeletPost(index).subscribe()


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
  console.log(this.name?.nativeElement.value)
  console.log(this.content?.nativeElement.value)
  console.log(this.name)
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



ngOnDestroy(): void {
  this.listener1?.unsubscribe()
}



}
