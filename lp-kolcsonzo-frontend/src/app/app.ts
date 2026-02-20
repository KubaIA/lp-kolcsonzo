import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
// import { AlbumListComponent } from './pages/album-list/album-list';
// import { AlbumDetailsComponent } from './pages/album-details/album-details';
// import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
  RouterOutlet,
  RouterLink,
  // RouterModule,
  HttpClientModule,
  // AlbumListComponent,
  // AlbumDetailsComponent
],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {}