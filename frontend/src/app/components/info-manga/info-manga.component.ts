import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MangaService } from 'src/app/services/manga.service';
import { MangaInfos, MangaLinks } from 'src/manga';
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

  manga!: MangaInfos;
  id?: number;
  mark: string = "out";
  chapterCont!: number;

  constructor(public activatedRoute: ActivatedRoute,private MangaService: MangaService, public router: Router) { }

  async ngOnInit(): Promise<void> {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.manga = (await this.MangaService.getSingleMangaLink(this.id).toPromise());
    this.chapterCont = this.manga.chapter_cont;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  
  bookmark(): void {
    this.mark = this.mark === "in" ? "out" : "in";
  }

  counter(i: number) {
    return new Array(i);
  }


}
