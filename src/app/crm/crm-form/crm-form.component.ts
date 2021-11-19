import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { CrmService } from 'src/app/services/crm.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crm-form',
  templateUrl: './crm-form.component.html',
  styleUrls: ['./crm-form.component.css']
})
export class CrmFormComponent implements OnInit {

  alumno: Alumno = new Alumno();

  busquedaActiva: boolean = false;

  buscarDni: string = '';

  sexo: string[] = ['MASCULINO','FEMENINO'];
  carreras: string[] = ['INGENIERÍA DE SISTEMAS', 'ADMINISTRACIÓN DE EMPRESAS', 'MARKETING', 'INGENIERÍA DE MINA', 'CONTABILIDAD'];

  constructor(private crmService: CrmService, private router: Router) { }

  ngOnInit(): void {
  }

  buscar(): void {
    this.crmService.getAlumno(this.buscarDni).subscribe(response => {
      console.log(response.response.alumno);
      if(response.response.alumno === undefined){
        Swal.fire('No se encontró alumno', `El alumno con el dni ${this.buscarDni} no existe.`, 'info');
        return 
      }
      this.alumno = response.response.alumno
      this.busquedaActiva = true;
    });
    
  }

  crearAlumno(): void {
    
    this.alumno.fechaCum = '1994';
    this.alumno.dni = this.buscarDni;
    this.alumno.id = "1";
    this.crmService.saveAlumno(this.alumno)
        .subscribe(response => {
          Swal.fire(
            'Alumno Registrado',
            `El alumno ${this.alumno.nombre} ${this.alumno.apellidos} ha sido registrado!`,
            'success'
          )
      this.router.navigate(['']);
        });
  }

  comparar(o1: string, o2:string): boolean{
    if(o1 === undefined && o2 === undefined) return true;
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false: o1 == o2;
  }
}
