import { Component } from '@angular/core';
import { TokenService } from '../../services/token.service';
import { AuthService } from '../../services/auth.service';
import { MessageDTO } from '../../interface/MessageDTO';
import { PasswordDTO } from '../../interface/PasswordDTO';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent {
  deleteForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.deleteForm = this.formBuilder.group({
      password: ['', Validators.required]
    });
  }

  deleteAccount() {
    this.clearMessages();

    const userId = this.tokenService.getIDCuenta();
    if (!userId) {
      this.errorMessage = 'No se pudo obtener el ID de la cuenta.';
      return;
    }

    const passwordDTO: PasswordDTO = {
      password: this.deleteForm.value.password
    };

    this.authService.deleteAccount(userId, passwordDTO).subscribe(
      (response: MessageDTO<string>) => {
        if (!response.error) {
          this.successMessage = 'Cuenta eliminada correctamente';
        } else {
          this.errorMessage = 'Error al eliminar la cuenta: ' + response.errorResponse?.message;
        }
      },
      (error) => {
        console.error('Error al eliminar la cuenta', error);
        this.errorMessage = 'Ocurrió un error al eliminar la cuenta.';
      }
    );
  }

  private clearMessages() {
    this.successMessage = '';
    this.errorMessage = '';
  }
}