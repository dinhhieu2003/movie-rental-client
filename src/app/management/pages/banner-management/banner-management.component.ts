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
  selector: 'app-banner',
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
  templateUrl: './banner-management.component.html',
  styleUrl: './banner-management.component.css'
})
export class BannerManagementComponent {

  isVisibleAdd = false; 
  isVisibleUpdate = false;  
  isVisibleDelete = false;  
  form!: FormGroup;
  newBanner = {
    id: '',
    imageUrl: '',
    film: '',
    isActive: true,
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date()
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
      id: ['', Validators.required],
      imageUrl: ['', Validators.required],
      film: ['', Validators.required],
      isActive: [false],
      isDeleted: [false],
      createdAt: [new Date(), Validators.required],
      updatedAt: [new Date(), Validators.required]
    });
  }

  originalBanners = [
    {
      id: '1',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP8vCNhtOZZWciq7TCg8n0qmUuqh1Zv2w1vw&s',
      film: 'KING DOM',
      isActive: true,
      isDeleted: false,
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-01-01')
    },
    {
      id: '2',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgyIaTFDqITnmQ7PixTC2AuenkjigoUzIxzA&s',
      film: 'THOR',
      isActive: false,
      isDeleted: false,
      createdAt: new Date('2023-01-02'),
      updatedAt: new Date('2023-01-02')
    }
    // Other banners...
  ];

  banners = [...this.originalBanners];

  refreshData() {
    this.banners = [
      {
        id: '1',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP8vCNhtOZZWciq7TCg8n0qmUuqh1Zv2w1vw&s',
        film: 'KING DOM',
        isActive: true,
        isDeleted: false,
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-01')
      },
      {
        id: '2',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgyIaTFDqITnmQ7PixTC2AuenkjigoUzIxzA&s',
        film: 'THOR',
        isActive: false,
        isDeleted: false,
        createdAt: new Date('2023-01-02'),
        updatedAt: new Date('2023-01-02')
      }
      
    ];
  }
  
}
