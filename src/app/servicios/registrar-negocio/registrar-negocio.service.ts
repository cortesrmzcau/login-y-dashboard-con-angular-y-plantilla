import { Injectable } from '@angular/core';
import { registroNegocioBD, Upload } from '../../modelos/registrar-negocio';
import { AngularFireDatabase } from '@angular/fire/database'; 
import { AngularFireStorage } from '@angular/fire/storage';

import { finalize } from 'rxjs/operators';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';

const swal: SweetAlert = _swal as any;

@Injectable({
  providedIn: 'root'
})
export class RegistrarNegocioService {

  editarNegocio: registroNegocioBD = new registroNegocioBD();
  editarNegocio2: registroNegocioBD = new registroNegocioBD();
  editarNegocio3: registroNegocioBD = new registroNegocioBD();

  urlGaleriaFotos: any;

  private basePath = '/Negocios';

  constructor(
    private firebase: AngularFireDatabase,
    private storage: AngularFireStorage
  ) { }

  insertarRegistro(
    registroNegocio: registroNegocioBD,
    uidUsuario: string,
    upload: Upload,
    galeriaNegocio?: any) {
  
    if(registroNegocio.lunes == true) {
      registroNegocio.lunes = registroNegocio.horarioLunesAM + ' - ' + registroNegocio.horarioLunesPM;
    } else {
      registroNegocio.lunes = 'Cerrado';
    }

    if(registroNegocio.martes == true) {
      registroNegocio.martes = registroNegocio.horarioMartesAM + ' - ' + registroNegocio.horarioMartesPM;
    } else {
      registroNegocio.martes = 'Cerrado';
    }

    if(registroNegocio.miercoles == true) {
      registroNegocio.miercoles = registroNegocio.horarioMiercolesAM + ' - ' + registroNegocio.horarioMiercolesPM;
    } else {
      registroNegocio.miercoles = 'Cerrado';
    }

    if(registroNegocio.jueves == true) {
      registroNegocio.jueves = registroNegocio.horarioJuevesAM + ' - ' + registroNegocio.horarioJuevesPM;
    } else {
      registroNegocio.jueves = 'Cerrado';
    }

    if(registroNegocio.viernes == true) {
      registroNegocio.viernes = registroNegocio.horarioViernesAM + ' - ' + registroNegocio.horarioViernesPM;
    } else {
      registroNegocio.viernes = 'Cerrado';
    }

    if(registroNegocio.sabado == true) {
      registroNegocio.sabado = registroNegocio.horarioSabadoAM + ' - ' + registroNegocio.horarioSabadoPM;
    } else {
      registroNegocio.sabado = 'Cerrado';
    }

    if(registroNegocio.domingo == true) {
      registroNegocio.domingo = registroNegocio.horarioDomingoAM + ' - ' + registroNegocio.horarioDomingoPM;
    } else {
      registroNegocio.domingo = 'Cerrado';
    }

    const idNegocio = Math.random().toString(36).substring(2);

    this.firebase.database.ref('tienda_informacion/')
      .orderByKey()
      .once('value')
      .then(snapshot => {
        if(snapshot.node_.children_.root_.left == undefined) {
          this.firebase.list('tienda_informacion/' + uidUsuario).set(
            idNegocio, {
              foto: 'Nada',
              nombre: registroNegocio.nombre,
              giro: registroNegocio.giro,
              descripcion: registroNegocio.descripcion,
              categoria: registroNegocio.categoria,
              telefono: registroNegocio.telefono,
              direccion: registroNegocio.direccion,
              pagina: registroNegocio.pagina,
              jerarquia: 'Principal'
          }).then(
            () => {
      
              var LatLng = {
                latitude: registroNegocio.latitud,
                longitude: registroNegocio.longitud
              }

              var Horario = {
                lunes: registroNegocio.lunes,
                martes: registroNegocio.martes,
                miercoles: registroNegocio.miercoles,
                jueves: registroNegocio.jueves,
                viernes: registroNegocio.viernes,
                sabado: registroNegocio.sabado,
                domingo: registroNegocio.domingo
              }
      
              this.insertarRegistro2(LatLng, Horario, uidUsuario, idNegocio, upload, galeriaNegocio)
            }
          );
        } else if(snapshot.node_.children_.root_.left.length == 0) {
          this.firebase.list('tienda_informacion/' + uidUsuario).set(
            idNegocio, {
              foto: 'Nada',
              nombre: registroNegocio.nombre,
              giro: registroNegocio.giro,
              descripcion: registroNegocio.descripcion,
              categoria: registroNegocio.categoria,
              telefono: registroNegocio.telefono,
              direccion: registroNegocio.direccion,
              pagina: registroNegocio.pagina,
              jerarquia: 'Principal'
          }).then(
            () => {
      
              var LatLng = {
                latitude: registroNegocio.latitud,
                longitude: registroNegocio.longitud
              }

              var Horario = {
                lunes: registroNegocio.lunes,
                martes: registroNegocio.martes,
                miercoles: registroNegocio.miercoles,
                jueves: registroNegocio.jueves,
                viernes: registroNegocio.viernes,
                sabado: registroNegocio.sabado,
                domingo: registroNegocio.domingo
              }
      
              this.insertarRegistro2(LatLng, Horario, uidUsuario, idNegocio, upload, galeriaNegocio)
            }
          );
        } else {
          this.firebase.list('tienda_informacion/' + uidUsuario).set(
            idNegocio, {
              foto: 'Nada',
              nombre: registroNegocio.nombre,
              giro: registroNegocio.giro,
              descripcion: registroNegocio.descripcion,
              categoria: registroNegocio.categoria,
              telefono: registroNegocio.telefono,
              direccion: registroNegocio.direccion,
              pagina: registroNegocio.pagina,
              jerarquia: 'Sucursal'
          }).then(
            () => {
      
              var LatLng = {
                latitude: registroNegocio.latitud,
                longitude: registroNegocio.longitud
              }

              var Horario = {
                lunes: registroNegocio.lunes,
                martes: registroNegocio.martes,
                miercoles: registroNegocio.miercoles,
                jueves: registroNegocio.jueves,
                viernes: registroNegocio.viernes,
                sabado: registroNegocio.sabado,
                domingo: registroNegocio.domingo
              }
              this.insertarRegistro2(LatLng, Horario, uidUsuario, idNegocio, upload, galeriaNegocio);
            }
          );
        }
      });
  }

