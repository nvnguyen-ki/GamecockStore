import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AlertController, LoadingController } from '@ionic/angular';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})

export class authentication {
  loginInfo: any;
  userID :any
    constructor(public fbAuth: AngularFireAuth, public afStore: AngularFirestore, private router: Router, private googlePlus: GooglePlus, public alertController:AlertController, public loadingController: LoadingController) { 
      this.fbAuth.authState.subscribe(user => {
        if (user) {
          this.loginInfo = user;
          // put user in local storage
          localStorage.setItem('user', JSON.stringify(this.loginInfo));
          this.userID = JSON.parse(localStorage.getItem('user')).uid;
          console.log(JSON.parse(localStorage.getItem('user')).uid)
        } else {
          localStorage.setItem('user', null);
        }
      })
    }

    
    googleLogin() {
      return this.fbAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    async errorRegister() {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'error: ',
        message: 'wrong login information',
        buttons: ['OK']
      });
      await alert.present();
    }

    async errorLogin() {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'error: ',
        message: 'Make sure your email is formatted correctly and your password is longer than 6 characters',
        buttons: ['OK']
      });
      await alert.present();
    }


    async fBsignin(email: any, password: any) {
      const loading = await this.loadingController.create({
        message: 'Please wait...',
        duration: 2000
      });
      return await this.fbAuth.signInWithEmailAndPassword(email, password)
      .then((response) => {
        loading.dismiss()
        this.router.navigateByUrl('/')
      })
      .catch((error) => {
        this.errorLogin()
      })
    }

    async Fbregister(email:any, password:any) {
        await this.fbAuth.createUserWithEmailAndPassword(email, password)
        .then(res => {
          this.router.navigate(['login-page'])
        })
        .catch(error => {
          this.errorRegister()
      })
  }

  async fblogout() {
    await this.fbAuth.signOut().then(() => {
      localStorage.removeItem('user');
    });
    // reload on logout because for some reason it shows previous account orders every time you logout and relog back in.
    window.location.reload();
  }


  userProfile() {
    return JSON.parse(localStorage.getItem('user'));
  }

  returnUserID(){
    return this.userID
  }

}