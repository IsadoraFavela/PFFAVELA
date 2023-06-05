import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-abm-usuarios',
  templateUrl: './abm-usuarios.component.html',
  styleUrls: ['./abm-usuarios.component.scss'],
})
export class AbmUsuariosComponent {
  nombreControl = new FormControl('', [Validators.required]);
  apellidoControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [Validators.required]);
  rolControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required]);

  userForm = new FormGroup({
    nombre: this.nombreControl,
    apellido: this.apellidoControl,
    email: this.emailControl,
    role: this.rolControl,
    password: this.passwordControl,
  });
  constructor(
    private dialogRef: MatDialogRef<AbmUsuariosComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    if (data) {
      const cursoParaEditar = data.curso;
      this.nombreControl.setValue(cursoParaEditar.nombre);
      this.apellidoControl.setValue(cursoParaEditar.apellido);
      this.emailControl.setValue(cursoParaEditar.email);
      this.rolControl.setValue(cursoParaEditar.role);
      this.passwordControl.setValue(cursoParaEditar.password);
    }
  }

  guardar(): void {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}
