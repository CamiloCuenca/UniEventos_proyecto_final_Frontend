import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  userName: string | null = null;
  dropdownOpen: boolean = false; // Nueva propiedad para controlar el menú desplegable

  constructor(private router: Router) {}

  ngOnInit() {
    this.getUserInfo();
  }

  // Verifica si el usuario ha iniciado sesión
  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  // Obtiene el nombre del usuario del token
  getUserInfo() {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = this.decodeToken(token);
      this.userName = payload?.nombre || 'Usuario'; // Asegúrate de que 'nombre' sea la clave correcta en el payload
    }
  }

  // Decodifica el token JWT
  private decodeToken(token: string) {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen; // Alterna el estado del menú desplegable
  }

  logout(): void {
    localStorage.removeItem('token');
    this.userName = null;
    this.router.navigate(['/login']);
  }
}
