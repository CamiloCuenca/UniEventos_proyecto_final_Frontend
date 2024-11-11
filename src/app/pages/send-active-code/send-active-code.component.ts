import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-send-active-code',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './send-active-code.component.html',
  styleUrls: ['./send-active-code.component.css'] // <-- Cambiado a styleUrls
})
export class SendActiveCodeComponent {

  sendActiveCode: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.sendActiveCode = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  private showAlert(message: string, type: 'success' | 'danger'): void {
    Swal.fire({
      icon: type === 'success' ? 'success' : 'error',
      title: type === 'success' ? 'Éxito' : 'Error',
      text: message,
      confirmButtonText: 'Aceptar'
    });
  }

  cancel() {
    this.router.navigate(['/login']); // Reemplaza '/login' con la ruta de tu componente de inicio de sesión
  }

  onSubmit() {
    if (this.sendActiveCode.valid) {
      const email = this.sendActiveCode.get('email')?.value;
      this.authService.sendActiveCode(email).subscribe(
        () => {
          this.showAlert('El envío de código se ha realizado correctamente.', 'success');
          this.router.navigate(['/active-account']); // Redirige al componente de verificación si tiene éxito
        },
        (error) => {
          this.showAlert('Error al enviar el código, por favor verifique su correo.', 'danger');
        }
      );
    }
  }
}