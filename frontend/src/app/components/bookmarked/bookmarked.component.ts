import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { Manga } from 'src/manga';
import { MangaService } from 'src/app/services/manga.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookmarked',
  templateUrl: './bookmarked.component.html',
  styleUrls: ['./bookmarked.component.scss']
})
export class BookmarkedComponent implements OnInit {
  
  mangas: Manga[] = [];
  faBookmark = faBookmark;

  constructor(private MangaService:MangaService) { }

  ngOnInit(): void { this.MangaService.getMangas().subscribe((mangas) => this.mangas = mangas); }

  bookmarkManga(manga: Manga){
    manga.bookmarked = !manga.bookmarked;
    this.MangaService.updateMangaBookmark(manga).subscribe();
  }

}
