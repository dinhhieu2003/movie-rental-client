import { Component, OnInit } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms'; 
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { ChangeDetectorRef } from '@angular/core';
import { NzModalCloseComponent, NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CategoryService } from '../../../core/services/category.service';
import { CategoryModel } from '../../../core/models/CategoryModel';

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
    ReactiveFormsModule 
  ],
  templateUrl: './category-movie.component.html',
  styleUrl: './category-movie.component.css'
})
export class CategoryMovieComponent implements OnInit{

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
  findAllCategories() {
    this.categoryService.getFindAllCategories().subscribe(
      (response) => {
        console.log(response);
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
  
  originalCategories = [
    {
      name: 'Phim Bộ',
      description: 'High energy and lots of stunts.',
      image: 'https://ss-images.saostar.vn/w800/pc/1606897461583/bogia-teaser1-1.jpg',
      category: 'Adventure',
      album: 'Top Hits',
      isActive: true // Thêm thuộc tính boolean
    },
    {
      name: 'Phim Thuê',
      description: 'Humorous and entertaining.',
      image: 'https://cinema.momocdn.net/img/57931939496165847-DhWsKzPvVicufunaFQaUqZjEMu.jpg',
      category: 'Humor',
      album: 'Comedy Classics',
      isActive: false // Thêm thuộc tính boolean
    },
    {
      name: 'Phim Lẻ',
      description: 'Serious and plot-driven.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7s3dZ5CBuluIJ1NwCtaA9v57RbpAQGaloaw&s',
      category: 'Serious',
      album: 'Drama Hits',
      isActive: true // Thêm thuộc tính boolean
    },
    {
      name: 'Điện Ảnh',
      description: 'Serious and plot-driven.',
      image: 'https://arena.fpt.edu.vn/wp-content/uploads/2021/04/poster-phim-la-gi.jpg',
      category: 'Serious',
      album: 'Drama Hits',
      isActive: false // Thêm thuộc tính boolean
    },
  ];

  filteredCategories = [...this.originalCategories];

  onSearchChange(): void {
    this.filteredCategories = this.originalCategories.filter(item =>
      item.name.toLowerCase().includes(this.valueSearch.toLowerCase())
    );
  }

}
