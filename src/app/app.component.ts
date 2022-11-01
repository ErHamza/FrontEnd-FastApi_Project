import { Component,
   OnInit } from '@angular/core';
import { AuthService } from './Auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
constructor(private auth : AuthService){}
  ngOnInit() {
    this.auth.autoLogin();
  }


}
