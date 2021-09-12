import { ActivatedRoute } from '@angular/router';
import { Manga } from 'src/manga';
import { MangaService } from 'src/app/services/manga.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-read-manga',
  templateUrl: './read-manga.component.html',
  styleUrls: ['./read-manga.component.scss']
})
export class ReadMangaComponent implements OnInit {

  manga!: string;
  mangas: Manga[] = [];
  id!: number;

  constructor(public _Activatedroute: ActivatedRoute, private MangaService: MangaService) { this.MangaService.getMangas().subscribe((mangas) => this.mangas = mangas); }

  ngOnInit(): void { this.getManga(); }

  getManga() {
    this._Activatedroute.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
    });
  }

}
