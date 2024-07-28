import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms'; 
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { ChangeDetectorRef } from '@angular/core';
import { NzModalCloseComponent, NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';

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
export class CategoryMovieComponent {

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
  constructor(private fb: FormBuilder) {
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


  categories = [...this.originalCategories];


  refreshData() {
    // Cập nhật dữ liệu
    this.categories = [
      {
        name: 'Phim Bộ',
        description: 'High energy and lots of stunts.',
        image: 'https://ss-images.saostar.vn/w800/pc/1606897461583/bogia-teaser1-1.jpg',
        category: 'Adventure',
        album: 'Top Hits',
        isActive: true
      },
      {
        name: 'Phim Thuê',
        description: 'Humorous and entertaining.',
        image: 'https://cinema.momocdn.net/img/57931939496165847-DhWsKzPvVicufunaFQaUqZjEMu.jpg',
        category: 'Humor',
        album: 'Comedy Classics',
        isActive: false
      }
      // Các phần tử khác
    ];
  }



}
