import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CrearInscripcionPayload, Inscripcion } from '../models';

export const InscripcionesActions = createActionGroup({
  source: 'Inscripciones',
  events: {
    'Load Inscripciones': emptyProps(),
    'Load Inscripciones Success': props<{ data: Inscripcion[] }>(),
    'Load Inscripciones Failure': props<{ error: unknown }>(),
    'Delete Inscripcion': props<{ id: number }>(),
    'Delete Inscripcion Success': props<{ data: number }>(),
    'Delete Inscripcion Failure': props<{ error: unknown }>(),
    'Create Inscripcion': props<{ data: CrearInscripcionPayload }>(),
    'Create Inscripcion Success': props<{ data: Inscripcion }>(),
    'Create Inscripcion Failure': props<{ error: unknown }>(),
  },
});
