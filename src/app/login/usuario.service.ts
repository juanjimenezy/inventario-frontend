import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  private url:string = 'http://localhost:8070/Api/usuarios';

  constructor(private router: Router,private  http: HttpClient) { }

  getUsuarios() : Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.url);
  }

  getUsuarioById(id: number) : Observable<Usuario>{
    return this.http.get<Usuario>(`${this.url}/${id}`);
  }

  create(usuario: Usuario) : Observable<Usuario>{
    return this.http.post<Usuario>(this.url,usuario);
  }
}
