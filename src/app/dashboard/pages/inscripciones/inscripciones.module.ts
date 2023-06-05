import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesComponent } from './inscripciones.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { AbmInscripcionesComponent } from './components/abm-inscripciones/abm-inscripciones.component';
import { InscripcionesDetalleComponent } from './pages/inscripciones-detalle/inscripciones-detalle.component';
import { InscripcionesRoutingModule } from './inscripciones-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { InscripcionesEffects } from './store/inscripciones.effects';
import { StoreModule } from '@ngrx/store';
import { inscripcionesFeature } from './store/inscripciones.reducer';

@NgModule({
  declarations: [
    InscripcionesComponent,
    AbmInscripcionesComponent,
    InscripcionesDetalleComponent,
  ],
  imports: [
    CommonModule,
    PipesModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    StoreModule.forFeature(inscripcionesFeature),
    EffectsModule.forFeature([InscripcionesEffects]),
  ],
  exports: [
    InscripcionesComponent,
    InscripcionesDetalleComponent,
    InscripcionesRoutingModule,
  ],
})
export class InscripcionesModule {}
