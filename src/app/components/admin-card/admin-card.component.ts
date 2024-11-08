import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-card',
  standalone: true,
  imports: [RouterModule,CommonModule],
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
  @Output() buttonClick = new EventEmitter<void>(); // Evento de salida

  onButtonClick() {
    this.buttonClick.emit(); // Emite el evento cuando se hace clic en el botón
  }
}
