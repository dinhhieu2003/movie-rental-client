import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzModalService, NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    NzModalModule,
    NzFormModule
  ],
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent {
  user = {
    firstName: 'Ngô Hoàng',
    lastName: 'Ân',
    birthDate: new Date(2003, 9, 16),
    gender: 'Nam',
    phone: '09*****907',
    email: '*******@gmail.com'
  };

  contactInfo: string = '';
  oldPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';
  isChangeContactModalVisible = false;
  isChangePasswordModalVisible = false;

  constructor(private modal: NzModalService) {}

  openChangeContactModal(): void {
    this.isChangeContactModalVisible = true;
  }

  openChangePasswordModal(): void {
    this.isChangePasswordModalVisible = true;
  }

  handleCancel(): void {
    this.isChangeContactModalVisible = false;
    this.isChangePasswordModalVisible = false;
  }

  handleConfirm(): void {
    if (this.validateContactInfo(this.contactInfo)) {
      // Handle confirm action
      this.handleCancel();
    }
  }

  handlePasswordChange(): void {
    if (this.newPassword === this.confirmNewPassword) {
      // Handle password change action
      this.handleCancel();
    } else {
      // Show error message for password mismatch
      alert('Mật khẩu mới không khớp!');
    }
  }

  validateContactInfo(contactInfo: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10,}$/;
    return emailPattern.test(contactInfo) || phonePattern.test(contactInfo);
  }
}
