import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SearchBarComponent } from "../search-bar/search-bar.component";

@Component({
  selector: 'app-carrucel',
  standalone: true,
  imports: [CommonModule, SearchBarComponent],
  templateUrl: './carrucel.component.html',
  styleUrl: './carrucel.component.css'
})
export class CarrucelComponent {
  images: string[] = [
    'https://firebasestorage.googleapis.com/v0/b/unieventos-1c779.appspot.com/o/Imagenes%20carrucel%2F240808100445628_estelar_estelar.jpg?alt=media&token=8a426190-8834-41f2-9e91-ba4cf83810ea',
    "https://firebasestorage.googleapis.com/v0/b/unieventos-1c779.appspot.com/o/Imagenes%20carrucel%2F240724122710489_performer_img_CAT1.jpg?alt=media&token=ca4037fb-06ef-4d2a-8d4d-55125bb52bf8"
  ];

  currentImageIndex = 0;

  prevImage() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }
}

