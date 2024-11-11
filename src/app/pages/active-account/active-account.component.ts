import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MessageDTO } from '../../interface/MessageDTO';
import { ActiveAccountDTO } from '../../interface/ActiveAccountDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-active-account',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './active-account.component.html',
  styleUrls: ['./active-account.component.css'],
})
export class ActiveAccountComponent implements OnInit {
  activeAccountForm: FormGroup;  // Declaramos la propiedad


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Inicializamos la propiedad en el constructor
    this.activeAccountForm = this.formBuilder.group({
      code: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  cancel() {
    this.router.navigate(['/registro']); // Reemplaza '/login' con la ruta de tu componente de inicio de sesión
  }

  ngOnInit(): void {}

  private showAlert(message: string, type: 'success' | 'danger'): void {
    if (type === 'success') {
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: message,
        confirmButtonText: 'Aceptar'
      });
    } else if (type === 'danger') {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        confirmButtonText: 'Aceptar'
      });
    }
  }

  onSubmit() {
    if (this.activeAccountForm.invalid) {
      return;
    }

    const formValues: ActiveAccountDTO = this.activeAccountForm.value;
    this.authService.activateAccount(formValues).subscribe({
      next: (response: MessageDTO<string>) => {
        this.showAlert('Su cuenta ha sido activada correctamente', 'success');
      
        // Redirigir o realizar alguna acción adicional si es necesario
        this.router.navigate(['/login']); // Reemplaza con la ruta a donde desees redirigir después de la activación
      },
      error: (error) => {
        this.showAlert('Erro al activar su cuenta, verifique el codigo de validacion', 'danger');
      }
    });
  }
    
}