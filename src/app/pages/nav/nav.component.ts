import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../servicios/servicios.index';
import { usuarioBD } from 'src/app/modelos/header';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styles: []
})
export class NavComponent implements OnInit {

  usuarios: usuarioBD[];

  nombreUsuario: string;
  correoUsuario: string;

  constructor(
    public afAuth: AngularFireAuth,
    public _AuthService: AuthService
  ) { }

  ngOnInit() {
    this.getUsuario();
  }

  getUsuario() {
    return this._AuthService.isAuth().subscribe(auth => {
      if(auth) {
        this._AuthService.getListaUsuariosRegistrados().snapshotChanges().subscribe(
          res => {
            this.usuarios = [];
            res.forEach(element => {
              let x: any = element.payload.toJSON();
              x['$key'] = element.key;
              this.usuarios.push(x);
            });
  
            for (let usuario of this.usuarios) {
              if(auth.email == usuario['email']) {
                this.nombreUsuario = usuario['nombre'];
                this.correoUsuario = usuario['email'];
              }
            }
          }
        )
      }
    });
  }

  onLogout() {
    this.afAuth.auth.signOut();
    window.location.href = '#/login';
  }

}
