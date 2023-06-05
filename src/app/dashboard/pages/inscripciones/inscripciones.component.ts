import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Inscripcion } from '../inscripciones/models';
import { InscripcionesService } from '../inscripciones/services/inscripciones.service';
import { AbmInscripcionesComponent } from './components/abm-inscripciones/abm-inscripciones.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { InscripcionesActions } from './store/inscripciones.actions';
import { Observable } from 'rxjs';
import { selectInscripcionesState } from './store/inscripciones.selectors';
import { State } from './store/inscripciones.reducer';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss'],
})
export class InscripcionesComponent implements OnInit {
  state$: Observable<State>;
  dataSource = new MatTableDataSource<Inscripcion>();

  displayedColumns = [
    'id',
    'nombre',
    'nombre_curso',
    'fecha_inicio',
    'fecha_fin',
    'detalle',

    'eliminar',
  ];

  constructor(
    private inscripcionesService: InscripcionesService,
    private store: Store,
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.state$ = this.store.select(selectInscripcionesState);
  }

  ngOnInit(): void {
    this.store.dispatch(InscripcionesActions.loadInscripciones());
    this.state$.subscribe((state) => {
      this.dataSource.data = state.listadeInscripciones;
    });
  }

  crearInscripcion(): void {
    const dialog = this.dialog.open(AbmInscripcionesComponent);
    dialog.afterClosed().subscribe((formValue) => {
      if (formValue) {
        this.inscripcionesService.crearInscripcion(formValue);
      }
    });
  }

  editarInscripcion(inscripcion: Inscripcion): void {
    const dialog = this.dialog.open(AbmInscripcionesComponent, {
      data: {
        inscripcion,
      },
    });

    dialog.afterClosed().subscribe((formValue) => {
      if (formValue) {
        this.inscripcionesService.editarInscripcion(inscripcion.id, formValue);
      }
    });
  }

  eliminarInscripcion(id: number): void {
    if (confirm('Está seguro?')) {
      this.store.dispatch(InscripcionesActions.deleteInscripcion({ id }));
    }
  }

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  irAlDetalle(inscripcionesId: number): void {
    this.router.navigate([inscripcionesId], {
      relativeTo: this.activatedRoute,
    });
  }
}
