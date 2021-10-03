import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaGenresComponent } from './manga-genres.component';

describe('MangaGenresComponent', () => {
  let component: MangaGenresComponent;
  let fixture: ComponentFixture<MangaGenresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MangaGenresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MangaGenresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
