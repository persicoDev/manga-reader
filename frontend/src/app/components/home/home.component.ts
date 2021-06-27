import { Component, OnInit } from '@angular/core';
import mangas from '../../../../../backend/db.json';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { Manga } from 'src/manga';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void { }

  updateBookmark(manga: Manga) {
    
  }
}