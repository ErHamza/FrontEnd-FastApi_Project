import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faLessThanEqual, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark, faAdd,faX } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {
faXmark= faCircleXmark;
faAdd=faAdd;
faX=faX;
 MenuState?:Boolean=true;

 addCat=false;
@Output() Menu: EventEmitter<Boolean> = new EventEmitter<Boolean>();


showM(){
  this.MenuState=!this.MenuState
  console.log(this.MenuState)
  this.Menu.emit(this.MenuState)
  
}
clickToAddCat(){
  this.addCat=true
}

  constructor() { }

  ngOnInit(): void {
  }

}
