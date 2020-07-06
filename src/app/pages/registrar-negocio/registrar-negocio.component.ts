import { Component, OnInit, ElementRef, Renderer2, ViewChild, Input } from '@angular/core';
//import { UploadFile, UploadInput, UploadOutput  } from 'ng-uikit-pro-standard';
//import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../servicios/servicios.index';
//import { AngularFireDatabase } from '@angular/fire/database'; 
//import { AngularFireStorage, AngularFireUploadTask  } from '@angular/fire/storage';
import { RegistrarNegocioService } from '../../servicios/servicios.index';
import { Upload } from '../../modelos/registrar-negocio';
import * as _ from "lodash";
//import { Observable } from 'rxjs';
//import { tap, finalize, map } from 'rxjs/operators';

@Component({
  selector: 'app-registrar-negocio',
  templateUrl: './registrar-negocio.component.html',
  styles: []
})
export class RegistrarNegocioComponent implements OnInit {

  files: File[] = [];
  imagenSubir: File;
  imagenTemporal: any;
  mostrarImagen: boolean;

  uidUsuario: string;

  selectedFileFotoPortada: FileList;
  fotoNegocioPortada: Upload;
  @Input() foto: string;

  @ViewChild("noEventInput", { static: false }) noEventInput: ElementRef;
  @ViewChild("inputImage", { static: false }) inputImage: ElementRef;
  @ViewChild("nombreNegocio", { static: false }) nombreNegocio: ElementRef;
  @ViewChild("labelGiro", { static: false }) labelGiro: ElementRef;
  @ViewChild("selectGiro", { static: false }) selectGiro: ElementRef;
  @ViewChild("descripcionNegocio", { static: false }) descripcionNegocio: ElementRef;
  @ViewChild("labelCategoria", { static: false }) labelCategoria: ElementRef;
  @ViewChild("selectCategoria", { static: false }) selectCategoria: ElementRef;
  @ViewChild("telefonoNegocio", { static: false }) telefonoNegocio: ElementRef;
  @ViewChild("direccionNegocio", { static: false }) direccionNegocio: ElementRef;
  @ViewChild("paginaNegocio", { static: false }) paginaNegocio: ElementRef;

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

  @Input() file: File;
 
  no_fotos_negocio: boolean;
  total_fotos_negocio: any = 0;

  constructor(
    private renderer: Renderer2,
    private _AuthService: AuthService,
    private _RegistrarNegocioService: RegistrarNegocioService
  ) { }

