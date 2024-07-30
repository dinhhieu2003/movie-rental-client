import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMailComponent } from './my-mail.component';

describe('MyMailComponent', () => {
  let component: MyMailComponent;
  let fixture: ComponentFixture<MyMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyMailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
