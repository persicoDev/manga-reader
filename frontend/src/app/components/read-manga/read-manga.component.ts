import { ActivatedRoute } from '@angular/router';
import { MangaService } from 'src/app/services/manga.service';
import { Component, OnInit } from '@angular/core';
import { MangaInfos } from 'src/manga';


@Component({
  selector: 'app-read-manga',
  templateUrl: './read-manga.component.html',
  styleUrls: ['./read-manga.component.scss']
})

export class ReadMangaComponent implements OnInit {

  manga!: MangaInfos;
  mangaLinks!: string[] | any;
  id!: number;
  chapter!: string;

  constructor(public activatedRoute: ActivatedRoute, private MangaService: MangaService) { }

  async ngOnInit(): Promise<void> {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.chapter = String(this.activatedRoute.snapshot.paramMap.get('item'));
    this.manga = (await this.MangaService.getSingleMangaChapter(this.id).toPromise());
    this.mangaLinks = this.getMangaLinks();
  }

  getMangaLinks(): string[] | any {
    for (let [k, v] of Object.entries(this.manga.link)){
      if (k == this.chapter)
        return v;
    }    
  }

}
