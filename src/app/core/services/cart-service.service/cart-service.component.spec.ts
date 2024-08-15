import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartService } from './cart-service.component';

describe('CartServiceService', () => {
  let component: CartService;
  let fixture: ComponentFixture<CartService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
