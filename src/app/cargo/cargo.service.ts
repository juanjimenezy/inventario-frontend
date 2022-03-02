import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Cargo } from './cargo';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  private url:string = 'http://127.0.0.1:8070/Api/cargos';
  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private  http: HttpClient) { }

  getCargos() : Observable<Cargo[]>{
    return this.http.get<Cargo[]>(this.url);
  }

  getCargoById(id : number) : Observable<Cargo>{
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.get<Cargo>(this.url||'ById',{params:params});
  }

  create(cargo: Cargo) : Observable<Cargo>{
    return this.http.post<Cargo>(this.url,cargo);
  }
}
