import { Component, ElementRef, Input, OnInit, viewChild } from '@angular/core';
import { Album } from '../../models/album';
import { RouterLink } from '@angular/router';
import { MovieCard } from '../../models/movie-card';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './album.component.html',
  styleUrl: './album.component.css'
})
export class AlbumComponent implements OnInit{
  slider = viewChild.required<ElementRef>("slider");
  defaultTransform: number = 0;
  @Input() listMovie: MovieCard[] = [];
  @Input() title: string = "";
  @Input() idAlbum: string = "";

  goNext() {
    this.defaultTransform = this.defaultTransform - 398;
    if (Math.abs(this.defaultTransform) >= this.slider().nativeElement.scrollWidth / 1.7) this.defaultTransform = 0;
    this.slider().nativeElement.style.transform = "translateX(" + this.defaultTransform + "px)";
  }
  goPrev() {
    if (Math.abs(this.defaultTransform) === 0) this.defaultTransform = 0;
    else this.defaultTransform = this.defaultTransform + 398;
    this.slider().nativeElement.style.transform = "translateX(" + this.defaultTransform + "px)";
  }
  constructor() { }

  ngOnInit(): void {
    this.defaultTransform = 0;
  }
}