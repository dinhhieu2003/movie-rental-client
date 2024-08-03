import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryMovieComponent } from './category-movie.component';

describe('CategoryMovieComponent', () => {
  let component: CategoryMovieComponent;
  let fixture: ComponentFixture<CategoryMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryMovieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
