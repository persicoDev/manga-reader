import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoMangaComponent } from './info-manga.component';

describe('InfoMangaComponent', () => {
  let component: InfoMangaComponent;
  let fixture: ComponentFixture<InfoMangaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoMangaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoMangaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
