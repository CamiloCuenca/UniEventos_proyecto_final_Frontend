import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { GestionarEventosService } from '../../services/gestionar-eventos.service';
import { EventDTO, Locality } from '../../interface/event.dto';
import { HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-evento',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.css']
})
export class CrearEventoComponent {
  eventForm: FormGroup;
  coverImageUrl: string | null = null; // URL de la imagen cargada para vista previa
  selectedFile: File | null = null; // Archivo de imagen seleccionado

  localityImageUrl: string | null = null; // URL de la imagen cargada para la localidad
  selectedLocalityFile: File | null = null; // Archivo de imagen de la localidad seleccionado

  constructor(private fb: FormBuilder, private eventService: GestionarEventosService) {
    this.eventForm = this.fb.group({
      coverImage: ['', Validators.required],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      status: ['ACTIVE', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(1000)]],
      imageLocalities: ['', Validators.required],
      type: ['CONCERT', Validators.required],
      date: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      localities: this.fb.array([]) // Aquí se almacenarán las localidades
    });
  }

  // Getter para el FormArray de localidades
  get localities(): FormArray {
    return this.eventForm.get('localities') as FormArray;
  }

  // Método para agregar una nueva localidad
  addLocality(): void {
    const localityForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      ticketsSold: [0, Validators.required],
      maximumCapacity: [0, [Validators.required, Validators.min(1)]]
    });
    this.localities.push(localityForm);
  }

  // Método para eliminar una localidad
  removeLocality(index: number): void {
    this.localities.removeAt(index);
  }

  // Método para manejar la selección de imagen
  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];

      // Crear una vista previa de la imagen seleccionada
      const reader = new FileReader();
      reader.onload = (e) => {
        this.coverImageUrl = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedFile);

      // Subir la imagen al servidor
      this.uploadImage();
    }
  }

  // Método para subir la imagen al servidor
  uploadImage(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('imagen', this.selectedFile);

      this.eventService.uploadImage(formData).subscribe(
        (response: any) => {
          this.eventForm.patchValue({ coverImage: response.respuesta }); // URL de la imagen
        },
        error => {
          console.error('Error al cargar la imagen:', error);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const newEvent: EventDTO = this.eventForm.value;

      const token = sessionStorage.getItem('AuthToken');
      if (!token) {
        console.error('Token de autenticación no encontrado');
        return;
      }

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });

      this.eventService.createEvent(newEvent, headers).subscribe(
        response => {
          console.log('Evento creado:', response);
        },
        error => {
          console.error('Error al crear evento:', error);
        }
      );
    }
  }

  // Método para manejar la selección de imagen de localidad
onLocalityImageSelected(event: Event): void {
  const fileInput = event.target as HTMLInputElement;
  if (fileInput.files && fileInput.files.length > 0) {
    this.selectedLocalityFile = fileInput.files[0];

    // Crear una vista previa de la imagen seleccionada
    const reader = new FileReader();
    reader.onload = (e) => {
      this.localityImageUrl = e.target?.result as string;
    };
    reader.readAsDataURL(this.selectedLocalityFile);

    // Subir la imagen de la localidad al servidor
    this.uploadLocalityImage();
  }
}

// Método para subir la imagen de localidad al servidor
uploadLocalityImage(): void {
  if (this.selectedLocalityFile) {
    const formData = new FormData();
    formData.append('imagen', this.selectedLocalityFile);

    this.eventService.uploadImage(formData).subscribe(
      (response: any) => {
        this.eventForm.patchValue({ imageLocalities: response.respuesta }); // URL de la imagen de localidad
      },
      error => {
        console.error('Error al cargar la imagen de localidad:', error);
      }
    );
  }
}




}
