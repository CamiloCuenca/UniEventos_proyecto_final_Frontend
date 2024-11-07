import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importación necesaria para usar directivas de Angular
import { AdminCardComponent } from '../../components/admin-card/admin-card.component';

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [RouterModule, CommonModule, AdminCardComponent], // Incluye CommonModule aquí
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css'] // Corregido a styleUrls
})
export class HomeAdminComponent { }
