import { trigger, state, animate, transition, style } from '@angular/animations';

export const fadeInAnimation =
        trigger('principal', [
            
            state('initial', style({
            transform: 'translate3d(100%,0,0)',                
            })),

            state('final' ,style({
            transform: 'translate3d(0,0,0) scale(1)',               
            })),      

            transition(':enter' , animate('350ms ease-out')),
            transition(':leave' , animate('350ms ease-out')),
        ]),

        trigger('background', [
            
            state('initial', style({        
            opacity: 0
            })),

            state('final' ,style({       
            opacity: .7
            })),      

            transition(':enter' , animate('180ms ease-out')),
            transition(':leave' , animate('180ms ease-out')),
        ]);