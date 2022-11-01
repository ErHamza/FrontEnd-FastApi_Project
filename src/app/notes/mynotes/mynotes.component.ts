import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { flush } from '@angular/core/testing';
import { ManipulationService } from 'src/app/Manipulation.service';
import { Notes } from 'src/app/Notes.model';

@Component({
  selector: 'app-mynotes',
  templateUrl: './mynotes.component.html',
  styleUrls: ['./mynotes.component.css']
})
export class MynotesComponent implements OnInit {
  @Input() postsList? : Notes[];
  @ViewChild('newName') name?:ElementRef;
  @ViewChild('newContent') content?:ElementRef;
EditMode: boolean=false;
toModifyId?:number;

  constructor(private manipulate: ManipulationService) { }
  

  ngOnInit(): void {
    console.log("list: ",this.postsList)
  }

  ToDelete(index :number)
  {


    // this.postsList= this.postsList?.filter(element=>{
    //   return element.post_id= index;
    // })
    

    console.log(this.postsList)
    this.manipulate.DeletPost(index).subscribe(()=>{
      console.log('deleted')

    });


  }

  public trackById(index: number, item: Notes) {
    return item.post_id;
  }

//   trackByIdentity(index, item){
//     return item.<attribute_which_is_unique>; 
//  }

Modify(index :number, i:number){
  this.toModifyId= index;



}
Toedit(){
  return this.toModifyId;
}

httpModify(index :number){
  // this.manipulate.UpdatePost()
  console.log(this.name?.nativeElement.value)
  console.log(this.content?.nativeElement.value)
  console.log(this.name)
}
}
