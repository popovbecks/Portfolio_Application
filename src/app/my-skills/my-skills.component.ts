import { Skill } from './../interfaces/skills';
import { ApiService } from '../services/api.service';
import { Component, OnInit } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-my-skills',
  templateUrl: './my-skills.component.html',
  styleUrls: ['./my-skills.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate('1.2s ease-in')
      ]),
      transition('* => void', [
        animate('1.2s 0.1s ease-out', style({
          opacity: 1
        }))
      ])
    ]),
    trigger('flyFromTop', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(-100%)'
        }),
        animate('0.3s ease-in')
      ]),
      transition('* => void', [
        animate('0.3s 0.1s ease-out', style({
          opacity: 0,
          transform: 'translateY(100%)'
        }))
      ])
    ]),
  ]
})
export class MySkillsComponent implements OnInit {

  constructor(private api: ApiService) { }
  public sillsList: Skill[];
  ngOnInit() {
    this.sillsList = this.api.getSkills();
  }

}
