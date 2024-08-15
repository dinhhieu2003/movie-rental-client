import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { FilmService } from '../../../core/services/film.service'
import { FilmModel } from '../../../core/models/FilmModel'
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzSelectModule,
    NzButtonModule,
    NzIconModule,
    FormsModule,
    RouterLink,
    NzInputModule,
    NzFormModule,
    ReactiveFormsModule,
    NzDatePickerModule,
    NzModalModule,
    NzSwitchModule,
  ],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  valueSearch = '';
  status = 'default';
  pageSize = 5;

  genres: string[] = [];
  filteredData: FilmModel[] = [];
  fullResponse: any; // Biến để lưu toàn bộ response
  filmData: FilmModel[] = []; // Biến để lưu response.Data.content

  form!: FormGroup;
  formUpdate!: FormGroup;

  constructor(private fb: FormBuilder, private filmService: FilmService) {

    this.form = this.fb.group({
      createdAt: [''],
      updatedAt: [''],
      isActive: [false],
      isDeleted: [false],
      subtitles: [[]],
      narrations: [[]],
      comments: [[]],
      genres: [[]],
      Id: [''],
      FilmName: [''],
      FilmUrl: [''],
      Description: [''],
      ThumbnailUrl: [''],
      TrailerUrl: [''],
      ReleaseDate: [''],
      Duration: [''],
      Actors: [''],
      Director: [''],
      Language: [''],
      NumberOfViews: [{ value: 0, disabled: true }],
      Rating: [{ value: 0, disabled: true }],  // Rating is a number, and disabled
      Age: [0],
      Price: [0],
      LimitTime: ['']
    });
    this.formUpdate = this.fb.group({
      createdAt: [''],
      updatedAt: [''],
      isActive: [false],
      isDeleted: [false],
      subtitles: [[]],
      narrations: [[]],
      comments: [[]],
      genres: [[]],
      Id: [''],
      FilmName: [''],
      FilmUrl: [''],
      Description: [''],
      ThumbnailUrl: [''],
      TrailerUrl: [''],
      ReleaseDate: [''],
      Duration: [''],
      Actors: [''],
      Director: [''],
      Language: [''],
      NumberOfViews: [{ value: 0, disabled: true }],
      Rating: [{ value: 0, disabled: true }],  // Rating is a number, and disabled
      Age: [0],
      Price: [0],
      LimitTime: ['']
    });



  }
  listOfColumn = [
    { title: 'Movie', compare: (a: FilmModel, b: FilmModel) => a.FilmName.localeCompare(b.FilmName), priority: false },
    { title: 'Actors', compare: (a: FilmModel, b: FilmModel) => a.Actors.localeCompare(b.Actors), priority: 2 },
    { title: 'Director', compare: (a: FilmModel, b: FilmModel) => a.Director.localeCompare(b.Director), priority: 2 },
    { title: 'Genres', compare: (a: FilmModel, b: FilmModel) => a.genres.join(', ').localeCompare(b.genres.join(', ')), priority: 2 },
    { title: 'Release Date', compare: (a: FilmModel, b: FilmModel) => new Date(a.ReleaseDate).getTime() - new Date(b.ReleaseDate).getTime(), priority: 1 },
    { title: 'Rating', compare: (a: FilmModel, b: FilmModel) => a.Rating - b.Rating, priority: 1 },
    { title: 'Status', compare: (a: FilmModel, b: FilmModel) => Number(a.isActive) - Number(b.isActive), priority: 1 },
    { title: 'Action', compare: (a: FilmModel, b: FilmModel) => Number(a.isActive) - Number(b.isActive), priority: 1 },
  ];

  ngOnInit() {
    this.loadDeletedFilms();
    console.log(this.filmData); // Xem giá trị của filteredData

  }

  loadDeletedFilms() {
    this.filmService.getDeletedFilms().subscribe(
      (response) => {
        this.fullResponse = response;
        this.filmData = response.Data.content.map((film: Partial<FilmModel>) => ({
          FilmName: film.FilmName || '',
          FilmUrl: film.FilmUrl || '',
          Id: film.Id || '',
          comments: film.comments || [],
          genres : (film.genres && film.genres.length > 0)
            ? film.genres.map((genre: any) => {
              // Kiểm tra và ghép lại chuỗi từ mảng các ký tự riêng lẻ
              if (typeof genre === 'string' && genre.startsWith('{')) {
                try {
                  genre = JSON.parse(genre);
                } catch (e) {
                  console.error('Failed to parse genre string:', genre);
                  return 'Unknown Genre';
                }
              }
              return genre.genreName || 'Unknown Genre';
            })
            : ['N/A'],
          isActive: film.isActive ?? false,
          isDeleted: film.isDeleted ?? false,
          narrations: film.narrations || [],
          subtitles: film.subtitles || [],
          updatedAt: film.updatedAt || 'N/A',
          createdAt: film.createdAt || 'N/A',
          Description: film.Description || 'N/A',
          ThumbnailUrl: film.ThumbnailUrl || 'N/A',
          TrailerUrl: film.TrailerUrl || 'N/A',
          ReleaseDate: film.ReleaseDate || '',
          Duration: film.Duration || 'N/A',
          Actors: film.Actors || 'N/A',
          Director: film.Director || 'N/A',
          Language: film.Language || 'N/A',
          NumberOfViews: film.NumberOfViews || 0,
          Rating: film.Rating || 0,
          Age: film.Age || 0,
          Price: film.Price || 0,
          LimitTime: film.LimitTime || 'N/A'
        }));

        this.filteredData = [...this.filmData];

        console.log(this.filmData, 'filmData');
        console.log(this.filteredData, 'filteredData');
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }


  // Phương thức lấy danh sách các film không bị xóa mềm
  loadNotDeletedFilms() {
    this.filmService.getNotDeletedFilms().subscribe(
      (response) => {
        this.fullResponse = response;
        this.filteredData = response.Data.content.map((film: Partial<FilmModel>) => ({
          FilmName: film.FilmName || '',
          FilmUrl: film.FilmUrl || '',
          Id: film.Id || '',
          comments: film.comments || [],
          genres: (film.genres && film.genres.length > 0) ? film.genres : ['N/A'], isActive: film.isActive ?? false,  // Sử dụng '??' để phân biệt giữa 'false' và 'undefined'
          isDeleted: film.isDeleted ?? false,
          narrations: film.narrations || [],
          subtitles: film.subtitles || [],
          updatedAt: film.updatedAt || 'N/A',
          createdAt: film.createdAt || 'N/A',
          Description: film.Description || 'N/A',
          ThumbnailUrl: film.ThumbnailUrl || 'N/A',
          TrailerUrl: film.TrailerUrl || 'N/A',
          ReleaseDate: film.ReleaseDate || '',
          Duration: film.Duration || 'N/A',
          Actors: film.Actors || 'N/A',
          Director: film.Director || 'N/A',
          Language: film.Language || 'N/A',
          NumberOfViews: film.NumberOfViews || 0,
          Rating: film.Rating || 0,
          Age: film.Age || 0,
          Price: film.Price || 0,
          LimitTime: film.LimitTime || 'N/A'
        }));
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }

  // Phương thức tạo mới một film
  createFilm(film: any) {
    this.filmService.postCreateFilm(film).subscribe(
      (response) => {
        const data = response.Data;
        console.log(data);
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }

  // Phương thức cập nhật một film
  updateFilm(id: number, film: any) {
    this.filmService.putUpdateFilm(id, film).subscribe(
      (response) => {
        const data = response.Data;
        console.log(data);
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }

  // Phương thức khôi phục một film đã bị xóa mềm
  restoreFilm(id: number) {
    this.filmService.patchRestoreFilm(id).subscribe(
      () => {
        console.log(`Restored film with ID ${id}`);
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }

  // Phương thức xóa mềm một film
  deleteFilm(id: number) {
    this.filmService.deleteFilm(id).subscribe(
      () => {
        console.log(`Deleted film with ID ${id}`);
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }

  loadGenres() {
    this.filmService.getGenres().subscribe(
      (response) => {
        this.genres = response.Data.content.map((genre: any) => genre.genreName);
      },
      (error) => {
        console.error('Error loading genres:', error);
      }
    );
  }

  // Lấy list film theo status
  filterData() {
    if (this.status === 'active') {
      this.filteredData = this.filmData.filter(item => item.isActive);
    } else if (this.status === 'no active') {
      this.filteredData = this.filmData.filter(item => !item.isActive);
    } else if (this.status === 'delete') {
      this.loadNotDeletedFilms();
    } else {
      this.filteredData = [...this.filmData];
    }
  }
  onStatusChange(newStatus: string): void {
    this.status = newStatus;
    this.filterData(); // Filter data whenever status changes
  }

  // Lấy số lượng hiện thị của bản
  onPageSizeChange(newSize: number): void {
    this.pageSize = newSize;
  }

  onSearchChange(): void {
    this.filteredData = this.filmData.filter(item =>
      item.FilmName.toLowerCase().includes(this.valueSearch.toLowerCase())
    );
  }

  // Modal add
  isVisibleAdd = false;
  showModalAdd(): void {
    this.loadGenres();
    this.isVisibleAdd = true;
  }
  handleAddOk(): void {
    console.log('Button ok clicked!');
    this.isVisibleAdd = false;
  }
  handleAddCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisibleAdd = false;
  }

  // Modal update
  isVisibleUpdate = false;
  showModalUpdate(movie: any): void {
    this.isVisibleUpdate = true;
    this.formUpdate.patchValue(movie)
    console.log(this.formUpdate, "222")

  }
  handleUpdateOk(): void {
    console.log('Button ok clicked!');
    this.isVisibleUpdate = false;
  }
  handleUpdateCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisibleUpdate = false;
  }

  // Modal delete
  isVisibleDelete = false;
  showModalDelete(): void {
    this.isVisibleDelete = true;
  }
  handleDeleteOk(): void {
    console.log('Button ok clicked!');
    this.isVisibleDelete = false;
  }
  handleDeleteCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisibleDelete = false;
  }

}
