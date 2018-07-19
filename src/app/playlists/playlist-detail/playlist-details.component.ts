import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Playlist } from '../../model/playlist';

@Component({
  selector: 'app-playlist-details',
  templateUrl: './playlist-details.component.html',
  styleUrls: ['./playlist-details.component.css']
})
export class PlaylistDetailsComponent implements OnInit {

  @Input('playlist')  playlist:Playlist ;
  @Output ('save') saveEmitter = new EventEmitter<Playlist>();

  mode : "show" | "edit";


  edit(){
    console.log("edit");
    this.mode = "edit";
  }

  save(formRef){
    const playlist = {
      ...this.playlist,
      ...formRef.value
    }
    console.log("save"); 
    this.saveEmitter.emit(playlist);
  }

  cancel(){
    console.log("cancel");
    this.mode = "show";
  }
  constructor() { }

  ngOnInit() {
    this.mode = "show";
  }

}
