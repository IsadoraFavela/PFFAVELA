import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { Inscripcion, CrearInscripcionPayload } from '../models';



const INS_MOCKS: Inscripcion[] = [
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

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {
  private inscripcion$ = new BehaviorSubject<Inscripcion[]>(
    []
  );

  constructor() { }
  obtenerCursos(): Observable<Inscripcion[]> {
    this.inscripcion$.next(INS_MOCKS);
    return this.inscripcion$.asObservable();
  }

  getCursoById(inscripcionId: number): Observable<Inscripcion | undefined> {
    return this.inscripcion$.asObservable()
      .pipe(
        map((Inscripcion) => Inscripcion.find((i) => i.id === inscripcionId))
      )
  }

  crearInscripcion(payload: CrearInscripcionPayload): Observable<Inscripcion[]> {
    this.inscripcion$
      .pipe(
        take(1)
      )
      .subscribe({
        next: (inscripcion) => {
          this.inscripcion$.next([
            ...inscripcion,
            {
              id: inscripcion.length + 1,
              ...payload,
            },
          ]);
        },
        complete: () => {},
        error: () => {}
      });

      // then => next
      // catch => error
      // finally => complete

    return this.inscripcion$.asObservable();
  }

  editarInscripcion(inscripcionId: number, actualizacion: Partial<Inscripcion>): Observable<Inscripcion[]> {
 
    
    this.inscripcion$
      .pipe(
        take(1),
      )
      .subscribe({
      next: (inscripcion) => {

      const inscripcionesActualizados = inscripcion.map((inscripcion) => {
      if (inscripcion.id === inscripcionId) {
      return {
      ...inscripcion,
      ...actualizacion,
      }
      } else {
      return inscripcion;
      }
      })

      this.inscripcion$.next(inscripcionesActualizados);
      },
      complete: () => {},
      error: () => {}
     });

    return this.inscripcion$.asObservable();
  }


  eliminarCurso(inscripcionId: number): Observable<Inscripcion[]> {
    this.inscripcion$
    .pipe(
      take(1)
    )
    .subscribe({
      next: (inscripcion) => {
        const inscripcionActualizados = inscripcion.filter((inscripcion) => inscripcion.id !== inscripcionId)
        this.inscripcion$.next(inscripcionActualizados);
      },
      complete: () => {},
      error: () => {}
    });

    return this.inscripcion$.asObservable();
  }

}
