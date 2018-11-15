import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AngularFireAuth } from 'angularFire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  currentFlag: string;
  name: string;
  authent: boolean;
  constructor(private translate: TranslateService, public af: AngularFireAuth, private authService: AuthService) {
    this.currentFlag = translate.getDefaultLang();

  }
  login() {
    this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(b => {
      console.log(b)
      this.authent = true;
      this.authService.getAuthState(this.authent);
    }
    );
  }
  logout() {
    this.af.auth.signOut().then(b => {
      this.authent = false;
      this.authService.getAuthState(this.authent);
    });
  }
  switchLanguage(language: string) {
    this.translate.use(language);
    this.currentFlag = language;
  }
  toggleButton(button) {
    button.classList.remove('show');
  }
  ngOnInit() {
    this.af.authState.subscribe(
      (auth) => {
        this.name = '';
        console.log(auth)
        if (auth != null) {
          this.authent = true;
          this.authService.getAuthState(auth.emailVerified, auth.displayName, auth.email);
          this.name = auth.displayName;
        }
      }
    );
  }
}


