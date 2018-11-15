import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Notification } from '../interfaces/notification';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Project } from '../interfaces/project';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor(private firebase: AngularFireDatabase, private authService: AuthService) {
    this.notificationList = this.firebase.list('notifications');
  }
  notificationList: AngularFireList<any>;
  getNotifications() {
    return this.notificationList;
  }
  insertNotification(project: Project, action: string) {
    this.notificationList.push({
      title: project.title,
      date: Date.now(),
      action: action,
      author: this.authService.name,
      email: this.authService.email
    });
  }
}
