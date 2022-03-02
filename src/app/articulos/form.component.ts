import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Articulo } from './articulo';
import { ArticuloService } from './articulo.service';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker'
import Swal from 'sweetalert2';




@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  datePickerConfig : Partial<BsDatepickerConfig>;
  articulo : Articulo = new Articulo(); 
  titulo : string = 'Crear Articulo';

  //
  bsInlineValue = new Date();
  bsInlineRangeValue: Date[];
  maxDate = new Date();
  //

  constructor(private articuloService : ArticuloService,
              private router : Router,
              private activateRoute : ActivatedRoute,) 
              { 
                this.datePickerConfig = Object.assign({},
                  {containerClass: 'theme-dark-blue',
                  dateInputFormat:'YYYY-MM-DD HH:mm',
                  maxDate: this.bsInlineValue
                })
              }

  ngOnInit(): void {
    this.cargarArticulo();
  }

  cargarArticulo(){
    this.activateRoute.params.subscribe(params => {
        let id = params['id']
        if(id){
          this.articuloService.getArticulosById(id).subscribe(
            (articulo) => {
              this.articulo = articulo;
              this.titulo = 'Editar Articulo';
            }
          )
        }
      }
    )
  }

  create(){
 if(this.maxDate.getTime() < this.articulo.fechaIng.getTime()){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `La fecha no puede ser mayor a la actual`
      });
    }else{
      this.activateRoute.params.subscribe(params =>{
        let idUsu = params['usu']
        if (idUsu){
          this.articuloService.create(idUsu,this.articulo).subscribe(
            (articulo) =>{
              this.router.navigate(['/Articulos/',idUsu])
              Swal.fire('Nuevo Articulo',` ${this.articulo.nombre} creado con exito!`, 'success');
            }
          );
        }
      }
      );
    }
  }

  update(){

    if(this.maxDate < this.articulo.fechaIng ){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `La fecha no puede ser mayor a la actual`
      });
    }else

    this.activateRoute.params.subscribe(params=>{
      let idUsu = params['usu'];
      let idArt = params['id'];
      if(idUsu){
        this.articuloService.update(idArt,idUsu,this.articulo).subscribe(
          (articulo) =>{
            this.router.navigate(['/Articulos/',idUsu])
            Swal.fire('Articulo',`${this.articulo.nombre} actualizado con exito!`, 'success');
          }
        )

      }
    }
      
    )

  }



}
