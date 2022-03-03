import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Cargo } from './cargo';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  private httpHeaders = new HttpHeaders({'Content-Type' : 'application/json'});

  constructor(private  http: HttpClient,public globals : Globals) { }

  getCargos() : Observable<Cargo[]>{
    return this.http.get<Cargo[]>(this.globals.urlCargos);
  }

  getCargoById(id : number) : Observable<Cargo>{
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.get<Cargo>(this.globals.urlCargos||'ById',{params:params});
  }

  create(cargo: Cargo) : Observable<Cargo>{
    return this.http.post<Cargo>(this.globals.urlCargos,cargo);
  }
}
