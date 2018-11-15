import { Project } from '../interfaces/project';
import { NgForm } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { AppModule } from '../app.module';
import { AngularFireDatabaseModule, AngularFireList } from 'angularfire2/database';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import { APP_BASE_HREF } from '@angular/common';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
let component: AdminComponent;
let fixture: ComponentFixture<AdminComponent>;
let de: DebugElement;
let service: ApiService;
const ToastrServiceStub = jasmine.createSpyObj('ToastrService', ['success', 'warning']);
const mockForm = {
  value: {
    $key: '1',
    title: 'test',
    gitLink: 'test',
    imgLink: 'test',
    description: 'test',
    year: '2018'
  },
  reset() { }
};
const mockProj =
{
  $key: '1',
  title: 'test',
  gitLink: 'test',
  imgLink: 'test',
  description: 'test',
  year: '2018'
};

describe('AdminComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({

      declarations: [
      ],
      imports: [AppModule, AngularFireDatabaseModule],
      providers: [ApiService, { provide: APP_BASE_HREF, useValue: '/' },
        { provide: ToastrService, useValue: ToastrServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    service = de.injector.get(ApiService);
    spyOn(component, 'getService').and.returnValue(service);
    spyOn(mockForm, 'reset');
    spyOn(component, 'resetForm');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should return service', () => {
    expect(component.getService()).toBeTruthy();
  });

  it('should call getData', () => {
    component.getService();
    expect(component.getService()).toEqual(service);
  });
});
