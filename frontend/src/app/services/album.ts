import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Album } from '../models/album';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private apiUrl = `${environment.apiBaseUrl}/api/albums`;

  constructor(private http: HttpClient) {}

  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.apiUrl);
  }

  getAlbum(id: string): Observable<Album> {
    return this.http.get<Album>(`${this.apiUrl}/${id}`);
  }

  createAlbum(album: Album): Observable<Album> {
    return this.http.post<Album>(this.apiUrl, album);
  }

  updateAlbum(id: string, album: Album): Observable<Album> {
    return this.http.put<Album>(`${this.apiUrl}/${id}`, album);
  }

  deleteAlbum(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}