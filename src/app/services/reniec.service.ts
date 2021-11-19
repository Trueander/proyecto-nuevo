import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Persona } from '../models/persona';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ReniecService {

  private urlEndpoint: string = 'https://project-backend-springboot.herokuapp.com/api/v1/personas';

  constructor(private http: HttpClient) { }

  getPersona(dni: string): Observable<Persona> {
    return this.http.get<Persona>(this.urlEndpoint+'/'+dni)
    .pipe(
      catchError((e) => {
        if (e.status == 500) {
          Swal.fire('No se encontró persona', `La persona con el dni ${dni} no existe.`, 'info');
          return throwError(e);
        }

        return throwError(e);
      })
     );
  }

  savePersona(persona: Persona): Observable<any> {
    return this.http.post<any>(this.urlEndpoint, persona);
  }

  updatePersona(dni: string, persona: Persona): Observable<any> {
    return this.http.put<any>(this.urlEndpoint+"/"+dni, persona);
  }


}
