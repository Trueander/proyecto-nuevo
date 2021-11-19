import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Alumno } from '../models/alumno';
import { CrmService } from '../services/crm.service';

@Component({
  selector: 'app-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.css']
})
export class CrmComponent implements OnInit {

  alumnos: Alumno[] = [];

  constructor(private crmService: CrmService) { }

  ngOnInit(): void {
    this.crmService.getAlumnos()
      .subscribe(response => {
        this.alumnos = Object.values(response);
        console.log(this.alumnos)
      });
  }
  
  deleteAlumno(id: string): void {


    Swal.fire({
      title: '¿Está seguro de eliminar al alumno?',
      text: `El alumno será eliminado.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.crmService.deleteAlumno(id)
          .subscribe(response => {
            Swal.fire('Eliminado!','Alumno eliminado con éxito.', 'success');
            this.alumnos = this.alumnos.filter(a => a.id != id);
          })

      }
    })



  }
}
