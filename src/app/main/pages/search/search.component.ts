import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FilmService } from '../../../core/services/main/film.service';
import { MovieCard } from '../../models/movie-card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchForm: FormGroup;
  listFilm: MovieCard[] = [];
  constructor(private fb: FormBuilder,
    private filmService: FilmService
  ) {
    this.searchForm = this.fb.group({
      term: [''],
    });
  }

  search() {
    let term: string = this.searchForm.value['term'];
    this.filmService.searchFilm(term).subscribe({
      next: (response) => {
        this.listFilm = response.Data;
        console.log(this.listFilm);
      }
    })
  }
}
