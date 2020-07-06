import { Component, OnInit, EventEmitter, ElementRef, Renderer2, ViewChild, Input } from '@angular/core';
import { UploadFile, UploadInput, UploadOutput  } from 'ng-uikit-pro-standard';
import { ActivatedRoute } from '@angular/router';
import { registroNegocioBD, Upload } from '../../modelos/registrar-negocio';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService, RegistrarNegocioService } from '../../servicios/servicios.index';
import * as _ from "lodash";

@Component({
  selector: 'app-editar-negocio',
  templateUrl: './editar-negocio.component.html',
  styles: []
})
export class EditarNegocioComponent implements OnInit {

  negocio: registroNegocioBD[];
  negocio2: registroNegocioBD[];
  negocio3: registroNegocioBD[];
  negocio4: any[] = new Array;
  galeriaNegocio: any[] = new Array;
  slides: any[] = new Array;
  slides2 = [
    { img: "../../assets/verde.jpg" }
  ];
  slideConfig = { "slidesToShow": 4, "slidesToScroll": 2 };

  selectedFileFotoPortada: FileList;
  fotoNegocioPortada: Upload;
  @Input() foto: string;

  @ViewChild("noEventInput", { static: false }) noEventInput: ElementRef;
  @ViewChild("inputImage", { static: false }) inputImage: ElementRef;

  imagenSubir: File;
  imagenTemporal: any;
  mostrarImagen: boolean;

  listGiros = [
    { data: 'Tienda de Ropa', name: 'Tienda de Ropa' },
    { data: 'Tienda de Belleza', name: 'Tienda de Belleza' },
    { data: 'Tienda de Celulares', name: 'Tienda de Celulares' },
    { data: 'Tienda de Computadoras', name: 'Tienda de Computadoras' },
    { data: 'Tienda de Aparatos Electricos', name: 'Tienda de Aparatos Electricos' },
    { data: 'Tienda de Electrodomesticos', name: 'Tienda de Electrodomesticos' }
  ];

  listCategorias = [
    { data: 'Ropa y Accesorios', name: 'Ropa y Accesorios' },
    { data: 'Salud y Belleza', name: 'Salud y Belleza' },
    { data: 'Celulares y Accesorios', name: 'Celulares y Accesorios' },
    { data: 'Computadoras y Accesorios', name: 'Tienda de Computadoras y Accesorios' },
    { data: 'Aparatos Electricos', name: 'Aparatos Electricos' },
    { data: 'Electrodomesticos', name: 'Electrodomesticos' }
  ];

  @ViewChild("nombreNegocio", { static: false }) nombreNegocio: ElementRef;
  @ViewChild("labelGiro", { static: false }) labelGiro: ElementRef;
  @ViewChild("selectGiro", { static: false }) selectGiro: ElementRef;
  @ViewChild("descripcionNegocio", { static: false }) descripcionNegocio: ElementRef;
  @ViewChild("labelCategoria", { static: false }) labelCategoria: ElementRef;
  @ViewChild("selectCategoria", { static: false }) selectCategoria: ElementRef;
  @ViewChild("telefonoNegocio", { static: false }) telefonoNegocio: ElementRef;
  @ViewChild("direccionNegocio", { static: false }) direccionNegocio: ElementRef;
  @ViewChild("paginaNegocio", { static: false }) paginaNegocio: ElementRef;

  checkLunes: boolean;
  horarioLunesAM: string;
  horarioLunesAMTemporal: string;
  horarioLunesPM: string;
  horarioLunesPMTemporal: string;
  
  checkMartes: boolean;
  horarioMartesAM: string;
  horarioMartesAMTemporal: string;
  horarioMartesPM: string;
  horarioMartesPMTemporal: string;

  checkMiercoles: boolean;
  horarioMiercolesAM: string;
  horarioMiercolesAMTemporal: string;
  horarioMiercolesPM: string;
  horarioMiercolesPMTemporal: string;

  checkJueves: boolean;
  horarioJuevesAM: string;
  horarioJuevesAMTemporal: string;
  horarioJuevesPM: string;
  horarioJuevesPMTemporal: string;

  checkViernes: boolean;
  horarioViernesAM: string;
  horarioViernesAMTemporal: string;
  horarioViernesPM: string;
  horarioViernesPMTemporal: string;

  checkSabado: boolean;
  horarioSabadoAM: string;
  horarioSabadoAMTemporal: string;
  horarioSabadoPM: string;
  horarioSabadoPMTemporal: string;

  checkDomingo: boolean;
  horarioDomingoAM: string;
  horarioDomingoAMTemporal: string;
  horarioDomingoPM: string;
  horarioDomingoPMTemporal: string;

  @ViewChild("DiaLunesAbiertCerrado1", { static: false }) DiaLunesAbiertCerrado1: ElementRef;
  @ViewChild("DiaLunesAbiertCerrado2", { static: false }) DiaLunesAbiertCerrado2: ElementRef;

  @ViewChild("DiaMartesAbiertCerrado1", { static: false }) DiaMartesAbiertCerrado1: ElementRef;
  @ViewChild("DiaMartesAbiertCerrado2", { static: false }) DiaMartesAbiertCerrado2: ElementRef;

  @ViewChild("DiaMiercolesAbiertCerrado1", { static: false }) DiaMiercolesAbiertCerrado1: ElementRef;
  @ViewChild("DiaMiercolesAbiertCerrado2", { static: false }) DiaMiercolesAbiertCerrado2: ElementRef;

