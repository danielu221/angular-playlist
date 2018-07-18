import { Component, OnInit } from '@angular/core';
import { Playlist } from '../../model/playlist';

@Component({
  selector: 'app-playlist-details',
  templateUrl: './playlist-details.component.html',
  styleUrls: ['./playlist-details.component.css']
})
export class PlaylistDetailsComponent implements OnInit {

  playlist:Playlist = {
    id:123,
    color:"#00ff01",
    favourite:true,
    name:"wlasna playlista"
  }

  constructor() { }

  ngOnInit() {
  }

}
