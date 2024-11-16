import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-carrucel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrucel.component.html',
  styleUrl: './carrucel.component.css'
})
export class CarrucelComponent {
   images: string[] = [
    'https://firebasestorage.googleapis.com/v0/b/unieventos-1c779.appspot.com/o/Imagenes%20carrucel%2F103769bee25bd3a4d18c572c2834e0a4.gif?alt=media&token=ab7f62d6-0c2e-4b0e-bf78-5838a9620ad5',
    'https://firebasestorage.googleapis.com/v0/b/unieventos-1c779.appspot.com/o/Imagenes%20carrucel%2Fcecabaac30736b17f7f278422ef861c0.gif?alt=media&token=fb28dd9a-ec37-439c-a007-ebc69edd5836',
    'https://firebasestorage.googleapis.com/v0/b/unieventos-1c779.appspot.com/o/Imagenes%20carrucel%2F1b3c5821c4ef798f196b30cc3eb46ac2.gif?alt=media&token=4227b26c-fba5-4f32-8734-4f86be6ca8d5'
  ];

  currentImageIndex = 0;

  prevImage() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }

  getImageClass(index: number) {
    if (index === this.currentImageIndex) {
      return 'active';  // Imagen activa, visible
    } else {
      return 'inactive'; // Imagen inactiva, fuera de vista
    }
  }
}

