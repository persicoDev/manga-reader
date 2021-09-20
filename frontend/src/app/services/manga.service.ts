import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MangaInfos, MangaLinks } from 'src/manga';


const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({ providedIn: 'root' })

export class MangaService {
  private infoApiUrl = 'https://persicodev.github.io/manga-reader/infodb.json';
  private linkApiUrl = 'https://persicodev.github.io/manga-reader/linkdb.json';

  private infoApiUrl = 'http://localhost:3000/manga-infos'
  private linkApiUrl = 'http://localhost:3000/manga-links';
  
  constructor(private http:HttpClient) { }

  getMangas(): Observable<MangaInfos[]> { return this.http.get<MangaInfos[]>(this.infoApiUrl); }
  
  getSingleManga(id: number): Observable<MangaLinks> {
    return this.http.get<MangaLinks>(`${this.linkApiUrl}/${id}`);
  }

  getSingleManga(id: number): Observable<MangaLinks> {
    return this.http.get<MangaLinks>(`${this.linkApiUrl}/${id}`);
  }
}
