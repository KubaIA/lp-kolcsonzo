import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { AlbumService } from '../../services/album';
import { Album } from '../../models/album';
import { RouterModule, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-album-list',
  standalone: true,
  imports: [CommonModule, NgFor, RouterModule],
  templateUrl: './album-list.html',
  styleUrls: ['./album-list.css'],
})
export class AlbumListComponent implements OnInit, AfterViewInit {

  albums: Album[] = [];

  constructor(private albumService: AlbumService, private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadAlbums();
  }

  ngAfterViewInit(): void {
    // Amikor a view újra láthatóvá válik, frissítünk
    setTimeout(() => {
      this.loadAlbums();
    });
  }

  private loadAlbums() {
    console.log('loadAlbums called');
    this.albumService.getAlbums().subscribe({
      next: (data) => {
        this.albums = data;
        this.cd.detectChanges();
      },
      error: (err) => console.error('Hiba az albumok lekérésekor:', err)
    });
  }
}