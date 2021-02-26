import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {authentication} from '../services/auth.service'

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.page.html',
  styleUrls: ['./register-page.page.scss'],
})
export class RegisterPagePage implements OnInit {

  constructor(public authService: authentication,
    public router: Router) { }

  ngOnInit() {}

  register(email:any, password:any){
    this.authService.Fbregister(email.value, password.value)      
    .then((res) => {
    }).catch((error) => {
      window.alert(error.message)
    })
}

  goLogin(){
    this.router.navigate(['login-page'])
  }


}
