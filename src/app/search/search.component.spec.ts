
import { By } from '@angular/platform-browser';
import { AppModule } from './../app.module';
import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { APP_BASE_HREF } from '@angular/common';
import { DebugElement, Injector } from '@angular/core';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let translate: TranslateService;
  let de: DebugElement;
  let el: HTMLElement;
  let injector: Injector;
  const translations: any = { "CARDS_TITLE": "This is a test" };
  class FakeLoader implements TranslateLoader {
    getTranslation(lang: string): Observable<any> {
      return Observable.of(translations);
    }
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [AppModule],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }, { provide: TranslateLoader, useClass: FakeLoader }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    injector = getTestBed();
    translate = injector.get(TranslateService)
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('.form-control'));
    el = de.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should set Search, when language is English', () => {
    translate.use('en');
    fixture.detectChanges();
    expect(el.getAttribute('placeholder')).toEqual('Search');
  });

});
