import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ManipulationService } from '../Manipulation.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {
// Post?:{name:string , content:string};
  constructor(private manipulate: ManipulationService) { }




  addNote(data:{name:string , content:string}){
    
    this.manipulate.CreateNote(data).subscribe(error=>{
      console.log(error)
    })

  }

  ngOnInit(): void {
    
    
  }

}
