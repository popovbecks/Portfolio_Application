import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { Project } from './../interfaces/project';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService, private router: Router,
    private api: ApiService, private route: ActivatedRoute, private toastr: ToastrService, private modalService: NgbModal) {
    this.subscription = this.authService.subject.subscribe(state => {
      this.authenticated = state;
    });
  }
  @Input() project: Project;
  authenticated: boolean;
  subscription: Subscription;
  onSelect(project) {
    this.router.navigate(['/projects', this.project.$key], { relativeTo: this.route });
  }
  onDelete(key: string, project: Project) {
    this.api.deleteProject(key, project);
    this.toastr.success(`Project ${project.title} was successfully deleted!`, 'Admin Panel');
  }
  onEdit(project: Project) {
    this.api.selectedProject = Object.assign({}, project);
    this.router.navigate(['/projects', this.project.$key, 'edit'], { relativeTo: this.route });
  }
  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }
  ngOnInit() {
    this.authenticated = this.authService.isAuthenticated;

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
