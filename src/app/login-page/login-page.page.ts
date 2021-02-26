import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import {authentication} from '../services/auth.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {

  constructor(public fbAuth: authentication, private router: Router) { }

  ngOnInit() {
  }

  async login(email, password) {
    await this.fbAuth.fBsignin(email.value, password.value)
  }

  goRegister(){
    this.router.navigate(['register-page']);
  }

  goHome(){
    this.router.navigate(['']);
  }

}
