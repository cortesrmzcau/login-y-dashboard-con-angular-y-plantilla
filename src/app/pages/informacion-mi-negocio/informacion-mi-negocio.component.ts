import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { registroNegocioBD } from '../../modelos/registrar-negocio';
import { registroProductoBD } from '../../modelos/registrar-pruducto';
import { ProductosService } from '../../servicios/servicios.index';
import { AuthService } from '../../servicios/servicios.index';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { NgForm } from '@angular/forms';

const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-informacion-mi-negocio',
  templateUrl: './informacion-mi-negocio.component.html',
  styles: []
})
export class InformacionMiNegocioComponent implements OnInit {

  files: File[] = [];
  imagenSubir: File;
  imagenTemporal: any;
  mostrarImagen: boolean;

  public map: any = {};

  registroNegocio: registroNegocioBD[];
  registroNegocio2: registroNegocioBD[];
  registroNegocio3: registroNegocioBD[];
  galeriaNegocio: any[] = new Array;
  slides: any[] = new Array;
  galeriaProducto: any[] = new Array;
  imagenes_producto: any[] = new Array;
  slideConfig = { "slidesToShow": 3, "slidesToScroll": 2 };

  listProductos: registroProductoBD[];
  listImagenesProducto: any = new Array;
  tablaProductosNegocio: boolean;
  sinProductosNegocio: boolean;
  sinResultadosBusquedaProductosNegocio: boolean;

  keyNegocio: any;
  key: string;
  fotoNegocio: string;
  nombreNegocio: string;
  descripcionNegocio: string;
  girocateogiraNegocio: string;
  direccionNegocio: string;
  telefonoNegocio: string;
  paginaNegocio: string;
  mostrarMapaNegocio: boolean;
  
  verificarLunes: string;
  lunes: string;
  
  verificarMartes: string;
  martes: string;

  verificarMiercoles: string;
  miercoles: string;

  verificarJueves: string;
  jueves: string;

  verificarViernes: string;
  viernes: string;

  verificarSabado: string;
  sabado: string;

  verificarDomingo: string;
  domingo: string;

  txtBtn: string = 'Crear negocio';
  txtNuevoEditarProducto: string = 'Nuevo producto';

  verNombreProducto: string;
  verDescripcionProducto: string;
  verPrecioProducto: string;

  @ViewChild("nombreProducto", { static: false }) nombreProducto: ElementRef;
  @ViewChild("descripcionProducto", { static: false }) descripcionProducto: ElementRef;
  @ViewChild("precioProducto", { static: false }) precioProducto: ElementRef;

  validar_fotos_producto: any;
  no_fotos_producto: boolean;

  constructor(
    private renderer: Renderer2,
    private rutaActiva: ActivatedRoute,
    private firebase: AngularFireDatabase,
    private _AuthService: AuthService,
    private _ProductosService: ProductosService
  ) {}

  ngOnInit() {
    this.buscarNegocio();
    this.productosNegocio();
  }

  onSelect(event) {
    this.files.push(...event.addedFiles);
    this.validar_fotos_producto = this.files.length;
  }
  
  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  buscarNegocio() {
    this._AuthService.isAuth().subscribe(auth => {
      this.rutaActiva.params.subscribe(
        (res) => {
          this.keyNegocio = res.keyNegocio;
          this.firebase.list('tienda_informacion/' + auth.uid + '/').snapshotChanges().subscribe(
            (item) => {
              this.registroNegocio = [];
              item.forEach(element => {
                let registroNegocio: any = element.payload.toJSON();
                registroNegocio["$key"] = element.key;
                return this.registroNegocio.push(registroNegocio);
              });
              for(let registros of this.registroNegocio) {
                if(registros['$key'] == res.keyNegocio) {
                  return this.devolverInformacionNegocio(registros);
                }
              }
            }
          );
          this.firebase.list('tienda_ubicaciones/' + auth.uid + '/').snapshotChanges().subscribe(
            (items) => {
              this.registroNegocio2 = [];
              items.forEach(elements => {
                let registroNegocio2: any = elements.payload.toJSON();
                registroNegocio2["$key"] = elements.key;
                return this.registroNegocio2.push(registroNegocio2);
              });
              for(let registros of this.registroNegocio2) {
                if(registros['$key'] == res.keyNegocio) {
                  return this.devolverInformacionNegocio2(registros);
                }
              }
            }
          );
          this.firebase.list('tienda_horario/' + auth.uid + '/').snapshotChanges().subscribe(
            (itemss) => {
              this.registroNegocio3 = [];
              itemss.forEach(elementss => {
                let registroNegocio3: any = elementss.payload.toJSON();
                registroNegocio3["$key"] = elementss.key;
                return this.registroNegocio3.push(registroNegocio3);
              });
              for(let registros of this.registroNegocio3) {
                if(registros['$key'] == res.keyNegocio) {
                  return this.devolverInformacionNegocio3(registros);
                }
              }
            }
          );
          this.firebase.list('tienda_galeria/' + this.keyNegocio).snapshotChanges().subscribe(
            (itemesss) => {
              this.galeriaNegocio = [];
              itemesss.forEach(elementss => {
                let x: any = elementss.payload.toJSON();
                x["$key"] = elementss.key;
                return this.galeriaNegocio.push(x);
              });
              for(let y of this.galeriaNegocio) {
                this.slides.push({
                  img: y['foto']
                });
              }
            }
          )
        }
      );
    });
  }

