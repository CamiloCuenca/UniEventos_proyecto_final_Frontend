import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { GestionarEventosService } from '../../services/gestionar-eventos.service';
import { EventDTO, Locality,EventStatus,EventType,localities,EventCity} from '../../interface/event.dto';
import { HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2'; // Importa SweetAlert2

@Component({
  selector: 'app-crear-evento',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.css']
})
export class CrearEventoComponent {
  eventForm: FormGroup;
  coverImageUrl: string | null = null;
  selectedFile: File | null = null;

  localityImageUrl: string | null = null;
  selectedLocalityFile: File | null = null;

  cityOptions = Object.values(EventCity);

  eventStatusOptions = Object.values(EventStatus);
  eventTypeOptions = Object.values(EventType);
  locaityName = Object.values(localities)


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
      localities: this.fb.array([])
    });
  }

  get localities(): FormArray {
    return this.eventForm.get('localities') as FormArray;
  }

  addLocality(): void {
    const localityForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      ticketsSold: [0, Validators.required],
      maximumCapacity: [0, [Validators.required, Validators.min(1)]]
    });
    this.localities.push(localityForm);
  }

  removeLocality(index: number): void {
    this.localities.removeAt(index);
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        this.coverImageUrl = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedFile);

      this.uploadImage();
    }
  }

  uploadImage(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('imagen', this.selectedFile);

      this.eventService.uploadImage(formData).subscribe(
        (response: any) => {
          this.eventForm.patchValue({ coverImage: response.respuesta });
          Swal.fire({
            icon: 'success',
            title: 'Imagen subida',
            text: 'La imagen de portada se subió correctamente',
            showConfirmButton: false,
            timer: 1500
          });
        },
        error => {
          console.error('Error al cargar la imagen:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al subir la imagen',
            showConfirmButton: true
          });
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
        Swal.fire({
          icon: 'warning',
          title: 'Autenticación',
          text: 'Token de autenticación no encontrado',
          showConfirmButton: true
        });
        return;
      }

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });

      this.eventService.createEvent(newEvent, headers).subscribe(
        response => {
          console.log('Evento creado:', response);
          Swal.fire({
            icon: 'success',
            title: 'Evento creado',
            text: 'El evento se creó con éxito',
            showConfirmButton: true
          });
        },
        error => {
          console.error('Error al crear evento:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al crear el evento',
            showConfirmButton: true
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Formulario inválido',
        text: 'Por favor, complete todos los campos requeridos',
        showConfirmButton: true
      });
    }
  }

  onLocalityImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedLocalityFile = fileInput.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        this.localityImageUrl = e.target?.result as string;
      };
      reader.readAsDataURL(this.selectedLocalityFile);

      this.uploadLocalityImage();
    }
  }

  uploadLocalityImage(): void {
    if (this.selectedLocalityFile) {
      const formData = new FormData();
      formData.append('imagen', this.selectedLocalityFile);

      this.eventService.uploadImage(formData).subscribe(
        (response: any) => {
          this.eventForm.patchValue({ imageLocalities: response.respuesta });
          Swal.fire({
            icon: 'success',
            title: 'Imagen de localidad subida',
            text: 'La imagen de la localidad se subió correctamente',
            showConfirmButton: false,
            timer: 1500
          });
        },
        error => {
          console.error('Error al cargar la imagen de localidad:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al subir la imagen de la localidad',
            showConfirmButton: true
          });
        }
      );
    }
  }
}
