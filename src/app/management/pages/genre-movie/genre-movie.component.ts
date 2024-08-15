import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { GenreModel } from '../../../core/models/GerneModel';
import { GenreService } from '../../../core/services/gerne.service';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-genre-movie',
  standalone: true,
  imports: [
    NzCardModule,
    CommonModule,
    NzInputModule,
    FormsModule,
    NzSwitchModule,
    NzModalModule,
    NzFormModule,
    ReactiveFormsModule,
    NzSelectModule
  ],
  templateUrl: './genre-movie.component.html',
  styleUrl: './genre-movie.component.css'
})
export class GenreMovieComponent implements OnInit {

  pageSize = 5;
  status = 'default';


  valueSearch = ''
  isVisibleAdd = false;
  isVisibleUpdate = false;
  isVisibleDelete = false;
  form!: FormGroup;
  formUpdate!: FormGroup;

  genreData: GenreModel[] = [];
  filteredGenre: GenreModel[] = [];


  constructor(private fbAdd: FormBuilder, private fbUpdate: FormBuilder,
    private genreService: GenreService) {
    this.createForm();
  }

  createForm(): void {
    this.form = this.fbAdd.group({
      genreName: ['', Validators.required],
      isActive: [true],
      isDeleted: [false],
      filmsId: this.fbAdd.array([])
    });
    this.formUpdate = this.fbUpdate.group({
      id: ['', Validators.required],
      genreName: ['', Validators.required],
      isActive: [false, Validators.required],
      isDeleted: [false],
      filmsId: this.fbAdd.array([])
    });
  }

  ngOnInit(): void {
    this.getAllGenres();
  }

  // Lấy tất cả các genre đã bị xóa mềm
  getAllSoftDeletedGenres() {
    this.genreService.getAllSoftDeletedGenres().subscribe(
      (response) => {
        this.genreData = response.Data.content;
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }

  // Lấy tất cả các genre
  getAllGenres() {
    this.genreService.getAllGenres().subscribe(
      (response) => {
        this.genreData = response.Data.content;
        this.filteredGenre = [...this.genreData]
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }

  // Tạo mới genre
  createGenre(genre: GenreModel) {
    this.genreService.postCreateGenre(genre).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }

  // Cập nhật genre theo ID
  updateGenre(genreId: number, genre: GenreModel) {
    this.genreService.putUpdateGenre(genreId, genre).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }

  // Xóa mềm genre theo ID
  softDeleteGenre(genreId: number) {
    this.genreService.patchSoftDeleteGenre(genreId).subscribe(
      () => {
        console.log(`Soft deleted genre with ID ${genreId}`);
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }

  // Khôi phục genre đã xóa mềm theo ID
  restoreGenre(genreId: number) {
    this.genreService.patchRestoreGenre(genreId).subscribe(
      () => {
        console.log(`Restored genre with ID ${genreId}`);
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }

  //
  onStatusChange(newStatus: string): void {
    if (newStatus === 'default') {
      this.filteredGenre = [...this.genreData]
    } else if (newStatus === 'no active') {
      this.genreService.getAllInActive().subscribe(
        (response) => {
          if (response.Data === null) {
            this.filteredGenre = []; 
          } else {
            this.filteredGenre = response.Data.content;
          }
        },
        (error) => {
          if (error.status === 404) {
            this.filteredGenre = []; 
          } else {
          }
        }
      );
    } else if (newStatus === 'delete') {
      this.genreService.getAllSoftDeletedGenres().subscribe(
        (response) => {
          this.filteredGenre = response.Data.content;
        },
        (error) => {
        }
      );
    }
  }



  // Model add
  showModalAdd(): void {
    this.isVisibleAdd = true;
  }
  handleAddOk(): void {
    if (this.form.valid) {
      const genre: GenreModel = this.form.value;
      this.createGenre(genre); // Gọi hàm tạo genre mới

      this.form.reset({
        genreName: '',
        isActive: true
      });
      this.isVisibleAdd = false;

    } else {
      Object.values(this.form.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  handleAddCancel(): void {
    this.isVisibleAdd = false;
  }

  // Model update
  showModalUpdate(genre: any): void {
    // this.newGenre = { ...genre }; 
    this.formUpdate.patchValue(genre)
    this.isVisibleUpdate = true;
  }
  handleUpdateOk(): void {
    if (this.formUpdate.valid) {
      const { id, ...genre } = this.formUpdate.value;
      const genreId = this.formUpdate.value.id;
      console.log(genreId)
      this.updateGenre(genreId, genre); 

      this.formUpdate.reset({
        genreName: '',
        isActive: false
      });
      this.isVisibleUpdate = false;

    } else {
      Object.values(this.formUpdate.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  handleUpdateCancel(): void {
    this.isVisibleUpdate = false;
  }

  // Model delete
  showModalDelete(id: string): void {
    this.formUpdate.value.id = id;
    this.isVisibleDelete = true;
  }
  handleDeleteOk(): void {
    const genreId = this.formUpdate.value.id;

    if (genreId) {
      this.softDeleteGenre(genreId);
      console.log(`Soft delete genre with ID: ${genreId}`, 12);
    } else {
      console.error('ID is missing. Cannot delete genre.');
    }

    // Đóng modal xóa
    this.isVisibleDelete = false;
  }
  handleDeleteCancel(): void {
    this.isVisibleDelete = false;
  }


  onSearchChange(): void {
    this.filteredGenre = this.genreData.filter(item =>
      item.genreName.toLowerCase().includes(this.valueSearch.toLowerCase())
    );
  }

}
