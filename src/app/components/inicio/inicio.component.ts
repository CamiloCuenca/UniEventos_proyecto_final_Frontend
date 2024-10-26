import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ItemEventDTO } from '../interface/item-event-dto'; // Ruta al DTO
import { CarrucelComponent } from '../carrucel/carrucel.component';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CarrucelComponent, CardComponent,CommonModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  title: string = "Dylan";
  events: ItemEventDTO[] = []; // Para almacenar los eventos

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.http.get<ItemEventDTO[]>('http://localhost:8080/api/auth/evento/listar-eventos')
      .subscribe({
        next: (data) => {
          this.events = data;
        },
        error: (err) => {
          console.error('Error al cargar los eventos', err);
        }
      });
  }
}
