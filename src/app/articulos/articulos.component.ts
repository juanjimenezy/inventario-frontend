import { Component, OnInit } from '@angular/core';
import { Usuario } from '../login/usuario';

import Swal from 'sweetalert2';

import { Articulo } from './articulo';
import { ArticuloService } from './articulo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../login/usuario.service';
import { HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {

  usuario : Usuario = new Usuario();
  usuCreador : Usuario = new Usuario();
  articulos : Articulo[];
  usuariosxArticulo : Usuario[];

  fNombre : string = null;
  susers : any;

  constructor(private articuloService : ArticuloService,
              private usuariosService : UsuarioService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarUsuario();
    this.cargarUsuariosOfArticulos();
    this.articuloService.getArticulos().subscribe(
      (articulos) => {
        this.articulos = articulos;
      }
    );
  }

  cargarUsuario(){
    this.activatedRoute.params.subscribe(params =>
      {
        let id = params['usu']
        if(id){
          this.usuariosService.getUsuarioById(id).subscribe(
            (usuario) =>
            {
              this.usuario = usuario;
            }
          )
        }
      }
    )
  }

  delete(articulo : Articulo){
    if(this.usuario.id == articulo.usernameIng.id){
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: 'Esta seguro?',
        text: `¿Seguro que desea eliminar al cliente ${articulo.nombre}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            this.articuloService.deleteById(articulo.id,this.usuario.id).subscribe(
              response =>
              {
                this.articulos = this.articulos.filter(arti => arti != articulo);
                swalWithBootstrapButtons.fire(
                  'Eliminado!',
                  `${articulo.nombre}  Ha sido eliminado`,
                  'success'
                );
              }
            )
    
          }
    });
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Solo el usuario ${articulo.usernameIng.nombre} puede eliminar este articulo`
      })
    }





  }

  filtrar(){
    let params = new HttpParams();
    if(this.fNombre){
      params = params.append('nombre', this.fNombre);
    }
    if(this.susers != "null"){
      params = params.append('usuario', this.susers);
    }
    
    this.articuloService.filtrer(params).subscribe(
      (articulos) => {
        this.articulos = articulos;
      }
    )
  }

  cargarUsuariosOfArticulos(){
    this.articuloService.usuariosOfArticulos().subscribe(
      (usuarios) => {
        this.usuariosxArticulo = usuarios;
      }
    )
  }

}
