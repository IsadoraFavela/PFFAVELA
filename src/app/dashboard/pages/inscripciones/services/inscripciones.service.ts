import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take, concatMap } from 'rxjs';
import { Inscripcion, CrearInscripcionPayload } from '../models';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/environments/environments';

/*const INS_MOCKS: Inscripcion[] = [
  {
    id: 1,
    estudiante: 'Emmanuel',
    nombre_curso: 'React Js',
    fecha_fin: new Date(),
    fecha_inicio: new Date(),
  },
  {
    id: 2,
    estudiante: 'Karen',
    nombre_curso: 'Flutter',
    fecha_fin: new Date(),
    fecha_inicio: new Date(),
  },
  {
    id: 3,
    estudiante: 'Maria',
    nombre_curso: 'Angular',
    fecha_fin: new Date(),
    fecha_inicio: new Date(),
  },
];
*/
@Injectable({
  providedIn: 'root',
})
export class InscripcionesService {
  private inscripcion$ = new BehaviorSubject<Inscripcion[]>([]);

  constructor(private httpClient: HttpClient) {}

  obtenerInscripciones(): Observable<Inscripcion[]> {
    return this.httpClient.get<Inscripcion[]>(
      `${enviroment.apiBaseUrl}/inscripciones`
    );
  }

  getInscripcionById(
    inscripcionid: number
  ): Observable<Inscripcion | undefined> {
    return this.httpClient
      .get<Inscripcion[]>(
        `${enviroment.apiBaseUrl}/inscripciones?id=${inscripcionid}`
      )
      .pipe(
        map((inscripcion) => {
          return inscripcion[0];
        })
      );
  }

  crearInscripcion(data: CrearInscripcionPayload): Observable<Inscripcion> {
    return this.httpClient
      .post<Inscripcion>(`${enviroment.apiBaseUrl}/inscripciones`, data)
      .pipe(
        concatMap((createResponse) =>
          this.getInscriptionWithAllById(createResponse.id)
        )
      );
  }

  getInscriptionWithAllById(id: number): Observable<Inscripcion> {
    return this.httpClient.get<Inscripcion>(
      `${enviroment.apiBaseUrl}/inscripciones/${id}`
    );
  }

  editarInscripcion(
    inscripcionId: number,
    actualizacion: Partial<Inscripcion>
  ): Observable<Inscripcion[]> {
    this.inscripcion$.pipe(take(1)).subscribe({
      next: (inscripcion) => {
        const inscripcionesActualizados = inscripcion.map((inscripcion) => {
          if (inscripcion.id === inscripcionId) {
            return {
              ...inscripcion,
              ...actualizacion,
            };
          } else {
            return inscripcion;
          }
        });

        this.inscripcion$.next(inscripcionesActualizados);
      },
      complete: () => {},
      error: () => {},
    });

    return this.inscripcion$.asObservable();
  }

  eliminarInscripcion(id: number): Observable<unknown> {
    return this.httpClient.delete(
      `${enviroment.apiBaseUrl}/inscripciones/${id}`
    );
  }
}
