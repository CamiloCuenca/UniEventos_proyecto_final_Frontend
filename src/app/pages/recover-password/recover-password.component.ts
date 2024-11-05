import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent {
 
    recoverPassword: FormGroup;
    errorMessage: string = '';
  
    constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router
    ) {
      this.recoverPassword = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
      });
    }


    cancel() {
      this.router.navigate(['/login']); // Reemplaza '/login' con la ruta de tu componente de inicio de sesión
    }
  
    onSubmit() {
      if (this.recoverPassword.valid) {
        const email = this.recoverPassword.get('email')?.value;
        this.authService.recoverPassword(email).subscribe(
          () => {
            this.router.navigate(['/verify-code']); // Redirige al componente de verificación si tiene éxito
          },
          (error) => {
            this.errorMessage = 'Error al recuperar la contraseña. Inténtelo de nuevo.';
          }
        );
      }
    }
  }