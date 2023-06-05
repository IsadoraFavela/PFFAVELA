import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, tap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { InscripcionesActions } from './inscripciones.actions';
import { InscripcionesService } from '../services/inscripciones.service';

@Injectable()
export class InscripcionesEffects {
  loadInscripciones$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionesActions.loadInscripciones),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.inscripcionesService.obtenerInscripciones().pipe(
          map((data) =>
            InscripcionesActions.loadInscripcionesSuccess({ data })
          ),
          catchError((error) =>
            of(InscripcionesActions.loadInscripcionesFailure({ error }))
          )
        )
      )
    );
  });

  deleteInscripcion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionesActions.deleteInscripcion),
      concatMap((action) =>
        this.inscripcionesService.eliminarInscripcion(action.id).pipe(
          map((data) =>
            InscripcionesActions.deleteInscripcionSuccess({ data: action.id })
          ),
          catchError((error) =>
            of(InscripcionesActions.deleteInscripcionFailure({ error }))
          )
        )
      )
    );
  });

  createInscripcion$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionesActions.createInscripcion),
      concatMap((action) =>
        this.inscripcionesService.crearInscripcion(action.data).pipe(
          map((res) =>
            InscripcionesActions.createInscripcionSuccess({ data: res })
          ),
          catchError((error) =>
            of(InscripcionesActions.createInscripcionFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private inscripcionesService: InscripcionesService
  ) {}
}
