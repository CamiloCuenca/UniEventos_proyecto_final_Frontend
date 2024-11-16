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
    'https://firebasestorage.googleapis.com/v0/b/unieventos-1c779.appspot.com/o/Imagenes%20carrucel%2F4ce24f2700795f049082f8a31f8ec6c9.gif?alt=media&token=db9c46f6-2660-4e73-812a-036533ad501f',
    'https://firebasestorage.googleapis.com/v0/b/unieventos-1c779.appspot.com/o/Imagenes%20carrucel%2Fcdd3dfca2535b350e6060473143245ee.gif?alt=media&token=a4ad3df8-ae77-48a0-b17e-f04d3d7a9389',
    'https://firebasestorage.googleapis.com/v0/b/unieventos-1c779.appspot.com/o/Imagenes%20carrucel%2F103769bee25bd3a4d18c572c2834e0a4.gif?alt=media&token=ab7f62d6-0c2e-4b0e-bf78-5838a9620ad5'
  ];

  currentImageIndex = 0;

  prevImage() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }
}

