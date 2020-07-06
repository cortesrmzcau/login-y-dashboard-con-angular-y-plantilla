import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

import { registroProductoBD } from '../../modelos/registrar-pruducto';
import { Upload } from '../../modelos/registrar-negocio';

const swal: SweetAlert = _swal as any;

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  producto: registroProductoBD = new registroProductoBD();

  private valor = '1';
  private message = new BehaviorSubject<string>('En espera de un nombre');
  private siguiente = new BehaviorSubject<string>('En espera de un nombre');
  public customMessage = this.message.asObservable();
  public recibeResultado = this.siguiente.asObservable();

  private basePath: string = '/Negocios';
  galeria: string = 'Galeria';

  constructor(
    private firebase: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {
  }  

  insertarProductoNegocio(registroProductoNF: registroProductoBD, idUsuario, keyNegocio, upload: any) {
    const id_producto = Math.random().toString(36).substring(2);

    const filePath = `${this.basePath}/${idUsuario}/${keyNegocio}/${this.galeria}/${upload[0].name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, upload[0]);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          return this.firebase.list('tienda_productos/' + keyNegocio).push({
            descripcion: registroProductoNF.descripcion,
            //id_producto: 'pendiente',
            id_tienda: keyNegocio,
            imagen: downloadURL,
            nombre: registroProductoNF.nombre,
            precio: registroProductoNF.precio,
            tag: JSON.parse(localStorage.getItem('categoria_tienda'))
          }).then(
            (res) => {
              this.firebase.list('tienda_productos/' + keyNegocio).update(
                res.key ,{
                  id_producto: res.key,
                }
              ).then(
                () => {
                  for(let x = 0; x < upload.length; x++) {
                    const filePath = `${this.basePath}/${idUsuario}/${keyNegocio}/${this.galeria}/${upload[x].name}`;
                    const storageRef = this.storage.ref(filePath);
                    const uploadTask = this.storage.upload(filePath, upload[x]);
    
                    uploadTask.snapshotChanges().pipe(
                      finalize(() => {
                          storageRef.getDownloadURL().subscribe(downloadURL => {
                            this.firebase.list('producto_galeria/' + keyNegocio + '/' + id_producto).push({
                              foto: downloadURL,
                            }).then(
                              () => {
                                swal("Se ha registrado correctamente el producto", "", "success");
                                this.changeMessage(this.valor);
                              }
                            );
                          });
                        })
                      ).subscribe();
                  }
                }
              );
            }
          );
        });
      })).subscribe();
  }

  public changeMessage(recibeValor: string): void {
    this.message.next(recibeValor);
  }

  actualizarProductoNegocio(registroProductoNF: registroProductoBD, idUsuario: string, keyNegocio: string) {
    return this.firebase.list('tienda_productos/' + idUsuario + '/' + keyNegocio).update(registroProductoNF.$key, {
      nombre: registroProductoNF.nombre,
      descripcion: registroProductoNF.descripcion,
      precio: registroProductoNF.precio
    }).then(
      res => {
        swal("El producto se ha actualizado correctamente", "", "success");
        this.devolverValor('1');
      }
    );
  }

  public devolverValor(recibeValor2: string):  void {
    this.siguiente.next(recibeValor2);
  }

  borrarProductoNegocio(uidUsuario, keyProducto, keyNegocio) {
    this.firebase.list('tienda_productos/' + uidUsuario + '/' + keyNegocio + '/' + keyProducto).remove();
  }

}
