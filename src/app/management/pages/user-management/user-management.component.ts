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
import { User } from '../../../core/models/UserModel.model';

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
    { title: 'User ID', compare: (a: User, b: User) => Number(a.userId) - Number(b.userId), priority: 1 },
    { title: 'User Name', compare: (a: User, b: User) => a.userName.localeCompare(b.userName), priority: 2 },
    { title: 'Email', compare: null , priority: 3 },
    { title: 'Password', compare: (a: User, b: User) => a.password.localeCompare(b.password), priority: 4 },
    { title: 'Role', compare: (a: User, b: User) => a.role.localeCompare(b.role), priority: 5 },
    { title: 'Action', compare: (a: User, b: User) => Number(a.action) - Number(b.action), priority: 6 },
    { title: 'Custom', compare: null, priority: false },
  ];

  listOfData: User[] = []
  filteredData: User[] = [...this.listOfData];

  form: FormGroup;

  constructor(private fb: FormBuilder,private userService: UserService) {
    this.form = this.fb.group({
      userId: [''],
      userName: [''],
      userEmail: [''],
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
      this.listOfData= [];
      for (let i=0 ; i<data.length ; i++){
        let usertamp: User= {
          userId: '66b25dd189c70b58fd667ec8',
          userName: '',
          userEmail: '',
          password: '123456',
          role: 'user',
          action: false
        }
        
        usertamp.userName= data[i].FullName;
        usertamp.userEmail= data[i].Email;
        this.listOfData.push(usertamp);
      }
      this.filteredData = [...this.listOfData];
      console.log("listdata: "+JSON.stringify(this.listOfData, null, 2)) ;
      console.log("data: "+JSON.stringify(data, null, 2));
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
    const createUser: User = this.form.value;
    this.userService.createUsers(createUser).subscribe({
      next: (response) => {
        alert(response.Message);
        this.getAllUsers();  
        this.isVisibleAdd = false;
      },
      error: (error) => {
        console.error(error);
      }
    }) 
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
    this.userService.updateUser(updatedUser).
    subscribe({
      next: (response) => {
        alert(response.Message);
        this.getAllUsers();  
        this.isVisibleUpdate = false;
      },
      error: (error) => {
        console.error(error);
      }
    })
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
    this.userService.softDeleteUser(userId).
    subscribe({
      next: (response) => {
        alert(response);
        this.getAllUsers();  
        this.isVisibleDelete = false;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  handleDeleteCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisibleDelete = false;
  }

  activateUser(user: User): void {
    this.userService.activateUser(user).
    subscribe({
      next: (response) => {
        alert(response.Message);
        this.getAllUsers();  
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  deactivateUser(user: User): void {
    this.userService.deactivateUser(user).
  subscribe({
    next: (response) => {
      alert(response.Message);
      this.getAllUsers();  
    },
    error: (error) => {
      console.error(error);
      }
    })
  }
}
