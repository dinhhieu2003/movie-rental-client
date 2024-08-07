import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountService } from './account.service.component';

describe('AccountServiceComponent', () => {
  let component: AccountService;
  let fixture: ComponentFixture<AccountService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
