import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MusicService } from '../music.service';
import { FormGroup, FormControl } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  queryForm: FormGroup;
  @Output() searchClicked = new EventEmitter<any>();

  constructor(private musicService:MusicService) {
    this.queryForm = new FormGroup({
      'query': new FormControl()
    });

    this.queryForm.get('query').valueChanges.subscribe(query=>
      this.getAlbums(query)
    )
   }

  ngOnInit() {
  }

  getAlbums(value){
    this.musicService.getAlbums(value).subscribe((albums)=>
    {this.searchClicked.emit(albums)});
  }

}
