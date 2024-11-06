import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../services/token.service';
import { RecoverPasswordDTO } from '../../interface/RecoverPasswordDTO';
import { CodeRecoverDTO } from '../../interface/CodeRecoverDTO';
import { MessageDTO } from '../../interface/MessageDTO';

@Component({
  selector: 'app-verify-code',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.css',
})
export class VerifyCodeComponent {
  // Formulario para el código de recuperación
  recuperacionFormCode: FormGroup;
  // Formulario para la nueva contraseña
  recuperacionFormPassword: FormGroup;

  // Estado de la validación del código
  codigoValido = false;
  codigoInvalid = false;

  // Estado de carga para el proceso de recuperación
  loading = false;
  
  // Mensajes de error y éxito
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService
  ) {
    // Inicialización del formulario para el código
    this.recuperacionFormCode = this.fb.group({
      code: ['', Validators.required], // Código de recuperación
    });

    // Inicialización del formulario para la nueva contraseña
    this.recuperacionFormPassword = this.fb.group({
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(20),
        ],
      ],
      confirmationPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(7),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  onSubmitCode(): void {
    if (this.recuperacionFormCode.invalid) {
      console.log("Formulario inválido");
      return;
    }
  
    this.loading = true;
    const formValues = this.recuperacionFormCode.value;
    const codeDTO: CodeRecoverDTO = { code: formValues.code };
  
    this.authService.validarCodigo(codeDTO).subscribe(
      (response) => {
        console.log("Código válido");
        this.codigoValido = true;
        this.codigoInvalid = false;
        this.loading = false;
      },
      (error) => {
        console.log("Código inválido");
        this.codigoInvalid = true;
        this.codigoValido = false;
        this.loading = false;
        alert('Código de recuperación no válido o ha expirado');
      }
    );
  }

  // Método para cambiar la contraseña
  onSubmitPassword(): void {
    if (this.recuperacionFormPassword.invalid) {
      return;
    }

    const formValues = this.recuperacionFormPassword.value;
    if (formValues.newPassword !== formValues.confirmationPassword) {
      console.log("Las contraseñas no coinciden");
      this.codigoInvalid = true;
      alert('Las contraseñas no coinciden');
      return;
    }

    const recoverPasswordDTO: RecoverPasswordDTO = {
      newPassword: formValues.newPassword,
      confirmationPassword: formValues.confirmationPassword,
    };

    const userId = this.tokenService.getIDCuenta();
    this.loading = true;

    this.authService.cambiarContrasena(recoverPasswordDTO, userId).subscribe(
      (response: MessageDTO<string>) => {
        console.log("Respuesta:", response);
        this.loading = false;
        if (!response.error) {
          this.successMessage = 'Contraseña actualizada correctamente';
        } else {
          this.errorMessage = 'Ocurrió un error al actualizar la contraseña: ' + response.errorResponse?.message;
        }
      },
      (error) => {
        console.error('Error al actualizar la contraseña', error);
        this.loading = false;
        this.errorMessage = 'Error al actualizar la contraseña';
      }
    );
  }
}
