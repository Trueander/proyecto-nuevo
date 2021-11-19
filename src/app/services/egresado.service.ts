import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Egresado } from '../models/egresado';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EgresadoService {

  private urlBackendEgresado: string = 'https://project-backend-springboot.herokuapp.com/api/v1/egresados';

  constructor(private http: HttpClient) { }

  buscarEgresado(dni: string): Observable<Egresado> {
    return this.http.get<Egresado>(this.urlBackendEgresado+"/"+dni)
    .pipe(
      catchError((e) => {
        if (e.status == 500) {
          Swal.fire('No se encontró egresado', `El egresado con el dni ${dni} no existe.`, 'info');
          return throwError(e);
        }

        return throwError(e);
      })
     );
  }

  saveEgresado(egresado: Egresado): Observable<any> {
    return this.http.post<any>(this.urlBackendEgresado, egresado);
  }
}
