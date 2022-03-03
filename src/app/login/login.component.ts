import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '../globals';
import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output()
  enviar: EventEmitter<number> = new EventEmitter<number>();

  usuarios: Usuario[];
  idUsuario : number;

  constructor(private usuarioService: UsuarioService, public _router : Router, public globals: Globals) { }

  ngOnInit(): void {
    this.actualizaUsuarios();
  }

  loggear(vIdUSer : number){

    this.usuarioService.getUsuarioById(vIdUSer).subscribe(
      (usuario) =>{
        this.globals.userLogeado = usuario;
        this.globals.loggeado = true;
        this._router.navigate(['/Menu'])
      }
    );
  }

  actualizaUsuarios(){
    this.usuarioService.getUsuarios().subscribe(
      (usuarios) => {
        this.usuarios = usuarios;
      }
    );
  };

}
