import { MangaService } from 'src/app/services/manga.service';
import { Component, OnInit } from '@angular/core';
import { MangaInfos } from 'src/manga';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  mangaInfos: MangaInfos[] = [];

  public slides = [
    { src: "https://cdn.mangaworld.io/mangas/5f75048a5a6cee7b7f49083e.jpg?1624711215499" },
    { src: "https://cdn.mangaworld.io/mangas/5fc7aeadab5e153e7db16e5a.jpg?1624711215322" },
    { src: "https://cdn.mangaworld.io/mangas/5f727cde7160751a30589243.jpg?1624711047739" }
  ];

  constructor(private MangaService: MangaService) { }

  async ngOnInit(): Promise<void> { 
    this.mangaInfos = (await this.MangaService.getMangas().toPromise());
    console.log(this.mangaInfos[0]);
   }

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

  


