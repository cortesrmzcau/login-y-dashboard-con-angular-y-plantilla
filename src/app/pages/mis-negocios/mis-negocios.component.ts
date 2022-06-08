import { Component, OnInit } from '@angular/core';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';

const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-mis-negocios',
  templateUrl: './mis-negocios.component.html',
  styles: []
})
export class MisNegociosComponent implements OnInit {

  negociosUsuarioResultado: any[];
  negociosUsuarioResultado2: any[];
  sinResultadosBusquedaNegocio: boolean;
  sinNegocios: boolean;
  tablaNegocios: boolean;

  constructor(
  ) { }

  ngOnInit() {
    this.consultaNegocios();
  }

  consultaNegocios() {
    this.negociosUsuarioResultado = [
      {
        $key: "1",
        foto: "./assets/ChronosPC.jpg",
        nombreNegocio: "Chronos PC",
        giro: "Tienda de Computadoras",
        categoria: "Computadoras y Accesorios",
        direccion: "Blvd. Adolfo Ruíz Cortines 519, Tajin, 93330 Poza Rica de Hidalgo, Ver.",
        jerarquia: "Principal",
        productosRegistrados: "100"
      },
      {
        $key: "2",
        foto: "./assets/Kattas.png",
        nombreNegocio: "Kattas",
        giro: "Tienda de Ropa",
        categoria: "Ropa y Accesorios",
        direccion: "Calle 6 Ote. s/n, Obrera, 93260 Poza Rica de Hidalgo, Ver.",
        jerarquia: "Sucursal",
        productosRegistrados: "200"
      }
    ];

    //this.negociosUsuarioResultado = [];

    if(this.negociosUsuarioResultado.length == 0) {
      this.sinNegocios = true;
    }

    if (this.negociosUsuarioResultado.length > 0) {
      this.sinNegocios = false;
      this.tablaNegocios = true;
    }

  }

  deleteNegocio(nombreNegocio: string) {
    swal({
      text: "Al eliminar el negocio toda su información y los productos asociados serán borrados, ¿Está seguro de eliminar este negocio?",
      icon: "warning",
      buttons: [true, true],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("El Negocio " + nombreNegocio + " se ha eliminado exitosamente", {
          icon: "success",
        });
      }
    });
  }

  buscarNegocio($event) {
    if($event.target.value == '') {
      this.consultaNegocios();
      console.clear();
    } else {
      this.negociosUsuarioResultado2 = [];

      this.negociosUsuarioResultado2 = this.negociosUsuarioResultado.filter(res => {
        return res.nombreNegocio.toLocaleLowerCase().match($event.target.value.toLocaleLowerCase());
      });

      console.log(this.negociosUsuarioResultado2);

      if(this.negociosUsuarioResultado.length != 0) {
        console.log('Si hay negocios');
        this.negociosUsuarioResultado = this.negociosUsuarioResultado2;
      }
    }
  }

}
