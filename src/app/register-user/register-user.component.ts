import { Component, OnInit } from '@angular/core';
import { CargoService } from '../cargo/cargo.service';
import { Usuario } from '../login/usuario';
import { UsuarioService } from '../login/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Cargo } from '../cargo/cargo';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  
  usuario: Usuario = new Usuario();
  cargos: Cargo[];
  vCargo: any;

  constructor(private router: Router, private cargoService: CargoService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.cargoService.getCargos().subscribe(
      (cargos) => {
        this.cargos = cargos;
      }
    )
  }

  grabarUsuario() {
    this.usuario.cargo = this.vCargo;
    this.usuarioService.create(this.usuario).subscribe(
      (usuario) => {
        Swal.fire('Usuario ', ` ${usuario.nombre} creado con exito!`, 'success');
        this.router.navigate(['/'])
      }
    );
  }



}
