import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";
import { Scroll } from "@angular/router";

@Directive({
    selector:'[fix]',
    
})

export class FixedComponent{
    constructor(private ele:ElementRef, private renderer : Renderer2 ){}
    
 
    @HostListener('window:scroll', ['$event']) Scroll(){
    

    if (window.scrollY > 80){
        this.renderer.setStyle(this.ele.nativeElement, 'transform', '4')
        this.renderer.setStyle(this.ele.nativeElement, 'position' , 'fixed')

    }
    else{
        this.renderer.removeStyle(this.ele.nativeElement, 'position')
    }

 }   

}



