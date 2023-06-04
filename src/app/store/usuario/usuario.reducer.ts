import { createReducer, on } from '@ngrx/store';
import { Usuario } from 'src/app/core/models';
import {
  QuitarUsuarioAutenticado,
  UsuarioAutenticado,
} from './usuario.actions';

export const authfeatureKey = 'auth';

export interface AuthState {
  authUser: Usuario | null;
}

const initialState: AuthState = {
  authUser: null,
};
export const authReducer = createReducer(
  initialState,
  on(UsuarioAutenticado, (currentState, { usuarios }) => {
    return {
      authUser: usuarios,
    };
  }),
  on(QuitarUsuarioAutenticado, (currentState) => {
    return {
      authUser: null,
    };
  })
);
// import { createReducer, on } from '@ngrx/store';
// import { Incrementar } from './usuario.actions';

// export interface UsuarioState {
//   estudiante: string;
//   nombre_curso: string;
// }

// const initialState: UsuarioState = {
//   estudiante: 'Sara',
//   nombre_curso: 'Angular Js',
// }
// export const authfeatureKey = createReducer<UsuarioState>

// export const usuarioReducer = createReducer<UsuarioState>(
//   initialState,
//   on(Incrementar, (currentState) => {
//     return {
//       estudiante: currentState.estudiante + 1,
//       nombre_curso: currentState.nombre_curso + 1,
//     };
//   })
// );
