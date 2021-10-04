import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MangaInfos } from 'src/manga';


const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({ providedIn: 'root' })

export class MangaService {
  

  private apiUrl = 'http://localhost:3000/mangas'
  
  constructor(private http:HttpClient) { }

  getMangas(): Observable<MangaInfos[]> { return this.http.get<MangaInfos[]>(this.apiUrl); }
  
  getSingleManga(id: number): Observable<MangaInfos> { return this.http.get<MangaInfos>(`${this.apiUrl}/${id}`); }

  getSingleMangaLink(id: number): Observable<MangaInfos> { return this.http.get<MangaInfos>(`${this.apiUrl}/${id}`); }
  
}
