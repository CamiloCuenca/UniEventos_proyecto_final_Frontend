import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RecoverPasswordDTO } from '../../interface/RecoverPasswordDTO';
import { MessageDTO } from '../../interface/MessageDTO';


@Component({
  selector: 'app-verify-code',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.css',
})
export class VerifyCodeComponent implements OnInit {
  recoverPasswordForm: FormGroup;  // Declaramos la propiedad
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Inicializamos la propiedad en el constructor
    this.recoverPasswordForm = this.formBuilder.group({
      code: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(20)]],
      confirmationPassword: ['', [Validators.required]]
    });
  }

  cancel() {
    this.router.navigate(['/login']); // Reemplaza '/login' con la ruta de tu componente de inicio de sesión
  }

  ngOnInit(): void {
    // Aquí no es necesario inicializar recoverPasswordForm
  }

  onSubmit() {
    if (this.recoverPasswordForm.invalid) {
      return;
    }

    const formValues: RecoverPasswordDTO = this.recoverPasswordForm.value;
    this.authService.changePassword(formValues).subscribe({
      next: (response: MessageDTO<string>) => {
        this.successMessage = response.respuesta;  // Mensaje de éxito
        this.errorMessage = '';
        this.router.navigate(['/login']); // Redirige al componente de verificación si tiene éxito
      },
      error: (error) => {
        this.successMessage = '';
        this.errorMessage = error.error?.respuesta || 'Error al cambiar la contraseña';
      }
    });
  }
  
}