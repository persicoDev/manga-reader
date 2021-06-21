import { Component, OnInit } from '@angular/core';
import mangas from '../../../../../backend/db.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public mangaList:{ title:string, preview:string } [] = mangas;
}
