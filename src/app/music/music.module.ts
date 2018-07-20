import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicSearchComponent } from './music-search/music-search.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { AlbumsGridComponent } from './albums-grid/albums-grid.component';
import { AlbumItemComponent } from './album-item/album-item.component';
import { MusicService, SEARCH_URL } from './music.service';
import { environment } from '../../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '../../../node_modules/@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [MusicSearchComponent, SearchFormComponent, AlbumsGridComponent, AlbumItemComponent],
  providers: [{
    provide:SEARCH_URL,
    useValue: environment.search_url
  }],
  exports: [MusicSearchComponent]
})
export class MusicModule { }
