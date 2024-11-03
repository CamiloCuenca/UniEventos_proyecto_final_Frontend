import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; // Asegúrate de que la ruta es correcta
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true, // Hacemos el componente standalone
  templateUrl: './registro.component.html',
  imports: [ReactiveFormsModule,CommonModule] // Importamos ReactiveFormsModule aquí
})
export class RegistroComponent {
  registroForm: FormGroup;
  passwordVisible = false;
  confirmaPasswordVisible = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registroForm = this.fb.group({
      idNumber: ['', [Validators.required, Validators.maxLength(10)]],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(10)]],
      address: ['', [Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*[0-9])(?=.*[a-z]).{8,}$/)
      ]],
      confirmaPassword: ['', [Validators.required]] // Agregamos el campo para confirmar la contraseña
    }, { validators: this.passwordsMatchValidator }); // Agregamos la validación personalizada
  }

  // Valida que las contraseñas coincidan
  passwordsMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmaPassword = formGroup.get('confirmaPassword')?.value;
    return password === confirmaPassword ? null : { passwordsMismatch: true };
  }

  // Método para manejar el registro
  public registrar() {
    if (this.registroForm.valid) {
      this.authService.crearCuenta(this.registroForm.value).subscribe(
        response => {
          console.log('Cuenta creada con éxito', response);
        },
        (error: HttpErrorResponse) => {
          console.error('Error al crear la cuenta', error);
        }
      );
    } else {
      console.error('Formulario inválido', this.registroForm.errors);
    }
  }

  // Método para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  // Método para alternar la visibilidad de la contraseña de confirmación
  toggleConfirmaPasswordVisibility() {
    this.confirmaPasswordVisible = !this.confirmaPasswordVisible;
  }
}
