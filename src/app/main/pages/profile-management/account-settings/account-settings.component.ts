import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../../../core/services/account.service/account.service.component';
import { AccountModel } from '../../../../core/models/Account.model';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzInputModule,
    NzModalModule
  ],
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  profileForm: FormGroup;
  passwordChangeForm: FormGroup;
  isChangeContactModalVisible = false;
  isChangePasswordModalVisible = false;
  isEditingProfileName = false; // State to track if profile name is editable
  apiMessage: string = ''; // Variable to store API response message

  // Variables to handle password visibility
  passwordTypeOld: string = 'password';
  passwordTypeNew: string = 'password';
  passwordTypeConfirm: string = 'password';

  initialProfileName: string = '';
  initialAvatar: string = '';

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      profileName: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }],
      phone: [''],
      avatar: [''] // Add the avatar field
    });

    this.passwordChangeForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6), this.passwordStrengthValidator]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.accountService.getAccount().subscribe({
      next: (account) => {
        console.log('Account data received:', account);
        this.initialProfileName = account.FullName; // Store initial profile name
        this.initialAvatar = account.Avatar; // Store initial avatar

        this.profileForm.patchValue({
          profileName: account.FullName,
          email: account.Email,
          avatar: account.Avatar
        });
      },
      error: (err) => {
        console.error('Error loading account:', err);
        if (err.status === 401) {
          this.router.navigate(['/login']);
        }
      }
    });
  }

  toggleEditProfileName(): void {
    this.isEditingProfileName = !this.isEditingProfileName;
    const profileNameControl = this.profileForm.get('profileName');
    if (profileNameControl) {
      this.isEditingProfileName ? profileNameControl.enable() : profileNameControl.disable();
    }
  }

  saveProfileName(): void {
    if (this.profileForm.valid) {
      const updatedAccount: AccountModel = {
        FullName: this.profileForm.value.profileName,
        Email: this.profileForm.get('email')?.value,
        Avatar: this.profileForm.get('avatar')?.value // Include the avatar value
      };

      console.log('Submitting updated account:', updatedAccount);

      this.accountService.updateAccount(updatedAccount).subscribe({
        next: () => {
          localStorage.setItem("FullName", updatedAccount.FullName);
          console.log('Account updated successfully');
          alert('Cập nhật hồ sơ thành công');
          this.toggleEditProfileName();
        },
        error: (err) => {
          console.error('Error updating account:', err);
          if (err.status === 401) {
            this.router.navigate(['/login']);
          }
        }
      });
    } else {
      console.log('Profile form is invalid');
    }
  }

  openChangeContactModal(): void {
    this.isChangeContactModalVisible = true;
  }

  openChangePasswordModal(): void {
    this.passwordChangeForm.reset();
    this.passwordChangeForm.markAsPristine();
    this.passwordChangeForm.markAsUntouched();
    this.passwordChangeForm.updateValueAndValidity();
    this.isChangePasswordModalVisible = true;
  }

  get isPasswordFormValid(): boolean {
    return this.passwordChangeForm.valid;
  }

  handleCancel(): void {
    this.isChangeContactModalVisible = false;
    this.isChangePasswordModalVisible = false;
  }

  cancelEdit(): void {
    this.isEditingProfileName = false; // Revert to non-editing mode
    this.profileForm.get('profileName')?.setValue(this.initialProfileName); // Reset profile name
    this.profileForm.get('avatar')?.setValue(this.initialAvatar); // Reset avatar
    this.profileForm.get('profileName')?.disable(); // Disable profile name field
  }

  handlePasswordChange(): void {
    if (this.passwordChangeForm.valid) {
      const { oldPassword, newPassword } = this.passwordChangeForm.value;

      this.accountService.changePassword(oldPassword, newPassword).subscribe({
        next: (response) => {
          this.apiMessage = response.Message || 'Đổi mật khẩu thành công';
          alert(this.apiMessage);
          this.handleCancel();
        },
        error: (err) => {
          console.error('Error changing password:', err);
          this.apiMessage = err.error?.Message || 'Mật khẩu cũ không đúng.';
          alert(this.apiMessage);
        }
      });
    } else {
      console.log('Password change form is invalid');
      this.apiMessage = 'Thông tin mật khẩu không hợp lệ. Vui lòng kiểm tra các trường nhập.';
      alert(this.apiMessage);
    }
  }

  showPassword(type: 'old' | 'new' | 'confirm'): void {
    switch(type) {
      case 'old':
        this.passwordTypeOld = 'text';
        break;
      case 'new':
        this.passwordTypeNew = 'text';
        break;
      case 'confirm':
        this.passwordTypeConfirm = 'text';
        break;
    }
  }

  hidePassword(type: 'old' | 'new' | 'confirm'): void {
    switch(type) {
      case 'old':
        this.passwordTypeOld = 'password';
        break;
      case 'new':
        this.passwordTypeNew = 'password';
        break;
      case 'confirm':
        this.passwordTypeConfirm = 'password';
        break;
    }
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  passwordStrengthValidator(control: any): { [key: string]: boolean } | null {
    const password = control.value;
    if (!password) return null;

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return hasUpperCase && hasLowerCase && hasSpecialChar ? null : { weakPassword: true };
  }

  onAvatarChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          // Set the avatar value in the form
          this.profileForm.patchValue({
            avatar: e.target.result as string
          });
        }
      };
      
      reader.readAsDataURL(file);
    }
  }
}
