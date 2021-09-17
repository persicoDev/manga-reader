import { MangaService } from 'src/app/services/manga.service';
import { Component, ElementRef, OnInit} from '@angular/core';
import { Manga } from 'src/manga';


@Component({
  selector: 'app-manga-item',
  templateUrl: './manga-item.component.html',
  styleUrls: ['./manga-item.component.scss']
})

export class MangaItemComponent implements OnInit {

  mangas: Manga[] = [];

  public slides = [
    { src: "https://cdn.mangaworld.io/mangas/5f75048a5a6cee7b7f49083e.jpg?1624711215499" },
    { src: "https://cdn.mangaworld.io/mangas/5fc7aeadab5e153e7db16e5a.jpg?1624711215322" },
    { src: "https://cdn.mangaworld.io/mangas/5f727cde7160751a30589243.jpg?1624711047739" }
  ];

  constructor(private MangaService:MangaService) {  }

  ngOnInit(): void { this.MangaService.getMangas().subscribe((mangas) => this.mangas = mangas); }

  bookmarkManga(manga: Manga) {
    manga.bookmarked = !manga.bookmarked;
    this.MangaService.updateMangaBookmark(manga).subscribe();
  }
  counter(i: number) {
    return new Array(i);
}
}
