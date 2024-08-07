import { Component, OnInit } from '@angular/core';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { AlbumComponent } from "../../components/album/album.component";
import { Album } from '../../models/album';
import { Movie } from '../../models/movie';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../core/services/main/category.service';
import { response } from 'express';

@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [CarouselComponent, AlbumComponent],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent implements OnInit{
  list: string[] = ["https://ng.ant.design/assets/img/logo.svg", "https://ng.ant.design/assets/img/logo.svg", 
    "https://ng.ant.design/assets/img/logo.svg", 
    "https://images.fptplay.net/media/OTT/VOD/2022/09/06/ong-thay-vi-dieu-12-tap-fpt-play-1662456055668_Background_origin.jpg?w=910&c=0&fmt=webp"];
  
  listAlbum: Album[] = [];
  currentSlug: string | null = "";
  id: string | null = "";

  // initAlbum() {
  //   for(let i=0; i<10; i++) {
  //     let movies: Movie[] = [];
  //     for(let j=0; j<10; j++) {
  //       let movie: Movie = {name: "Ông thầy vi diệu", poster: "https://images.fptplay.net/media/OTT/VOD/2022/09/06/ong-thay-vi-dieu-12-tap-fpt-play-1662456055668_Background_origin.jpg?w=910&c=0&fmt=webp", price: 47};
  //       movies.push(movie);
  //     }
  //     let album: Album = {movies: movies, name:"anime"};
  //     // this.listAlbum.push(album);
  //   }
  // }

  constructor(private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService
  ) {
    
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.currentSlug = param["slug"];
      if(this.currentSlug) {
        this.id = localStorage.getItem(this.currentSlug)
        if(this.id) {
          this.getAlbumByCategoryId(this.id);
        }
      }
    });
    
    // this.initAlbum();
  }

  getAlbumByCategoryId(id: string) {
    this.categoryService.getCategory(id).subscribe({
      next: (response) => {
        this.listAlbum = response.Data.albums;
        console.log(this.listAlbum);
      }
    })
  }
}
