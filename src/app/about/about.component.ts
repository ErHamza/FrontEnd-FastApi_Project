import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit  , AfterViewInit , OnDestroy{

  constructor(private renderer : Renderer2 , private el:ElementRef) { }
  ngOnDestroy(): void {
    this.renderer.removeStyle(this.el.nativeElement.ownerDocument.body,'backgroundColor');
  }
  ngAfterViewInit(): void {
    this.renderer.setStyle(this.el.nativeElement.ownerDocument.body,'backgroundColor', '#d8dee9');
  }

  ngOnInit(): void {
  }

}
