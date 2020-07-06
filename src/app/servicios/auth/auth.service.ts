import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map  } from 'rxjs/operators';
import { AngularFireDatabase  } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afsAuth: AngularFireAuth,
    private firebase: AngularFireDatabase
  ) {  }

  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }

  getListaUsuariosRegistrados() {
    return this.firebase.list('usuarios_panel');
  }

}
