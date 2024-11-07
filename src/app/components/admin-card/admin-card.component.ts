import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Cambia BrowserModule por CommonModule

@Component({
  selector: 'app-admin-card',
  standalone: true,
  imports: [RouterModule, CommonModule], // Asegúrate de que CommonModule esté incluido aquí
  templateUrl: './admin-card.component.html',
  styleUrls: ['./admin-card.component.css']
})
export class AdminCardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() iconClass: string = 'fas fa-info-circle';
  @Input() link: string = '/';
  @Input() buttonText: string = 'Ver más';
  @Input() animationClass: string = 'animate__fadeIn';
}
