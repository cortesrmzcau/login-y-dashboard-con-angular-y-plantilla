export class registroNegocioBD {
    $key: string;
    foto: string;
    nombre: string;
    giro: string;
    descripcion: string;
    categoria: string;
    direccion: string;
    telefono: string;
    pagina: string;
    longitud: string;
    latitud: string;
    jerarquia?: string;
    lunes?: any;
    horarioLunesAM?: string;
    horarioLunesPM?: string;
    martes?: any;
    horarioMartesAM?: string;
    horarioMartesPM?: string;
    miercoles?: any;
    horarioMiercolesAM?: string;
    horarioMiercolesPM?: string;
    jueves?: any;
    horarioJuevesAM?: string;
    horarioJuevesPM?: string;
    viernes?: any;
    horarioViernesAM?: string;
    horarioViernesPM?: string;
    sabado?: any;
    horarioSabadoAM?: string;
    horarioSabadoPM?: string;
    domingo?: any;
    horarioDomingoAM?: string;
    horarioDomingoPM?: string;
}

export class Upload {

	$key: string;
	file:File;
	name:string;
	url:string;
	progress:number;
	createdAt: Date = new Date();
  
	constructor(file:File) {
	  this.file = file;
	}
}