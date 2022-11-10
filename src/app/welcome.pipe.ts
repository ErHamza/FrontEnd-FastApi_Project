import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'welcome'
})
export class WelcomePipe implements PipeTransform {

  transform(value: any) {
    let index =0
    // return setTimeout(()=>{
    //   return value[3] ;
    //   index++;
      
    // },1000)
    return value[3] ;
  }

}
