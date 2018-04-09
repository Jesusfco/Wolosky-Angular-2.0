import { animate, AnimationEntryMetadata, state, style, transition, trigger } from '@angular/core';

// Component transition animations
export const ScaleDownUpAnimation: AnimationEntryMetadata =
  trigger('ScaleDown', [
    state('1',
      style({
        opacity: 0,
        transform: 'scale(.5)',  
      })
    ),

    state('2',
        style({
          opacity: 1,
          transform: 'scale(1)',        
        })
      ),
      
    transition('1 <=> 2' , animate('300ms ease-out')),
    
  ]);

export const backgroundOpacity = 
    trigger('card', [
          
      state('initial', style({
        transform: 'translate3d(0,50%,0) scale(.7)',                
      })),

      state('final' ,style({
        transform: 'translate3d(0,0,0) scale(1)',       
        
      })),      

      transition('initial <=> final' , animate('350ms ease-out')),
    ]);

export const cardPop = 
  trigger('background', [
    
    state('initial', style({        
      opacity: 0
    })),

    state('final' ,style({
            
      opacity: 1
    })),      

    transition('initial <=> final' , animate('250ms ease-out')),
  ]);    