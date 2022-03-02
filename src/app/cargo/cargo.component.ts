import { Component, OnInit } from '@angular/core';
import { Cargo } from './cargo';
import { CargoService } from './cargo.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.css']
})
export class CargoComponent implements OnInit {

  cargos : Cargo[];
  cargo : Cargo = new Cargo();
  constructor(private router: Router,private cargoService : CargoService) { }

  ngOnInit(): void {
    this.actualizaCargos();
  }

  grabar(){
    this.cargoService.create(this.cargo).subscribe(
      (cargo) =>{
        this.actualizaCargos();
        Swal.fire('Cargo ', ` ${cargo.nombreCargo} creado con exito!`, 'success');
      }
    )
  }

  actualizaCargos(){
    this.cargoService.getCargos().subscribe(
      (cargos) => {
        this.cargos = cargos;
      }
    );
  }

}
