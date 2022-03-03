import { Injectable } from "@angular/core";
import { Usuario } from "./login/usuario";

@Injectable()
export class Globals {

    loggeado = false;
    userLogeado : Usuario;
    host : string = 'http://localhost:8070/';

    constructor() {}
}