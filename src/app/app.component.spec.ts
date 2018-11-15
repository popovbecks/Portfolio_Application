import { AppRoutingModule } from './app-routing.module';

import { ApiService } from './services/api.service';
import { AppModule } from './app.module';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { APP_BASE_HREF } from '@angular/common';





describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [

      ],
      imports: [AppModule, AppRoutingModule],
      providers: [ApiService, { provide: APP_BASE_HREF, useValue: '/' }]
    }).compileComponents();
  }));


});
