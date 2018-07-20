import { Component, OnInit } from '@angular/core';
import { Album } from '../../model/album';
import { MusicService } from '../music.service';
import { Subscription, Observable } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-music-search',
  templateUrl: './music-search.component.html',
  styleUrls: ['./music-search.component.css']
})
export class MusicSearchComponent implements OnInit {

  albums:Observable<Album[]>;
  subscription:Subscription;

  constructor(private musicService:MusicService) { }

  ngOnInit() {
   this.albums = this.musicService.getAlbums()
    // .subscribe((albums)=>{this.albums = albums}),
    // err => {
    //   console.log(err)
    // };
  }
  
  search(query){
    this.musicService.search(query)
  }

  // ngOnDestroy(){
  //   this.subscription.unsubscribe()
  // }

}
