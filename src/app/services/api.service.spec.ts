import { AngularFireList } from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { of } from 'rxjs';
import { Project } from '../interfaces/project';


const angularFireDatabaseStub = { list: () => { } };
const mockTodos$ = jasmine.createSpyObj('projectList', ['push', 'update', 'remove']);
const mock: Project = {
  $key: '1',
  title: "test",
  year: "test",
  imgLink: "test",
  description: "dsds",
  gitLink: "test",
  rate: 0
};

describe('ApiService', () => {
  let mockService: AngularFireDatabase;
  let service: ApiService;

  beforeEach(() => {
    spyOn(angularFireDatabaseStub, 'list').and.returnValue(mockTodos$);

    TestBed.configureTestingModule({
      providers: [ApiService, { provide: AngularFireDatabase, useValue: angularFireDatabaseStub }]
    });

    mockService = TestBed.get(AngularFireDatabase);
    service = TestBed.get(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be created get data', () => {
    service.getData();
    expect(mockService.list).toHaveBeenCalledWith('projects');
    expect(service.projectList).toEqual(mockTodos$);
    expect(service.getData()).toEqual(mockTodos$);
  });
  it('should push project', () => {

    service.insertProject(mock);
    expect(service.projectList.push).toHaveBeenCalledWith({
      title: mock.title,
      description: mock.description,
      imgLink: mock.imgLink,
      gitLink: mock.gitLink,
      year: mock.year,
      rate: 0
    })
  });
  it('should update project after call updadeProject method', () => {
    service.updateProject(mock);
    expect(service.projectList.update).toHaveBeenCalledWith(mock.$key,
      {
        title: mock.title,
        year: mock.year,
        imgLink: mock.imgLink,
        description: mock.description,
        gitLink: mock.gitLink
      });
  });
  it('should update rate project after call updadeRate method', () => {
    service.updateRate(mock, 2);
    expect(service.projectList.update).toHaveBeenCalledWith(mock.$key,
      {
        title: mock.title,
        year: mock.year,
        imgLink: mock.imgLink,
        description: mock.description,
        gitLink: mock.gitLink,
        rate: 2
      });
  });
  it('should delete project after call deleteProject method', () => {
    service.deleteProject(mock.$key);
    expect(service.projectList.remove).toHaveBeenCalledWith(mock.$key);
  });
  it('should return array of skills after call getSkills method', () => {
    expect(service.getSkills()[0]).toEqual(
      {
        title: "HTML 5",
        url: "https://www.totalmediasolutions.com/wp-content/uploads/2015/07/css3-html5-logo-initial.png"
      }
    );
  })
});
