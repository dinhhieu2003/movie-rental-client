import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementFooterComponent } from './management-footer.component';

describe('ManagementFooterComponent', () => {
  let component: ManagementFooterComponent;
  let fixture: ComponentFixture<ManagementFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagementFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagementFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
