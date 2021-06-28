import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { Manga } from 'src/manga';
import { MangaService } from 'src/app/services/manga.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manga-item',
  templateUrl: './manga-item.component.html',
  styleUrls: ['./manga-item.component.scss']
})
export class MangaItemComponent implements OnInit {
  mangas: Manga[] = [];
  faBookmark = faBookmark;

  constructor(private MangaService:MangaService) { }

  ngOnInit(): void { this.MangaService.getMangas().subscribe((mangas) => this.mangas = mangas); }

  bookmarkManga(manga: Manga){
    manga.bookmarked = !manga.bookmarked;
    this.MangaService.updateMangaBookmark(manga).subscribe();
  }
}
