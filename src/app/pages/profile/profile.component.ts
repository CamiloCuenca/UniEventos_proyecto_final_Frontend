import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { dtoAccountInformation } from '../../interface/dtoAccountInformation';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../services/token.service';
import { MessageDTO } from '../../interface/MessageDTO';
import { editAccountDTO } from '../../interface/editAccountDTO';
import { updatePasswordDTO } from '../../interface/updatePasswordDTO';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  passwordForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService
  ) {
    this.profileForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      telefono: ['', [Validators.required, Validators.maxLength(10)]],
      direccion: ['', [Validators.maxLength(100)]],
    });

    // Inicializando el formulario de cambio de contraseña
    this.passwordForm = this.fb.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmNewPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  private passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')?.value ===
      form.get('confirmNewPassword')?.value
      ? null
      : { mismatch: true }; // Devuelve un objeto con 'mismatch' si no coinciden
  }

  private clearMessages() {
    this.errorMessage = null;
    this.successMessage = null;
  }

  editAccount() {
    this.clearMessages();
    if (this.profileForm.invalid) {
      this.errorMessage = 'Por favor, complete el formulario correctamente.';
      return;
    }

    const editedAccount: editAccountDTO = {
      name: this.profileForm.value.nombre,
      phoneNumber: this.profileForm.value.telefono,
      address: this.profileForm.value.direccion,
    };

    const userId = this.tokenService.getIDCuenta();

    this.authService.editAccount(editedAccount, userId).subscribe(
      (response: MessageDTO<string>) => {
        if (!response.error) {
          this.successMessage = 'Cuenta actualizada correctamente';
        } else {
          this.errorMessage =
            'Ocurrió un error al actualizar la cuenta: ' +
            response.errorResponse?.message;
        }
      },
      (error) => {
        console.error('Error al editar la cuenta', error);
        this.errorMessage = 'Error al editar la cuenta';
      }
    );
  }

  loadUserData() {
    this.authService.getUserData().subscribe(
      (response: MessageDTO<dtoAccountInformation>) => {
        if (!response.error) {
          const data = response.respuesta;
          this.profileForm.patchValue({
            nombre: data.name,
            telefono: data.phoneNumber,
            direccion: data.address,
          });
        } else {
          this.errorMessage =
            'Ocurrió un error al obtener la información: ' +
            response.errorResponse?.message;
        }
      },
      (error) => {
        console.error('Error al cargar los datos del usuario', error);
        this.errorMessage = 'Error al cargar los datos del usuario';
      }
    );
  }

  updatePassword() {
    this.clearMessages();
    if (this.passwordForm.invalid) {
      this.errorMessage =
        'Por favor, complete el formulario de contraseña correctamente.';
      return;
    }

    const passwordData: updatePasswordDTO = {
      currentPassword: this.passwordForm.value.currentPassword,
      newPassword: this.passwordForm.value.newPassword,
      confirmationPassword: this.passwordForm.value.confirmNewPassword, // Este campo debería ser 'confirmNewPassword'
    };

    const userId = this.tokenService.getIDCuenta(); // Obtén el ID del token

    this.authService.updatePassword(passwordData, userId).subscribe(
      (response: MessageDTO<string>) => {
        if (!response.error) {
          this.successMessage = 'Contraseña actualizada correctamente';
          this.passwordForm.reset(); // Resetea el formulario de contraseña
        } else {
          this.errorMessage =
            'Ocurrió un error al actualizar la contraseña: ' +
            response.errorResponse?.message;
        }
      },
      (error) => {
        console.error('Error al actualizar la contraseña', error);
        this.errorMessage = 'Error al actualizar la contraseña';
      }
    );
  }

  // Aquí iría el método updatePassword como una función separada si decides implementarlo en el mismo componente o en uno diferente.
}
