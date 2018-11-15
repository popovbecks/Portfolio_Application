import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { trigger, state, transition, style, animate, group } from '@angular/animations';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [
    trigger('flyIn', [
      state('in', style({ width: 120, transform: 'translateX(0)', opacity: 1 })),
      transition('void => *', [
        style({ width: 10, transform: 'translateX(50px)', opacity: 0 }),
        group([
          animate('0.9s 0.5s ease', style({
            transform: 'translateX(0)',
            width: 193
          })),
          animate('0.9s ease', style({
            opacity: 1
          }))
        ])
      ]),
      transition('* => void', [
        group([
          animate('0.9s ease', style({
            transform: 'translateX(10px)',
            width: 1
          })),
          animate('0.8s 0.6s ease', style({
            opacity: 0
          }))
        ])
      ])
    ])
  ]
})
export class SearchComponent implements OnInit {

  constructor() { }
  searchStr: String = '';
  @Output() public pipeEvent = new EventEmitter();
  sendEvent() {
    this.pipeEvent.emit(this.searchStr);
  }
  ngOnInit() {
  }

}
