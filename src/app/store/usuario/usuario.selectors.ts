import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, authfeatureKey } from './usuario.reducer';

export const selectAuthState = createFeatureSelector<AuthState>(authfeatureKey);

export const selectAuthUser = createSelector(
  selectAuthState,
  (state) => state.authUser
);
