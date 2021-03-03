import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import {authentication} from '../services/auth.service'

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.page.html',
  styleUrls: ['./register-page.page.scss'],
})
export class RegisterPagePage implements OnInit {

  constructor(public fbAuth: authentication,
    public router: Router, public alertController:AlertController) { }

  ngOnInit() {}


  async register(email:any, password:any){
    console.log(await this.fbAuth.Fbregister(email.value, password.value))
    
}

  goLogin(){
    this.router.navigate(['login-page'])
  }


}
