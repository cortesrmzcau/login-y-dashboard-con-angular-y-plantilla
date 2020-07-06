import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireAction } from '@angular/fire/database';
import { AuthService, MisNegociosService } from '../../servicios/servicios.index';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { registroNegocioBD } from '../../modelos/registrar-negocio';

const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-mis-negocios',
  templateUrl: './mis-negocios.component.html',
  styles: []
})
export class MisNegociosComponent implements OnInit {

  nombre: string;

  negociosUsuario: any = new Array;
  sinNegocios: boolean;
  sinResultadosBusquedaNegocio: boolean;
  tablaNegocios: boolean;

  constructor(
    private firebase: AngularFireDatabase,
    private _AuthService: AuthService,
    private _MisNegociosService: MisNegociosService
  ) { }

  ngOnInit() {
    this.consultaNegociosCuenta();
  }

  consultaNegociosCuenta() {
    this._AuthService.isAuth().subscribe(auth => {
      if(auth) {
        this.firebase.list('tienda_informacion/' + auth.uid).snapshotChanges().subscribe(
          res => {
            this.negociosUsuario = [];
            res.forEach(element => {
              let x: any = element.payload.toJSON();
              x['$key'] = element.key;
              this.negociosUsuario.push(x);
            });
  
            if(this.negociosUsuario.length > 0) {
              this.sinNegocios = false;
              this.tablaNegocios = true;
            } else {
              this.sinNegocios = true;
              this.tablaNegocios = false;
            }
        });
      }
    });
  }

  deleteNegocio(keyNegocio) {
    swal({
      text: "Al eliminar el negocio toda su información y los productos asociados serán borrados, ¿Está seguro de eliminar este negocio?",
      icon: "warning",
      buttons: [true, true],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("El Negocio se ha eliminado exitosamente", {
          icon: "success",
        });
        this._AuthService.isAuth().subscribe(auth => {
          this._MisNegociosService.borrarNegocio(auth.uid, keyNegocio);
        });
      }
    });
  }

  convertirNegocio(keyNegocio) {
    this._AuthService.isAuth().subscribe(auth => {
      this._MisNegociosService.convertirNegocio(auth.uid, keyNegocio);
    });
  }

  buscarNegocio($event) {    
    this._AuthService.isAuth().subscribe(auth => {
      this.firebase.list('tienda_informacion/' + auth.uid).snapshotChanges().subscribe(
        res => {
          this.negociosUsuario = [];
          res.forEach(element => {
            let x: any = element.payload.toJSON();
            x['$key'] = element.key;
            this.negociosUsuario.push(x);
          });
          this.negociosUsuario = this.negociosUsuario.filter(res => {
            return res.nombre.toLocaleLowerCase().match($event.target.value.toLocaleLowerCase());
          });

          if(this.negociosUsuario.length == 0) {
            this.sinResultadosBusquedaNegocio = true;
            this.tablaNegocios = false;
          } else {
            this.tablaNegocios = true;
            this.sinResultadosBusquedaNegocio = false;
          }
        });
    });

    if($event.target.value == '') {
      this.consultaNegociosCuenta();
    }
  }

}
