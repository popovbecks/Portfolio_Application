
import { Project } from '../interfaces/project';
import { ApiService } from '../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.3s ease-in')
      ]),
      transition('* => void', [
        animate('0.3s 0.1s ease-out', style({
          opacity: 0,
          transform: 'translateX(100%)'
        }))
      ])
    ])
  ]
})
export class AdminComponent implements OnInit {
  projectList: Project[];
  constructor(private api: ApiService, private toastr: ToastrService, private router: Router, private fb: FormBuilder) {
    this.projectForm = fb.group({
      '$key': [null],
      'title': [null, Validators.required],
      'year': [null, Validators.required],
      'gitLink': [null, Validators.required],
      'imgLink': [null, Validators.required],
      'description': [null, Validators.compose([Validators.required, Validators.minLength(30)])]

    });
  }
  projectForm: FormGroup;
  $key: string;
  year: string;
  imgLink: string;
  title: string;
  gitLink: string;
  description: string;

  getService() {
    return this.api;
  }
  onSubmit(projectForm: FormGroup) {
    if (projectForm.value.$key == null) {
      this.api.insertProject(projectForm.value);
      this.toastr.success(`Project ${projectForm.value.title} was successfully added!`, 'Admin Panel');
      this.resetForm(projectForm);
      this.goBack(projectForm);
    } else {
      this.api.updateProject(projectForm.value);
      this.toastr.success(`Project ${projectForm.value.title} was successfully updated!`, 'Admin Panel');
      this.resetForm(projectForm);
      this.goBack(projectForm);
    }
  }
  goBack(projectForm) {
    projectForm.reset();
    this.router.navigate(['/projects']);
  }
  resetForm(projectForm?: FormGroup) {
    if (projectForm != null) {
      projectForm.reset();
      this.api.selectedProject = {
        $key: null,
        title: '',
        year: '',
        imgLink: '',
        description: '',
        gitLink: '',
      };
    }
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
    });
  }
}
