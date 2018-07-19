import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Playlist } from '../../model/playlist';
@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  @Input ('items') playlists: Playlist[];
  @Output () selectedChange = new EventEmitter<Playlist>();
  @Input() selected: Playlist;

  trackFn(i,item){
    return item.id;
  }

  constructor() {
   }

  ngOnInit() {
  }

  select(playlist){
    this.selectedChange.emit(playlist);
  }
}
