import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CommonModule } from '@angular/common';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';

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
export class GenreMovieComponent {

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
  showModalDelete(): void {
    this.isVisibleDelete = true;
  }
  handleDeleteOk(): void {
    this.isVisibleDelete = false;
  }
  handleDeleteCancel(): void {
    this.isVisibleDelete = false;
  }
  constructor(private fbAdd: FormBuilder, private fbUpdate: FormBuilder) {
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
