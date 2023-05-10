import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsuariosComponent } from './usuarios.component';
import { UsuariosDetalleComponent } from './pages/usuarios-detalle/usuarios-detalle.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
      path:'',
      component: UsuariosComponent
      },
      {
        path: ':id',
        component: UsuariosDetalleComponent
      }

    ])
  ],
  exports: [
    RouterModule
  ]
})
export class UsuariosRoutingModule { }
