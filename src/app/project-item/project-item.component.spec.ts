
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { AppModule } from './../app.module';
import { ProjectItemComponent } from './project-item.component';
import { Project } from '../interfaces/project';

describe('ProjectItemComponent', () => {
  let component: ProjectItemComponent;
  let fixture: ComponentFixture<ProjectItemComponent>;
  const project: Project = {
    $key: 'sas',
    title: 'test',
    year: 'test',
    description: 'test',
    imgLink: 'test',
    gitLink: 'test',
    rate: 0
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectItemComponent);
    component = fixture.componentInstance;
    component.project = project;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
