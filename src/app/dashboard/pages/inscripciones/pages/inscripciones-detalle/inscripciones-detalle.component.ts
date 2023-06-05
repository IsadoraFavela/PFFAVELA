import { Component, OnDestroy } from '@angular/core';
import { Inscripcion } from '../../models';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { InscripcionesService } from '../../services/inscripciones.service';

@Component({
  selector: 'app-inscripciones-detalle',
  templateUrl: './inscripciones-detalle.component.html',
  styleUrls: ['./inscripciones-detalle.component.scss'],
})
export class InscripcionesDetalleComponent implements OnDestroy {
  inscripcion: Inscripcion | undefined;

  private destroyed$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private inscripcionesService: InscripcionesService
  ) {
    this.inscripcionesService
      .getInscripcionById(parseInt(this.activatedRoute.snapshot.params['id']))
      .pipe(takeUntil(this.destroyed$))
      .subscribe((inscripcion) => (this.inscripcion = inscripcion));
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
