import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage'
import { AngularFireModule } from '@angular/fire'
import { SETTINGS } from '@angular/fire/firestore'
import {AngularFirestoreModule } from '@angular/fire/firestore'
import { GooglePlus } from '@ionic-native/google-plus/ngx';
const firebaseConfig = {
  apiKey: "AIzaSyDqFnjTb7KJSrT30Tj1-qjsYRwoL-M9IXI",
  authDomain: "gamecockstore-5807f.firebaseapp.com",
  projectId: "gamecockstore-5807f",
  storageBucket: "gamecockstore-5807f.appspot.com",
  messagingSenderId: "694721641422",
  appId: "1:694721641422:web:bca19faf1e165cd99f499f",
  measurementId: "G-2MYS37MCLH"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, IonicModule.forRoot(),
     AppRoutingModule,
      IonicStorageModule,
    AngularFireModule.initializeApp(firebaseConfig),
      AngularFireAuthModule],
  providers: [
    GooglePlus,
    AngularFirestoreModule,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy  }, {provide: SETTINGS, useValue:{} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
