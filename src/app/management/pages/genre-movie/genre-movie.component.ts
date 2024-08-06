import { Component, OnInit } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { GenreModel } from '../../../core/models/GerneModel';
import { GenreService } from '../../../core/services/gerne.service';

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
    ReactiveFormsModule
  ],
  templateUrl: './genre-movie.component.html',
  styleUrl: './genre-movie.component.css'
})
export class GenreMovieComponent implements OnInit {

  valueSearch = ''
  isVisibleAdd = false;
  isVisibleUpdate = false;
  isVisibleDelete = false;
  form!: FormGroup;
  formUpdate!: FormGroup;

  newGenre = {
    name: '',
    description: '',
    image: '',
    categoryname: '',
    isActive: true
  };

  constructor(private fbAdd: FormBuilder, private fbUpdate: FormBuilder,
    private genreService: GenreService) {
    this.createForm();
    // this.showModalUpdate(this.newGenre);
  }

  createForm(): void {
    this.form = this.fbAdd.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      categoryname: [''],
      isActive: [false]
    });
    this.formUpdate = this.fbUpdate.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      categoryname: [''],
      isActive: [false]
    });
  }

  ngOnInit(): void {
    this.getAllGenres();
    this.getAllSoftDeletedGenres();
  }

  // Lấy tất cả các genre đã bị xóa mềm
  getAllSoftDeletedGenres() {
    this.genreService.getAllSoftDeletedGenres().subscribe(
      (response) => {
        console.log(response);
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
        console.log(response);
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



  // Model add
  showModalAdd(): void {
    this.isVisibleAdd = true;
  }
  handleAddOk(): void {
    if (this.form.valid) {
      this.form.reset({
        name: '',
        description: '',
        categoryname: '',
        image: '',
        isActive: false
      });
      this.isVisibleAdd = false

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
    console.log(this.newGenre.name)
  }
  handleUpdateOk(): void {
    if (this.formUpdate.valid) {
      this.formUpdate.reset({
        name: '',
        description: '',
        categoryname: '',
        image: '',
        isActive: false
      });
      this.isVisibleUpdate = false

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
  showModalDelete(): void {
    this.isVisibleDelete = true;
  }
  handleDeleteOk(): void {
    this.isVisibleDelete = false;
  }
  handleDeleteCancel(): void {
    this.isVisibleDelete = false;
  }

  //
  originalGenre = [
    {
      name: 'Hành Động',
      description: 'Phim có nhiều cảnh hành động, pha mạo hiểm, kịch tính.',
      categoryname: 'Hành động và phiêu lưu',
      isActive: true,
      image: "https://www.uplevo.com/img/designbox/poster-phim-the-dark-knight-rises.jpg"
    },
    {
      name: 'Hài Kịch',
      description: 'Phim hài hước, nhẹ nhàng, giải trí.',
      categoryname: 'Hài kịch',
      isActive: true,
      image: "https://www.uplevo.com/img/designbox/poster-phim-the-dark-knight-rises.jpg",
    },
    {
      name: 'Tình Cảm',
      description: 'Phim xoay quanh các mối quan hệ tình cảm, cảm xúc con người.',
      categoryname: 'Tình cảm',
      isActive: true,
      image: "https://www.uplevo.com/img/designbox/poster-phim-the-dark-knight-rises.jpg"
    },
    {
      name: 'Kinh Dị',
      description: 'Phim gây sợ hãi, hồi hộp với yếu tố siêu nhiên hoặc bí ẩn.',
      categoryname: 'Kinh dị',
      isActive: false,
      image: "https://www.uplevo.com/img/designbox/poster-phim-the-dark-knight-rises.jpg"
    },
    {
      name: 'Viễn Tưởng',
      description: 'Phim với những yếu tố khoa học viễn tưởng, công nghệ, tương lai.',
      categoryname: 'Khoa học viễn tưởng',
      isActive: true,
      image: "https://www.uplevo.com/img/designbox/poster-phim-the-dark-knight-rises.jpg"
    },
    {
      name: 'Hoạt Hình',
      description: 'Phim dành cho trẻ em và người lớn, thường có yếu tố hoạt hình, đồ họa.',
      categoryname: 'Hoạt hình',
      isActive: true,
      image: "https://www.uplevo.com/img/designbox/poster-phim-the-dark-knight-rises.jpg"
    },
  ];

  filteredGenre = [...this.originalGenre];

  onSearchChange(): void {
    this.filteredGenre = this.originalGenre.filter(item =>
      item.name.toLowerCase().includes(this.valueSearch.toLowerCase())
    );
  }

}
