import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { LoginService } from '../servicios/servicios.index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form_login: boolean = true;
  public form_registro: boolean = false;

  public formLogin: FormGroup;
  public error_no_login: boolean;

  public formRegistro: FormGroup;
  public error_no_registro: boolean;

  constructor(
    public formulario: FormBuilder,
    public _LoginService: LoginService
  ) {
    this.formLogin = new FormGroup({
      emailFL: new FormControl(),
      passwordFL: new FormControl()
    });

    this.formRegistro = new FormGroup({
      nombreFR: new FormControl(),
      emailFR: new FormControl(),
      passwordFR: new FormControl()
    });
  }

  ngOnInit() {
  }

  // Login Email

  formularioIngresar() {
    return this._LoginService.loginEmail(this.formLogin.value)
      .then((res) => {
        this.onLoginRedirect();
      }).catch(err => {
        this.error_no_login = true;
      });
  }

  // Registrar usuario

  registrarUsuario() {
    return this._LoginService.registerEmail(this.formRegistro.value)
      .then((res) => {
        this.error_no_registro = true;
        this.onLoginRedirect();
      }).catch(err => {
        this.error_no_registro = true;
      });
  }

  onLoginRedirect(): void {
    window.location.href = '#/mis-negocios';
  }

  mostrarFormRegistro() {
    this.form_login = false;
    this.form_registro = true;
  }

  ocultarFormRegistro() {
    this.form_login = true;
    this.form_registro = false;
  }

}
