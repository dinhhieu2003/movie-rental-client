import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesRentalListComponent } from './movies-rental-list.component';

describe('MoviesRentalListComponent', () => {
  let component: MoviesRentalListComponent;
  let fixture: ComponentFixture<MoviesRentalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesRentalListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoviesRentalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
