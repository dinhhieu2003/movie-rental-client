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
import { InvoiceService } from '../../../core/services/invoice.service';
import { Invoice } from '../../../core/models/Invoice.model';

@Component({
  selector: 'app-Invoice-management',
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
    { title: 'Invoice ID', compare: (a: Invoice, b: Invoice) => a.id.localeCompare(b.id), priority: 1 },
    { title: 'Issue Date', compare: (a: Invoice, b: Invoice) => a.issueDate.getTime() - b.issueDate.getTime(), priority: 2 },
    { title: 'User', compare: (a: Invoice, b: Invoice) => a.userId.localeCompare(b.userId), priority: 3 },
    { title: 'Films', compare: (a: Invoice, b: Invoice) => a.films[0].filmName.localeCompare(b.films[0].filmName), priority: 4 },
    { title: 'Package Info', compare: (a: Invoice, b: Invoice) => a.packageInfo.packageName.localeCompare(b.packageInfo.packageName), priority: 5 },
    { title: 'Payment Status', compare: (a: Invoice, b: Invoice) => Number(a.paymentStatus) - Number(b.paymentStatus), priority: 6 },
    { title: 'TotalPrice', compare: (a: Invoice, b: Invoice) => a.totalPrice - b.totalPrice, priority: 7 } 
  ];

  listOfData: Invoice[] = []

  filteredData: Invoice[] = [...this.listOfData];


  ngOnInit(): void {
    this.getAllInvoices();
  }

  getAllInvoices(): void {
    this.invoiceService.getAllInvoices().subscribe(data => {
      this.listOfData= [];
      for (let i=0 ; i<data.Data.length ; i++){
        let invoicetamp: Invoice={
          id: '1111111',
          issueDate: new Date(),
          films:[ {
            isActive: false,
            isDeleted: false,
            createdAt: '',
            updatedAt: '',
            id: '',
            filmName: '',
            filmUrl: '',
            description: '',
            thumbnailUrl: '',
            trailerUrl: '',
            releaseDate: '',
            duration: '',
            actors: '',
            director: '',
            language: '',
            numberOfViews: 0,
            rating: 0,
            age: 0,
            rentalType: '',
            price: 0,
            limitTime: 0,
            subtitles: [],
            narrations: [],
            comments: [],
            genres: []
          }],
          packageInfo: {
            id: '',
            packageName: '',
            description: '',
            price: 0,
            timeDuration: 0
          },
          totalPrice: 0,
          paymentStatus: '',
          userId: '9999'
        }
        invoicetamp.id= data.Data[i].id;
        invoicetamp.issueDate= data.Data[i].issueDate;
        if(data.Data[i].films.length !== 0){
      
          invoicetamp.films[0].filmName= data.Data[i].films[0].filmName;
        }
        if(data.Data[i].packageInfo != null &&data.Data[i].packageInfo.packageName != null ){
          invoicetamp.packageInfo.packageName= data.Data[i].packageInfo.packageName;
        }
        invoicetamp.totalPrice= data.Data[i].totalPrice;
        invoicetamp.paymentStatus= data.Data[i].paymentStatus;
        if(data.Data[i].userId != null)
          invoicetamp.userId= data.Data[i].userId;
        
        this.listOfData.push(invoicetamp);
      }
      
      this.filteredData = [...this.listOfData];
      // console.log("listdata: "+JSON.stringify(this.listOfData, null, 2)) ;
      // console.log("data: "+JSON.stringify(this.filteredData, null, 2));
    });
    
  }
  constructor(private cdr: ChangeDetectorRef, private invoiceService: InvoiceService) {

  }

  onSearchChange(): void {
    this.filteredData = this.listOfData.filter(data => data.userId.toLowerCase().includes(this.valueSearch.toLowerCase()));
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
      this.listOfData.sort((a, b) => b.issueDate.getTime() - a.issueDate.getTime());
    } else if (this.sortOption === 'amountLowToHigh') {
      this.listOfData.sort((a, b) => a.totalPrice - b.totalPrice);
    } else if (this.sortOption === 'amountHighToLow') {
      this.listOfData.sort((a, b) => b.totalPrice - a.totalPrice);
    }
    this.filteredData = [...this.listOfData];
    this.filteredData.forEach(i=>console.log(i.totalPrice));
    this.cdr.detectChanges();
  }

  applyStatus(): void {
  }
}