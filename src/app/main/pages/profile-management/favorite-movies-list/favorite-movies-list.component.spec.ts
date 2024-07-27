import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteMoviesListComponent } from './favorite-movies-list.component';

describe('FavoriteMoviesListComponent', () => {
  let component: FavoriteMoviesListComponent;
  let fixture: ComponentFixture<FavoriteMoviesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteMoviesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoriteMoviesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
