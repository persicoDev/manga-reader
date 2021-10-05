import { MangaInfos } from 'src/manga';
import { ActivatedRoute, Router } from '@angular/router';
import { MangaService } from 'src/app/services/manga.service';
import { Component, OnInit,  } from '@angular/core';
import { animate, state, style, transition, trigger, } from "@angular/animations";


@Component({
  selector: 'app-info-manga',
  templateUrl: './info-manga.component.html',
  styleUrls: ['./info-manga.component.scss'],
  animations: [

    trigger("animation1", [
      state(
        "in",
        style({
          background: "#3d3170",
        })
      ),
      state(
        "out",
        style({
          transform: "rotate(0deg)",
        })
      ),
      transition("in => out", animate("0.2s")),
      transition("out => in", animate("0.2s")),
    ]),

    trigger("animation2", [
      state(
        "in",
        style({
          color: "white",
        })
      ),
      state(
        "out",
        style({
          transform: "rotate(0deg)",
        })
      ),
      transition("in => out", animate("0.2s")),
      transition("out => in", animate("0.2s")),
    ]),

    trigger("animation3", [
      state(
        "in",
        style({
          color: "white",
          display: "none",
        })
      ),
      state(
        "out",
        style({
          transform: "rotate(0deg)",
        })
      ),
      transition("in => out", animate("0.2s")),
      transition("out => in", animate("0.2s")),
    ]),

    trigger("animation4", [
      state(
        "in",
        style({
          display: "inline",
        })
      ),
      state(
        "out",
        style({
          transform: "rotate(0deg)",
        })
      ),
      transition("in => out", animate("0.1s")),
      transition("out => in", animate("0.1s")),
    ]),

  ],
})

export class InfoMangaComponent implements OnInit {

  Object = Object;
  mark: string = "out";
  chapterCont!: number;
  manga!: MangaInfos;
  mangaToReplace!: MangaInfos;
  id?: number;

  constructor(public activatedRoute: ActivatedRoute,private MangaService: MangaService, public router: Router) { }

  async ngOnInit(): Promise<void> {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.mangaToReplace = (await this.MangaService.getSingleManga(this.id).toPromise());
    // this.Object.keys(this.mangaToReplace.link) = this.stringReplace(this.Object.keys(this.mangaToReplace.link));
    // for (let key of this.Object.keys(this.mangaToReplace.link)) {
    //   console.log(key);
    //   key = key.replace("_", " ")
    // }
    // console.log(this.mangaToReplace.link.keys())
    // this.Object.keys(this.mangaToReplace.link) = this.stringReplace(this.Object.keys(this.mangaToReplace.link));
    // for(let i = 0; i < this.Object.keys(this.mangaToReplace.link).length; i++){
    //   let mockString:string = ''
    //   this.Object.keys(this.mangaToReplace.link)[i] = this.Object.keys(this.mangaToReplace.link)[i].split('_').join(' ');
    //   console.log(this.Object.keys(this.mangaToReplace.link)[i].split('_').join(' '));
    // }
    // console.log(this.Object.keys(this.mangaToReplace.link));
    console.log(this.Object.keys(this.mangaToReplace.link));
    this.manga = this.mangaToReplace;
    console.log('negro')
    // console.log(this.Object.keys(this.manga.link))
    console.log(this.manga);
    this.chapterCont = this.manga.chapter_cont;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }  

  stringReplace(string:string[]): string[] {
    return string.map(x => x.replace("_", " "));
  }
  
  bookmark(): void {
    this.mark = this.mark === "in" ? "out" : "in";
  }

  counter(i: number) {
    return new Array(i);
  }

}
