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

interface User {
  userId: string;
  userName: string;
  password: string;
  role: string;
  action: boolean;
}

@Component({
  selector: 'app-test',
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
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {
  valueSearch = '';
  status = 'no action';
  pageSize = 5; 

  listOfColumn = [
    { title: 'User ID', compare: null, priority: false },
    { title: 'User Name', compare: (a: User, b: User) => a.userName.localeCompare(b.userName), priority: false },
    { title: 'Password', compare: (a: User, b: User) => a.password.localeCompare(b.password), priority: 3 },
    { title: 'Role', compare: (a: User, b: User) => a.role.localeCompare(b.role), priority: 2 },
    { title: 'Action', compare: (a: User, b: User) => Number(a.userId) - Number(b.userId), priority: 1 },
    { title: 'Custom', compare: null, priority: false },
  ];

  listOfData: User[] = [
    
    { userId: '1', userName: 'JohnDoe', password: 'password123', role: 'Admin', action: true },
    { userId: '11', userName: 'JaneSmith', password: 'password456', role: 'User', action: true },
    { userId: '12', userName: 'MikeJohnson', password: 'password789', role: 'Staff', action: false },
    { userId: '123', userName: 'AnnaWilliams', password: 'password101', role: 'Admin', action: false },
    { userId: '2', userName: 'ChrisBrown', password: 'password102', role: 'User', action: false },
    { userId: '020', userName: 'KatieTaylor', password: 'password103', role: 'Staff', action: true },
    { userId: '45', userName: 'PaulWalker', password: 'password104', role: 'User', action: false },
    { userId: '66', userName: 'LauraWilson', password: 'password105', role: 'Admin', action: false },
    { userId: '455', userName: 'SamGreen', password: 'password106', role: 'Staff', action: false },
    { userId: '1011', userName: 'OliviaMartinez', password: 'password107', role: 'User', action: false }
  ];


  filteredData: User[] = [...this.listOfData];

  ngOnInit(): void { }

  onPageSizeChange(newSize: number): void {
    this.pageSize = newSize;
  }

  onSearchChange(): void {
    this.filteredData = this.listOfData.filter(item =>
      item.userName.toLowerCase().includes(this.valueSearch.toLowerCase())
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
      userId: [''],
      userName: [''],
      password: [''],
      role: [''],
      action: [false]
    });


  }
}