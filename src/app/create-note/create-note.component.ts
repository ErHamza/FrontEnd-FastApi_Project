import { AfterContentInit, Component,
   ElementRef, OnDestroy, OnInit,
    Renderer2, ViewChild, Output, EventEmitter} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ManipulationService } from '../Manipulation.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit, AfterContentInit , OnDestroy {
  
  succed?:boolean;
  @ViewChild('values') form? : NgForm;

  constructor(private manipulate: ManipulationService , private renderer : Renderer2 , private el : ElementRef) { }
  
  @Output() state= new EventEmitter<void>();
  @Output() newNote= new EventEmitter<void>();


  ngAfterContentInit(): void {
    this.renderer.setStyle(this.el.nativeElement.ownerDocument.body,'background', 'linear-gradient(to bottom, #D8DEE9 40%, #A0AAB4 60%');
    

  }


stopShowing(){

  this.state.emit();}



addNote(data:{name:string , content:string, published: Boolean}){
    
    
    
    this.manipulate.CreateNote(data).subscribe(data=>{
      if (data){
        this.newNote.emit()
        
        this.succed=true;
        this.form?.setValue({
          name:"",
          content: "",
          published: ""
        })
      }
      
    },error=>{
      
    })

    setTimeout(() => {
      this.succed=false;
      this.stopShowing()
      
    }, 1000);

  }

  ngOnInit(): void {
    
    
  }
  ngOnDestroy(): void {
    this.succed=false;
    this.renderer.removeStyle(this.el.nativeElement.ownerDocument.body,'background');
    
    
  }

}
