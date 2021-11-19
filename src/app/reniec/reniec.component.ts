import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Persona } from '../models/persona';
import { ReniecService } from '../services/reniec.service';

@Component({
  selector: 'app-reniec',
  templateUrl: './reniec.component.html',
  styleUrls: ['./reniec.component.css']
})
export class ReniecComponent implements OnInit {

  busquedaActiva: boolean = false;

  persona: Persona = new Persona();
  sexo: string[] = ['MASCULINO','FEMENINO'];
  estadoCivil: string[] = ['SOLTERO','CASADO','DIVORCIADO'];
  distritos: string[] = ['Cercado de Lima','Ate','Barranco','Breña','Comas','Chorrillos','El Agustino','Jesús María','La Molina','Miraflores'];
  provincias: string[] = ['Lima','Barranca','Cañete','Huaral'];
  departamentos: string[] = ['Lima Metropolitana','Lima','Madre de Dios','Ica'];


  constructor(private reniecService: ReniecService) { }

  ngOnInit(): void {
  }

  savePersona(personaForm: NgForm): void {
    this.persona.id= 0;
    this.reniecService.savePersona(this.persona)
        .subscribe(response => {
          personaForm.controls['nombre']?.setValue('');
          personaForm.controls['apellido']?.setValue('');
          personaForm.controls['direccion']?.setValue('');
          personaForm.controls['estadoCivil']?.setValue(undefined);
          personaForm.controls['departamento']?.setValue(undefined);
          personaForm.controls['provincia']?.setValue(undefined);
          personaForm.controls['distrito']?.setValue(undefined);
          personaForm.controls['sexo']?.setValue(undefined);
          Swal.fire('Registrado','Persona registrada con éxito.','success')
        });
  }

  updatePersona(personaForm: NgForm): void {
    this.reniecService.updatePersona(this.persona.dni, this.persona)
        .subscribe(response => {
          personaForm.controls['nombre']?.setValue('');
          personaForm.controls['apellido']?.setValue('');
          personaForm.controls['direccion']?.setValue('');
          personaForm.controls['estadoCivil']?.setValue(undefined);
          personaForm.controls['departamento']?.setValue(undefined);
          personaForm.controls['provincia']?.setValue(undefined);
          personaForm.controls['distrito']?.setValue(undefined);
          personaForm.controls['sexo']?.setValue(undefined);
          Swal.fire('Actualizado','Persona actualizada con éxito.','success')
        })
  }

  buscarPersona(): void {
    this.reniecService.getPersona(this.persona.dni)
        .subscribe(response => {
          this.persona = response;
          this.busquedaActiva = true;
        });
  }

  comparar(o1: string, o2:string): boolean{
    if(o1 === undefined && o2 === undefined) return true;
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false: o1 == o2;
  }

}
