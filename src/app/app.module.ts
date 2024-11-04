import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { AppComponent } from './app.component';
import { ProfileComponent } from './pages/profile/profile.component'; // Asegúrate de que el path sea correcto

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent // Declara tu componente aquí
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule // Asegúrate de incluirlo en los imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
