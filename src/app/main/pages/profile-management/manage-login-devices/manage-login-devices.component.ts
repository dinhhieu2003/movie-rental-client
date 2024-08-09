import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-manage-login-devices',
  standalone: true,
  imports: [],
  templateUrl: './manage-login-devices.component.html',
  styleUrl: './manage-login-devices.component.css'
})
export class ManageLoginDevicesComponent {
  ngAfterViewInit(): void {
    // Chỉ thực thi sau khi view đã được khởi tạo
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const deleteButtons = document.querySelectorAll('.fas.fa-times');

      deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
          const row = button.closest('tr');
          if (row) {
            row.remove();
          }
        });
      });
    }
  }

}
