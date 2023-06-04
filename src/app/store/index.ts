// import { UsuarioState, usuarioReducer } from './usuario/usuario.reducer';
// import { ActionReducerMap } from '@ngrx/store';

// export interface AppState {
//   usuario: UsuarioState;
// }
// export const actionReducerMap: ActionReducerMap<AppState> = {
//   usuario: usuarioReducer,
// };

import { ActionReducerMap } from '@ngrx/store';

import { authReducer, authfeatureKey } from './usuario/usuario.reducer';

export interface AppState {
  [authfeatureKey]: any;
}
export const actionReducerMap: ActionReducerMap<AppState> = {
  [authfeatureKey]: authReducer,
};
