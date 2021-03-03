import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import {authentication} from '../services/auth.service'
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {

  constructor(public fbAuth: authentication, private router: Router,public alertController: AlertController) { }

  ngOnInit() {
  }


  async login(email:any, password:any) {
   (await this.fbAuth.fBsignin(email.value, password.value))
  }

  goRegister(){
    this.router.navigate(['register-page']);
  }

  async gmailLogin(){
    await this.fbAuth.googleLogin()
    this.goHome()
  }

  goHome(){
    this.router.navigate(['']);
  }

}
