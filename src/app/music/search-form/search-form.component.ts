import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MusicService } from '../music.service';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors, AsyncValidatorFn } from '../../../../node_modules/@angular/forms';
import { distinctUntilChanged, filter, debounceTime, map, withLatestFrom } from 'rxjs/operators';
import { Observable, Observer } from '../../../../node_modules/rxjs';
import { callbackify } from 'util';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  queryForm: FormGroup;
  @Output() searchClicked = new EventEmitter<any>();

  constructor(private musicService:MusicService) {

    const censor = (badword): ValidatorFn =>
                 (control:AbstractControl) : ValidationErrors | null =>{
      const hasError = control.value.includes(badword);
      return hasError? {
        'censor':{
          badword
        }
      }: null
    };

    const asyncCensor = (badword):AsyncValidatorFn => ( control: AbstractControl) => {
      return Observable.create((observer: Observer<ValidationErrors> | null)=>{
        const handler = setTimeout(()=>{
          const hasError = control.value.includes(badword)
          observer.next(hasError?{
            'censor':{
              badword
            }
          }:null)
          observer.complete()
        },2000)

        return ()=>{
          clearTimeout(handler)
        }
      })
    };

    this.queryForm = new FormGroup({
      'query': new FormControl('',[
        Validators.required,
        Validators.minLength(3)],
        // censor('batman')
        [
          asyncCensor('batman')
        ]
      )
    });

    const status$ = this.queryForm.get('query').statusChanges;
    const value$=this.queryForm.get('query').valueChanges
      .pipe(
          debounceTime(500),
          map(query => query.trim()),
          distinctUntilChanged(),
          filter(query => query.length >= 3),
      )

    const valid$= status$.pipe(
      filter(status => status == "VALID")
    )

    valid$.pipe(
      withLatestFrom(value$,(valid,value) =>value))
      .subscribe(query=>{
        this.getAlbums(query)
      });
   }

  ngOnInit() {
  }

  getAlbums(value){
    this.searchClicked.emit(value)
  //   this.musicService.getAlbums()
  //  .subscribe((albums)=>{this.searchClicked.emit(albums)});
  }

}
