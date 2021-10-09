import { ActivatedRoute } from '@angular/router';
import { MangaService } from 'src/app/services/manga.service';
import { Component, OnInit } from '@angular/core';
import { MangaInfos } from 'src/manga';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-read-manga',
  templateUrl: './read-manga.component.html',
  styleUrls: ['./read-manga.component.scss'],
  animations: [
    trigger('animation1', [
      state(
        'in',
        style({
          transform: 'rotate(180deg)',
          padding: '0px 0px 3px 0px',
        })
      ),
      state(
        'out',
        style({
          transform: 'rotate(0deg)',
        })
      ),
      transition('in => out', animate('0.2s')),
      transition('out => in', animate('0.2s')),
    ]),

    trigger('animation2', [
      state(
        'in',
        style({
          transform: 'translateY(-500px)',
          display: 'none',
        })
      ),
      state(
        'out',
        style({
          transform: 'rotate(0deg)',
        })
      ),
      transition('in => out', animate('0.3s')),
      transition('out => in', animate('0.3s')),
    ]),

    trigger('animation3', [
      state(
        'in',
        style({
          display: 'flex',
          'justify-content': 'center',
          'margin-top': '20px',
        })
      ),
      state(
        'out',
        style({
          transform: 'rotate(0deg)',
        })
      ),
      transition('in => out', animate('0.2s')),
      transition('out => in', animate('0.2s')),
    ]),

    trigger('animation4', [
      state(
        'in',
        style({
          height: '70px',
        })
      ),
      state(
        'out',
        style({
          transform: 'rotate(0deg)',
        })
      ),
      transition('in => out', animate('0.1s')),
      transition('out => in', animate('0.1s')),
    ]),
  ],
})
export class ReadMangaComponent implements OnInit {
  manga!: MangaInfos;
  mangaLinks!: string[] | any;
  id!: number;
  chapter!: string;
  Object = Object;
  info: string = 'out';

  Information(): void {
    this.info = this.info === 'in' ? 'out' : 'in';
  }

  counter(i: number) {
    return new Array(i);
  }

  constructor(
    public activatedRoute: ActivatedRoute,
    private MangaService: MangaService
  ) {}

  async ngOnInit(): Promise<void> {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.chapter = String(this.activatedRoute.snapshot.paramMap.get('item'));
    this.manga = await this.MangaService.getSingleManga(this.id).toPromise();
    this.mangaLinks = this.getMangaLinks();
  }

  getMangaLinks(): string[] | any {
    for (let [k, v] of Object.entries(this.manga.link)) {
      if (k == this.chapter) return v;
    }
  }
}
