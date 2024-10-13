import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {RouterModule} from '@angular/router'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-app';
  footer = 'Universidad del Quindío - 2024-2'
}
