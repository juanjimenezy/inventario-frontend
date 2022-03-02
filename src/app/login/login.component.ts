import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private usuarioService: UsuarioService, public _router : Router) { }

  ngOnInit(): void {
    this.actualizaUsuarios();
  }

  loggear(vIdUSer : number){
    this.enviar.emit(vIdUSer);
  }

  actualizaUsuarios(){
    this.usuarioService.getUsuarios().subscribe(
      (usuarios) => {
        this.usuarios = usuarios;
      }
    );
  }

}
