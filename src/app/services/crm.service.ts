import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Alumno } from 'src/app/models/alumno';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrmService {
  private urlBackendCrm: string = 'https://appi-crm.herokuapp.com/api/Alumnos/';
  urlNueva: string = 'https://project-backend-springboot.herokuapp.com/api/v1/alumnos';

  constructor(private http: HttpClient) { }

  getAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.urlBackendCrm);
  }

  saveAlumno(alumno: Alumno): Observable<any> {
    return this.http.post<any>(this.urlNueva, alumno);
  }

  getAlumno(dni: string): Observable<any> {
    return this.http.get<any>(this.urlNueva+"/"+dni)
    .pipe(
      catchError((e) => {
        if (e.status == 500) {
         
          return throwError(e);
        }

        return throwError(e);
      })
     );
  }

  deleteAlumno(id: string): Observable<any> {
    return this.http.delete<any>(this.urlNueva+'/'+id);
  }

}
