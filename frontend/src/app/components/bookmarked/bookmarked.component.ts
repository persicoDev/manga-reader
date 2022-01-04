// import { Manga } from 'src/manga';
import { MangaService } from 'src/app/services/manga.service';
import { Component, OnInit} from '@angular/core';
import { MangaInfos } from 'src/manga';

@Component({
  selector: 'app-bookmarked',
  templateUrl: './bookmarked.component.html',
  styleUrls: ['./bookmarked.component.scss']
})


export class BookmarkedComponent implements OnInit {
  
  // mangas: Manga[] = [];

  constructor(private MangaService:MangaService) { }
  mangaInfos: MangaInfos[] = [];
  async ngOnInit(): Promise<void> { 
    this.mangaInfos = (await this.MangaService.getMangas().toPromise());
    console.log(this.mangaInfos);
  }

  // bookmarkManga(manga: Manga){
  //   manga.bookmarked = !manga.bookmarked;
  //   this.MangaService.updateMangaBookmark(manga).subscribe();
  // }
  
}
