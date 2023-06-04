import { NgModule, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { UsuariosComponent } from './usuarios.component';
import { UsuariosDetalleComponent } from './pages/usuarios-detalle/usuarios-detalle.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { AbmUsuariosComponent } from './components/abm-usuarios/abm-usuarios.component';

@NgModule({
  declarations: [
    UsuariosComponent,
    AbmUsuariosComponent,
    UsuariosDetalleComponent,
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
  ],
  exports: [UsuariosComponent, UsuariosDetalleComponent, UsuariosRoutingModule],
})
export class UsuariosModule {}
