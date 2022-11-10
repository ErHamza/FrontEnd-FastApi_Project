import { animation, style, animate, trigger, transition, useAnimation } from '@angular/animations';

export const deleteAnimation = animation([
  style({
    opacity:0,
    width:0,
    height:0

  }),
  animate('{{ time }}')
]);