import { Injectable } from "@angular/core";
import { Usuario } from "./login/usuario";

@Injectable()
export class Globals {

    loggeado = false;
    userLogeado : Usuario;

    host : string = 'http://localhost:8070';
    mapping : string = '/Api';


    urlArticulos : string = this.host + this.mapping + '/articulos';
    urlCargos : string = this.host + this.mapping + '/cargos';
    urlUsuarios : string = this.host + this.mapping + '/usuarios';

    constructor() {}
}