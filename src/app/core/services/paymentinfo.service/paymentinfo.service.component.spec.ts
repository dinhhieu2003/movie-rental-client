import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentInfoService } from './paymentinfo.service.component';

describe('PaymentinfoService', () => {
  let component: PaymentInfoService;
  let fixture: ComponentFixture<PaymentInfoService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentInfoService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaymentInfoService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
