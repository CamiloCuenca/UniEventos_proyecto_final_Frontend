// Importa los módulos necesarios para el componente
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar', // Nombre del selector para usar este componente en otras plantillas
  standalone: true, // Indica que este componente es independiente y puede usarse sin un módulo principal
  imports: [RouterModule, CommonModule], // Importa módulos necesarios para el enrutamiento y funciones comunes de Angular
  templateUrl: './navbar.component.html', // Plantilla HTML para el componente
  styleUrls: ['./navbar.component.css'],  // Estilos CSS asociados
})
export class NavbarComponent implements OnInit {
  userName: string | null = null; // Almacena el nombre de usuario para mostrar en la interfaz
  dropdownOpen: boolean = false;   // Propiedad para controlar la visibilidad del menú desplegable

  constructor(private router: Router) {} // Inyecta el servicio Router para navegación en la aplicación

  ngOnInit() {
    this.getUserInfo(); // Llama al método para obtener la información del usuario cuando el componente se inicializa
  }

  // Método que verifica si el usuario ha iniciado sesión
  isLoggedIn(): boolean {
    return sessionStorage.getItem('AuthToken') !== null; // Retorna true si el token existe en localStorage
  }

  // Método que obtiene el nombre del usuario del token almacenado en localStorage
  getUserInfo() {
    const token = sessionStorage.getItem('AuthToken'); // Obtiene el token JWT del almacenamiento local
    if (token) {
      const payload = this.decodeToken(token);  // Decodifica el token y obtiene su carga útil
      this.userName = payload?.nombre || 'Usuario'; // Asigna el nombre del usuario o "Usuario" como valor predeterminado
    }
  }

  // Método privado que decodifica el token JWT para extraer la carga útil
  private decodeToken(token: string) {
    const payload = token.split('.')[1]; // Obtiene la segunda parte del token (carga útil codificada en Base64)
    return JSON.parse(atob(payload));    // Decodifica la carga útil de Base64 y la convierte en un objeto JSON
  }

  // Alterna el estado del menú desplegable (abre o cierra el menú)
  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('token'); // Elimina el token del almacenamiento local
    this.userName = null;             // Resetea el nombre de usuario
    this.router.navigate(['/login']); // Redirige al usuario a la página de login
  }
}
