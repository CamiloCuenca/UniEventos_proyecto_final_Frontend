import { Component,OnInit } from '@angular/core';
// Importa los módulos necesarios para el componente
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent implements OnInit{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
