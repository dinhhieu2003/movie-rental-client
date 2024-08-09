import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmStreamingComponent } from './film-streaming.component';

describe('FilmStreamingComponent', () => {
  let component: FilmStreamingComponent;
  let fixture: ComponentFixture<FilmStreamingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmStreamingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilmStreamingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
