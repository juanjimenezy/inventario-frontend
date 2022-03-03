import { Injectable } from '@angular/core';
import { Articulo } from './articulo';
import { Observable,catchError,throwError } from 'rxjs';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Usuario } from '../login/usuario';
import Swal from 'sweetalert2';
import { Globals } from '../globals';



@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private  http: HttpClient,public globals : Globals) { }

  getArticulos() : Observable<Articulo[]>{
    return this.http.get<Articulo[]>(this.globals.urlArticulos);
  }

  getArticulosById(id : number) : Observable<Articulo>{
    return this.http.get<Articulo>(`${this.globals.urlArticulos}/${id}`);
  }

  create(articulo: Articulo) : Observable<Articulo>{
    let params = new HttpParams();
    params = params.append('idUsuario', this.globals.userLogeado.id);
    return this.http.post<Articulo>(this.globals.urlArticulos,articulo,{headers : this.httpHeaders, params: params}).pipe(
      catchError(e =>{
        console.error(e.error.mensaje);
        Swal.fire('Error' , e.error.mensaje,'error');
        return  throwError(e);
      })
    );
  }

  update(idArt : number, articulo: Articulo):Observable<Articulo>{
    let params = new HttpParams();
    params = params.append('id', idArt);
    params = params.append('user', this.globals.userLogeado.id);
    return this.http.put<Articulo>(this.globals.urlArticulos,articulo,{headers: this.httpHeaders, params: params});
  }

  deleteById(id : number, user : number){
    let params = new HttpParams();
    params = params.append('id', id);
    params = params.append('idUSer', user);
    return this.http.delete<Articulo>(this.globals.urlArticulos,{params: params});
  }

  filtrer(parametros : HttpParams) : Observable<Articulo[]>{
    return this.http.get<Articulo[]>(`${this.globals.urlArticulos}Filtro`,{params: parametros}).pipe(
      catchError(e =>{
        console.error(e.error.mensaje);
        Swal.fire('Alerta' , e.error.mensaje,'warning');
        return throwError(e);

      })
    );
  }

  usuariosOfArticulos() : Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.globals.urlArticulos}Users`)
  }

  articuloByNom(nom : string) : Observable<Articulo>{
    let params = new HttpParams();
    params = params.append('nombre', nom);
    return this.http.get<Articulo>(`${this.globals.urlArticulos}ByNom`,{params: params});
  }

}