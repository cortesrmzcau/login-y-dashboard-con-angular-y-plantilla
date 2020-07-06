import { Injectable, Output, EventEmitter } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database'; 
import { registroNegocioBD } from '../../modelos/registrar-negocio';

@Injectable({
  providedIn: 'root'
})
export class InformacionNegocioService {

  registroNegocio: registroNegocioBD = new registroNegocioBD();
  nombre: string;

  constructor(
  ) { }

}
