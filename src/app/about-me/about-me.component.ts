import { Component, OnInit } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.7s ease-in')
      ]),
      transition('* => void', [
        animate('0.7s 0.1s ease-out', style({
          opacity: 0,
          transform: 'translateX(100%)'
        }))
      ])
    ]),
    trigger('flyIn', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(+100%)'
        }),
        animate('0.7s ease-in')
      ]),
      transition('* => void', [
        animate('0.7s 0.1s ease-out', style({
          opacity: 0,
          transform: 'translateX(100%)'
        }))
      ])
    ]),
    trigger('flyFromBottom', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(+100%)'
        }),
        animate('0.7s ease-in')
      ]),
      transition('* => void', [
        animate('0.7s 0.1s ease-out', style({
          opacity: 0,
          transform: 'translateY(100%)'
        }))
      ])
    ]),
  ]
})
export class AboutMeComponent implements OnInit {

  constructor() { }
  redirectTo(url) {
    window.open(url)
  }

  ngOnInit() {
  }

}
