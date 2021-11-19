import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Datoconsulta } from '../models/datoconsulta';
import { Equifax } from '../models/equifax';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EquifaxService {
  private urlEndoPoint: string = 'https://project-backend-springboot.herokuapp.com/api/v1/clientes';

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Datoconsulta[]> {
    return this.http.get<Datoconsulta[]>(this.urlEndoPoint);
  }

  buscarCliente(dni: string): Observable<Equifax> {
    return this.http.get<Equifax>(this.urlEndoPoint+'/'+dni)
               .pipe(
                catchError((e) => {
                  if (e.status == 500) {
                    Swal.fire('No se encontró cliente', `El cliente con el dni ${dni} no existe.`, 'info');
                    return throwError(e);
                  }
        
                  return throwError(e);
                })
               );
  }

  saveCliente(equifax: Equifax): Observable<any> {
    return this.http.post<any>(this.urlEndoPoint, equifax)
    .pipe(
      catchError((e) => {
        if (e.status == 500) {
          Swal.fire('Cliente Registrado', `El cliente ${equifax.nombres} ha sido registrado con éxito.`, 'success');
          return throwError(e);
        }

        return throwError(e);
      })
     );
    
  }
}
