import { Component } from '@angular/core';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { AlbumComponent } from "../../components/album/album.component";
import { Album } from '../../models/album';
import { Movie } from '../../models/movie';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent, AlbumComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  list: string[] = ["https://ng.ant.design/assets/img/logo.svg", "https://ng.ant.design/assets/img/logo.svg", 
    "https://ng.ant.design/assets/img/logo.svg", 
    "https://images.fptplay.net/media/OTT/VOD/2022/09/06/ong-thay-vi-dieu-12-tap-fpt-play-1662456055668_Background_origin.jpg?w=910&c=0&fmt=webp"];
  
  listAlbum: Album[] = [];

  initAlbum() {
    for(let i=0; i<10; i++) {
      let movies: Movie[] = [];
      for(let j=0; j<10; j++) {
        let movie: Movie = {name: "Ông thầy vi diệu", poster: "https://images.fptplay.net/media/OTT/VOD/2022/09/06/ong-thay-vi-dieu-12-tap-fpt-play-1662456055668_Background_origin.jpg?w=910&c=0&fmt=webp", price:47};
        movies.push(movie);
      }
      let album: Album = {movies: movies, name:"anime"};
      this.listAlbum.push(album);
    }
  }

  constructor() {
    this.initAlbum();
  }
}
