import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';
import { Storage } from "../classes/storage";
import { Router } from '@angular/router';

@Component({
  selector: 'app-structure',
  templateUrl: './structure.component.html',
  styleUrls: ['./structure.component.css'],
  animations: [
    trigger('menu', [
      state('initial', style({
        transform: 'translate3d(0,0,0)',
        visibility: 'visible'
      })),

      state('final' ,style({
        transform: 'translate3d(-100%,0,0)',
        visibility: 'hidden'
      })),

      transition('initial <=> final' , animate('200ms ease-out')),
    ]),
    
    trigger('space', [
      state('initial', style({
        padding: '60px 0px 0px 250px'
      })),

      state('final' ,style({
        padding: '60px 0px 0px 0px'
      })),

      transition('initial <=> final' , animate('200ms ease-out')),
    ]),
  ]
})
export class StructureComponent implements OnInit {

  stateMenu: string;
  statePanel: string;

  views = {
    user: true,

  };

  userData: Storage = new Storage();

  constructor( private router: Router) { }

  ngOnInit() {
    if(window.screen.width < 750){
      this.stateMenu = "final";
      this.statePanel = 'final';
    } else {
      this.stateMenu = "initial";
      this.statePanel = 'initial';
    }
  }

  sideNav(){
    if(window.screen.width < 750){
      this.stateMenu = (this.stateMenu === 'initial' ? 'final' : 'initial');
      // this.statePanel = (this.statePanel === 'initial' ? 'final' : 'initial');

    } else {
      this.stateMenu = (this.stateMenu === 'initial' ? 'final' : 'initial');
      this.statePanel = (this.statePanel === 'initial' ? 'final' : 'initial');
    }    
  }

  cerrarSesion(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  closeNavMov(){
    if(window.screen.width < 750){
        this.stateMenu = "final";
        // this.statePanel = (this.statePanel === 'initial' ? 'final' : 'initial');
    } 
  }

}
