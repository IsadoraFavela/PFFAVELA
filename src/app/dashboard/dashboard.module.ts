import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AlumnosModule } from './pages/alumnos/alumnos.module';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { CursosModule } from './pages/cursos/cursos.module';
import { InscripcionesModule } from './pages/inscripciones/inscripciones.module';
import { AlumnosComponent } from './pages/alumnos/alumnos.component';
import { AlumnoDetalleComponent } from './pages/alumnos/pages/alumno-detalle/alumno-detalle.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { CursoDetalleComponent } from './pages/cursos/pages/curso-detalle/curso-detalle.component';
import { InscripcionesComponent } from './pages/inscripciones/inscripciones.component';
import { InscripcionesDetalleComponent } from './pages/inscripciones/pages/inscripciones-detalle/inscripciones-detalle.component';

@NgModule({
  declarations: [
    
    DashboardComponent,
  
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    //AlumnosModule,
    CursosModule,
    InscripcionesModule,
    RouterModule.forChild([
      {
        path: 'estudiantes',
        loadChildren: () => import('./pages/alumnos/alumnos.module').then((m) => m.AlumnosModule),
      },
      {
        path: 'cursos',
        children: [
          {
            
            path: '',
            component: CursosComponent,
          },
          {
            
            path: ':id',
            component: CursoDetalleComponent
          }
        ]
       },
       {
        path: 'inscripciones',
        children: [
          {
            
            path: '',
            component: InscripcionesComponent,
          },
          {
            
            path: ':id',
            component: InscripcionesDetalleComponent,
          }
        ]
       },
    ])
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
