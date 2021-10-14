import { ActivatedRoute, Router } from '@angular/router';
import { MangaService } from 'src/app/services/manga.service';
import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { ViewportScroller } from '@angular/common';
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
    trigger('animation5', [
      state(
        'in',
        style({
          'margin-left': "0px ",
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
    trigger('animation7', [
      state(
        'in',
        style({
          transform: 'rotate(180deg)',
          color:"#9b84ff",
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
    trigger('animation8', [
      state(
        'in',
        style({
          color:"#9b84ff",
          border:"1px solid white"
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
    trigger('animation9', [
      state(
        'in',
        style({
          display: "unset",
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
  isShow!: boolean;
  topPosToStartShowing = 100;
  choice: string = 'out';
  pageYoffset = 0;
  @HostListener('window:scroll', ['$event']) onScroll(){
    this.pageYoffset = window.pageYOffset;
  }


  Information(): void {
    this.info = this.info === 'in' ? 'out' : 'in';
  }
  Chapters(): void {
    this.choice = this.choice === 'in' ? 'out' : 'in';
  }

  counter(i: number) {
    return new Array(i);
  }

  constructor(
    public activatedRoute: ActivatedRoute,
    private MangaService: MangaService,
    public router: Router,
    private scroll: ViewportScroller
  ) {}


  async ngOnInit(): Promise<void> {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.chapter = String(this.activatedRoute.snapshot.paramMap.get('item'));
    this.manga = await this.MangaService.getSingleManga(this.id).toPromise();
    this.mangaLinks = this.getMangaLinks();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  } 

  getMangaLinks(): string[] | any {
    for (let [k, v] of Object.entries(this.manga.link)) {
      if (k == this.chapter) return v;
    }
  }
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    console.log('erdiocane');
    console.log('[scroll]', scrollPosition);
    
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  // TODO: Cross browsing
  scrollToTop() {
    this.scroll.scrollToPosition([0,0]);
  }
}
