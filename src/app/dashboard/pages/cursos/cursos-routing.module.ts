import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CursosComponent } from './cursos.component';
import { CursoDetalleComponent } from './pages/curso-detalle/curso-detalle.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
      path:'',
      component: CursosComponent
      },
      {
        path: ':id',
        component: CursoDetalleComponent
      }

    ])
  ],
  exports: [
    RouterModule,
  ]
})
export class CursosRoutingModule { }
