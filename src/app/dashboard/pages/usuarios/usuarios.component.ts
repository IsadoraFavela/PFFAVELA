import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AbmUsuariosComponent } from './components/abm-usuarios/abm-usuarios.component';
import { Usuario } from 'src/app/core/models';
import { UsuariosService } from './services/usuarios.service';
// import {
//   Decrementar,
//   Incrementar,
// } from 'src/app/store/usuario/usuario.actions';
import { AppState } from 'src/app/store';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent {
  dataSource = new MatTableDataSource();

  displayedColumns = [
    'id',
    'nombre',
    'apellido',
    'email',
    'role',
    'detalle',
    'editar',
    'eliminar',
  ];
  // public valorContador: Observable<string>;
  constructor(
    private usuariosService: UsuariosService,
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute // private store: Store<AppState>
  ) {
    //   this.valorContador = this.store
    //     .select('usuario')
    //     .pipe(map((state) => state.estudiante));
  }

  ngOnInit(): void {
    this.usuariosService.obtenerUsuarios().subscribe({
      next: (usuario) => {
        console.log(usuario);

        this.dataSource.data = usuario;
      },
    });
  }

  crearUsuarios(): void {
    const dialog = this.dialog.open(AbmUsuariosComponent);
    dialog.afterClosed().subscribe((formValue) => {
      if (formValue) {
        this.usuariosService.crearUsuario(formValue);
      }
    });
  }

  editarUsuarios(Usuarios: Usuario): void {
    console.log(Usuarios);

    const dialog = this.dialog.open(AbmUsuariosComponent, {
      data: {
        Usuarios,
      },
    });

    dialog.afterClosed().subscribe((formValue) => {
      console.log(Usuarios.id);
      console.log(formValue);

      if (formValue) {
        this.usuariosService.editarUsuario(Usuarios.id, formValue);
      }
    });
  }

  eliminarUsuarios(Usuarios: Usuario): void {
    if (confirm('Está seguro?')) {
      this.usuariosService.eliminarUsuario(Usuarios.id);
    }
  }

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  irAlDetalle(usuariosId: number): void {
    this.router.navigate([usuariosId], {
      relativeTo: this.activatedRoute,
    });
  }
  //   incrementar(): void {
  //     this.store.dispatch(Incrementar());
  //   }

  //   decrementar(): void {
  //     this.store.dispatch(Decrementar());
  //   }
}
