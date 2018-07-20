import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MusicService } from '../music.service';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '../../../../node_modules/@angular/forms';
import { distinctUntilChanged, filter, debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  queryForm: FormGroup;
  @Output() searchClicked = new EventEmitter<any>();

  constructor(private musicService:MusicService) {
    const censor: ValidatorFn = (control:AbstractControl | null) =>{
      const hasError = control.value.includes('batman');
      return hasError? {
        'censor':true
      }: null
    }
    this.queryForm = new FormGroup({
      'query': new FormControl('',[
        Validators.required,
        Validators.minLength(3),
        censor
      ])
    });

    this.queryForm.get('query').valueChanges.pipe(
      debounceTime(500),
      map(query => query.trim()),
      distinctUntilChanged(),
      filter(query => query.length >= 3),
    ).subscribe(query=>
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
