import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Manga } from 'src/manga';


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
  
  updateMangaBookmark(manga: Manga): Observable<Manga> {
    return this.http.put<Manga>(`${this.apiUrl}/${manga.id}`, manga, httpOption);
  }
  
  getSingleManga(id: number): Observable<Manga> {
    return this.http.get<Manga>(`${this.apiUrl}/${id}`);
  }

}
