import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../login/usuario';
import { UsuarioService } from '../login/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logeado : boolean = false;
  userLoggeado : Usuario;


  constructor(private usuarioService : UsuarioService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // this.cargarUsuario();
  }

  navmenu : boolean = false;

  active(){
   this.navmenu = !this.navmenu;
  }


  cargarUsuario(){
    console.log('cargando usuario...')
    this.activatedRoute.params.subscribe(params =>
      {
        let id = params['id']
        if(id){
          this.usuarioService.getUsuarioById(id).subscribe(
            (usuario) =>
            {
              this.userLoggeado = usuario;
              this.logeado = true;
            }
          )
        }
      }
    )

  }

  loggeo(id : number){
    this.usuarioService.getUsuarioById(id).subscribe(
      (usuario) => {
        this.userLoggeado = usuario;
        this.logeado = true;
      }
    )
  }


}