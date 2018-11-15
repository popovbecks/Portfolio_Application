import { LoggingService } from './logging.service';
import { Project } from '../interfaces/project';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private firebase: AngularFireDatabase, private loggingService: LoggingService) {
    this.projectList = this.firebase.list('projects');
  }
  projectList: any;
  selectedProject: Project = new Project();
  getData(): any {
    return this.projectList;
  }
  getProject() {
    const project = this.firebase.object(`projects/`);
    return project;
  }

  insertProject(project: Project) {
    this.projectList.push({
      title: project.title,
      year: project.year,
      description: project.description,
      imgLink: project.imgLink,
      gitLink: project.gitLink,
      rate: 0
    });
    this.loggingService.insertNotification(project, 'added project');
  }
  updateProject(project: Project): void {
    this.projectList.update(project.$key,
      {
        title: project.title,
        year: project.year,
        imgLink: project.imgLink,
        description: project.description,
        gitLink: project.gitLink
      });
    this.loggingService.insertNotification(project, 'updated project');

  }
  updateRate(project: Project, rate: Number) {
    this.projectList.update(project.$key,
      {
        title: project.title,
        year: project.year,
        imgLink: project.imgLink,
        description: project.description,
        gitLink: project.gitLink,
        rate: rate
      });
    this.loggingService.insertNotification(project, 'updated rate of project');
  }
  deleteProject($key: string, project: Project) {
    this.projectList.remove($key);
    this.loggingService.insertNotification(project, 'deleted project');
  }

  getSkills() {
    return [
      {
        title: 'HTML 5',
        url: 'https://www.totalmediasolutions.com/wp-content/uploads/2015/07/css3-html5-logo-initial.png'
      },
      {
        title: 'CSS 3',
        url: 'https://www.lifewire.com/thmb/res912A5Bt95jVZvZfHQ5UE3_Lk=/768x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/css3-57b597e85f9b58b5c2b338de.png'
      },
      {
        title: 'Bootstrap',
        url: 'https://ih0.redbubble.net/image.174928237.6370/ap,550x550,12x12,1,transparent,t.png'
      },
      {
        title: 'PHOTOSHOP',
        url: 'https://i.imgur.com/FpGgsQy.png'
      },
      {
        title: 'JAVA SCRIPT',
        url: 'http://html5beginners.com/wp-content/uploads/2014/09/java.png'
      },
      {
        title: 'ANGULAR 2+',
        url: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg'
      },
      {
        title: 'FIREBASE',
        url: 'https://www.nan-labs.com/wp-content/themes/nanlabs/dist/images/services/technologies/tech-firebase.svg'
      },
      {
        title: 'GIT',
        url: 'https://git-scm.com/images/logos/logomark-orange@2x.png'
      }
    ]
  }
}
