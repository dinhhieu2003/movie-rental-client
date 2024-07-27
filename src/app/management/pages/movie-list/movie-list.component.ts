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
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzModalModule } from 'ng-zorro-antd/modal';

interface DataItem {
  name: string;
  quality: string;
  category: string;
  publishDate: number;
  movieAccess: string;
  status: boolean;
  action: number;
}

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
    NzDrawerModule,
    ReactiveFormsModule,
    NzDatePickerModule,
    NzModalModule,
  ],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  valueSearch = '';
  status = 'no action';
  pageSize = 5; 

  listOfColumn = [
    { title: 'Movie', compare: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name), priority: false },
    { title: 'Quality', compare: (a: DataItem, b: DataItem) => a.quality.localeCompare(b.quality), priority: 3 },
    { title: 'Category', compare: (a: DataItem, b: DataItem) => a.category.localeCompare(b.category), priority: 2 },
    { title: 'Publish Date', compare: (a: DataItem, b: DataItem) => a.publishDate - b.publishDate, priority: 1 },
    { title: 'Movie Access', compare: (a: DataItem, b: DataItem) => a.movieAccess.localeCompare(b.movieAccess), priority: 1 },
    { title: 'Status', compare: (a: DataItem, b: DataItem) => Number(a.status) - Number(b.status), priority: 1 },
    { title: 'Action', compare: (a: DataItem, b: DataItem) => a.action - b.action, priority: 1 }
  ];

  listOfData: DataItem[] = [
    { name: 'Arrial 1999', quality: '480/720/1080', category: 'Hello', publishDate: 2010, movieAccess: 'World', status: true, action: 1 },
    { name: 'Day of Darkness', quality: '480/720/1080', category: 'Hello', publishDate: 2010, movieAccess: 'World', status: true, action: 1 },
    { name: 'Don Jon', quality: '480/720/1080', category: 'Hello', publishDate: 2010, movieAccess: 'World', status: true, action: 1 },
    { name: 'Mega Fun', quality: '480/720/1080', category: 'Hello', publishDate: 2010, movieAccess: 'World', status: true, action: 1 },
    { name: 'Night Mare', quality: '480/720/1080', category: 'Hello', publishDate: 2010, movieAccess: 'World', status: true, action: 1 },
    { name: 'Night Mare', quality: '480/720/1080', category: 'Hello', publishDate: 2012, movieAccess: 'World', status: true, action: 1 },
    { name: 'Night Mare', quality: '480/720/1080', category: 'Hello', publishDate: 2005, movieAccess: 'World', status: true, action: 1 },
    { name: 'Night Mare', quality: '480/720/1080', category: 'Hello', publishDate: 2013, movieAccess: 'World', status: true, action: 1 },
    { name: 'Night Mare', quality: '480/720/1080', category: 'Hello', publishDate: 2016, movieAccess: 'World', status: true, action: 1 },
    { name: 'Night Mare', quality: '480/720/1080', category: 'Hello', publishDate: 2013, movieAccess: 'World', status: true, action: 1 },
    { name: 'Night Mare', quality: '480/720/1080', category: 'Hello', publishDate: 2017, movieAccess: 'World', status: true, action: 1 },
    { name: 'Night Mare', quality: '480/720/1080', category: 'Hello', publishDate: 2001, movieAccess: 'World', status: true, action: 1 },
    { name: 'Portable', quality: '480/720/1080', category: 'Hello', publishDate: 2010, movieAccess: 'World', status: true, action: 1 }
  ];

  filteredData: DataItem[] = [...this.listOfData];

  ngOnInit(): void { }

  onPageSizeChange(newSize: number): void {
    this.pageSize = newSize;
  }

  onSearchChange(): void {
    this.filteredData = this.listOfData.filter(item =>
      item.name.toLowerCase().includes(this.valueSearch.toLowerCase())
    );
  }

  isVisibleAdd = false;
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

  isVisibleUpdate = false;
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

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    
    this.form = this.fb.group({
      movieName: [''],
      description: [''],
      movieAccess: [''],
      languages: [''],
      genres: [''],
      contentRating: [''],
      releaseDate: [null],
      publishDate: [null],
      duration: ['']
    });


  }
}
