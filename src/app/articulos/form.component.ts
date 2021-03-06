import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Articulo } from './articulo';
import { ArticuloService } from './articulo.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker'
import Swal from 'sweetalert2';
import { Globals } from '../globals';




@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;
  articulo: Articulo = new Articulo();
  titulo: string = 'Crear Articulo';

  //
  bsInlineValue = new Date();
  bsInlineRangeValue: Date[];
  maxDate = new Date();
  //

  constructor(private articuloService: ArticuloService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    public globals: Globals) {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        dateInputFormat: 'YYYY-MM-DD HH:mm',
        maxDate: this.bsInlineValue
      })
  }

  ngOnInit(): void {
    if(!this.globals.loggeado){
      this.router.navigate(['/Login'])
    }else
    this.cargarArticulo();
  }

  cargarArticulo() {
    this.activateRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
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

  create() {
    if (this.maxDate.getTime() < this.articulo.fechaIng.getTime()) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `La fecha no puede ser mayor a la actual`
      });
    } else {
      this.articuloService.create(this.articulo).subscribe(
        (articulo) => {
          this.router.navigate(['/Articulos'])
          Swal.fire('Nuevo Articulo', ` ${this.articulo.nombre} creado con exito!`, 'success');
        }
      );
    }
  }

  update() {

    if (this.maxDate < this.articulo.fechaIng) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `La fecha no puede ser mayor a la actual`
      });
    } else

      this.activateRoute.params.subscribe(params => {
        let idArt = params['id'];
        if (idArt) {
          this.articuloService.update(idArt, this.articulo).subscribe(
            (articulo) => {
              this.router.navigate(['/Articulos']);
              Swal.fire('Articulo', `${this.articulo.nombre} actualizado con exito!`, 'success');
            }
          )

        }
      }

      )

  }



}