  @ViewChild("DiaJuevesAbiertCerrado1", { static: false }) DiaJuevesAbiertCerrado1: ElementRef;
  @ViewChild("DiaJuevesAbiertCerrado2", { static: false }) DiaJuevesAbiertCerrado2: ElementRef;

  @ViewChild("DiaViernesAbiertCerrado1", { static: false }) DiaViernesAbiertCerrado1: ElementRef;
  @ViewChild("DiaViernesAbiertCerrado2", { static: false }) DiaViernesAbiertCerrado2: ElementRef;

  @ViewChild("DiaSabadoAbiertCerrado1", { static: false }) DiaSabadoAbiertCerrado1: ElementRef;
  @ViewChild("DiaSabadoAbiertCerrado2", { static: false }) DiaSabadoAbiertCerrado2: ElementRef;

  @ViewChild("DiaDomingoAbiertCerrado1", { static: false }) DiaDomingoAbiertCerrado1: ElementRef;
  @ViewChild("DiaDomingoAbiertCerrado2", { static: false }) DiaDomingoAbiertCerrado2: ElementRef;

  @ViewChild("latitudNegocio", { static: false }) latitudNegocio: ElementRef;
  @ViewChild("longitudNegocio", { static: false }) longitudNegocio: ElementRef;

  files: File[] = [];
  urlFoto: string;
  galeriaFotosNegocio: boolean;
  subirFotosGaleriaNegocio: boolean;

  constructor(
    private renderer: Renderer2,
    private rutaActiva: ActivatedRoute,
    private firebase: AngularFireDatabase,
    private _AuthService: AuthService,
    private _RegistrarNegocioService: RegistrarNegocioService
  ) { }

  ngOnInit() {
    this.editarNegocio();
  }

