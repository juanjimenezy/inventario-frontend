import { Injectable } from '@angular/core';
import { Articulo } from './articulo';
import { map, Observable,catchError,throwError } from 'rxjs';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Usuario } from '../login/usuario';
import Swal from 'sweetalert2';



@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  private url:string = 'http://127.0.0.1:8070/Api/articulos';
  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private  http: HttpClient) { }

  getArticulos() : Observable<Articulo[]>{
    return this.http.get<Articulo[]>(this.url);
  }

  getArticulosById(id : number) : Observable<Articulo>{
    return this.http.get<Articulo>(`${this.url}/${id}`);
  }

  create(idUsu : number,articulo: Articulo) : Observable<Articulo>{
    let params = new HttpParams();
    params = params.append('id', idUsu);
    return this.http.post<Articulo>(this.url,articulo,{headers : this.httpHeaders, params: params}).pipe(
      catchError(e =>{
        console.error(e.error.mensaje);
        Swal.fire('Error' , e.error.mensaje,'error');
        return  throwError(e);
      })
    );
  }

  update(idArt : number, idUsu : number, articulo: Articulo):Observable<Articulo>{
    let params = new HttpParams();
    params = params.append('id', idArt);
    params = params.append('user', idUsu);
    return this.http.put<Articulo>(this.url,articulo,{headers: this.httpHeaders, params: params});
  }

  deleteById(id : number, user : number){
    let params = new HttpParams();
    params = params.append('id', id);
    params = params.append('idUSer', user);
    return this.http.delete<Articulo>(this.url,{params: params});
  }

  filtrer(parametros : HttpParams) : Observable<Articulo[]>{
    return this.http.get<Articulo[]>(`${this.url}Filtro`,{params: parametros}).pipe(
      catchError(e =>{
        console.error(e.error.mensaje);
        Swal.fire('Alerta' , e.error.mensaje,'warning');
        return throwError(e);

      })
    );
  }

  usuariosOfArticulos() : Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.url}Users`)
  }

  articuloByNom(nom : string) : Observable<Articulo>{
    let params = new HttpParams();
    params = params.append('nombre', nom);
    return this.http.get<Articulo>(`${this.url}ByNom`,{params: params});
  }

}