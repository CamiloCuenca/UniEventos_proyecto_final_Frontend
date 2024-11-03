import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ProfileDTO } from '../../interface/profileDTO';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']  // Corregir "styleUrl" a "styleUrls"
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  errorMessage: string = '';
  successMessage: string | null = null;
  userProfile: ProfileDTO | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      currentPassword: [''],
      password: [''],
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.authService.getUserProfile().subscribe({
      next: (profile: ProfileDTO) => {
        this.userProfile = profile;
        this.profileForm.patchValue(profile); // Rellena el formulario con los datos del usuario
      },
      error: (err) => {
        console.error('Error al cargar el perfil', err);
        this.errorMessage = 'Error al cargar los datos del perfil.';
      },
    });
  }

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
  
      // Verificar si el usuario quiere cambiar la contraseña
      const currentPassword = this.profileForm.value.currentPassword;
      const newPassword = this.profileForm.value.password;
  
      // Extraer el userId del token
      const token = localStorage.getItem('token');
      let userId: string | null = null;
  
      if (token) {
        try {
          const payload = this.authService.decodeToken(token);
          userId = payload.id; // Obtener el userId del payload
        } catch (error) {
          this.errorMessage = 'Error al decodificar el token.';
        }
      } else {
        this.errorMessage = 'No se encontró el token.';
      }
  
      if (currentPassword && newPassword) {
        // Crear el objeto DTO para actualizar la contraseña
        const updatePasswordDTO = {
          currentPassword: currentPassword,
          newPassword: newPassword,
        };
  
        if (userId) {
          // Llamar al servicio para cambiar la contraseña usando el userId
          this.authService.updatePassword(updatePasswordDTO, userId).subscribe({
            next: () => {
              console.log('Contraseña actualizada exitosamente');
              this.successMessage = 'Contraseña actualizada exitosamente';
  
              // Después de actualizar la contraseña, actualiza el perfil
              this.updateProfile(updatedProfile, userId);
            },
            error: (err) => {
              console.error('Error al actualizar la contraseña', err);
              this.errorMessage = 'Error al actualizar la contraseña.';
            },
          });
        } else {
          this.errorMessage = 'No se pudo obtener el ID del usuario.';
        }
      } else {
        // Solo actualizar el perfil si no se proporciona la nueva contraseña
        this.updateProfile(updatedProfile, userId);
      }
    }
  }
  
  // Método auxiliar para actualizar el perfil
  private updateProfile(updatedProfile: ProfileDTO, userId: string | null) {
    if (userId) {
      this.authService.updateUserProfile(updatedProfile, userId).subscribe({
        next: () => {
          console.log('Perfil actualizado exitosamente');
          this.successMessage = 'Perfil actualizado exitosamente';
        },
        error: (err) => {
          console.error('Error al actualizar el perfil', err);
          this.errorMessage = 'Error al actualizar el perfil.';
        },
      });
    } else {
      this.errorMessage = 'No se pudo obtener el ID del usuario.';
    }
  }
  
}