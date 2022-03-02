import { Usuario } from "../login/usuario";

export class Articulo {

    id : number;
    nombre : string;
    producto : string;
    cantidad : number;
    fechaIng : Date;
    fechaAct : Date;
    usernameIng : Usuario;
    usernameAct : Usuario;
    
}
