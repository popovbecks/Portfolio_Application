import { NotificationsComponent } from './notifications/notifications.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MySkillsComponent } from './my-skills/my-skills.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { FormsModule } from '@angular/forms';
import { ProjectListComponent } from './project-list/project-list.component';
import { AdminComponent } from './admin/admin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './page/page.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';

const routes: Routes = [
  { path: 'home', component: PageComponent },
  { path: 'projects', component: ProjectListComponent },
  { path: 'projects/addProject', component: AdminComponent },
  { path: 'projects/:id/edit', component: AdminComponent },
  { path: 'projects/:id', component: ProjectDetailComponent },
  { path: 'aboutMe', component: AboutMeComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'my-skills', component: MySkillsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }

];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes), FormsModule],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
export const routingComponents = [PageComponent, AdminComponent, ProjectListComponent, ProjectDetailComponent,
  AboutMeComponent, MySkillsComponent, NotFoundComponent, NotificationsComponent];
