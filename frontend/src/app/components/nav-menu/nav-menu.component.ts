import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
  animations: [
    trigger('animation1', [
      state(
        'in',
        style({
          margin: '10px 0px 0px 0px',
          transform: 'rotate(45deg)',
        })
      ),

      state(
        'out',
        style({
          transform: 'rotate(0deg)',
        })
      ),

      transition('in => out', animate('0.2s')),
      transition('out => in', animate('0.2s')),
    ]),

    trigger('animation2', [
      state(
        'in',
        style({
          opacity: '0',
          transform: 'translateX(-50px)'
        })
      ),

      state(
        'out',
        style({
          transform: 'rotate(0deg)',
        })
      ),

      transition('in => out', animate('0.2s')),
      transition('out => in', animate('0.2s')),
    ]),

    trigger('animation3', [
      state(
        'in',
        style({
          margin: '-10px 0px 0px 0px',
          transform: 'rotate(-45deg)',
        })
      ),

      state(
        'out',
        style({
          transform: 'rotate(0deg)',
        })
      ),
      
      transition('in => out', animate('0.2s')),
      transition('out => in', animate('0.2s')),
    ])  
  ],
})
export class NavMenuComponent {
  
  constructor() {}

  menu: string = 'out';
  search: string = 'out';

  toggleMenu(): void {
    this.menu = this.menu === 'in' ? 'out' : 'in';
  }

  toggleSearch(): void {
    this.search = this.search === 'in' ? 'out' : 'in';
  }

}
