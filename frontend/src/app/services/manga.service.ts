import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Manga } from 'src/manga';
import { MANGAS } from 'src/mock-mangas';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}

@Injectable({ providedIn: 'root' })

export class MangaService {

  private apiUrl = 'http://localhost:3000/mangas';
  
  constructor(private http:HttpClient) { }

  getMangas(): Observable<Manga[]> { return this.http.get<Manga[]>(this.apiUrl); }

  // getManga(id: Number): Observable<Manga> {
  //   const singleManga = MANGAS.find(m => m.id === id);
  //   return of(singleManga);
  // }
  
  updateMangaBookmark(manga: Manga): Observable<Manga> {
    const url = `${this.apiUrl}/${manga.id}`;
    return this.http.put<Manga>(url, manga, httpOption);
  }
}
