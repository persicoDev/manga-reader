import { MangaLinks } from 'src/manga';
import { ActivatedRoute } from '@angular/router';
import { MangaService } from 'src/app/services/manga.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-read-manga',
  templateUrl: './read-manga.component.html',
  styleUrls: ['./read-manga.component.scss']
})

export class ReadMangaComponent implements OnInit {

  mangaLinks!: MangaLinks;
  id!: number;

  constructor(public activatedRoute: ActivatedRoute, private MangaService: MangaService) { }

  async ngOnInit(): Promise<void> {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.mangaLinks = (await this.MangaService.getSingleManga(this.id).toPromise());
  }

}
