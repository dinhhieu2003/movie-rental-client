import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd/icon';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzModalService, NzModalModule } from 'ng-zorro-antd/modal';
import { AppstoreOutline, PlayCircleOutline, DeleteOutline, InfoCircleOutline } from '@ant-design/icons-angular/icons';
import { CartService, FilmData } from '../../../../core/services/cart-service.service/cart-service.component'; 

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, NzIconModule, NzPaginationModule, NzModalModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [
    { provide: NZ_ICONS, useValue: [AppstoreOutline, PlayCircleOutline, DeleteOutline, InfoCircleOutline] }
  ]
})
export class CartComponent implements OnInit {
  pageIndex = 1;
  pageSize = 6;
  cartItems: FilmData[] = [];
  pageItems: FilmData[] = [];

  constructor(private cartService: CartService, private modal: NzModalService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.fetchCartItems();
  }

  fetchCartItems(): void {
    this.cartService.getCartItems().subscribe(
      response => {
        if (response && response.Data && response.Data.films) {
          this.cartItems = response.Data.films;
          this.updatePageItems();
          this.cdr.detectChanges();
        } else {
          console.error('Unexpected response structure:', response);
        }
      },
      error => {
        console.error('Error fetching cart items:', error);
      }
    );
  }

  onPageChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.updatePageItems();
    this.cdr.detectChanges();
  }

  updatePageItems(): void {
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pageItems = this.cartItems.slice(startIndex, endIndex);
    this.cdr.detectChanges();
  }

  removeItem(item: FilmData): void {
    this.modal.confirm({
      nzTitle: 'Bạn có chắc muốn xóa phim này ra khỏi giỏ hàng?',
      nzContent: `<b>${item.FilmName}</b> sẽ bị xóa khỏi giỏ hàng của bạn.`,
      nzOkText: 'Xóa',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzCancelText: 'Hủy',
      nzOnOk: () => this.confirmRemoveItem(item)
    });
  }

  confirmRemoveItem(item: FilmData): void {
    this.cartService.removeCartItem(item.Id).subscribe(
      () => {
        this.fetchCartItems();
        console.log('Item removed successfully:', item);
        this.cdr.detectChanges();
      },
      error => {
        console.error('Error removing item:', error);
      }
    );
  }
}
