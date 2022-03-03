import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {


  constructor(private router: Router,private  http: HttpClient, public globals : Globals) { }

  getUsuarios() : Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.globals.urlUsuarios);
  }

  getUsuarioById(id: number) : Observable<Usuario>{
    return this.http.get<Usuario>(`${this.globals.urlUsuarios}/${id}`);
  }

  create(usuario: Usuario) : Observable<Usuario>{
    return this.http.post<Usuario>(this.globals.urlUsuarios,usuario);
  }
}
