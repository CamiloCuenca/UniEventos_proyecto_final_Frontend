import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verify-code',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.css'
})
export class VerifyCodeComponent {
  recuperacionForm: FormGroup;
  codigoValido: boolean = false;
  codigoInvalid: boolean = false;

  constructor(private fb: FormBuilder) {
    this.recuperacionForm = this.fb.group({
      codigo: ['', Validators.required],
      nuevaClave: ['', [Validators.required, Validators.minLength(8)]],
      confirmarClave: ['', Validators.required]
    }, { validator: this.passwordsMatchValidator });
  }

  // Función que valida el código de recuperación
  validarCodigo() {
    const codigo = this.recuperacionForm.get('codigo')?.value;

    if (this.esCodigoValido(codigo)) {
      this.codigoValido = true;
      this.codigoInvalid = false;
    } else {
      this.codigoInvalid = true;
      this.codigoValido = false;
      this.recuperacionForm.get('nuevaClave')?.reset();
      this.recuperacionForm.get('confirmarClave')?.reset();
    }
  }

  // Simulación de verificación del código (puedes agregar lógica real aquí)
  esCodigoValido(codigo: string): boolean {
    // Lógica para validar el código; por ahora, se considera válido si es "123456"
    return codigo === '123456';
  }

  // Validador personalizado para verificar que ambas contraseñas coinciden
  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('nuevaClave')?.value;
    const confirmPassword = form.get('confirmarClave')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

}
