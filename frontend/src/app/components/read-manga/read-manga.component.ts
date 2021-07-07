import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-read-manga',
  templateUrl: './read-manga.component.html',
  styleUrls: ['./read-manga.component.scss']
})
export class ReadMangaComponent implements OnInit {

  id!: number;

  constructor(public activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.getManga();
  }

  getManga() {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log(id);
  }
}
