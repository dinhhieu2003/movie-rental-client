import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

interface Transaction {
  date: string;
  amount: number;
  description: string;
  status: string;
}

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzIconModule,
    NzPaginationModule,
    NzModalModule
  ],
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {
  transactionData: Transaction[] = [
    { date: '4/7/2024', amount: 120000, description: 'Gói VIP 1 tháng', status: 'success' },
    { date: '3/7/2024', amount: 30000, description: 'Thuê phim (Mai) 1 tháng', status: 'pending' },
    { date: '3/7/2024', amount: 55000, description: 'Thuê phim (Mai) 2 tháng', status: 'failed' },
    { date: '3/7/2024', amount: 55000, description: 'Thuê phim (Mai) 2 tháng', status: 'failed' },
    { date: '3/7/2024', amount: 55000, description: 'Thuê phim (Mai) 2 tháng', status: 'failed' },
    { date: '3/7/2024', amount: 55000, description: 'Thuê phim (Mai) 2 tháng', status: 'failed' },
    { date: '3/7/2024', amount: 55000, description: 'Thuê phim (Mai) 2 tháng', status: 'failed' },
    { date: '3/7/2024', amount: 55000, description: 'Thuê phim (Mai) 2 tháng', status: 'failed' },
  ];

  displayData: Transaction[] = [];
  pageIndex = 1;
  pageSize = 3;
  isVisible = false;

  paymentMethod = { type: 'VNPay', number: '*** *** 9907' };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateDisplayData();
    });

    this.updateDisplayData();
  }

  onPageChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.updateDisplayData();
  }

  updateDisplayData(): void {
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    this.displayData = this.transactionData.slice(startIndex, startIndex + this.pageSize);
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'success':
        return 'Thành công';
      case 'pending':
        return 'Đang chờ xử lý';
      case 'failed':
        return 'Thất bại';
      default:
        return '';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'success':
        return 'success';
      case 'pending':
        return 'pending';
      case 'failed':
        return 'failed';
      default:
        return '';
    }
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    // Xử lý logic hủy liên kết
    this.paymentMethod = { type: '', number: '' };
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
