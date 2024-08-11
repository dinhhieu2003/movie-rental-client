import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransactionService } from '../../../../core/services/transaction.service/transaction.service.component';
import { PaymentInfoService } from '../../../../core/services/paymentinfo.service/paymentinfo.service.component';
import { PaymentInfo } from '../../../../core/models/PaymentInfo.model';

interface Transaction {
  id: string;
  purchaseDate: string;
  totalPrice: number;
  transactionStatus: string;
}

interface Bank {
  name: string;
  image: string;
}

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [
    CommonModule,
    NzTableModule,
    NzIconModule,
    NzPaginationModule,
    NzModalModule,
    ReactiveFormsModule
  ],
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {
  transactionData: Transaction[] = [];
  displayData: Transaction[] = [];
  pageIndex = 1;
  pageSize = 3;
  isVisible = false;
  isAddPaymentModalVisible = false;
  isSuccessModalVisible = false;
  isUnlinkSuccessModalVisible = false;
  paymentInfos: PaymentInfo[] = [];
  addPaymentForm: FormGroup;
  paymentInfoIdToDelete: string | null = null;
  banks: Bank[] = [
    { name: 'ACB', image: 'https://inkythuatso.com/uploads/images/2021/11/logo-acb-vector-inkythuatso-01-10-10-25-09.jpg' },
    { name: 'Vietcombank', image: 'https://cdn.haitrieu.com/wp-content/uploads/2022/02/Icon-Vietcombank.png' },
    { name: 'VPBank', image: 'https://cdn.haitrieu.com/wp-content/uploads/2022/01/Icon-VPBank.png' },
    { name: 'AgriBank', image: 'https://www.inlogo.vn/wp-content/uploads/2023/04/logo-agribank.png' },
    { name: 'BIDV', image: 'https://cdn.haitrieu.com/wp-content/uploads/2022/01/Icon-BIDV-.png' },
    { name: 'TechcomBank', image: 'https://gcs.tripi.vn/public-tripi/tripi-feed/img/474066ubq/mau-logo-techcombank-dep_045648494.png' },
    { name: 'VIB', image: 'https://inkythuatso.com/uploads/images/2021/12/logo-vib-inkythuatso-3-21-13-43-27.jpg' },
    { name: 'OCB', image: 'https://static.wixstatic.com/media/9d8ed5_5ee21314c1fd4a9381975a323ea6561b~mv2.png/v1/fit/w_500,h_500,q_90/file.png' },
    { name: '', image: '' },
  ];

  constructor(
    private router: Router,
    private transactionService: TransactionService,
    private paymentInfoService: PaymentInfoService,
    private fb: FormBuilder
  ) {
    this.addPaymentForm = this.fb.group({
      bankName: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{9,18}$/)]],
      cardHolderName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.fetchTransactionHistory();
      this.fetchPaymentInfos();
    });

    this.fetchTransactionHistory();
    this.fetchPaymentInfos();
  }

  fetchTransactionHistory(): void {
    this.transactionService.getTransactionHistory().subscribe(
      response => {
        this.transactionData = response?.data?.transactions || [];
        this.updateDisplayData();
      },
      error => {
        console.error('Error fetching transaction history:', error);
        this.transactionData = [];
        this.updateDisplayData();
      }
    );
  }

  fetchPaymentInfos(): void {
    this.paymentInfoService.getPaymentInfos().subscribe(
      data => this.paymentInfos = data,
      error => console.error('Error fetching payment information:', error)
    );
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
    const statusMap: { [key: string]: string } = {
      'SUCCESS': 'Thành công',
      'PENDING': 'Đang chờ',
      'FAILED': 'Thất bại'
    };
    return statusMap[status] || 'Không xác định';
  }

  getStatusClass(status: string): string {
    const classMap: { [key: string]: string } = {
      'SUCCESS': 'status-success',
      'PENDING': 'status-pending',
      'FAILED': 'status-failed'
    };
    return classMap[status] || 'status-unknown';
  }

  getBankImage(bankName: string): string {
    const bank = this.banks.find(b => b.name === bankName);
    return bank?.image || 'https://png.pngtree.com/png-clipart/20240321/original/pngtree-credit-card-symbol-color-png-image_14649752.png';
  }

  showModal(paymentInfoId: string): void {
    this.paymentInfoIdToDelete = paymentInfoId;
    this.isVisible = true;
  }

  showAddPaymentModal(): void {
    this.addPaymentForm.reset();
    this.isAddPaymentModalVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.isAddPaymentModalVisible = false;
  }

  handleOk(): void {
    if (this.paymentInfoIdToDelete) {
      this.paymentInfoService.softDeletePaymentInfo(this.paymentInfoIdToDelete).subscribe(
        () => {
          this.fetchPaymentInfos();
          this.isVisible = false;
          this.isUnlinkSuccessModalVisible = true;
        },
        error => console.error('Error deleting payment information:', error)
      );
    }
  }

  handleSuccessCancel(): void {
    this.isSuccessModalVisible = false;
  }

  handleSuccessOk(): void {
    this.isSuccessModalVisible = false;
  }

  handleUnlinkSuccessCancel(): void {
    this.isUnlinkSuccessModalVisible = false;
  }

  handleUnlinkSuccessOk(): void {
    this.isUnlinkSuccessModalVisible = false;
  }

  maskCardNumber(cardNumber: string): string {
    return cardNumber.replace(/\d(?=\d{4})/g, '*');
  }

  submitAddPayment(): void {
    if (this.addPaymentForm.valid) {
      const newPaymentInfo = {
        isActive: true,
        isDeleted: false,
        ...this.addPaymentForm.value,
        issueDate: new Date().toISOString(),
      };

      this.paymentInfoService.addPaymentInfo(newPaymentInfo).subscribe(
        () => {
          this.fetchPaymentInfos();
          this.isAddPaymentModalVisible = false;
          this.isSuccessModalVisible = true;
        },
        error => console.error('Error adding payment information:', error)
      );
    }
  }
}
