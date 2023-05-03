import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InscripcionesComponent } from './inscripciones.component';
import { InscripcionesDetalleComponent } from './pages/inscripciones-detalle/inscripciones-detalle.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
      path:'',
      component: InscripcionesComponent
      },
      {
        path: ':id',
        component: InscripcionesDetalleComponent
      }

    ])
  ],
  exports: [
    RouterModule
  ]
})
export class InscripcionesRoutingModule { }
