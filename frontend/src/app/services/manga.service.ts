import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Manga } from 'src/manga';


const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}

@Injectable({ providedIn: 'root' })

export class MangaService {

  private apiUrl = 'https://persicodev.github.io/manga-reader/db.json/mangas';
  
  constructor(private http:HttpClient) { }

  getMangas(): Observable<Manga[]> { return this.http.get<Manga[]>(this.apiUrl); }
  
  updateMangaBookmark(manga: Manga): Observable<Manga> {
    const url = `${this.apiUrl}/${manga.id}`;
    return this.http.put<Manga>(url, manga, httpOption);
  }
  
}
