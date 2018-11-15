import { Notification } from './../interfaces/notification';
import { Component, OnInit } from '@angular/core';
import { LoggingService } from '../services/logging.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  public notes: Notification[];
  public searchString = '';
  constructor(private loggingService: LoggingService) { }

  ngOnInit() {
    const x = this.loggingService.getNotifications();
    x.snapshotChanges().subscribe(note => {
      this.notes = [];
      note.forEach(element => {
        const y = element.payload.toJSON();
        this.notes.push(y as Notification);
        console.log(this.notes);
      });
    });
  }

}
