import { createFeature, createReducer, on } from '@ngrx/store';
import { InscripcionesActions } from './inscripciones.actions';
import { Inscripcion } from '../models';
import { state } from '@angular/animations';

export const inscripcionesFeatureKey = 'inscripciones';

export interface State {
  cargando: boolean;
  listadeInscripciones: Inscripcion[];
  error: unknown;
}

export const initialState: State = {
  cargando: false,
  listadeInscripciones: [],
  error: null,
};

export const reducer = createReducer<State>(
  initialState,

  on(InscripcionesActions.loadInscripciones, (state) => {
    return {
      ...state,
      cargando: true,
    };
  }),

  on(InscripcionesActions.loadInscripcionesSuccess, (state, action) => {
    return {
      ...state,
      cargando: false,
      listadeInscripciones: action.data,
    };
  }),

  on(InscripcionesActions.loadInscripcionesFailure, (state, action) => {
    return {
      ...state,
      cargando: false,
      error: action.error,
    };
  }),

  on(InscripcionesActions.deleteInscripcion, (state) => {
    return {
      ...state,
      cargando: true,
    };
  }),

  on(InscripcionesActions.deleteInscripcionSuccess, (state, action) => {
    return {
      ...state,
      listadeInscripciones: state.listadeInscripciones.filter(
        (i) => i.id !== action.data
      ),
      cargando: false,
    };
  }),

  on(InscripcionesActions.deleteInscripcionFailure, (state, action) => {
    return {
      ...state,
      cargando: false,
      error: action.error,
    };
  }),

  on(InscripcionesActions.createInscripcion, (state) => {
    return {
      ...state,
      loading: true,
    };
  }),

  on(InscripcionesActions.createInscripcionSuccess, (state, action) => {
    const newInscripcion = action.data;
    return {
      ...state,
      loading: false,
      listadeInscripciones: [...state.listadeInscripciones, newInscripcion],
    };
  }),

  on(InscripcionesActions.createInscripcionFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  })
);

export const inscripcionesFeature = createFeature({
  name: inscripcionesFeatureKey,
  reducer,
});
