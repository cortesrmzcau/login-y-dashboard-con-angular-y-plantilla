import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase  } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private afsAuth: AngularFireAuth,
    private firebase: AngularFireDatabase
  ) { }

  registerEmail(registroFR: any) {
    return this.afsAuth.auth.createUserWithEmailAndPassword(registroFR.emailFR, registroFR.passwordFR)
      .then(res => 
        this.registerDatabase(registroFR.nombreFR, registroFR.emailFR, res.user.uid)
      );
  }

  registerDatabase(nombre: string, email: string, key: string) {
    this.firebase.database.ref('usuarios_panel/' + key).set({
        nombre: nombre,
        email: email
    });
  }

  loginEmail(formLogin: any) {
    return this.afsAuth.auth.signInWithEmailAndPassword(formLogin.emailFL, formLogin.passwordFL);
  }
}
