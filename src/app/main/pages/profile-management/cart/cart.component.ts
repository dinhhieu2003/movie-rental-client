import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd/icon';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { AppstoreOutline, PlayCircleOutline, DeleteOutline, InfoCircleOutline } from '@ant-design/icons-angular/icons';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, NzIconModule, NzPaginationModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [
    { provide: NZ_ICONS, useValue: [AppstoreOutline, PlayCircleOutline, DeleteOutline, InfoCircleOutline] }
  ]
})
export class CartComponent implements OnInit {
  pageIndex = 1;
  pageSize = 6;
  cartItems = [
    {
      image: 'https://img.cand.com.vn/NewFiles/Images/2024/02/21/Phim_Mai_cua_Tran_Thanh_ra_rap_T-1708499884986.jpg',
      title: 'Mai',
      type: 'rent' 
    },
    {
      image: 'https://dailydead.com/wp-content/uploads/2024/02/NO-WAY-UP.jpg',
      title: 'No Way Up',
      type: 'buy' 
    },
    {
      image: 'https://s12937.cdn.mytvnet.vn/vimages/83/3d/d7/70/0b/ba/83d70-lvogiannhatchien1920x1080s859djpg-content-mytv.jpg',
      title: 'Vô Gian Nhất Chiến',
      type: 'rent'
    },
    {
      image: 'https://img.cand.com.vn/NewFiles/Images/2024/02/21/Phim_Mai_cua_Tran_Thanh_ra_rap_T-1708499884986.jpg',
      title: 'Mai',
      type: 'buy'
    },
    {
      image: 'https://dailydead.com/wp-content/uploads/2024/02/NO-WAY-UP.jpg',
      title: 'No Way Up',
      type: 'rent'
    },
    {
      image: 'https://s12937.cdn.mytvnet.vn/vimages/83/3d/d7/70/0b/ba/83d70-lvogiannhatchien1920x1080s859djpg-content-mytv.jpg',
      title: 'Vô Gian Nhất Chiến',
      type: 'buy'
    }
  ];
  pageItems: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.updatePageItems();
  }

  onPageChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.updatePageItems();
  }

  updatePageItems(): void {
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pageItems = this.cartItems.slice(startIndex, endIndex);
  }

  removeItem(item: any): void {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
    this.updatePageItems();
  }
}
