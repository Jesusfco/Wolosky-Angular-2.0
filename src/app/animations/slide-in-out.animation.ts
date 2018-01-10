// import { trigger, state, animate, transition, style } from '@angular/animations';
import { animate, AnimationEntryMetadata, state, style, transition, trigger } from '@angular/core';

export const SlideAnimation: AnimationEntryMetadata = 

trigger('principal', [                
        state('*' ,style({
        transform: 'translate3d(0,0,0)',               
        })),      
        
        transition(':enter', [
        style({
            transform: 'translate3d(100%,0,0)',
        }),
        animate('550ms ease-out')
        ]),

        transition('void => *', [
        style({
            transform: 'translate3d(100%,0,0)',          
        }),
        animate('350ms ease-in')
        ]),
    ]);

export const FadeAnimation: AnimationEntryMetadata = 

trigger('background', [
        
        state('*', style({        
        opacity: .65
        })),                  
        
        transition(':enter', [
        style({
            opacity: 0,          
        }),
        animate('0.3s ease-out')
        ]),

        transition(':leave', [
        animate('0.5s ease-out', style({
            opacity: 0,          
        }))
        ])

    ])
;
