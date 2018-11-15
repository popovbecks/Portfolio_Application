import { Project } from './../interfaces/project';
import { ApiService } from '../services/api.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.9s ease-in')
      ]),
      transition('* => void', [
        animate('0.9s 0.1s ease-out', style({
          opacity: 0,
          transform: 'translateX(100%)'
        }))
      ])
    ])
  ]
})
export class ProjectListComponent implements OnInit, OnDestroy {

  constructor(private api: ApiService, private authService: AuthService) {
    this.sortState = 'up';
    this.subscription = this.authService.subject.subscribe(
      (bool) => {
        this.isAuth = bool;
      }
    );
  }
  public subscription: Subscription;
  public isAuth: boolean;
  projectList: Project[];
  public searchStr: String = '';
  isLoading = true;
  sortState: string;

  getSearchString(string) {
    this.searchStr = string;
  }
  sortProjects(stateClass: string) {
    this.sortState = stateClass;
    return this.sortState === 'up' ? this.projectList.sort((a, b) => {
      return b.rate - a.rate;
    }) : this.projectList.sort((a, b) => {
      return a.rate - b.rate;
    });
  }
  ngOnInit() {
    const x = this.api.getData();
    x.snapshotChanges().subscribe(project => {
      this.projectList = [];
      project.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.projectList.push(y as Project);
      });
      this.isLoading = false;
      this.sortProjects('up');
    });
    this.isAuth = this.authService.isAuthenticated;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
