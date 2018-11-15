import { LoggingService } from './services/logging.service';
import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';
import { SearchByNamePipe } from './shared/search-name.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment.prod';
import { AdminComponent } from './admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SearchComponent } from './search/search.component';
import { ProjectItemComponent } from './project-item/project-item.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AngularFireAuthModule } from 'angularFire2/auth';
import { MatDividerModule } from '@angular/material/divider';
import { EllipsisPipe } from './shared/ellipsis.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    FooterComponent,
    routingComponents,
    AdminComponent,
    SearchComponent,
    SearchByNamePipe,
    EllipsisPipe,
    ProjectItemComponent
  ],
  imports: [
    BrowserModule,
    MatDividerModule,
    AngularFireAuthModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    AngularFireModule.initializeApp(environment.config),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [],
  providers: [ApiService, AuthService, LoggingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
