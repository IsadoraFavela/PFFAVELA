import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { InscripcionesActions } from '../../store/inscripciones.actions';
import { CrearInscripcionPayload } from '../../models';

@Component({
  selector: 'app-abm-inscripciones',
  templateUrl: './abm-inscripciones.component.html',
  styleUrls: ['./abm-inscripciones.component.scss'],
})
export class AbmInscripcionesComponent {
  nombreControl = new FormControl('', [Validators.required]);
  cursoControl = new FormControl('', [Validators.required]);
  fechaInicioControl = new FormControl('', [Validators.required]);
  fechaFinControl = new FormControl('', [Validators.required]);

  inscripcionForm = new FormGroup({
    estudiante: this.nombreControl,
    nombre_curso: this.cursoControl,
    fecha_inicio: this.fechaInicioControl,
    fecha_fin: this.fechaInicioControl,
  });
  constructor(
    private dialogRef: MatDialogRef<AbmInscripcionesComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private store: Store
  ) {
    if (data) {
      const cursoParaEditar = data.inscripcion;
      this.nombreControl.setValue(cursoParaEditar.estudiante);
      this.cursoControl.setValue(cursoParaEditar.nombre_curso);
      this.fechaInicioControl.setValue(cursoParaEditar.fecha_inicio);
      this.fechaFinControl.setValue(cursoParaEditar.fecha_fin);
    }
  }
  guardar(): void {
    this.store.dispatch(
      InscripcionesActions.createInscripcion({
        data: this.inscripcionForm.value as CrearInscripcionPayload,
      })
    );

    this.dialogRef.close();
  }
}
