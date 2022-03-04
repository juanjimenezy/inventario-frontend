import { Component, OnInit } from '@angular/core';
import { Usuario } from '../login/usuario';
import { UsuarioService } from '../login/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Globals } from '../globals';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logeado : boolean = false;


  constructor(private usuarioService : UsuarioService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              public globals : Globals) { }

  ngOnInit(): void {
    if(!this.globals.loggeado){
      this.router.navigate(['/Login'])
    }
  }

  navmenu : boolean = false;

  active(){
   this.navmenu = !this.navmenu;
  }
  
}
