
import { AfterContentInit,
    ChangeDetectionStrategy, Component, 
   ElementRef,
    
    OnDestroy,
    OnInit,
    Renderer2,
    
    ViewChild,
     } from '@angular/core';
import { Teximate, TextAnimation } from 'ngx-teximate';
import { fadeIn , fadeInUp, bounceInUp, fadeInDownBig} from 'ng-animate';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
  
})
export class HomeComponent implements OnInit , AfterContentInit,OnDestroy   {

  @ViewChild('teximate') tex? : Teximate;
  finished=false;
  finished1=false;
  finished2=false;
  

  


  constructor(private renderer : Renderer2, private el : ElementRef) { }

 

done(data:any){
  this.finished=true
}
  welcome = 'Welcome to Note Book ';
  or=' " A place where you can share your Ideas or Simply save it. "'
  
  
  
  
  enterAnimation: TextAnimation = {
    animation: fadeIn,
    delay: 50,
    
    type: 'letter'
  };
  secondeAnimation: TextAnimation = {
    animation: fadeInUp,
    delay: 20,
    
    type: 'letter'
  };
  thirdAnimation: TextAnimation = {
    animation: fadeInDownBig,
    delay: 300,
    
    type: 'letter'
  };



  ngOnInit(): void {
    
  }

  

 
  

  ngAfterContentInit(): void {
    
    this.renderer.setStyle(this.el.nativeElement.ownerDocument.body,'background-size', 'cover');
    
    this.renderer.setStyle(this.el.nativeElement.ownerDocument.body,'backgroundImage', 'url(../assets/bg-f3.png)');
    // this.renderer.setStyle(this.el.nativeElement.ownerDocument.body,'background', 'dcd7cc');
  
  
  
  }

  ngOnDestroy(): void {
    // this.renderer.removeStyle(this.el.nativeElement.ownerDocument.body,'backgroundColor');
    this.renderer.removeStyle(this.el.nativeElement.ownerDocument.body,'backgroundImage');
  }


}