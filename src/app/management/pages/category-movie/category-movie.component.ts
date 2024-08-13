import { Banner } from './../../../core/models/Banner.model';
import { Component, OnInit } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CategoryService } from '../../../core/services/category.service';
import { CategoryModel } from '../../../core/models/CategoryModel';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { basename } from 'path';

@Component({
  selector: 'app-category-movie',
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
    NzPaginationModule
  ],
  templateUrl: './category-movie.component.html',
  styleUrl: './category-movie.component.css'
})
export class CategoryMovieComponent implements OnInit {

  categoryData: CategoryModel[] = [];
  filteredCategories: CategoryModel[] = [];

  pagedCategories: any; // Dữ liệu được phân trang
  pageSize = 3;
  pageIndex = 1;

  valueSearch = ''
  isVisibleAdd = false;
  isVisibleUpdate = false;
  isVisibleDelete = false;
  form!: FormGroup;

  newCategory = {
    name: '',
    description: '',
    image: '',
    category: '',
    album: '',
    isActive: true
  };

  constructor(private fb: FormBuilder, private categoryService: CategoryService) {
    this.createForm();
  }
  createForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      category: ['', Validators.required],
      album: ['', Validators.required],
      isActive: [false]
    });
  }

  ngOnInit() {
    this.findAllCategories();

  }

  // Phương thức lấy tất cả các category
  // findAllCategories() {
  //   this.categoryService.getFindAllCategories().subscribe(
  //     (response) => {
  //       this.categoryData = response.Data.content.map((category: any) => ({
  //         id: category.id || '',
  //         isActive: category.isActive ?? false,
  //         isDeleted: category.isDeleted ?? false,
  //         categoryName: category.categoryName || 'N/A',
  //         banners: category.banners || [],
  //         albums: (category.albums && category.albums.length > 0)
  //           ? category.albums.map((album: any) => ({
  //             id: album.id || '',
  //             createdAt: album.createdAt || 'N/A',
  //             updatedAt: album.updatedAt || 'N/A',
  //             isActive: album.isActive ?? false,
  //             isDeleted: album.isDeleted ?? false,
  //             albumName: album.albumName || 'N/A',
  //             films: (album.film && album.film.length > 0)
  //               ? album.film.map((film: any) => ({
  //                 Id: film.Id || '',
  //                 FilmName: film.FilmName || 'N/A',
  //                 FilmUrl: film.FilmUrl || 'N/A',
  //                 Description: film.Description || 'N/A',
  //                 ThumbnailUrl: film.ThumbnailUrl || 'N/A',
  //                 TrailerUrl: film.TrailerUrl || 'N/A',
  //                 ReleaseDate: film.ReleaseDate || '',
  //                 Duration: film.Duration || 'N/A',
  //                 Actors: film.Actors || [],
  //                 Director: film.Director || 'N/A',
  //                 Language: film.Language || 'N/A',
  //                 NumberOfViews: film.NumberOfViews || 0,
  //                 Rating: film.Rating || 0,
  //                 Age: film.Age || 0,
  //                 Price: film.Price || 0,
  //                 LimitTime: film.LimitTime || 'N/A',
  //                 isActive: film.isActive ?? false,
  //                 isDeleted: film.isDeleted ?? false,
  //                 subtitles: film.subtitles || [],
  //                 narrations: film.narrations || [],
  //                 comments: film.comments || [],
  //                 genres: (film.genres && film.genres.length > 0)
  //                   ? film.genres.map((genre: any) => {
  //                     if (typeof genre === 'string' && genre.startsWith('{')) {
  //                       try {
  //                         genre = JSON.parse(genre);
  //                       } catch (e) {
  //                         console.error('Failed to parse genre string:', genre);
  //                         return 'Unknown Genre';
  //                       }
  //                     }
  //                     return genre.genreName || 'Unknown Genre';
  //                   })
  //                   : ['N/A']
  //               }))
  //               : []
  //           }))
  //           : []
  //       }));
  //       this.filteredCategories = [...this.categoryData];
  //       if (this.filteredCategories.albums && this.filteredCategories.albums.length > 0)
  //           console.log(this.filteredCategories.albums , this.filteredCategories.categoryName)
  //       this.updatePagedCategories();

  //     },
  //     (error) => {
  //       console.error('There was an error!', error);
  //     }
  //   );
  // }
  findAllCategories() {
    this.categoryService.getFindAllCategories().subscribe(
      (response) => {
        this.categoryData = response.Data.content.map((category: CategoryModel) => ({
          isActive: category.isActive,
          isDeleted: category.isDeleted,
          categoryName: category.categoryName,
          banners: (category.banners && category.banners.length > 0)
            ? category.banners.map((banner: any) => ({
              imageUrl: banner.imageUrl || 'No Image Available',
              filmName: banner.Film?.FilmName || 'Unknown Film Name'
            }))
            : [{ imageUrl: 'No Image Available', filmName: 'Unknown Film Name' }],
          albums: (category.albums && category.albums.length > 0)
            ? category.albums.map((album: any) => album.albumName || 'Unknown Album Name')
            : ['N/A'],
        }));

        this.filteredCategories = [...this.categoryData];
        this.filteredCategories.forEach(category => {
          console.log(category.albums);
        });
        this.updatePagedCategories();

      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }

  // Phương thức lấy tất cả các category đã bị xóa mềm
  getAllSoftDeletedCategories() {
    this.categoryService.getAllSoftDeletedCategories().subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }

  // Phương thức tạo mới một category
  createCategory(category: CategoryModel) {
    this.categoryService.postCreateCategory(category).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }

  // Phương thức cập nhật một category theo ID
  updateCategory(categoryId: number, category: CategoryModel) {
    this.categoryService.putUpdateCategory(categoryId, category).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }

  // Phương thức xóa mềm một category theo ID
  softDeleteCategory(categoryId: number) {
    this.categoryService.patchSoftDeleteCategory(categoryId).subscribe(
      () => {
        console.log(`Soft deleted category with ID ${categoryId}`);
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }

  // Phương thức khôi phục một category đã bị xóa mềm theo ID
  restoreCategory(categoryId: number) {
    this.categoryService.patchRestoreCategory(categoryId).subscribe(
      () => {
        console.log(`Restored category with ID ${categoryId}`);
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }

  // Modal add
  showModalAdd(): void {
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
  showModalUpdate(): void {
    this.isVisibleUpdate = true;
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

  onSearchChange(): void {
    this.pagedCategories = this.filteredCategories.filter((item: CategoryModel) =>
      item.categoryName.toLowerCase().includes(this.valueSearch.toLowerCase())
    );
    if (this.valueSearch === '')
      this.updatePagedCategories();
  }

  onPageChange(page: number): void {
    this.pageIndex = page;
    this.updatePagedCategories();
  }

  updatePagedCategories(): void {
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    this.pagedCategories = this.filteredCategories.slice(startIndex, startIndex + this.pageSize);
  }
}
