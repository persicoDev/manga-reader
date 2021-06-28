import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Manga } from 'src/manga';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})

export class MangaService {

  private apiUrl = 'http://localhost:3000/manga';
  
  constructor(private http:HttpClient) { }

  getMangas(): Observable<Manga[]> { return this.http.get<Manga[]>(this.apiUrl); }

  updateMangaBookmark(manga: Manga): Observable<Manga> {
    const url = `${this.apiUrl}/${manga.id}`;
    return this.http.put<Manga>(url, manga, httpOption);
  }
}