  onSelect(event) {
    this.files.push(...event.addedFiles);
    this.total_fotos_negocio = this.files.length;
  }
  
  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
    this.total_fotos_negocio = this.files.length;
  }

  ngOnInit() {
    this._AuthService.isAuth().subscribe(auth => 
      this.uidUsuario = auth.uid
    );
  }

  ngAfterViewInit() {
    this.horarioDefault();
    this.renderer.addClass(this.noEventInput.nativeElement, 'disabled-input');
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

  formularioRegistrarN(registroNegocioBD) {
    if (this.total_fotos_negocio > 0) {
      this.no_fotos_negocio = false;
      
      let files = this.selectedFileFotoPortada
      let filesIndex = _.range(files.length)
      _.each(filesIndex, (idx) => {
        this.fotoNegocioPortada = new Upload(files[idx]);
        return this._RegistrarNegocioService.insertarRegistro(
          registroNegocioBD.value, this.uidUsuario, this.fotoNegocioPortada, this.files);
      });
    } else {
      this.no_fotos_negocio = true;
      window.scroll(0,0);
    }
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

  horarioDefault() {
    this.renderer.addClass(this.DiaLunesAbiertCerrado1.nativeElement, 'disabled-input');
    this.renderer.addClass(this.DiaLunesAbiertCerrado2.nativeElement, 'disabled-input');

    this.renderer.addClass(this.DiaMartesAbiertCerrado1.nativeElement, 'disabled-input');
    this.renderer.addClass(this.DiaMartesAbiertCerrado2.nativeElement, 'disabled-input');

    this.renderer.addClass(this.DiaMiercolesAbiertCerrado1.nativeElement, 'disabled-input');
    this.renderer.addClass(this.DiaMiercolesAbiertCerrado2.nativeElement, 'disabled-input');

    this.renderer.addClass(this.DiaJuevesAbiertCerrado1.nativeElement, 'disabled-input');
    this.renderer.addClass(this.DiaJuevesAbiertCerrado2.nativeElement, 'disabled-input');

    this.renderer.addClass(this.DiaViernesAbiertCerrado1.nativeElement, 'disabled-input');
    this.renderer.addClass(this.DiaViernesAbiertCerrado2.nativeElement, 'disabled-input');

    this.renderer.addClass(this.DiaSabadoAbiertCerrado1.nativeElement, 'disabled-input');
    this.renderer.addClass(this.DiaSabadoAbiertCerrado2.nativeElement, 'disabled-input');

    this.renderer.addClass(this.DiaDomingoAbiertCerrado1.nativeElement, 'disabled-input');
    this.renderer.addClass(this.DiaDomingoAbiertCerrado2.nativeElement, 'disabled-input');
  }

  checarLunes(a: any) {    
    if( a.target.control.checked == true) {
      this.renderer.addClass(this.DiaLunesAbiertCerrado1.nativeElement, 'disabled-input');
      this.renderer.addClass(this.DiaLunesAbiertCerrado2.nativeElement, 'disabled-input');
    } else {
      this.renderer.removeClass(this.DiaLunesAbiertCerrado1.nativeElement, 'disabled-input');
      this.renderer.removeClass(this.DiaLunesAbiertCerrado2.nativeElement, 'disabled-input');
    }
  }

  checarMartes(a: any) {    
    if( a.target.control.checked == true) {
      this.renderer.addClass(this.DiaMartesAbiertCerrado1.nativeElement, 'disabled-input');
      this.renderer.addClass(this.DiaMartesAbiertCerrado2.nativeElement, 'disabled-input');
    } else {
      this.renderer.removeClass(this.DiaMartesAbiertCerrado1.nativeElement, 'disabled-input');
      this.renderer.removeClass(this.DiaMartesAbiertCerrado2.nativeElement, 'disabled-input');
    }
  }

  checarMiercoles(a: any) {    
    if( a.target.control.checked == true) {
      this.renderer.addClass(this.DiaMiercolesAbiertCerrado1.nativeElement, 'disabled-input');
      this.renderer.addClass(this.DiaMiercolesAbiertCerrado2.nativeElement, 'disabled-input');
    } else {
      this.renderer.removeClass(this.DiaMiercolesAbiertCerrado1.nativeElement, 'disabled-input');
      this.renderer.removeClass(this.DiaMiercolesAbiertCerrado2.nativeElement, 'disabled-input');
    }
  }

  checarJueves(a: any) {    
    if( a.target.control.checked == true) {
      this.renderer.addClass(this.DiaJuevesAbiertCerrado1.nativeElement, 'disabled-input');
      this.renderer.addClass(this.DiaJuevesAbiertCerrado2.nativeElement, 'disabled-input');
    } else {
      this.renderer.removeClass(this.DiaJuevesAbiertCerrado1.nativeElement, 'disabled-input');
      this.renderer.removeClass(this.DiaJuevesAbiertCerrado2.nativeElement, 'disabled-input');
    }
  }

  checarViernes(a: any) {    
    if( a.target.control.checked == true) {
      this.renderer.addClass(this.DiaViernesAbiertCerrado1.nativeElement, 'disabled-input');
      this.renderer.addClass(this.DiaViernesAbiertCerrado2.nativeElement, 'disabled-input');
    } else {
      this.renderer.removeClass(this.DiaViernesAbiertCerrado1.nativeElement, 'disabled-input');
      this.renderer.removeClass(this.DiaViernesAbiertCerrado2.nativeElement, 'disabled-input');
    }
  }

  checarSabado(a: any) {    
    if( a.target.control.checked == true) {
      this.renderer.addClass(this.DiaSabadoAbiertCerrado1.nativeElement, 'disabled-input');
      this.renderer.addClass(this.DiaSabadoAbiertCerrado2.nativeElement, 'disabled-input');
    } else {
      this.renderer.removeClass(this.DiaSabadoAbiertCerrado1.nativeElement, 'disabled-input');
      this.renderer.removeClass(this.DiaSabadoAbiertCerrado2.nativeElement, 'disabled-input');
    }
  }

  checarDomingo(a: any) {    
    if( a.target.control.checked == true) {
      this.renderer.addClass(this.DiaDomingoAbiertCerrado1.nativeElement, 'disabled-input');
      this.renderer.addClass(this.DiaDomingoAbiertCerrado2.nativeElement, 'disabled-input');
    } else {
      this.renderer.removeClass(this.DiaDomingoAbiertCerrado1.nativeElement, 'disabled-input');
      this.renderer.removeClass(this.DiaDomingoAbiertCerrado2.nativeElement, 'disabled-input');
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

}
