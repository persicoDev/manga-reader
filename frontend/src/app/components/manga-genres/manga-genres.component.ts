import { MangaService } from 'src/app/services/manga.service';
import { Component, OnInit } from '@angular/core';
import { MangaInfos } from 'src/manga';


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

  items = {
     numbers: [
      'one',
      'two',
      'three',
      'four',
      'five',
      'six',
      'seven',
      'eight',
      'nine',
      'ten',
      'eleven',
      'twelve',
      'thirteen',
      'fourteen',
      'fifteen',
      'sixteen',
      'seventeen',
      'eighteen',
      'nineteen',
      'twenty',
      'twentyone',
      'twentytwo',
      'twentythree',
      'twentyfour',
      'twentyfive',
      'twentysix',
      'twentyseven',
      'twentyeight',
      'twentynine',
      'thirty',
      'thirtyone',
      'thirtytwo',
      'thirtythree',
      'thirtyfour',
      'thirtyfive',
      'thirtysix',
      'thirtyseven'],
      
       genres: [
        'Adulti',
        'Arti Marziali',
        'Azione',
        'Commedia',
        'Doujinshi',
        'Drammatico',
        'Ecchi',
        'Fantasy',
        'Gender Bender',
        'Harem',
        'Hentai',
        'Horror',
        'Josei',
        'Lolicon',
        'Maturo',
        'Mecha',
        'Mistero',
        'Psicologico',
        'Romantico',
        'Sci-fi',
        'Scolastico',
        'Seinen',
        'Shotacon',
        'Shoujo',
        'Shoujo Ai',
        'Shounen',
        'Shounen Ai',
        'Slice of Life',
        'Smut',
        'Soprannaturale',
        'Sport',
        'Storico',
        'Tragico',
        'Yaoi',
        'Yuri' ] };

  constructor(private MangaService: MangaService) { }

  ngOnInit(): void { 
    console.log(this.items)
    this.MangaService.getMangas().subscribe((mangas) => this.mangaInfos = mangas);
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