  ngAfterViewInit() {
    this.renderer.addClass(this.inputImage.nativeElement, 'aa');
    this.renderer.addClass(this.noEventInput.nativeElement, 'disabled-input');

    this.renderer.setStyle(this.nombreNegocio.nativeElement, 'border-bottom', '1px solid #f52d56');
    this.renderer.setStyle(this.nombreNegocio.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');

    this.renderer.setStyle(this.selectGiro.nativeElement, 'border-bottom', '2px solid #f52d56');
    this.renderer.addClass(this.selectGiro.nativeElement, 'black-m');
    this.renderer.addClass(this.labelGiro.nativeElement,'labelID');

    this.renderer.setStyle(this.descripcionNegocio.nativeElement, 'border-bottom', '1px solid #ced4da');
    this.renderer.setStyle(this.descripcionNegocio.nativeElement, 'box-shadow', 'none');

    this.renderer.setStyle(this.descripcionNegocio.nativeElement, 'border-bottom', '1px solid #f52d56');
    this.renderer.setStyle(this.descripcionNegocio.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');

    this.renderer.setStyle(this.selectCategoria.nativeElement, 'border-bottom', '2px solid #f52d56');
    this.renderer.addClass(this.selectCategoria.nativeElement, 'black-m');
    this.renderer.addClass(this.labelCategoria.nativeElement,'labelID');

    this.renderer.setStyle(this.telefonoNegocio.nativeElement, 'border-bottom', '1px solid #f52d56');
    this.renderer.setStyle(this.telefonoNegocio.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');

    this.renderer.setStyle(this.direccionNegocio.nativeElement, 'border-bottom', '1px solid #f52d56');
    this.renderer.setStyle(this.direccionNegocio.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');

    this.renderer.setStyle(this.paginaNegocio.nativeElement, 'border-bottom', '1px solid #f52d56');
    this.renderer.setStyle(this.paginaNegocio.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');

    this.renderer.setStyle(this.latitudNegocio.nativeElement, 'border-bottom', '1px solid #f52d56');
    this.renderer.setStyle(this.latitudNegocio.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');

    this.renderer.setStyle(this.longitudNegocio.nativeElement, 'border-bottom', '1px solid #f52d56');
    this.renderer.setStyle(this.longitudNegocio.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');

    this._AuthService.isAuth().subscribe(auth => {
      this.rutaActiva.params.subscribe(
        (res) => {
          this.firebase.list('tienda_horario/' + auth.uid).snapshotChanges()
            .subscribe(
              item => {
                this.negocio3 = [];
                item.forEach(element => {
                  let x: any = element.payload.toJSON();
                  x["$key"] = element.key;
                  this.negocio3.push(x);
                });

                for(let y of this.negocio3) {
                  if(y['$key'] == res.keyNegocio) {
                    this.devolverTiendaHorario(y);
                  }
                }
              }
          );
      });
    });

  }

  editarNegocio() {
    this._AuthService.isAuth().subscribe(auth => {
      this.rutaActiva.params.subscribe(
        (res) => {
          this.firebase.list('tienda_informacion/' + auth.uid).snapshotChanges()
            .subscribe(
              item => {
                this.negocio = [];
                item.forEach(element => {
                  let x: any = element.payload.toJSON();
                  x["$key"] = element.key;
                  this.negocio.push(x);
                });

                for(let y of this.negocio) {
                  if(y['$key'] == res.keyNegocio) {
                    this.devolverTiendaInformacionNegocio(y);
                  }
                }
              }
          );

          this.firebase.list('tienda_ubicaciones/' + auth.uid).snapshotChanges()
            .subscribe(
              item => {
                this.negocio2 = [];
                item.forEach(element => {
                  let x: any = element.payload.toJSON();
                  x["$key"] = element.key;
                  this.negocio2.push(x);
                });

                for(let y of this.negocio2) {
                  if(y['$key'] == res.keyNegocio) {
                    this.devolverTiendaUbicacion(y);
                  }
                }
              }
          );

          this.firebase.list('tienda_galeria/' + res.keyNegocio).snapshotChanges().subscribe(
            (itemesss) => {
              this.galeriaNegocio = [];
              itemesss.forEach(elementss => {
                let x: any = elementss.payload.toJSON();
                x["$key"] = elementss.key;
                return this.galeriaNegocio.push(x);
              });

              for(let y of this.galeriaNegocio) {
                this.slides.push({
                  $key: y['$key'],
                  img: y['foto']
                });
              }

              if(this.galeriaNegocio.length > 0) {
                this.galeriaFotosNegocio = true;
              }
            }
          )
        }
      );
    });
  }

  formularioEditarN (registroNegocioBD) {
    //console.log(this.selectedFileFotoPortada);
    /*this._AuthService.isAuth().subscribe(auth => {
      let files = this.selectedFileFotoPortada;
      let filesIndex = _.range(files.length);
      _.each(filesIndex, (idx) => {
        this.fotoNegocioPortada = new Upload(files[idx]);
        this._RegistrarNegocioService.actualizarRegistro(
          registroNegocioBD.value,
          auth.uid,
          registroNegocioBD.value.$key);
      });
    });*/
    if (this.selectedFileFotoPortada == undefined) {
      this._AuthService.isAuth().subscribe(auth => {
        this._RegistrarNegocioService.actualizarRegistro(
          registroNegocioBD.value,
          auth.uid);
        }
      );
    } else {
      this._AuthService.isAuth().subscribe(auth => {
        let files = this.selectedFileFotoPortada;
        let filesIndex = _.range(files.length);
        _.each(filesIndex, (idx) => {
          this.fotoNegocioPortada = new Upload(files[idx]);
          this._RegistrarNegocioService.actualizarRegistro(
            registroNegocioBD.value,
            auth.uid,
            this.fotoNegocioPortada,
            this.files,
            'actualizar'
          );
        });
      });
    }
  }

  verImagen(key: string) {
    this.urlFoto = key;
  }

  borrarImagen(key: string, keyNegocio: string) {
    console.log(key);
    console.log(keyNegocio);
    this._RegistrarNegocioService.eliminarFotoGaleria(key, keyNegocio);
  }

  mostrarSubirFotos() {
    this.subirFotosGaleriaNegocio = true;
    this.galeriaFotosNegocio = false;
  }

  mostrarFotosGaleria() {
    this.galeriaFotosNegocio = true;
    this.subirFotosGaleriaNegocio = false;
  }

  devolverTiendaInformacionNegocio(informacionNegocio: registroNegocioBD) {
    this._RegistrarNegocioService.editarNegocio = Object.assign({}, informacionNegocio);
  }

  devolverTiendaUbicacion(informacionNegocio: registroNegocioBD) {
    this._RegistrarNegocioService.editarNegocio2 = Object.assign({}, informacionNegocio);
  }

  devolverTiendaHorario(informacionNegocio: registroNegocioBD) {
    this._RegistrarNegocioService.editarNegocio3 = Object.assign({}, informacionNegocio);

    if(this._RegistrarNegocioService.editarNegocio3.lunes != 'Cerrado') {
      var lunes = this._RegistrarNegocioService.editarNegocio3.lunes;
      this.horarioLunesAM = lunes.substring(0, lunes.indexOf(" "));
      this.horarioLunesAMTemporal = this.horarioLunesAM;
      this.horarioLunesPM = lunes.substring(lunes.length-7, lunes.length);
      this.horarioLunesPMTemporal = this.horarioLunesPM;
      this.renderer.setStyle(this.DiaLunesAbiertCerrado1.nativeElement, 'border-bottom', '1px solid #f52d56');
      this.renderer.setStyle(this.DiaLunesAbiertCerrado1.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');
      this.renderer.setStyle(this.DiaLunesAbiertCerrado2.nativeElement, 'border-bottom', '1px solid #f52d56');
      this.renderer.setStyle(this.DiaLunesAbiertCerrado2.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');
      this.checkLunes = true;
    } else {
      this.horarioLunesAM = '';
      this.horarioLunesPM = '';
      this.checkLunes = false;
      this.renderer.addClass(this.DiaLunesAbiertCerrado1.nativeElement, 'disabled-input');
      this.renderer.addClass(this.DiaLunesAbiertCerrado2.nativeElement, 'disabled-input');
    }

    if(this._RegistrarNegocioService.editarNegocio3.martes != 'Cerrado') {
      var martes = this._RegistrarNegocioService.editarNegocio3.martes;
      this.horarioMartesAM = martes.substring(0, martes.indexOf(" "));
      this.horarioMartesAMTemporal = this.horarioMartesAM;
      this.horarioMartesPM = martes.substring(martes.length-7, martes.length);
      this.horarioMartesPMTemporal = this.horarioMartesPM;
      this.renderer.setStyle(this.DiaMartesAbiertCerrado1.nativeElement, 'border-bottom', '1px solid #f52d56');
      this.renderer.setStyle(this.DiaMartesAbiertCerrado1.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');
      this.renderer.setStyle(this.DiaMartesAbiertCerrado2.nativeElement, 'border-bottom', '1px solid #f52d56');
      this.renderer.setStyle(this.DiaMartesAbiertCerrado2.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');
      this.checkMartes = true;
    } else {
      this.horarioMartesAM = '';
      this.horarioMartesPM = '';
      this.checkMartes = false;
      this.renderer.addClass(this.DiaMartesAbiertCerrado1.nativeElement, 'disabled-input');
      this.renderer.addClass(this.DiaMartesAbiertCerrado2.nativeElement, 'disabled-input');
    }

    if(this._RegistrarNegocioService.editarNegocio3.miercoles != 'Cerrado') {
      var miercoles = this._RegistrarNegocioService.editarNegocio3.miercoles;
      this.horarioMiercolesAM = miercoles.substring(0, miercoles.indexOf(" "));
      this.horarioMiercolesAMTemporal = this.horarioMiercolesAM;
      this.horarioMiercolesPM = miercoles.substring(miercoles.length-7, miercoles.length);
      this.horarioMiercolesPMTemporal = this.horarioMiercolesPM;
      this.renderer.setStyle(this.DiaMiercolesAbiertCerrado1.nativeElement, 'border-bottom', '1px solid #f52d56');
      this.renderer.setStyle(this.DiaMiercolesAbiertCerrado1.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');
      this.renderer.setStyle(this.DiaMiercolesAbiertCerrado2.nativeElement, 'border-bottom', '1px solid #f52d56');
      this.renderer.setStyle(this.DiaMiercolesAbiertCerrado2.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');
      this.checkMiercoles = true;
    } else {
      this.horarioMiercolesAM = '';
      this.horarioMiercolesPM = '';
      this.checkMiercoles = false;
      this.renderer.addClass(this.DiaMiercolesAbiertCerrado1.nativeElement, 'disabled-input');
      this.renderer.addClass(this.DiaMiercolesAbiertCerrado2.nativeElement, 'disabled-input');
    }

    if(this._RegistrarNegocioService.editarNegocio3.jueves != 'Cerrado') {
      var jueves = this._RegistrarNegocioService.editarNegocio3.jueves;
      this.horarioJuevesAM = jueves.substring(0, jueves.indexOf(" "));
      this.horarioJuevesAMTemporal = this.horarioJuevesAM;
      this.horarioJuevesPM = jueves.substring(jueves.length-7, jueves.length);
      this.horarioJuevesPMTemporal = this.horarioJuevesPM;
      this.renderer.setStyle(this.DiaJuevesAbiertCerrado1.nativeElement, 'border-bottom', '1px solid #f52d56');
      this.renderer.setStyle(this.DiaJuevesAbiertCerrado1.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');
      this.renderer.setStyle(this.DiaJuevesAbiertCerrado2.nativeElement, 'border-bottom', '1px solid #f52d56');
      this.renderer.setStyle(this.DiaJuevesAbiertCerrado2.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');
      this.checkJueves = true;
    } else {
      this.horarioJuevesAM = '';
      this.horarioJuevesPM = '';
      this.checkJueves = false;
      this.renderer.addClass(this.DiaJuevesAbiertCerrado1.nativeElement, 'disabled-input');
      this.renderer.addClass(this.DiaJuevesAbiertCerrado2.nativeElement, 'disabled-input');
    }

    if(this._RegistrarNegocioService.editarNegocio3.viernes != 'Cerrado') {
      var viernes = this._RegistrarNegocioService.editarNegocio3.viernes;
      this.horarioViernesAM = viernes.substring(0, viernes.indexOf(" "));
      this.horarioViernesAMTemporal = this.horarioViernesAM;
      this.horarioViernesPM = viernes.substring(viernes.length-7, viernes.length);
      this.horarioViernesPMTemporal = this.horarioViernesPM;
      this.renderer.setStyle(this.DiaViernesAbiertCerrado1.nativeElement, 'border-bottom', '1px solid #f52d56');
      this.renderer.setStyle(this.DiaViernesAbiertCerrado1.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');
      this.renderer.setStyle(this.DiaViernesAbiertCerrado2.nativeElement, 'border-bottom', '1px solid #f52d56');
      this.renderer.setStyle(this.DiaViernesAbiertCerrado2.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');
      this.checkViernes = true;
    } else {
      this.horarioViernesAM = '';
      this.horarioViernesPM = '';
      this.checkViernes = false;
      this.renderer.addClass(this.DiaViernesAbiertCerrado1.nativeElement, 'disabled-input');
      this.renderer.addClass(this.DiaViernesAbiertCerrado2.nativeElement, 'disabled-input');
    }

    if(this._RegistrarNegocioService.editarNegocio3.sabado != 'Cerrado') {
      var sabado = this._RegistrarNegocioService.editarNegocio3.sabado;
      this.horarioSabadoAM = sabado.substring(0, sabado.indexOf(" "));
      this.horarioSabadoAMTemporal = this.horarioViernesAM;
      this.horarioSabadoPM = sabado.substring(sabado.length-7, sabado.length);
      this.horarioSabadoPMTemporal = this.horarioSabadoPM;
      this.renderer.setStyle(this.DiaSabadoAbiertCerrado1.nativeElement, 'border-bottom', '1px solid #f52d56');
      this.renderer.setStyle(this.DiaSabadoAbiertCerrado1.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');
      this.renderer.setStyle(this.DiaSabadoAbiertCerrado2.nativeElement, 'border-bottom', '1px solid #f52d56');
      this.renderer.setStyle(this.DiaSabadoAbiertCerrado2.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');
      this.checkSabado = true;
    } else {
      this.horarioSabadoAM = '';
      this.horarioSabadoPM = '';
      this.checkSabado = false;
      this.renderer.addClass(this.DiaSabadoAbiertCerrado1.nativeElement, 'disabled-input');
      this.renderer.addClass(this.DiaSabadoAbiertCerrado2.nativeElement, 'disabled-input');
    }

    if(this._RegistrarNegocioService.editarNegocio3.domingo != 'Cerrado') {
      var domingo = this._RegistrarNegocioService.editarNegocio3.domingo;
      this.horarioDomingoAM = domingo.substring(0, domingo.indexOf(" "));
      this.horarioDomingoAMTemporal = this.horarioDomingoAM;
      this.horarioDomingoPM = domingo.substring(domingo.length-7, domingo.length);
      this.horarioDomingoPMTemporal = this.horarioDomingoPM;
      this.renderer.setStyle(this.DiaDomingoAbiertCerrado1.nativeElement, 'border-bottom', '1px solid #f52d56');
      this.renderer.setStyle(this.DiaDomingoAbiertCerrado1.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');
      this.renderer.setStyle(this.DiaDomingoAbiertCerrado2.nativeElement, 'border-bottom', '1px solid #f52d56');
      this.renderer.setStyle(this.DiaDomingoAbiertCerrado2.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');
      this.checkDomingo = true;
    } else {
      this.horarioDomingoAM = '';
      this.horarioDomingoPM = '';
      this.checkDomingo = false;
      this.renderer.addClass(this.DiaDomingoAbiertCerrado1.nativeElement, 'disabled-input');
      this.renderer.addClass(this.DiaDomingoAbiertCerrado2.nativeElement, 'disabled-input');
    }

  }

  checarLunes(a: any) {    
    if(a.target.control.checked == true) {
      this.horarioLunesAM = '';
      this.horarioLunesPM = '';
      this.renderer.addClass(this.DiaLunesAbiertCerrado1.nativeElement, 'disabled-input');
      this.renderer.addClass(this.DiaLunesAbiertCerrado2.nativeElement, 'disabled-input');
      this.renderer.setStyle(this.DiaLunesAbiertCerrado1.nativeElement, 'border-bottom', '1px solid #ced4da');
      this.renderer.setStyle(this.DiaLunesAbiertCerrado1.nativeElement, 'box-shadow', 'none');
      this.renderer.setStyle(this.DiaLunesAbiertCerrado2.nativeElement, 'border-bottom', '1px solid #ced4da');
      this.renderer.setStyle(this.DiaLunesAbiertCerrado2.nativeElement, 'box-shadow', 'none');
    } else {
      this.horarioLunesAM = this.horarioLunesAMTemporal;
      this.horarioLunesPM = this.horarioLunesPMTemporal;
      this.renderer.removeClass(this.DiaLunesAbiertCerrado1.nativeElement, 'disabled-input');
      this.renderer.removeClass(this.DiaLunesAbiertCerrado2.nativeElement, 'disabled-input');
      this.renderer.setStyle(this.DiaLunesAbiertCerrado1.nativeElement, 'border-bottom', '1px solid #f52d56');
      this.renderer.setStyle(this.DiaLunesAbiertCerrado1.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');
      this.renderer.setStyle(this.DiaLunesAbiertCerrado2.nativeElement, 'border-bottom', '1px solid #f52d56');
      this.renderer.setStyle(this.DiaLunesAbiertCerrado2.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');
    }
  }

  checarMartes(a: any) {    
    if( a.target.control.checked == true) {
      this.horarioMartesAM = '';
      this.horarioMartesPM = '';
      this.renderer.addClass(this.DiaMartesAbiertCerrado1.nativeElement, 'disabled-input');
      this.renderer.addClass(this.DiaMartesAbiertCerrado2.nativeElement, 'disabled-input');
      this.renderer.setStyle(this.DiaMartesAbiertCerrado1.nativeElement, 'border-bottom', '1px solid #ced4da');
      this.renderer.setStyle(this.DiaMartesAbiertCerrado1.nativeElement, 'box-shadow', 'none');
      this.renderer.setStyle(this.DiaMartesAbiertCerrado2.nativeElement, 'border-bottom', '1px solid #ced4da');
      this.renderer.setStyle(this.DiaMartesAbiertCerrado2.nativeElement, 'box-shadow', 'none');
    } else {
      this.horarioMartesAM = this.horarioMartesAMTemporal;
      this.horarioMartesPM = this.horarioMartesPMTemporal;
      this.renderer.removeClass(this.DiaMartesAbiertCerrado1.nativeElement, 'disabled-input');
      this.renderer.removeClass(this.DiaMartesAbiertCerrado2.nativeElement, 'disabled-input');
      this.renderer.setStyle(this.DiaMartesAbiertCerrado1.nativeElement, 'border-bottom', '1px solid #f52d56');
      this.renderer.setStyle(this.DiaMartesAbiertCerrado1.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');
      this.renderer.setStyle(this.DiaMartesAbiertCerrado2.nativeElement, 'border-bottom', '1px solid #f52d56');
      this.renderer.setStyle(this.DiaMartesAbiertCerrado2.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');
    }
  }

  checarMiercoles(a: any) {    
    if( a.target.control.checked == true) {
      this.horarioMiercolesAM = '';
      this.horarioMiercolesPM = '';
      this.renderer.addClass(this.DiaMiercolesAbiertCerrado1.nativeElement, 'disabled-input');
      this.renderer.addClass(this.DiaMiercolesAbiertCerrado2.nativeElement, 'disabled-input');
      this.renderer.setStyle(this.DiaMiercolesAbiertCerrado1.nativeElement, 'border-bottom', '1px solid #ced4da');
      this.renderer.setStyle(this.DiaMiercolesAbiertCerrado1.nativeElement, 'box-shadow', 'none');
      this.renderer.setStyle(this.DiaMiercolesAbiertCerrado2.nativeElement, 'border-bottom', '1px solid #ced4da');
      this.renderer.setStyle(this.DiaMiercolesAbiertCerrado2.nativeElement, 'box-shadow', 'none');
    } else {
      this.horarioMiercolesAM = this.horarioMiercolesAMTemporal;
      this.horarioMiercolesPM = this.horarioMiercolesPMTemporal;
      this.renderer.removeClass(this.DiaMiercolesAbiertCerrado1.nativeElement, 'disabled-input');
      this.renderer.removeClass(this.DiaMiercolesAbiertCerrado2.nativeElement, 'disabled-input');
      this.renderer.setStyle(this.DiaMiercolesAbiertCerrado1.nativeElement, 'border-bottom', '1px solid #f52d56');
      this.renderer.setStyle(this.DiaMiercolesAbiertCerrado1.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');
      this.renderer.setStyle(this.DiaMiercolesAbiertCerrado2.nativeElement, 'border-bottom', '1px solid #f52d56');
      this.renderer.setStyle(this.DiaMiercolesAbiertCerrado2.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');
    }
  }

  checarJueves(a: any) {    
    if( a.target.control.checked == true) {
      this.horarioJuevesAM = '';
      this.horarioJuevesPM = '';
      this.renderer.addClass(this.DiaJuevesAbiertCerrado1.nativeElement, 'disabled-input');
      this.renderer.addClass(this.DiaJuevesAbiertCerrado2.nativeElement, 'disabled-input');
      this.renderer.setStyle(this.DiaJuevesAbiertCerrado1.nativeElement, 'border-bottom', '1px solid #ced4da');
      this.renderer.setStyle(this.DiaJuevesAbiertCerrado1.nativeElement, 'box-shadow', 'none');
      this.renderer.setStyle(this.DiaJuevesAbiertCerrado2.nativeElement, 'border-bottom', '1px solid #ced4da');
      this.renderer.setStyle(this.DiaJuevesAbiertCerrado2.nativeElement, 'box-shadow', 'none');
    } else {
      this.horarioJuevesAM = this.horarioJuevesAMTemporal;
      this.horarioJuevesPM = this.horarioJuevesPMTemporal;
      this.renderer.removeClass(this.DiaJuevesAbiertCerrado1.nativeElement, 'disabled-input');
      this.renderer.removeClass(this.DiaJuevesAbiertCerrado2.nativeElement, 'disabled-input');
      this.renderer.setStyle(this.DiaJuevesAbiertCerrado1.nativeElement, 'border-bottom', '1px solid #f52d56');
      this.renderer.setStyle(this.DiaJuevesAbiertCerrado1.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');
      this.renderer.setStyle(this.DiaJuevesAbiertCerrado2.nativeElement, 'border-bottom', '1px solid #f52d56');
      this.renderer.setStyle(this.DiaJuevesAbiertCerrado2.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');
    }
  }

  checarViernes(a: any) {    
    if( a.target.control.checked == true) {
      this.horarioViernesAM = '';
      this.horarioViernesPM = '';
      this.renderer.addClass(this.DiaViernesAbiertCerrado1.nativeElement, 'disabled-input');
      this.renderer.addClass(this.DiaViernesAbiertCerrado2.nativeElement, 'disabled-input');
      this.renderer.setStyle(this.DiaViernesAbiertCerrado1.nativeElement, 'border-bottom', '1px solid #ced4da');
      this.renderer.setStyle(this.DiaViernesAbiertCerrado1.nativeElement, 'box-shadow', 'none');
      this.renderer.setStyle(this.DiaViernesAbiertCerrado2.nativeElement, 'border-bottom', '1px solid #ced4da');
      this.renderer.setStyle(this.DiaViernesAbiertCerrado2.nativeElement, 'box-shadow', 'none');
    } else {
      this.horarioViernesAM = this.horarioViernesAMTemporal;
      this.horarioViernesPM = this.horarioViernesPMTemporal;
      this.renderer.removeClass(this.DiaViernesAbiertCerrado1.nativeElement, 'disabled-input');
      this.renderer.removeClass(this.DiaViernesAbiertCerrado2.nativeElement, 'disabled-input');
      this.renderer.setStyle(this.DiaViernesAbiertCerrado1.nativeElement, 'border-bottom', '1px solid #f52d56');
      this.renderer.setStyle(this.DiaViernesAbiertCerrado1.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');
      this.renderer.setStyle(this.DiaViernesAbiertCerrado2.nativeElement, 'border-bottom', '1px solid #f52d56');
      this.renderer.setStyle(this.DiaViernesAbiertCerrado2.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');
    }
  }

  checarSabado(a: any) {    
    if( a.target.control.checked == true) {
      this.horarioSabadoAM = '';
      this.horarioSabadoPM = '';
      this.renderer.addClass(this.DiaSabadoAbiertCerrado1.nativeElement, 'disabled-input');
      this.renderer.addClass(this.DiaSabadoAbiertCerrado2.nativeElement, 'disabled-input');
      this.renderer.setStyle(this.DiaSabadoAbiertCerrado1.nativeElement, 'border-bottom', '1px solid #ced4da');
      this.renderer.setStyle(this.DiaSabadoAbiertCerrado1.nativeElement, 'box-shadow', 'none');
      this.renderer.setStyle(this.DiaSabadoAbiertCerrado2.nativeElement, 'border-bottom', '1px solid #ced4da');
      this.renderer.setStyle(this.DiaSabadoAbiertCerrado2.nativeElement, 'box-shadow', 'none');
    } else {
      this.horarioSabadoAM = this.horarioSabadoAMTemporal;
      this.horarioSabadoPM = this.horarioSabadoPMTemporal;
      this.renderer.removeClass(this.DiaSabadoAbiertCerrado1.nativeElement, 'disabled-input');
      this.renderer.removeClass(this.DiaSabadoAbiertCerrado2.nativeElement, 'disabled-input');
      this.renderer.setStyle(this.DiaSabadoAbiertCerrado1.nativeElement, 'border-bottom', '1px solid #f52d56');
      this.renderer.setStyle(this.DiaSabadoAbiertCerrado1.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');
      this.renderer.setStyle(this.DiaSabadoAbiertCerrado2.nativeElement, 'border-bottom', '1px solid #f52d56');
      this.renderer.setStyle(this.DiaSabadoAbiertCerrado2.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');
    }
  }

  checarDomingo(a: any) {    
    if( a.target.control.checked == true) {
      this.horarioDomingoAM = '';
      this.horarioDomingoPM = '';
      this.renderer.addClass(this.DiaDomingoAbiertCerrado1.nativeElement, 'disabled-input');
      this.renderer.addClass(this.DiaDomingoAbiertCerrado2.nativeElement, 'disabled-input');
      this.renderer.setStyle(this.DiaDomingoAbiertCerrado1.nativeElement, 'border-bottom', '1px solid #ced4da');
      this.renderer.setStyle(this.DiaDomingoAbiertCerrado1.nativeElement, 'box-shadow', 'none');
      this.renderer.setStyle(this.DiaDomingoAbiertCerrado2.nativeElement, 'border-bottom', '1px solid #ced4da');
      this.renderer.setStyle(this.DiaDomingoAbiertCerrado2.nativeElement, 'box-shadow', 'none');
    } else {
      this.horarioDomingoAM = this.horarioDomingoAMTemporal;
      this.horarioDomingoPM = this.horarioDomingoAMTemporal;
      this.renderer.removeClass(this.DiaDomingoAbiertCerrado1.nativeElement, 'disabled-input');
      this.renderer.removeClass(this.DiaDomingoAbiertCerrado2.nativeElement, 'disabled-input');
      this.renderer.setStyle(this.DiaDomingoAbiertCerrado1.nativeElement, 'border-bottom', '1px solid #f52d56');
      this.renderer.setStyle(this.DiaDomingoAbiertCerrado1.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');
      this.renderer.setStyle(this.DiaDomingoAbiertCerrado2.nativeElement, 'border-bottom', '1px solid #f52d56');
      this.renderer.setStyle(this.DiaDomingoAbiertCerrado2.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');
    }
  }

  detectFileFotoPortada(event) {
    this.selectedFileFotoPortada = event.target.files;
    this.foto = event.target.files[0].name;
    this.renderer.addClass(this.inputImage.nativeElement, 'aa');
    this.renderer.addClass(this.noEventInput.nativeElement, 'disabled-input');

    let reader = new FileReader();
    let urlImageTemporal = reader.readAsDataURL( event.target.files[0] );

    reader.onloadend = () => this.imagenTemporal = reader.result;

    this.imagenSubir = event.target.files[0];
    this.mostrarImagen = true;
  }

  focusInputNombre() {
    this.renderer.setStyle(this.nombreNegocio.nativeElement, 'border-bottom', '1px solid #ced4da');
    this.renderer.setStyle(this.nombreNegocio.nativeElement, 'box-shadow', 'none');
  }

  blurInputNombre(valor: any) {
    if(valor.target.value != '') {
      this.renderer.setStyle(this.nombreNegocio.nativeElement, 'border-bottom', '1px solid #f52d56');
      this.renderer.setStyle(this.nombreNegocio.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');
    } else {
      this.renderer.setStyle(this.nombreNegocio.nativeElement, 'border-bottom', '1px solid #ced4da');
      this.renderer.setStyle(this.nombreNegocio.nativeElement, 'box-shadow', 'none');
    }
  }

  selectChangeGiro(valor: any) {
    this.renderer.setStyle(this.selectGiro.nativeElement, 'border-bottom', '2px solid #f52d56');
    this.renderer.addClass(this.selectGiro.nativeElement, 'black-m');
    this.renderer.addClass(this.labelGiro.nativeElement,'labelID');
  }

  focusInputDescripcion() {
    this.renderer.setStyle(this.descripcionNegocio.nativeElement, 'border-bottom', '1px solid #ced4da');
    this.renderer.setStyle(this.descripcionNegocio.nativeElement, 'box-shadow', 'none');
  }

  blurInputDescripcion(valor: any) {
    if(valor.target.value != '') {
      this.renderer.setStyle(this.descripcionNegocio.nativeElement, 'border-bottom', '1px solid #f52d56');
      this.renderer.setStyle(this.descripcionNegocio.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');
    } else {
      this.renderer.setStyle(this.descripcionNegocio.nativeElement, 'border-bottom', '1px solid #ced4da');
      this.renderer.setStyle(this.descripcionNegocio.nativeElement, 'box-shadow', 'none');
    }
  }

  selectChangeCategoria(valor: any) {
    this.renderer.setStyle(this.selectCategoria.nativeElement, 'border-bottom', '2px solid #f52d56');
    this.renderer.addClass(this.selectCategoria.nativeElement, 'black-m');
    this.renderer.addClass(this.labelCategoria.nativeElement,'labelID');
  }
  
  focusInputTelefono() {
    this.renderer.setStyle(this.telefonoNegocio.nativeElement, 'border-bottom', '1px solid #ced4da');
    this.renderer.setStyle(this.telefonoNegocio.nativeElement, 'box-shadow', 'none');
  }

  blurInputTelefono(valor: any) {
    if(valor.target.value != '') {
      this.renderer.setStyle(this.telefonoNegocio.nativeElement, 'border-bottom', '1px solid #f52d56');
      this.renderer.setStyle(this.telefonoNegocio.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');
    } else {
      this.renderer.setStyle(this.telefonoNegocio.nativeElement, 'border-bottom', '1px solid #ced4da');
      this.renderer.setStyle(this.telefonoNegocio.nativeElement, 'box-shadow', 'none');
    }
  }

  focusInputDirecion() {
    this.renderer.setStyle(this.direccionNegocio.nativeElement, 'border-bottom', '1px solid #ced4da');
    this.renderer.setStyle(this.direccionNegocio.nativeElement, 'box-shadow', 'none');
  }

  blurInputDirecion(valor: any) {
    if(valor.target.value != '') {
      this.renderer.setStyle(this.direccionNegocio.nativeElement, 'border-bottom', '1px solid #f52d56');
      this.renderer.setStyle(this.direccionNegocio.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');
    } else {
      this.renderer.setStyle(this.direccionNegocio.nativeElement, 'border-bottom', '1px solid #ced4da');
      this.renderer.setStyle(this.direccionNegocio.nativeElement, 'box-shadow', 'none');
    }
  }

  focusInputPagina() {
    this.renderer.setStyle(this.paginaNegocio.nativeElement, 'border-bottom', '1px solid #ced4da');
    this.renderer.setStyle(this.paginaNegocio.nativeElement, 'box-shadow', 'none');
  }

  blurInputPagina(valor: any) {
    if(valor.target.value != '') {
      this.renderer.setStyle(this.paginaNegocio.nativeElement, 'border-bottom', '1px solid #f52d56');
      this.renderer.setStyle(this.paginaNegocio.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');
    } else {
      this.renderer.setStyle(this.paginaNegocio.nativeElement, 'border-bottom', '1px solid #ced4da');
      this.renderer.setStyle(this.paginaNegocio.nativeElement, 'box-shadow', 'none');
    }
  }

  focusInputLatitud() {
    this.renderer.setStyle(this.latitudNegocio.nativeElement, 'border-bottom', '1px solid #ced4da');
    this.renderer.setStyle(this.latitudNegocio.nativeElement, 'box-shadow', 'none');
  }

  blurInputLatitud(valor: any) {
    if(valor.target.value != '') {
      this.renderer.setStyle(this.latitudNegocio.nativeElement, 'border-bottom', '1px solid #f52d56');
      this.renderer.setStyle(this.latitudNegocio.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');
    } else {
      this.renderer.setStyle(this.latitudNegocio.nativeElement, 'border-bottom', '1px solid #ced4da');
      this.renderer.setStyle(this.latitudNegocio.nativeElement, 'box-shadow', 'none');
    }
  }

  focusInputLongitud() {
    this.renderer.setStyle(this.longitudNegocio.nativeElement, 'border-bottom', '1px solid #ced4da');
    this.renderer.setStyle(this.longitudNegocio.nativeElement, 'box-shadow', 'none');
  }

  blurInputLongitud(valor: any) {
    if(valor.target.value != '') {
      this.renderer.setStyle(this.longitudNegocio.nativeElement, 'border-bottom', '1px solid #f52d56');
      this.renderer.setStyle(this.longitudNegocio.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');
    } else {
      this.renderer.setStyle(this.longitudNegocio.nativeElement, 'border-bottom', '1px solid #ced4da');
      this.renderer.setStyle(this.longitudNegocio.nativeElement, 'box-shadow', 'none');
    }
  }

  slickInit(e) {
    //console.log('slick initialized');
  }

  afterChange(e) {
    //console.log('afterChange');
  }
  
  beforeChange(e) {
    //console.log('beforeChange');
  }

  onSelect(event) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

}
