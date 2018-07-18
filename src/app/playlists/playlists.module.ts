import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistsComponent } from './playlists/playlists.component';
import { ListItemComponent } from './list-item/list-item.component';
import { PlaylistDetailsComponent } from './playlist-detail/playlist-details.component';
import { ItemListComponent } from './item-list/item-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ PlaylistsComponent,
                 ListItemComponent, 
                 PlaylistDetailsComponent, 
                 ItemListComponent
  ],
  exports:[
  PlaylistsComponent
  ]
})
export class PlaylistsModule { }
