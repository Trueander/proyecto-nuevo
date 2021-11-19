import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Egresado } from '../models/egresado';
import { EgresadoService } from '../services/egresado.service';

@Component({
  selector: 'app-egresados',
  templateUrl: './egresados.component.html',
  styleUrls: ['./egresados.component.css']
})
export class EgresadosComponent implements OnInit {

  egresado: Egresado = new Egresado();

  busquedaActiva: boolean = false;

  modalidad: string[] = ['CARRERA PROFESIONAL', 'PROGRAMA DE TITULACIÓN', 'DIPLOMADO'];
  institutos: string[] = ['IDAT', 'CIMAS', 'IPAL','CYBERTEC', 'SISE'];

  constructor(private egresadoService: EgresadoService) { }

  ngOnInit(): void {
  }

  buscarEgresado(): void {
    this.egresadoService.buscarEgresado(this.egresado.dni.toString())
        .subscribe(response => {
          this.egresado = response;
          this.busquedaActiva = true;
        });
  }

  saveEgresado(egresadoForm: NgForm): void {
    this.egresadoService.saveEgresado(this.egresado)
        .subscribe(response => {
          egresadoForm.controls['nombres']?.setValue('');
          egresadoForm.controls['apellidos']?.setValue('');
          egresadoForm.controls['fecha']?.setValue('');
          egresadoForm.controls['grados']?.setValue('');
          egresadoForm.controls['instituto']?.setValue(undefined);
          egresadoForm.controls['modalidad']?.setValue(undefined);
          Swal.fire('Registrado', 'Egresado registrado.','success');
        });
  }

  comparar(o1: string, o2:string): boolean{
    if(o1 === undefined && o2 === undefined) return true;
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false: o1 == o2;
  }

}