  insertarRegistro2(
    LatLng: any,
    Horario: any,
    uidUsuario: string,
    keyNegocio: string,
    upload: Upload,
    galeriaNegocio: any) {

    this.firebase.list('tienda_ubicaciones/' + uidUsuario).update(
      keyNegocio, {
        longitud: LatLng.latitude, 
        latitud: LatLng.longitude
    }).then(
      res => {
        this.firebase.list('tienda_horario/' + uidUsuario).update(
          keyNegocio, {
            lunes: Horario.lunes,
            martes: Horario.martes,
            miercoles: Horario.miercoles,
            jueves: Horario.jueves,
            viernes: Horario.viernes,
            sabado: Horario.sabado,
            domingo: Horario.domingo
        }).then(
          () => this.subirFotoPortada(upload, uidUsuario, keyNegocio, galeriaNegocio, 'registrar')
        );
      });
  }

  subirFotoPortada(upload: Upload, uidUsuarioF: string, keyNegocio?: string, galeriaNegocio?: any, opcionEstado?: string) {
    if (keyNegocio) {
      if (upload != undefined) {
        let FotoPortada: string = "FotoPortada";
        const filePath = `${this.basePath}/${uidUsuarioF}/${keyNegocio}/${FotoPortada}`;
        const storageRef = this.storage.ref(filePath);
        const uploadTask = this.storage.upload(filePath, upload.file);
        uploadTask.snapshotChanges().pipe(
          finalize(() => {
            storageRef.getDownloadURL().subscribe(downloadURL => {
              upload.url = downloadURL;
              upload.name = upload.file.name;
              this.firebase.list('tienda_informacion/' + uidUsuarioF).update(
                keyNegocio, {
                  foto: upload.url
                }
              ).then(
                () => {
                  switch (opcionEstado) {
                    case 'registrar':
                      if (galeriaNegocio != undefined) {
                        this.subirFotosGaleria(uidUsuarioF, keyNegocio, galeriaNegocio, 'registrar');
                      }
                      break;

                    case 'actualizar':
                      if (galeriaNegocio.length != 0) {
                        console.log(galeriaNegocio.length);
                        this.subirFotosGaleria(uidUsuarioF, keyNegocio, galeriaNegocio, 'actualizar');
                      }
  
                      if (galeriaNegocio.length == 0) {
                        swal("Se ha actualizado correctamente el negocio", "", "success").then(
                          () => {
                            window.location.href = '#/mis-negocios';
                          }
                        );
                      }
                      break;
                  }



                  /*
                  if (opcionEstado == 'registrar') {
                    if (galeriaNegocio != undefined) {
                      this.subirFotosGaleria(uidUsuarioF, keyNegocio, galeriaNegocio, 'registrar');
                    } else{
                      swal("Seleccione fotos para la galeria del negocio", "", "success");
                    }
                  }

                  if (opcionEstado == 'actualizar') {
                    if (galeriaNegocio.length != 0) {
                      console.log(galeriaNegocio.length);
                      this.subirFotosGaleria(uidUsuarioF, keyNegocio, galeriaNegocio, 'actualizar');
                    }

                    if (galeriaNegocio.length == 0) {
                      swal("Se ha actualizado correctamente el negocio", "", "success").then(
                        () => {
                          window.location.href = '#/mis-negocios';
                        }
                      );
                    }
                  }*/
                }
              );
            });
          })
        ).subscribe();
      } else {
        console.log(1);
      }
    }
    if (galeriaNegocio == undefined) {
      console.log('no hay');
    } else {
      console.log('si hay');
    }
  }

