import { Project } from './../interfaces/project';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        style({
          opacity: 0
        }),
        animate('0.9s ease-in')
      ]),
      transition('* => void', [
        animate('0.9s 0.1s ease-out', style({
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
export class ProjectDetailComponent implements OnInit {
  public project: Project;
  public subscription: Subscription;
  public currentRate = 0;
  public readonly: boolean;
  constructor(private route: ActivatedRoute, private api: ApiService, private authService: AuthService) {
    this.subscription = this.authService.subject.subscribe(item => {
      this.readonly != null ? this.readonly = !item : this.readonly = true;
    });
  }
  redirectTo() {
    const a = this.project.gitLink;
    window.open(a);
  }
  setRate(rating) {
    this.api.updateRate(this.project, rating);
  }
  getProject() {
    const id = this.route.snapshot.paramMap.get('id');
    const projectList = [];
    const x = this.api.getData();
    x.snapshotChanges().subscribe(project => {
      project.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        projectList.push(y as Project);
      });
      this.project = projectList.find(item => item.$key === id);
      this.currentRate = this.project.rate;
    });
  }
  ngOnInit() {
    this.getProject();
    this.readonly = !this.authService.isAuthenticated;
  }

}
