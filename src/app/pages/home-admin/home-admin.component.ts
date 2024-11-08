import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importación necesaria para usar directivas de Angular
import { AdminCardComponent } from '../../components/admin-card/admin-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [RouterModule, CommonModule, AdminCardComponent], // Incluye CommonModule aquí
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css'] // Corregido a styleUrls
})
export class HomeAdminComponent {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]); // Navega a la ruta proporcionada
  }
 }
