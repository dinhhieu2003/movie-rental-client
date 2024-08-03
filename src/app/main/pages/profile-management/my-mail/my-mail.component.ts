import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-my-mail',
  standalone: true,
  imports: [],
  templateUrl: './my-mail.component.html',
  styleUrl: './my-mail.component.css'
})
export class MyMailComponent {
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