  productosNegocio() {
    this.rutaActiva.params.subscribe(
      (res) => {
        return this.firebase.list('tienda_productos/' + res.keyNegocio).snapshotChanges()
          .subscribe(
          (item) => {
            this.listProductos = [];
            item.forEach(element => {
              let producto: any = element.payload.toJSON();
              producto["$key"] = element.key;
              this.listProductos.push(producto);
            });
            if(this.listProductos.length > 0) {
              this.tablaProductosNegocio = true;
              this.sinProductosNegocio = false;
            } else {
              this.sinProductosNegocio = true;
              this.tablaProductosNegocio = false;
            }
          }
        );
      });
  }

  devolverInformacionNegocio(registroNegocio: registroNegocioBD) {
    this.key = registroNegocio.$key;
    this.fotoNegocio = registroNegocio.foto;
    this.nombreNegocio = registroNegocio.nombre;
    this.girocateogiraNegocio = registroNegocio.giro + ' - ' + registroNegocio.categoria;
    this.descripcionNegocio = registroNegocio.descripcion;
    this.telefonoNegocio = registroNegocio.telefono;
    this.direccionNegocio = registroNegocio.direccion;
    this.paginaNegocio = registroNegocio.pagina;
    localStorage.setItem('categoria_tienda', JSON.stringify(registroNegocio.categoria));
  }

  devolverInformacionNegocio2(registroNegocio: registroNegocioBD) {
    this.map = { lat: parseFloat(registroNegocio.latitud), lng: parseFloat(registroNegocio.longitud) };
  }

  devolverInformacionNegocio3(registroNegocio: registroNegocioBD) {    
    this.verificarLunes = registroNegocio.lunes;
    if(this.verificarLunes == 'Cerrado - Cerrado') {
      this.lunes = 'Cerrado';
    } else {
      this.lunes = registroNegocio.lunes;
    }

    this.verificarMartes = registroNegocio.martes;
    if(this.verificarMartes == 'Cerrado - Cerrado') {
      this.martes = 'Cerrado';
    } else {
      this.martes = registroNegocio.martes;
    }

    this.verificarMiercoles = registroNegocio.miercoles;
    if(this.verificarMiercoles == 'Cerrado - Cerrado') {
      this.miercoles = 'Cerrado';
    } else {
      this.miercoles = registroNegocio.miercoles;
    }

    this.verificarJueves = registroNegocio.jueves;
    if(this.verificarJueves == 'Cerrado - Cerrado') {
      this.jueves = 'Cerrado';
    } else {
      this.jueves = registroNegocio.jueves;
    }

    this.verificarViernes = registroNegocio.viernes;
    if(this.verificarViernes == 'Cerrado - Cerrado') {
      this.viernes = 'Cerrado';
    } else {
      this.viernes = registroNegocio.viernes;
    }

    this.verificarSabado = registroNegocio.sabado;
    if(this.verificarSabado == 'Cerrado - Cerrado') {
      this.sabado = 'Cerrado';
    } else {
      this.sabado = registroNegocio.sabado;
    }

    this.verificarDomingo = registroNegocio.domingo;
    if(this.verificarDomingo == 'Cerrado - Cerrado') {
      this.domingo = 'Cerrado';
    } else {
      this.domingo = registroNegocio.domingo;
    }

  }

