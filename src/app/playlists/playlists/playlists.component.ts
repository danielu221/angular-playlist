import { Component, OnInit } from '@angular/core';
import { Playlist } from '../../model/playlist';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {

  constructor(private route: ActivatedRoute , private router:Router) {
    const id = parseInt(route.snapshot.paramMap.get('id'));
    const playlist = this.playlists.find(p=>p.id == id)
    
    if(playlist){
      this.selected= playlist;
    }
    else{   
      this.selected=this.playlists[0];
    }
   
   }

  ngOnInit() {
  }
  playlists: Playlist[] = [
    {
      id:123,
      color:"#00ff01",
      favourite:true,
      name:"wlasna playlista"
    },
    {
      id:323,
      color:"#20ff11",
      favourite:false,
      name:"Top 20 for summer"
    },
    {
      id:223,
      color:"#357801",
      favourite:true,
      name:"Rap and hip hop"
    }
]
  selected = this.playlists[0];

  save(playlist){
    const idx = this.playlists.findIndex(p=>p.id == playlist.id)
    console.log(idx)
    if(idx !== -1){
      this.playlists.splice(idx,1,playlist);
    }
  }

  select(selected){
    this.selected=selected;
    this.router.navigate(['/playlists',selected.id],{
      queryParams:{placki:'YES'}
    })
  }
}
