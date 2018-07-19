import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  @Output() searchClicked = new EventEmitter<any>();

  constructor(private musicService:MusicService) { }

  ngOnInit() {
  }

  getAlbums(value){
    this.musicService.getAlbums(value).subscribe((data:any)=>
    {this.searchClicked.emit(data.albums.items)});
  }

}
