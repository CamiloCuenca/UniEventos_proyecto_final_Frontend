import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  onSubmit() {
    // Aquí puedes manejar la lógica del inicio de sesión
    console.log('Formulario de inicio de sesión enviado');
  }
}
