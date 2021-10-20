import { ActivatedRoute, Router } from '@angular/router';
import { MangaService } from 'src/app/services/manga.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { MangaInfos } from 'src/manga';
import { Observable, fromEvent } from 'rxjs';
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
          transform: 'translateY(-999px)',
          opacity: '0'
        })
      ),
      state(
        'out',
        style({
          transform: 'rotate(0deg)',
        })
      ),
      transition('in => out', animate('0.2s')),
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
    trigger('animation10', [
      state(
        'in',
        style({
          'pointer-events': "none",
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
export class ReadMangaComponent implements OnInit, AfterViewInit {
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
  @ViewChild('scroll') scroll!: ElementRef;

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
    public router: Router) {}


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
  
  scrollTop() {
    this.scroll.nativeElement.scrollTop = 0;
  }

  ngAfterViewInit(){
    // var scrollEvent = fromEvent(document, "scroll").subscribe(res => console.log(res));
    // if (this.scroll.nativeElement.scrollTop > 300) {
    //   this.scroll.nativeElement.setAttribute("style", "background-color:red; border: 1px solid blue;");
    // } else {
    //   this.scroll.nativeElement.setAttribute("style", "background-color:blue; border: 1px solid blue;");
    // }
  }
}