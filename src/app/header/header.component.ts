import { AfterContentInit, Component, ElementRef, OnDestroy, OnInit, Renderer2,  } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../Auth.service';
import { faHome, faNoteSticky, faNotesMedical } from '@fortawesome/free-solid-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  
})
export class HeaderComponent implements OnInit, OnDestroy,AfterContentInit {
  isAuthenticated:boolean=false;
  
username?:string;
userSub?:Subscription;
icon1=faHome;
poweroff= faPowerOff;
note= faNoteSticky;
addnote=faNotesMedical;
about=faAddressCard;
 


 
  

  constructor(private route:Router, private auth:AuthService, private renderer: Renderer2, private el: ElementRef) { }
  
  
  ngAfterContentInit(): void {
    this.renderer.setStyle(this.el.nativeElement.ownerDocument.body,'padding',0 );
    this.renderer.setStyle(this.el.nativeElement.ownerDocument.body,'margin',0 );
    // this.renderer.setStyle(this.el.nativeElement.ownerDocument.body,'position','sticky' );
  }




  ngOnInit() {
    this.userSub = this.auth.UserData.subscribe(user=>{
      this.isAuthenticated= !!user
      if(user){
        this.username=user.name;
      }
    });
    

  }

  logo(){
    this.auth.logout();
    this.route.navigate(['/login']);
  }


  
ngOnDestroy(): void {
  this.userSub?.unsubscribe();
  this.renderer.removeStyle(this.el.nativeElement.ownerDocument.body,'margin');    
}



}
