import { Manga } from 'src/manga';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-manga-item',
  templateUrl: './manga-item.component.html',
  styleUrls: ['./manga-item.component.scss']
})
export class MangaItemComponent implements OnInit {
  @Input()
  manga!: Manga;
  @Output() updateMangaBookmark: EventEmitter<Manga> = new EventEmitter;
  
  constructor() { }

  ngOnInit(): void {
  }

}
