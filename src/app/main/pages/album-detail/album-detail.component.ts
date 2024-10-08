import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AlbumService } from '../../../core/services/main/album.service';
import { MovieCard } from '../../models/movie-card';

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './album-detail.component.html',
  styleUrl: './album-detail.component.css'
})
export class AlbumDetailComponent implements OnInit{
  private idAlbum: string = "";
  films: MovieCard[] = [];
  albumName: string = "";
  constructor(private activatedRoute: ActivatedRoute, 
    private albumService: AlbumService,
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.idAlbum = params['id'];
    });
    this.getAllFilmByAlbumId(this.idAlbum);
  }

  getAllFilmByAlbumId(idAlbum: string) {
    this.albumService.getAllFilmByAlbumId(idAlbum).subscribe({
      next: (response) => {
        this.films = response.Data.film;
        this.albumName = response.Data.albumName;
      }
    })
  }


}