  resetearForm(registroProductoNF) {
    registroProductoNF.reset();
    
    this.renderer.setStyle(this.nombreProducto.nativeElement, 'border-bottom', '1px solid #ced4da');
    this.renderer.setStyle(this.nombreProducto.nativeElement, 'box-shadow', 'none');

    this.renderer.setStyle(this.descripcionProducto.nativeElement, 'border-bottom', '1px solid #ced4da');
    this.renderer.setStyle(this.descripcionProducto.nativeElement, 'box-shadow', 'none');

    this.renderer.setStyle(this.precioProducto.nativeElement, 'border-bottom', '1px solid #ced4da');
    this.renderer.setStyle(this.precioProducto.nativeElement, 'box-shadow', 'none');

    this.txtBtn = 'Crear negocio';
    this.txtNuevoEditarProducto = 'Nuevo producto';
  }

  formularioRegistrarP(registroProductoNF: NgForm) {

    if (this.validar_fotos_producto > 0) {
      this.no_fotos_producto = false;
      
      if(registroProductoNF.value.$key == null) {
        this._AuthService.isAuth().subscribe(auth => {
          this._ProductosService.insertarProductoNegocio(
            registroProductoNF.value,
            auth.uid,
            this.keyNegocio,
            this.files);

            this.renderer.setStyle(this.nombreProducto.nativeElement, 'border-bottom', '1px solid #ced4da');
            this.renderer.setStyle(this.nombreProducto.nativeElement, 'box-shadow', 'none');
            this.renderer.setStyle(this.descripcionProducto.nativeElement, 'border-bottom', '1px solid #ced4da');
            this.renderer.setStyle(this.descripcionProducto.nativeElement, 'box-shadow', 'none');
            this.renderer.setStyle(this.precioProducto.nativeElement, 'border-bottom', '1px solid #ced4da');
            this.renderer.setStyle(this.precioProducto.nativeElement, 'box-shadow', 'none');
            
            let cerrarModal: HTMLElement = document.getElementById('btnCancelar') as HTMLElement;
            cerrarModal.click();
        });
      } else {
        this._AuthService.isAuth().subscribe(auth => {
          this._ProductosService.actualizarProductoNegocio(registroProductoNF.value, auth.uid, this.keyNegocio);
          registroProductoNF.reset();
          let cerrarModal: HTMLElement = document.getElementById('btnCancelar') as HTMLElement;
          cerrarModal.click();
        });
      }
    } else {
      this.no_fotos_producto = true;
    }
  }

