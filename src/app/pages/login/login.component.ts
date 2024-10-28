import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginDTO } from '../../interface/login.dto';
import { TokenDTO } from '../../interface/token.dto';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = ''; // Declarar la variable errorMessage

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData: LoginDTO = this.loginForm.value;

      this.authService.iniciarSesion(loginData).subscribe({
        next: (response: { error: boolean; respuesta: TokenDTO }) => {
          if (!response.error && response.respuesta && response.respuesta.token) {
            localStorage.setItem('token', response.respuesta.token);
            this.router.navigate(['/dashboard']);
          } else {
            console.error('Error en la respuesta del servidor:', response);
            this.errorMessage = 'Error en la respuesta del servidor';
          }
        },
        error: (err) => {
          console.error('Error al iniciar sesión', err);
          this.errorMessage = 'Error al iniciar sesión. Por favor, verifica tus credenciales.';
        },
      });
    }
  }
}
