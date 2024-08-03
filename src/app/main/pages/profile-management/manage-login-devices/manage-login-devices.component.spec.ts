import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLoginDevicesComponent } from './manage-login-devices.component';

describe('ManageLoginDevicesComponent', () => {
  let component: ManageLoginDevicesComponent;
  let fixture: ComponentFixture<ManageLoginDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageLoginDevicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageLoginDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
