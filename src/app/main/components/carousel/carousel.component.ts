import { Component, effect, Input, viewChild } from '@angular/core';
import { NzCarouselComponent, NzCarouselModule } from 'ng-zorro-antd/carousel';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [NzCarouselComponent, NzCarouselModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  @Input() list: string[] = [];
  nzCarousel = viewChild.required<NzCarouselComponent>("nzCarousel");
  effect = 'scrollx';

  constructor() {
    effect(()=> {
      // console.log(this.nzCarousel);
    })
  }

  goPre() {
    console.log("pre");
    this.nzCarousel().pre();
  }

  goNext() {
    this.nzCarousel().next();
  }
}
