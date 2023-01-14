import { AfterContentInit, Component,
   DoCheck,
   ElementRef,
   OnInit, 
   Renderer2} from '@angular/core';
import { AuthService } from './Auth.service';
import { ManipulationService } from './Manipulation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit ,AfterContentInit, DoCheck {
  title = 'app';
  LightMode?:Boolean;

 

  
constructor(private auth : AuthService , private renderer : Renderer2 , private el: ElementRef,
  private manipulate : ManipulationService){}

  ngAfterContentInit(): void {
    
    
  }
  

  ngOnInit() {
    this.auth.autoLogin();
  }


  ngDoCheck() {
  
    // if (this.LightMode){
    //   this.renderer.
    //   setStyle(this.el.nativeElement.ownerDocument.body,'backgroundColor', '#d8dee9');
     
    
    // }
    // else{
    //   // this.renderer.removeStyle(this.el.nativeElement.ownerDocument,'backgroundColor' )
    // }
  
  
  }


}
