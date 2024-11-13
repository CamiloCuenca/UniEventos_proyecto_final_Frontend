import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CarrucelComponent } from './components/carrucel/carrucel.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchBarComponent } from "./components/search-bar/search-bar.component";
 // Importa tu NavbarComponent

@Component({
  selector: 'app-root',
  standalone: true,  // Habilita el componente standalone
  imports: [RouterOutlet, RouterModule, NavbarComponent, CarrucelComponent, FooterComponent, SearchBarComponent],  // Incluye los imports necesarios
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // Corrección: styleUrls (en plural)
})
export class AppComponent {
  title = 'my-app';
  footer = 'Universidad del Quindío - 2024-2';
}
