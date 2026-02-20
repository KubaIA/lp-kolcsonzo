import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlbumService } from '../../services/album';
import { Album } from '../../models/album';

@Component({
  selector: 'app-album-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './album-form.html',
  styleUrls: ['./album-form.css']
})
export class AlbumFormComponent implements OnInit {

  mode: 'create' | 'edit' = 'create';
  albumForm!: FormGroup;
  albumId?: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private albumService: AlbumService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    this.mode = this.route.snapshot.data['mode'];
    this.albumId = this.route.snapshot.paramMap.get('id') ?? undefined;

    this.albumForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(1)]],
      artist: ['', [Validators.required, Validators.minLength(1)]],
      year: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
      genre: ['', [Validators.required, Validators.minLength(1)]],
      tracks: this.fb.array([])
    });

    if (this.mode === 'edit' && this.albumId) {
      this.albumService.getAlbum(this.albumId).subscribe({
        next: (album) => {
          this.albumForm.patchValue({
            title: album.title,
            artist: album.artist,
            year: album.year?.toString(),
            genre: album.genre
          });

          // Trackek betöltése
          console.log('Album betöltve:', album);
          console.log('Trackek száma:', album.tracks?.length ?? 0);
          const tracksArray = this.tracks;
          album.tracks?.forEach((track) => {
            console.log('Track hozzáadása:', track);
            tracksArray.push(
              this.fb.group({
                title: [track.title, [Validators.required, Validators.minLength(1)]],
                length: [track.length, [Validators.required, Validators.pattern(/^(\d{1,2}):(\d{2})$/)]]
              })
            );
          });
          console.log('Trackek FormArray után:', tracksArray.length);

          this.cd.detectChanges();
        },
        error: (err) => console.error('Hiba az album lekérésekor:', err)
      });
    }
  }

  get tracks(): FormArray {
    return this.albumForm.get('tracks') as FormArray;
  }

  addTrack() {
    this.tracks.push(
      this.fb.group({
        title: ['', [Validators.required, Validators.minLength(1)]],
        length: ['', [Validators.required, Validators.pattern(/^(\d{1,2}):(\d{2})$/)]]
      })
    );
  }

  removeTrack(i: number) {
    this.tracks.removeAt(i);
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.albumForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  cancel() {
    if (this.mode === 'create') {
      this.router.navigate(['/albums']);
    } else {
      const id = this.route.snapshot.paramMap.get('id');
      this.router.navigate(['/albums', id]);
    }
  }

  saveNewAlbum() {
    if (this.albumForm.invalid) {
      alert('Kérlek töltsd ki az összes kötelező mezőt (cím, előadó, év, műfaj)!');
      return;
    }

    const album: Album = this.albumForm.value;
    album.year = parseInt(album.year?.toString() || '0', 10);

    this.albumService.createAlbum(album).subscribe({
      next: (createdAlbum) => {
        console.log('Album sikeresen létrehozva', createdAlbum);
        this.router.navigate(['/albums', createdAlbum.id]);
      },
      error: (err) => console.error('Hiba az album létrehozásakor:', err)
    });
  }

  updateAlbum() {
    if (this.albumForm.invalid || !this.albumId) {
      alert('Kérlek töltsd ki az összes kötelező mezőt (cím, előadó, év, műfaj)!');
      return;
    }

    const album: Album = this.albumForm.value;
    album.id = this.albumId;
    album.year = parseInt(album.year?.toString() || '0', 10);

    this.albumService.updateAlbum(this.albumId, album).subscribe({
      next: (updatedAlbum) => {
        console.log('Album sikeresen módosítva', updatedAlbum);
        this.router.navigate(['/albums', this.albumId]);
      },
      error: (err) => console.error('Hiba az album módosításakor:', err)
    });
  }
}