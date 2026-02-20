import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlbumService } from '../../services/album';
import { Album } from '../../models/album';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-album-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './album-details.html',
  styleUrls: ['./album-details.css'],
})
export class AlbumDetailsComponent implements OnInit {

  album?: Album;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private albumService: AlbumService,
    private cd: ChangeDetectorRef
  ) {}


    ngOnInit(): void {
    this.route.paramMap.subscribe(pm => {
      const id = pm.get('id');      // string | null
      if (!id) return;

      this.albumService.getAlbum(id).pipe(
        tap(data => console.log('details loaded', data))
      ).subscribe({
        next: (data) => {
          this.album = data;
          this.cd.detectChanges();
        },
        error: (err) => console.error('Hiba az album lekérésekor:', err),
      });
    });
  }

  deleteAlbum(): void {
    if (!this.album?.id) return;

    const confirmed = confirm(`Biztosan törlöd a "${this.album.title}" albumot?`);
    if (!confirmed) return;

    this.albumService.deleteAlbum(this.album.id).subscribe({
      next: () => {
        console.log('Album sikeresen törölve');
        this.router.navigate(['/albums']);
      },
      error: (err) => console.error('Hiba az album törlésekor:', err)
    });
  }
}