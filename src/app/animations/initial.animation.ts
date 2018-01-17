
import { animate, AnimationEntryMetadata, state, style, transition, trigger } from '@angular/core';

export const LogoPop: AnimationEntryMetadata = 

trigger('loaderImg', [
      
    state('initial', style({
      transform: 'translate3d(0,80%,0) scale(.7)',        
      opacity: 0
    })),

    state('final' ,style({
      transform: 'translate3d(0,0,0) scale(1)',       
      opacity: 1
    })),      

    transition('initial <=> final' , animate('1000ms ease-out')),
  ]);

export const BackgroundLogo =
  trigger('loader', [
    
    state('initial', style({        
      opacity: 1
    })),

    state('final' ,style({
      display: 'none',       
      opacity: 0
    })),      

    transition('initial <=> final' , animate('500ms ease-out')),
  ]);
  