import { Component, ElementRef, Input, OnInit, viewChild } from '@angular/core';
import { Movie } from '../../models/movie';
import { Album } from '../../models/album';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [],
  templateUrl: './album.component.html',
  styleUrl: './album.component.css'
})
export class AlbumComponent implements OnInit{
  slider = viewChild.required<ElementRef>("slider");
  defaultTransform: number = 0;
  @Input() listMovie: Movie[] = [];
  @Input() title: string = "";

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