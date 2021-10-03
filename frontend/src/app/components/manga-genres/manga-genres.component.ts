import { MangaService } from 'src/app/services/manga.service';
import { Component, OnInit } from '@angular/core';
import { MangaInfos } from 'src/manga';

export interface id {
  name: string;
}

@Component({
  selector: 'app-manga-genres',
  templateUrl: './manga-genres.component.html',
  styleUrls: ['./manga-genres.component.scss']
})
export class MangaGenresComponent implements OnInit {

  mangaInfos: MangaInfos[] = [];

  public slides = [
    { src: "https://cdn.mangaworld.io/mangas/5f75048a5a6cee7b7f49083e.jpg?1624711215499" },
    { src: "https://cdn.mangaworld.io/mangas/5fc7aeadab5e153e7db16e5a.jpg?1624711215322" },
    { src: "https://cdn.mangaworld.io/mangas/5f727cde7160751a30589243.jpg?1624711047739" }
  ];
  ids: id[] = [
    {name: 'one-panel'},
    {name: 'two-panel'},
    {name: 'three-panel'},
    {name: 'four-panel'},
    {name: 'five-panel'},
    {name: 'six-panel'},
    {name: 'seven-panel'},
    {name: 'eight-panel'},
    {name: 'nine-panel'},
    {name: 'ten-panel'},
    {name: 'eleven-panel'},
    {name: 'twelve-panel'},
    {name: 'thirteen-panel'},
    {name: 'fourteen-panel'},
    {name: 'fifteen-panel'},
    {name: 'sixteen-panel'},
    {name: 'seventeen-panel'},
    {name: 'eighteen-panel'},
    {name: 'nineteen-panel'},
    {name: 'twenty-panel'},
    {name: 'twentyone-panel'},
    {name: 'twentytwo-panel'},
    {name: 'twentythree-panel'},
    {name: 'twentyfour-panel'},
    {name: 'twentyfive-panel'},
    {name: 'twentysix-panel'},
    {name: 'twentyseven-panel'},
    {name: 'twentyeight-panel'},
    {name: 'twentynine-panel'},
    {name: 'thirty-panel'},
    {name: 'thirtyone-panel'},
    {name: 'thirtytwo-panel'},
    {name: 'thirtythree-panel'},
    {name: 'thirtyfour-panel'},
    {name: 'thirtyfive-panel'},
    {name: 'thirtysix-panel'},
    {name: 'thirtyseven-panel'}
  ];

  constructor(private MangaService: MangaService) { }

  ngOnInit(): void { this.MangaService.getMangas().subscribe((mangas) => this.mangaInfos = mangas); }

  counter(i: number) { return new Array(i); }

  public scrollRight(): void {
    let container:HTMLElement | any = document.getElementById('container');
    this.sideScroll(container, 'right', 25, 470, 25);
  }

  public scrollLeft(): void {
    let container:HTMLElement | any = document.getElementById('container');
    this.sideScroll(container, 'left', 25, 470, 25);
  }

  public sideScroll(element: HTMLElement, direction:string, speed:number, distance:number, step:number): void{
    let scrollAmount = 0;

    let slideTimer = setInterval(function(){
        if(direction == 'left'){
            element.scrollLeft -= step;
        } else {
            element.scrollLeft += step;
        }
        scrollAmount += step;
        if(scrollAmount >= distance){
            window.clearInterval(slideTimer);
        }
    }, speed);
    
  }

}
