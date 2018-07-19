import { Component, OnInit } from '@angular/core';
import { Album } from '../../model/album';
import { MusicService } from '../music.service';

@Component({
  selector: 'app-music-search',
  templateUrl: './music-search.component.html',
  styleUrls: ['./music-search.component.css']
})
export class MusicSearchComponent implements OnInit {

  albums:Album[];
  constructor(private musicService:MusicService) { }

  ngOnInit() {
    this.musicService.getAlbums().subscribe((data:any)=>
    {this.albums=data.albums.items});
  }
}
