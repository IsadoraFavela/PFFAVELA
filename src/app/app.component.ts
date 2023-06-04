import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store';
// import { Decrementar, Incrementar } from './store/usuario/usuario.actions';
import { Observable, map } from 'rxjs';
import { state } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'holi';

  // constructor(private store: Store<AppState>) {}
  // incrementar(): void {
  //   this.store.dispatch(Incrementar());
  // }

  // decrementar(): void {
  //   this.store.dispatch(Decrementar());
  // }
}
