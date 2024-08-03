import { Component } from '@angular/core';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  itemsCount = 0;
  totalPrice = 0;
  subtraction = 0;
  lastTotal = 0;
  cartItems: Movie[] = [{name: "Ông thầy vi diệu", poster: "https://images.fptplay.net/media/OTT/VOD/2022/09/06/ong-thay-vi-dieu-12-tap-fpt-play-1662456055668_Background_origin.jpg?w=910&c=0&fmt=webp", price: 47}, 
    {name: "Ông thầy vi diệu", poster: "https://images.fptplay.net/media/OTT/VOD/2022/09/06/ong-thay-vi-dieu-12-tap-fpt-play-1662456055668_Background_origin.jpg?w=910&c=0&fmt=webp", price: 47},
    {name: "Ông thầy vi diệu", poster: "https://images.fptplay.net/media/OTT/VOD/2022/09/06/ong-thay-vi-dieu-12-tap-fpt-play-1662456055668_Background_origin.jpg?w=910&c=0&fmt=webp", price: 47},
    {name: "Ông thầy vi diệu", poster: "https://images.fptplay.net/media/OTT/VOD/2022/09/06/ong-thay-vi-dieu-12-tap-fpt-play-1662456055668_Background_origin.jpg?w=910&c=0&fmt=webp", price: 47},
    {name: "Ông thầy vi diệu", poster: "https://images.fptplay.net/media/OTT/VOD/2022/09/06/ong-thay-vi-dieu-12-tap-fpt-play-1662456055668_Background_origin.jpg?w=910&c=0&fmt=webp", price: 47},
    {name: "Ông thầy vi diệu", poster: "https://images.fptplay.net/media/OTT/VOD/2022/09/06/ong-thay-vi-dieu-12-tap-fpt-play-1662456055668_Background_origin.jpg?w=910&c=0&fmt=webp", price: 47},
    {name: "Ông thầy vi diệu", poster: "https://images.fptplay.net/media/OTT/VOD/2022/09/06/ong-thay-vi-dieu-12-tap-fpt-play-1662456055668_Background_origin.jpg?w=910&c=0&fmt=webp", price: 47},
    {name: "Ông thầy vi diệu", poster: "https://images.fptplay.net/media/OTT/VOD/2022/09/06/ong-thay-vi-dieu-12-tap-fpt-play-1662456055668_Background_origin.jpg?w=910&c=0&fmt=webp", price: 47},
    {name: "Ông thầy vi diệu", poster: "https://images.fptplay.net/media/OTT/VOD/2022/09/06/ong-thay-vi-dieu-12-tap-fpt-play-1662456055668_Background_origin.jpg?w=910&c=0&fmt=webp", price: 47},
    {name: "Ông thầy vi diệu", poster: "https://images.fptplay.net/media/OTT/VOD/2022/09/06/ong-thay-vi-dieu-12-tap-fpt-play-1662456055668_Background_origin.jpg?w=910&c=0&fmt=webp", price: 47},
  ];
  checkoutItems:Movie[] = [];

  buy(index: number) {
    this.checkoutItems.push(this.cartItems[index]);
    ++this.itemsCount;
    this.totalPrice += this.cartItems[index].price;
    this.removeItemInCartByIndex(index);
  }

  removeFromCheckout(index: number) {
    this.cartItems.push(this.checkoutItems[index]);
    --this.itemsCount;
    this.totalPrice -= this.cartItems[index].price;
    this.removeItemInCheckout(index);
  }

  private removeItemInCartByIndex(index: number) {
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
  }

  private removeItemInCheckout(index: number) {
    if (index > -1) {
      this.checkoutItems.splice(index, 1);
    }
  }

}
