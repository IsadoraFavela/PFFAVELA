import { createAction, props } from '@ngrx/store';
import { Usuario } from 'src/app/core/models';

export const UsuarioAutenticado = createAction(
  '[usuario] Establecer usuario',
  props<{ usuarios: Usuario }>()
);

export const QuitarUsuarioAutenticado = createAction(
  '[usuario] Quitar Usuario'
);
