import { AfterContentInit, Component,
   ElementRef,
   OnInit, 
   Renderer2} from '@angular/core';
import { AuthService } from './Auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit ,AfterContentInit {
  title = 'app';
  
constructor(private auth : AuthService , private renderer : Renderer2 , private el: ElementRef){}
  ngOnInit() {
    this.auth.autoLogin();
  }
  ngAfterContentInit(): void {
    
    
  }


}
