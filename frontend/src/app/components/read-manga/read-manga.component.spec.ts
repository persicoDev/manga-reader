import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadMangaComponent } from './read-manga.component';

describe('ReadMangaComponent', () => {
  let component: ReadMangaComponent;
  let fixture: ComponentFixture<ReadMangaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadMangaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadMangaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
