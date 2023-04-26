import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Inscripcion } from '../inscripciones/models';
import { InscripcionesService } from '../inscripciones/services/inscripciones.service';
import { AbmInscripcionesComponent } from './components/abm-inscripciones/abm-inscripciones.component';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss']
})
export class InscripcionesComponent implements OnInit {
  dataSource = new MatTableDataSource();

  displayedColumns = [
    'id',
    'nombre',
    'nombre_curso',
    'fecha_inicio',
    'fecha_fin',
    'detalle',
    'editar',
    'eliminar',
  ];
  constructor(
    private inscripcionesService: InscripcionesService,
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.inscripcionesService.obtenerCursos().subscribe({ 
    
      next: (inscripcion) => {
        console.log(inscripcion);
        
        this.dataSource.data = inscripcion;
      },
    });
  }

  crearInscripcion(): void {
    const dialog = this.dialog.open(AbmInscripcionesComponent);
    dialog.afterClosed()
      .subscribe((formValue) => {
        if (formValue) {
          this.inscripcionesService.crearInscripcion(formValue)
        }
      });
  }

  editarInscripcion(inscripcion: Inscripcion): void {
    const dialog = this.dialog.open(AbmInscripcionesComponent, {
      data: {
        inscripcion,
      }
    })

    dialog.afterClosed()
      .subscribe((formValue) => {
        console.log(inscripcion.id);
        console.log(formValue);

        
        if (formValue) {
          this.inscripcionesService.editarInscripcion(inscripcion.id, formValue);
        }
      })
  }

  eliminarInscripcion(Inscripcion: Inscripcion): void {
    if (confirm('Está seguro?')) {
      this.inscripcionesService.eliminarCurso(Inscripcion.id);
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
