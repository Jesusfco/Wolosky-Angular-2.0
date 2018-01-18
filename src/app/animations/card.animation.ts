import { animate, AnimationEntryMetadata, state, style, transition, trigger } from '@angular/core';

export const Card: AnimationEntryMetadata = 
trigger('card', [
      
    state('initial', style({
      transform: 'translate3d(0,50%,0) scale(.7)',                
    })),

    state('final' ,style({
      transform: 'translate3d(0,0,0) scale(1)',       
      
    })),      

    transition('initial <=> final' , animate('350ms ease-out')),
  ]);

 export const BackgroundCard = trigger('background', [
    
    state('initial', style({        
      opacity: 0
    })),

    state('final' ,style({
            
      opacity: 1
    })),      

    transition('initial <=> final' , animate('250ms ease-out')),
  ]);