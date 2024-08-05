import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { ChangeDetectorRef } from '@angular/core';

interface Bill {
  billId: string;
  issueDate: Date;
  user: string;
  films: string;
  packageInfo: string;
  paymentStatus: boolean;
  totalPrice: number;
}
@Component({
  selector: 'app-bill-management',
  standalone: true,
  imports: [CommonModule, NzTableModule, NzSelectModule, NzButtonModule, NzIconModule, FormsModule, RouterLink,
    NzInputModule, NzFormModule,NzGridModule,ReactiveFormsModule,NzDrawerModule,NzDatePickerModule, NzModalModule,
    NzGridModule,
  ],
  templateUrl: './bill-management.component.html',
  styleUrl: './bill-management.component.css'
})

export class BillManagementComponent implements OnInit {
  valueSearch = '';
  pageSize = 5;
  sortOption = 'date';
  listOfColumn = [
    { title: 'Bill ID', compare: (a: Bill, b: Bill) => a.billId.localeCompare(b.billId), priority: 1 },
    { title: 'Issue Date', compare: (a: Bill, b: Bill) => a.issueDate.getTime() - b.issueDate.getTime(), priority: 2 },
    { title: 'User', compare: (a: Bill, b: Bill) => a.user.localeCompare(b.user), priority: 3 },
    { title: 'Films', compare: (a: Bill, b: Bill) => a.films.localeCompare(b.films), priority: 4 },
    { title: 'Package Info', compare: (a: Bill, b: Bill) => a.packageInfo.localeCompare(b.packageInfo), priority: 5 },
    { title: 'Payment Status', compare: (a: Bill, b: Bill) => Number(a.paymentStatus) - Number(b.paymentStatus), priority: 6 },
    { title: 'TotalPrice', compare: (a: Bill, b: Bill) => a.totalPrice - b.totalPrice, priority: 7 } 
  ];

  listOfData: Bill[] = [
    { billId: '1', issueDate: new Date('2023-01-01'), user: 'JohnDoe', films: 'Film1', packageInfo: 'Package A', paymentStatus: true,totalPrice: 100},
    { billId: '2', issueDate: new Date('2023-02-15'), user: 'JaneSmith', films: 'Film2', packageInfo: 'Package B', paymentStatus: false,totalPrice: 90 },
    { billId: '3', issueDate: new Date('2023-03-10'), user: 'MikeJohnson', films: 'Film3', packageInfo: 'Package C', paymentStatus: true,totalPrice: 70 },
    { billId: '4', issueDate: new Date('2023-04-22'), user: 'AnnaWilliams', films: 'Film4', packageInfo: 'Package A', paymentStatus: false,totalPrice: 200 },
    { billId: '5', issueDate: new Date('2023-05-18'), user: 'ChrisBrown', films: 'Film5', packageInfo: 'Package B', paymentStatus: true,totalPrice: 110 }
  ];

  filteredData: Bill[] = [...this.listOfData];


  ngOnInit(): void {
    this.applySort();
  }
  constructor(private cdr: ChangeDetectorRef) {}

  onSearchChange(): void {
    this.filteredData = this.listOfData.filter(data => data.user.toLowerCase().includes(this.valueSearch.toLowerCase()));
    this.applySort();
  }

  onPageSizeChange(newSize: number): void {
    this.pageSize = newSize;
  }

  onSortChange(sortOption: string): void {
    this.sortOption = sortOption;
    this.applySort();
  }

  applySort(): void {
    if (this.sortOption === 'date') {
      this.filteredData.sort((a, b) => b.issueDate.getTime() - a.issueDate.getTime());
    } else if (this.sortOption === 'amountLowToHigh') {
      this.filteredData.sort((a, b) => a.totalPrice - b.totalPrice);
    } else if (this.sortOption === 'amountHighToLow') {
      this.filteredData.sort((a, b) => b.totalPrice - a.totalPrice);
    }
    this.cdr.detectChanges();
  }

  applyStatus(): void {
  }
}