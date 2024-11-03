import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoginDTO } from '../../interface/login.dto';
import { TokenDTO } from '../../interface/token.dto';

@Component({
  selector: 'app-login', // Selector que permite usar el componente en el HTML mediante <app-login></app-login>
  standalone: true, // Permite que el componente sea independiente, sin necesidad de ser declarado en un módulo
  imports: [ReactiveFormsModule], // Importa ReactiveFormsModule para manejar el formulario reactivo
  templateUrl: './login.component.html', // Ruta al archivo HTML de la plantilla
  styleUrls: ['./login.component.css'], // Ruta al archivo CSS del componente
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = ''; // Declarar la variable errorMessage

  // Constructor para inyectar dependencias
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Inicialización del formulario reactivo usando FormBuilder
    this.loginForm = this.fb.group({
      // Definición de los campos del formulario y sus validaciones
      email: ['', [Validators.required, Validators.email]], // Campo "email", obligatorio y con formato de correo
      password: ['', [Validators.required]], // Campo "password", obligatorio sin validaciones adicionales
    });
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit() {
    // Verifica si el formulario es válido antes de procesar el envío
    if (this.loginForm.valid) {
      // Crea un objeto de tipo LoginDTO con los valores actuales del formulario
      const loginData: LoginDTO = this.loginForm.value;

      // Llama al método iniciarSesion en el servicio authService, enviando loginData como parámetro
      this.authService.iniciarSesion(loginData).subscribe({
        // Callback para manejar la respuesta exitosa del servidor
        next: (response: { error: boolean; respuesta: TokenDTO }) => {
          // Verifica si no hay error en la respuesta y si se ha recibido un token válido
          if (!response.error && response.respuesta && response.respuesta.token) {
            localStorage.setItem('token', response.respuesta.token);
            this.router.navigate(['/dashboard']);
          } else {
            // Manejo de errores cuando la respuesta del servidor es incorrecta
            console.error('Error en la respuesta del servidor:', response); // Muestra un mensaje en la consola para depuración
            this.errorMessage = 'Error en la respuesta del servidor'; // Establece un mensaje de error para mostrar al usuario
          }
        },
        // Callback para manejar errores en la comunicación con el servidor
        error: (err) => {
          console.error('Error al iniciar sesión', err); // Muestra el error en la consola para depuración
          // Asigna un mensaje de error al errorMessage para informar al usuario del fallo
          this.errorMessage = 'Error al iniciar sesión. Por favor, verifica tus credenciales.';
        },
      });
    }
  }
}