  editarProducto(obtenerKeyProducto) {
    if(obtenerKeyProducto != null) {
      this._ProductosService.producto = Object.assign({}, obtenerKeyProducto);

      this.renderer.setStyle(this.nombreProducto.nativeElement, 'border-bottom', '1px solid #f52d56');
      this.renderer.setStyle(this.nombreProducto.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');

      this.renderer.setStyle(this.descripcionProducto.nativeElement, 'border-bottom', '1px solid #f52d56');
      this.renderer.setStyle(this.descripcionProducto.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');

      this.renderer.setStyle(this.precioProducto.nativeElement, 'border-bottom', '1px solid #f52d56');
      this.renderer.setStyle(this.precioProducto.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');

      this.txtBtn = 'Guardar';
      this.txtNuevoEditarProducto = 'Editar producto';
    }
  }

  eliminarProducto(keyProducto) {
    swal({
      text: "Al eliminar el producto ya no sera visible esta publicación para los usuarios toda la información asociada será borrada, ¿Está seguro de eliminar este producto?",
      icon: "warning",
      buttons: ["No", "Si"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("El producto se ha eliminado exitosamente", {
          icon: "success",
        });
        this._AuthService.isAuth().subscribe(auth => {
          this._ProductosService.borrarProductoNegocio(auth.uid, keyProducto, this.keyNegocio);
        });
      }
    });
  }

  verProducto(producto: string) {
    console.log(producto);
    //this.galeriaProducto = [];
    //this.imagenes_producto = [];
    /*this.rutaActiva.params.subscribe(
      (res) => {
        this.firebase.list('producto_galeria/' + res.keyNegocio + '/' + producto.id_producto).snapshotChanges()
        .subscribe(
        (item) => {
          /*this.galeriaProducto = [];
          this.imagenes_producto = [];
          item.forEach(element => {
            let fotos_producto: any = element.payload.toJSON();
            fotos_producto["$key"] = element.key;
            console.log(fotos_producto);
            this.galeriaProducto.push(fotos_producto);
          });
          console.log(this.galeriaProducto[0]);
          for(let y of this.galeriaProducto) {
            this.imagenes_producto.push({
              img: y['foto']
            });
          }
          console.log(this.imagenes_producto);*/
        /*});
      }
    );*/

    //this.verNombreProducto = producto.nombre;
    //this.verPrecioProducto = producto.precio;
    //this.verDescripcionProducto = producto.descripcion;
  }

  buscaProductoNegocio($event) {    
    this._AuthService.isAuth().subscribe(auth => {
      this.firebase.list('tienda_productos/' + auth.uid + '/' + this.keyNegocio).snapshotChanges().subscribe(
        res => {
          this.listProductos = [];
          res.forEach(element => {
            let x: any = element.payload.toJSON();
            x['$key'] = element.key;
            this.listProductos.push(x);
          });
          this.listProductos = this.listProductos.filter(res => {
            return res.nombre.toLocaleLowerCase().match($event.target.value.toLocaleLowerCase());
          });

          if(this.listProductos.length == 0) {
            this.sinResultadosBusquedaProductosNegocio = true;
            this.tablaProductosNegocio = false;
          } else {
            this.tablaProductosNegocio = true;
            this.sinResultadosBusquedaProductosNegocio = false;
          }
        });
    });

    if($event.target.value == '') {
      this.productosNegocio();
    }
  }

  focusInputNombreProducto() {
    this.renderer.setStyle(this.nombreProducto.nativeElement, 'border-bottom', '1px solid #ced4da');
    this.renderer.setStyle(this.nombreProducto.nativeElement, 'box-shadow', 'none');
  }

  blurInputNombreProducto(valor: any) {
    if(valor.target.value != '') {
      this.renderer.setStyle(this.nombreProducto.nativeElement, 'border-bottom', '1px solid #f52d56');
      this.renderer.setStyle(this.nombreProducto.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');
    } else {
      this.renderer.setStyle(this.nombreProducto.nativeElement, 'border-bottom', '1px solid #ced4da');
      this.renderer.setStyle(this.nombreProducto.nativeElement, 'box-shadow', 'none');
    }
  }

  focusInputDescripcionProducto() {
    this.renderer.setStyle(this.descripcionProducto.nativeElement, 'border-bottom', '1px solid #ced4da');
    this.renderer.setStyle(this.descripcionProducto.nativeElement, 'box-shadow', 'none');
  }

  blurInputDescripcionProducto(valor: any) {
    if(valor.target.value != '') {
      this.renderer.setStyle(this.descripcionProducto.nativeElement, 'border-bottom', '1px solid #f52d56');
      this.renderer.setStyle(this.descripcionProducto.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');
    } else {
      this.renderer.setStyle(this.descripcionProducto.nativeElement, 'border-bottom', '1px solid #ced4da');
      this.renderer.setStyle(this.descripcionProducto.nativeElement, 'box-shadow', 'none');
    }
  }

  focusInputPrecioProducto() {
    this.renderer.setStyle(this.precioProducto.nativeElement, 'border-bottom', '1px solid #ced4da');
    this.renderer.setStyle(this.precioProducto.nativeElement, 'box-shadow', 'none');
  }

  blurInputPrecioProducto(valor: any) {
    if(valor.target.value != '') {
      this.renderer.setStyle(this.precioProducto.nativeElement, 'border-bottom', '1px solid #f52d56');
      this.renderer.setStyle(this.precioProducto.nativeElement, 'box-shadow', '0 1px 0 0 #f52d56');
    } else {
      this.renderer.setStyle(this.precioProducto.nativeElement, 'border-bottom', '1px solid #ced4da');
      this.renderer.setStyle(this.precioProducto.nativeElement, 'box-shadow', 'none');
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

}
