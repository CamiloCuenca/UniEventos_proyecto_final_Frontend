import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  standalone: true,
  templateUrl: './registro.component.html',
  imports: [ReactiveFormsModule, CommonModule],
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  registroForm: FormGroup;
  registroExitoso: boolean = false;
  passwordVisible = false;
  confirmaPasswordVisible = false;
  mensajeError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registroForm = this.fb.group(
      {
        idNumber: ['', [Validators.required, Validators.maxLength(10)]],
        name: ['', [Validators.required, Validators.maxLength(100)]],
        phoneNumber: ['', [Validators.required, Validators.maxLength(10)]],
        address: ['', [Validators.maxLength(100)]],
        email: [
          '',
          [Validators.required, Validators.email, Validators.maxLength(50)],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*[0-9])(?=.*[a-z]).{8,}$/
            ),
          ],
        ],
        confirmaPassword: ['', [Validators.required]],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  passwordsMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmaPassword = formGroup.get('confirmaPassword')?.value;
    return password === confirmaPassword ? null : { passwordsMismatch: true };
  }

  public registrar() {
    if (this.registroForm.valid) {
      this.authService.crearCuenta(this.registroForm.value).subscribe(
        (response) => {
          console.log('Cuenta creada con éxito', response);
          this.mensajeError = null;
          this.registroForm.reset();
          this.registroExitoso = true;
          this.router.navigate(['/active-account']);

          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'La cuenta ha sido creada correctamente.',
            confirmButtonText: 'Aceptar',
          });
        },
        (error: HttpErrorResponse) => {
          console.error('Error al crear la cuenta', error);
          this.mensajeError = error.message;

          Swal.fire({
            icon: 'error',
            title: 'Error en el registro',
            text: `Ocurrió un error al crear la cuenta: ${error.message}`,
            confirmButtonText: 'Aceptar',
          });
        }
      );
    } else {
      this.mensajeError = 'Por favor, complete el formulario correctamente.';

      Swal.fire({
        icon: 'warning',
        title: 'Formulario no válido',
        text: 'Por favor, complete el formulario correctamente antes de enviarlo.',
        confirmButtonText: 'Aceptar',
      });
    }
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleConfirmaPasswordVisibility() {
    this.confirmaPasswordVisible = !this.confirmaPasswordVisible;
  }
}
