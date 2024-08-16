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

  constructor(private fb: FormBuilder, private categoryService: CategoryService) {
    this.createForm();
  }
  createForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      isActive: [false],
      albums: ['', Validators.required],
      banners: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.findAllCategories();

  }

  findAllCategories() {
    this.categoryService.getFindAllCategories().subscribe(
      (response) => {
        this.categoryData = response.Data.content.map((category: CategoryModel) => ({
          isActive: category.isActive,
          isDeleted: category.isDeleted,
          categoryName: category.categoryName,
          banners: (category.banners && Array.isArray(category.banners) && category.banners.length > 0)
            ? category.banners.map((banner: any) => ({
              imageUrl: banner && banner.imageUrl ? banner.imageUrl : ' ',
              filmName: banner && banner.Film ? banner.Film.FilmName : '  '
            }))
            : [{ imageUrl: ' ', filmName: '  ' }],
          albums: (category.albums && Array.isArray(category.albums) && category.albums.length > 0)
            ? category.albums.map((album: any) => album.albumName || ' ')
            : ['N/A'],
        }));

        this.filteredCategories = [...this.categoryData];
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
