import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminCardComponent } from '../../components/admin-card/admin-card.component';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { Reporteservice } from '../../services/reporte.service';
import Swal from 'sweetalert2'; // Importación de SweetAlert2

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [RouterModule, CommonModule, AdminCardComponent],
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent {
  constructor(private router: Router, private reporteService: Reporteservice) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  generarReporte(): void {
    const token = sessionStorage.getItem('AuthToken');
    if (!token) {
      console.error('Token de autenticación no encontrado');
      Swal.fire('Error', 'No se encontró el token de autenticación', 'error');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    Swal.fire({
      title: 'Generando reporte...',
      text: 'Por favor, espera mientras se genera el archivo.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    this.reporteService.generarReporte(headers).subscribe(
      response => {
        // Crear un objeto URL para el archivo y descargarlo
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'reporte.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        Swal.fire('Éxito', 'El reporte se ha descargado correctamente', 'success');
      },
      error => {
        console.log('Error al generar el reporte', error);
        Swal.fire('Error', 'Hubo un problema al generar el reporte', 'error');
      }
    );
  }
}
