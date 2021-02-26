import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
@Injectable({
  providedIn: 'root'
})

export class authentication {
  loginInfo: any;
    constructor(public fbAuth: AngularFireAuth, public afStore: AngularFirestore, private router: Router, private googlePlus: GooglePlus) { 
      this.fbAuth.authState.subscribe(user => {
        if (user) {
          this.loginInfo = user;
          localStorage.setItem('user', JSON.stringify(this.loginInfo));
          JSON.parse(localStorage.getItem('user'));
        } else {
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
        }
      })
    }

    async fBsignin(email, password) {
      return await this.fbAuth.signInWithEmailAndPassword(email, password)
      .then((response) => {
        console.log(response)
        this.router.navigate(["tabs"])
      })
      .catch((error) => {
          console.log(error)
      })
    }

    async Fbregister(email:any, password:any) {
        return await this.fbAuth.createUserWithEmailAndPassword(email, password)
        .then(res => {
          console.log(res)
          this.router.navigate(['login-page'])
        })
        .catch(error => {
           console.log(error)
    })
  }

  async fblogout() {
    await this.fbAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['login-page']);
  }


  userProfile() {
    return JSON.parse(localStorage.getItem('user'));
  }

}