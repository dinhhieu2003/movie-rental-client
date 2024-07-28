import { CommonModule } from '@angular/common';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzModalModule } from 'ng-zorro-antd/modal';
interface User {
  userId: string;
  userName: string;
  password: string;
  role: string;
  action: boolean;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, NzTableModule, NzSelectModule, NzButtonModule, NzIconModule, FormsModule, RouterLink,
    NzInputModule, NzFormModule,NzGridModule,ReactiveFormsModule,NzDrawerModule,NzDatePickerModule, NzModalModule,
    NzGridModule,
  ],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})



export class UserManagementComponent implements OnInit {
[x: string]: any;
  valueSearch = '';
  status = 'no action';
  pageSize = 5;
  user = {
    action: true 
  };
  listOfColumn = [
    { title: 'User Name', compare: (a: User, b: User) => a.userName.localeCompare(b.userName), priority: false },
    { title: 'Password', compare: (a: User, b: User) => a.password.localeCompare(b.password), priority: 3 },
    { title: 'Role', compare: (a: User, b: User) => a.role.localeCompare(b.role), priority: 2 },
    { title: 'Action', compare: (a: User, b: User) => Number(a.userId) - Number(b.userId), priority: 1 }
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
      item.userName.toLowerCase().includes(this.valueSearch.toLowerCase()) && item.action
    );
  }

  applyStatus(): void {
    console.log('Status applied:', this.status);
  }


  onDelete(userId: string): void {
    const user = this.listOfData.find(user => user.userId === userId);
    if (user) {
      user.action = false;
      console.log(`User ${userId} deleted:`, user);
    }
    
  }
  
  onRestore(userId: string): void {
    const user = this.listOfData.find(user => user.userId === userId);
    if (user) {
      user.action = true; 
      console.log(`User ${userId} restored:`, user);
    }
    
  }
  visibleAdd = false;

  showModalAdd(): void {
    this.visibleAdd = true;
  }

  closeModalAdd(): void {
    this.visibleAdd = false;
  }
  save(): void {
    console.log('Saving user:', this.user);
    this.closeModalAdd();
  }
  visibleUpdate = false;
  showModalUpdate(): void {
    this.visibleUpdate = true;
  }
  updateOk(): void {
    console.log('Button ok clicked!');
    this.visibleUpdate = false;
  }
  updateCancel(): void {
    console.log('Button cancel clicked!');
    this.visibleUpdate = false;
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
