import { Routes } from '@angular/router';
import { AlbumListComponent } from './pages/album-list/album-list';
import { AlbumDetailsComponent } from './pages/album-details/album-details';
import { AlbumFormComponent } from './pages/album-form/album-form';

export const routes: Routes = [  
  // Specifikus útvonalak ELSŐ (new, edit, delete)
  {
    path: 'albums/new',
    component: AlbumFormComponent,
    data: { mode: 'create' }
  },
  {
    path: 'albums/:id/edit',
    component: AlbumFormComponent,
    data: { mode: 'edit' }
  },

  // Általános útvonalak KÉSŐBB
  { path: 'albums/:id', component: AlbumDetailsComponent },
  
  { path: 'albums',
    component: AlbumListComponent,
    runGuardsAndResolvers: 'always',
    resolve: { reload: () => true }
  },
    
  { path: '', redirectTo: 'albums', pathMatch: 'full' }
];