  subirFotosGaleria(uidUsuarioF: string, keyNegocio: string, galeriaNegocio: any, opcionEstado?: string) {
    if (opcionEstado == 'registrar') {
      if (galeriaNegocio != undefined) {
        for(let x = 0; x < galeriaNegocio.length; x++) {
          this.urlGaleriaFotos = '';
          let Galeria: string = "Galeria";
          
          const path = `Negocios/${uidUsuarioF}/${keyNegocio}/${Galeria}/${galeriaNegocio[x].name}`;
          const task = this.storage.upload(path, galeriaNegocio[x]);

          task.then((f) => {
            f.ref.getDownloadURL().then(
              (urlStorage) => {
                this.urlGaleriaFotos = urlStorage
                this.firebase.list('tienda_galeria/' + keyNegocio).push({
                  foto: urlStorage
                });
              }
            ).then(
              () => {
                swal("Se ha registrado correctamente el negocio", "", "success").then(
                  () => {
                    window.location.href = '#/informacion-mi-negocio/' + keyNegocio;
                  }
                );
              }
            )
          });
        }
      }

      if (galeriaNegocio == undefined) {
        swal("Hubo un problema al registrar el negocio", "", "success").then(
          () => {
            swal("No selecciono una imagen para el negocio", "", "success");
          }
        );
      }
    }

    if (opcionEstado == 'actualizado') {
      if (galeriaNegocio != undefined) {
        for(let x = 0; x < galeriaNegocio.length; x++) {
          console.log(this.urlGaleriaFotos);
          this.urlGaleriaFotos = '';
          console.log(this.urlGaleriaFotos);
          const path = `Ejemplo/${uidUsuarioF}/${keyNegocio}/${galeriaNegocio[x].name}`;
          const task = this.storage.upload(path, galeriaNegocio[x]);
          console.log(task);
          task.then((f) => {
            f.ref.getDownloadURL().then(
              (urlStorage) => {
                this.urlGaleriaFotos = urlStorage
                console.log(this.urlGaleriaFotos);
                console.log(urlStorage)
                this.firebase.list('tienda_galeria/' + keyNegocio).push({
                  foto: urlStorage
                });
              }
            ).then(
              () => {
                swal("Se ha actualizado correctamente el negocio", "", "success").then(
                  () => {
                    window.location.href = '#/mis-negocios';
                  }
                );
              }
            )
          });
        }
      } else {
        swal("Se ha actualizado correctamente el negocio", "", "success").then(
          () => {
            window.location.href = '#/mis-negocios';
          }
        );
      }
    }
  }


  actualizarRegistro(
    registroNegocio: registroNegocioBD,
    uidUsuario: string,
    upload?: Upload,
    galeriaNegocio?: any,
    actualizar?: string) {
    
    console.log(registroNegocio);
    console.log(registroNegocio.$key);
    console.log(uidUsuario);
    console.log(upload);
    console.log(galeriaNegocio);
    console.log(actualizar);
    console.log('---------------------');
    console.log('---------------------');

    

    if(registroNegocio.horarioLunesAM == '') {
      registroNegocio.lunes = 'Cerrado';
    } else {
      registroNegocio.lunes = registroNegocio.horarioLunesAM + ' - ' + registroNegocio.horarioLunesPM;
    }

    if(registroNegocio.horarioMartesAM == '') {
      registroNegocio.martes = 'Cerrado';
    } else {
      registroNegocio.martes = registroNegocio.horarioMartesAM + ' - ' + registroNegocio.horarioMartesPM;
    }

    if(registroNegocio.horarioMiercolesAM == '') {
      registroNegocio.miercoles = 'Cerrado';
    } else {
      registroNegocio.miercoles = registroNegocio.horarioMiercolesAM + ' - ' + registroNegocio.horarioMiercolesPM;
    }

    if(registroNegocio.horarioJuevesAM == '') {
      registroNegocio.jueves = 'Cerrado';
    } else {
      registroNegocio.jueves = registroNegocio.horarioJuevesAM + ' - ' + registroNegocio.horarioJuevesPM;
    }

    if(registroNegocio.horarioViernesAM == '') {
      registroNegocio.viernes = 'Cerrado';
    } else {
      registroNegocio.viernes = registroNegocio.horarioViernesAM + ' - ' + registroNegocio.horarioJuevesPM;
    }

    if(registroNegocio.horarioSabadoAM == '') {
      registroNegocio.sabado = 'Cerrado';
    } else {
      registroNegocio.sabado = registroNegocio.horarioSabadoAM + ' - ' + registroNegocio.horarioSabadoPM;
    }

    if(registroNegocio.horarioDomingoAM == '') {
      registroNegocio.domingo = 'Cerrado';
    } else {
      registroNegocio.domingo = registroNegocio.horarioDomingoAM + ' - ' + registroNegocio.horarioDomingoAM;
    }

    this.firebase.list('tienda_informacion/' + uidUsuario).update(
      registroNegocio.$key, {
        nombre: registroNegocio.nombre,
        giro: registroNegocio.giro,
        descripcion: registroNegocio.descripcion,
        categoria: registroNegocio.categoria,
        telefono: registroNegocio.telefono,
        direccion: registroNegocio.direccion,
        pagina: registroNegocio.pagina
    }).then(
      () => {

        var LatLng = {
          latitude: registroNegocio.latitud,
          longitude: registroNegocio.longitud
        }

        var Horario = {
          lunes: registroNegocio.lunes,
          martes: registroNegocio.martes,
          miercoles: registroNegocio.miercoles,
          jueves: registroNegocio.jueves,
          viernes: registroNegocio.viernes,
          sabado: registroNegocio.sabado,
          domingo: registroNegocio.domingo
        }

        this.actualizarRegistro2(LatLng, Horario, uidUsuario, registroNegocio.$key, upload, galeriaNegocio, 'actualizar');
      }
    );
  }

  actualizarRegistro2(
    LatLng: any,
    Horario: any,
    uidUsuario: string,
    keyNegocio: string,
    upload?: Upload,
    galeriaNegocio?: any,
    actualizar?: string) {

    this.firebase.list('tienda_ubicaciones/' + uidUsuario).update(
      keyNegocio, {
        longitud: LatLng.latitude, 
        latitud: LatLng.longitude
    }).then(
      res => {
        this.firebase.list('tienda_horario/' + uidUsuario).update(
          keyNegocio, {
            lunes: Horario.lunes,
            martes: Horario.martes,
            miercoles: Horario.miercoles,
            jueves: Horario.jueves,
            viernes: Horario.viernes,
            sabado: Horario.sabado,
            domingo: Horario.domingo
        }).then(
          () => {
            if (upload == undefined && galeriaNegocio == undefined) {
              swal("Se ha actualizado correctamente el negocio", "", "success").then(
                () => {
                  //window.location.href = '#/informacion-mi-negocio/' + keyNegocio;
                  //window.scrollTo(0, 0);
                }
              );
            }

            if (upload != undefined || galeriaNegocio.length != 0) {
              this.subirFotoPortada(upload, uidUsuario, keyNegocio, galeriaNegocio, 'actualizar');
            }
          }
        );
      });
  }

  eliminarFotoGaleria(key: string, keyNegocio: string) {
    swal({
      title: "¿Esta seguro de eliminar la foto?",
      text: "Será borrada de la galeria del negocio",
      icon: "warning",
      buttons: [true, true],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.firebase.list('tienda_galeria/' + keyNegocio + '/' + key).remove().then(
          () => {
            swal("La foto ha sido borrada exitosamente", {
              icon: "success",
            }).then(
              () => {
                location.reload();
              }
            );
          }
        );
      }
    });
  }
}
