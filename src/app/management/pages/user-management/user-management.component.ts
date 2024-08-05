import { Component, Inject, OnInit } from '@angular/core';
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
import { UserService } from '../../../core/services/user.service';

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
  styleUrls: ['./user-management.component.css'],
  providers: [UserService]
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

  listOfData: User[] = 
  [
    { userId: '1', userName: 'JohnDoe', password: 'password123', role: 'Admin', action: true },
    { userId: '11', userName: 'JaneSmith', password: 'password456', role: 'User', action: true },
    { userId: '12', userName: 'MikeJohnson', password: 'password789', role: 'User', action: false },
    { userId: '123', userName: 'AnnaWilliams', password: 'password101', role: 'Admin', action: false },
    { userId: '2', userName: 'ChrisBrown', password: 'password102', role: 'User', action: false },
    { userId: '020', userName: 'KatieTaylor', password: 'password103', role: 'User', action: true },
    { userId: '45', userName: 'PaulWalker', password: 'password104', role: 'User', action: false },
    { userId: '66', userName: 'LauraWilson', password: 'password105', role: 'Admin', action: false },
    { userId: '455', userName: 'SamGreen', password: 'password106', role: 'User', action: false },
    { userId: '1011', userName: 'OliviaMartinez', password: 'password107', role: 'User', action: false }
  ];

  filteredData: User[] = [...this.listOfData];

  form: FormGroup;

  constructor(private fb: FormBuilder,private userService: UserService) {
    this.form = this.fb.group({
      userId: [''],
      userName: [''],
      password: [''],
      role: [''],
      action: [false]
    });
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.listOfData = data;
      
      console.log("listdata: "+JSON.stringify(this.listOfData, null, 2)) ;
      console.log("data: "+JSON.stringify(data, null, 2));
       this.filteredData = data;
    });
  }

  getUser(userId: string): void {
    this.userService.getUser(userId).subscribe(user => {
      console.log('User found:', user);
      this.form.patchValue(user);
    });
  }

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
  showModalUpdate(user: User): void {
    this.form.patchValue(user);
    this.isVisibleUpdate = true;
  }

  handleUpdateOk(): void {
    const updatedUser: User = this.form.value;
    this.userService.updateUser(updatedUser).subscribe(() => {
      console.log('User updated successfully');
      this.getAllUsers();  
      this.isVisibleUpdate = false;
    });
  }

  handleUpdateCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisibleUpdate = false;
  }

  isVisibleDelete = false;
  showModalDelete(userId: string): void {
    this.isVisibleDelete = true;
    this.form.patchValue({ userId });
  }

  handleDeleteOk(): void {
    const userId: string = this.form.get('userId')?.value;
    this.userService.softDeleteUser(userId).subscribe(() => {
      console.log('User deleted successfully');
      this.getAllUsers();  
      this.isVisibleDelete = false;
    });
  }

  handleDeleteCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisibleDelete = false;
  }

  activateUser(userId: string): void {
    this.userService.activateUser(userId).subscribe(() => {
      console.log('User activated successfully');
      this.getAllUsers();  
    });
  }

  deactivateUser(userId: string): void {
    this.userService.deactivateUser(userId).subscribe(() => {
      console.log('User deactivated successfully');
      this.getAllUsers();  
    });
  }
}
