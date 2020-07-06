import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'; 
import 'firebase/database';


@Injectable({
  providedIn: 'root'
})
export class MisNegociosService {

  constructor(
    private firebase: AngularFireDatabase
  ) { }

  borrarNegocio(uidUsuario: any, keyNegocio: any) {
    this.firebase.list('tienda_informacion/' + uidUsuario + '/' + keyNegocio).remove();
    this.firebase.list('tienda_ubicaciones/' + uidUsuario + '/' + keyNegocio).remove();
    this.firebase.list('tienda_horario/' + uidUsuario + '/' + keyNegocio).remove();
  }

  convertirNegocio(uidUsuario: any, keyNegocio: any) {
    return this.firebase.list('tienda_informacion/' +  uidUsuario, ref => ref.orderByChild('jerarquia')
      .equalTo('Principal')).snapshotChanges(['child_changed']).subscribe(
        res => {
          this.firebase.list('tienda_informacion/' + uidUsuario).update(
            res[0].key, {
              jerarquia: 'Sucursal'
          });

          this.firebase.list('tienda_informacion/' + uidUsuario).update(
            keyNegocio, {
              jerarquia: 'Principal'
          });
          return;
        }
      )
  }

}
