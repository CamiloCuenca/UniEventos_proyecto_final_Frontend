import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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
  styleUrls: ['./profile.component.css']  // Corregir "styleUrl" a "styleUrls"
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  ngOnInit(): void {
    this.loadUserData();
  }

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
  }

  editAccount() {
    const editedAccount: editAccountDTO = {
      name: this.profileForm.value.nombre,
      phoneNumber: this.profileForm.value.telefono,
      address: this.profileForm.value.direccion
    };

    const userId = this.tokenService.getIDCuenta(); // Obtén el ID del token

    this.authService.editAccount(editedAccount, userId).subscribe(
      (response: MessageDTO<string>) => {
        if (!response.error) {
          this.successMessage = 'Cuenta actualizada correctamente';
          this.errorMessage = null; // Limpiar cualquier mensaje de error anterior
        } else {
          this.errorMessage = "Ocurrió un error al actualizar la cuenta: " + response.errorResponse?.message;
          this.successMessage = null; // Limpiar cualquier mensaje de éxito anterior
        }
      },
      (error) => {
        console.error('Error al editar la cuenta', error);
        this.errorMessage = 'Error al editar la cuenta';
        this.successMessage = null; // Limpiar cualquier mensaje de éxito anterior
      }
    );
  }

  /*
  updatePassword() {
  const currentPassword = this.profileForm.value.currentPassword;
  const newPassword = this.profileForm.value.password;
  const userId = this.tokenService.getIDCuenta();

  if (currentPassword && newPassword) {
    // Crear el objeto DTO para actualizar la contraseña
    const updatePasswordDTO = {
      currentPassword: currentPassword,
      newPassword: newPassword,
    };

    // Llamar al servicio para cambiar la contraseña
    this.authService.updatePassword(updatePasswordDTO, userId).subscribe({
      next: (response: MessageDTO<string>) => {
        if (!response.error) {
          console.log('Contraseña actualizada exitosamente');
          this.successMessage = 'Contraseña actualizada exitosamente';

          // Llamar al método editAccount para actualizar el perfil después de actualizar la contraseña
          this.editAccount();
        } else {
          this.errorMessage = "Ocurrió un error al actualizar la contraseña: " + response.errorResponse?.message;
          this.successMessage = null;
        }
      },
      error: (err) => {
        console.error('Error al actualizar la contraseña', err);
        this.errorMessage = 'Error al actualizar la contraseña.';
        this.successMessage = null;
      },
    });
  } else {
    this.errorMessage = 'Por favor, complete todos los campos requeridos para cambiar la contraseña.';
  }
    /** */




  loadUserData() {
    this.authService.getUserData().subscribe(
      (response: MessageDTO<dtoAccountInformation>) => {
        if (!response.error) {
          const data = response.respuesta; // Accede a la información de cuenta
          this.profileForm.patchValue({
            nombre: data.name,             // Cambiado a 'name' para que coincida con el DTO
            telefono: data.phoneNumber,     // Cambiado a 'phoneNumber'
            direccion: data.address         // Cambiado a 'address'
          });
        } else {
          // Aquí asumimos que response.respuesta contiene un mensaje de error en forma de string
          this.errorMessage = "Ocurrió un error al obtener la información: " + response.errorResponse?.message; 
        }
      },
      (error) => {
        console.error('Error al cargar los datos del usuario', error);
        this.errorMessage = 'Error al cargar los datos del usuario';
      }
    );
  }
}




/*
  onSubmit() {
    if (this.profileForm.valid) {
      this.errorMessage = '';
      this.successMessage = null;

      // Extraer los datos del formulario
      const updatedProfile: ProfileDTO = {
        nombre: this.profileForm.value.nombre,
        direccion: this.profileForm.value.direccion,
        telefono: this.profileForm.value.telefono,
      };

    
      const currentPassword = this.profileForm.value.currentPassword;
      const newPassword = this.profileForm.value.password;

      if (currentPassword && newPassword) {
        // Crear el objeto DTO para actualizar la contraseña
        const updatePasswordDTO = {
          currentPassword: currentPassword,
          newPassword: newPassword,
        };

        // Llamar al servicio para cambiar la contraseña
        this.authService.updatePassword(updatePasswordDTO).subscribe({
          next: () => {
            console.log('Contraseña actualizada exitosamente');
            this.successMessage = 'Contraseña actualizada exitosamente';

            // Después de actualizar la contraseña, actualiza el perfil
            this.updateProfile(updatedProfile);
          },
          error: (err) => {
            console.error('Error al actualizar la contraseña', err);
            this.errorMessage = 'Error al actualizar la contraseña.';
          },
        });
      } else {
        // Solo actualizar el perfil si no se proporciona la nueva contraseña
        this.updateProfile(updatedProfile);
      }
    }
  }

  // Método auxiliar para actualizar el perfil
  private updateProfile(updatedProfile: ProfileDTO) {
    this.authService.updateUserProfile(updatedProfile).subscribe({
      next: () => {
        console.log('Perfil actualizado exitosamente');
        this.successMessage = 'Perfil actualizado exitosamente';
      },
      error: (err) => {
        console.error('Error al actualizar el perfil', err);
        this.errorMessage = 'Error al actualizar el perfil.';
      },
    });
  }
    /** */


 
