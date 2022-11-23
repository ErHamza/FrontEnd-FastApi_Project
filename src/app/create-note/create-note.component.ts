import { AfterContentInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ManipulationService } from '../Manipulation.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit, AfterContentInit , OnDestroy {
  @ViewChild('values') form? : NgForm;
// Post?:{name:string , content:string};
  constructor(private manipulate: ManipulationService , private renderer : Renderer2 , private el : ElementRef) { }
  succed?:boolean;


  ngAfterContentInit(): void {
    this.renderer.setStyle(this.el.nativeElement.ownerDocument.body,'background', 'linear-gradient(to bottom, #D8DEE9 40%, #A0AAB4 60%');
    

  }




  addNote(data:{name:string , content:string}){
    
    this.manipulate.CreateNote(data).subscribe(data=>{
      if (data){
        this.succed=true;
        this.form?.setValue({
          name:"",
          content: ""
        })
      }
      console.log(data);
    },error=>{
      console.log(error)
    })

    setTimeout(() => {
      this.succed=false;
      
    }, 3000);

  }

  ngOnInit(): void {
    
    
  }
  ngOnDestroy(): void {
    this.succed=false;
    this.renderer.removeStyle(this.el.nativeElement.ownerDocument.body,'background');
    
    
  }

}
