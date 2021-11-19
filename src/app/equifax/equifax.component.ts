import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Datoconsulta } from '../models/datoconsulta';
import { Equifax } from '../models/equifax';
import { EquifaxService } from '../services/equifax.service';

@Component({
  selector: 'app-equifax',
  templateUrl: './equifax.component.html',
  styleUrls: ['./equifax.component.css']
})
export class EquifaxComponent implements OnInit {
  listaClientes: Datoconsulta[] = [];

  cliente: Equifax = new Equifax();

  constructor(private equifaxService: EquifaxService) { }

  ngOnInit(): void {
    this.equifaxService.getClientes().subscribe(response => this.listaClientes = response);
  }

  buscarCliente(): void {
    this.equifaxService.buscarCliente(this.cliente.dni)
        .subscribe(response => this.cliente = response);
  }

  saveCliente(clienteForm: NgForm): void {
    this.cliente.id = 1
    this.equifaxService.saveCliente(this.cliente)
        .subscribe(response => {
          clienteForm.controls['nombres']?.setValue('');
          clienteForm.controls['apellidos']?.setValue('');
          clienteForm.controls['ocupacion']?.setValue('');
          clienteForm.controls['nacionalidad']?.setValue('');
          Swal.fire('Cliente creado', 'EL cliente se registró con éxito!', 'success');
        })
  }

}
