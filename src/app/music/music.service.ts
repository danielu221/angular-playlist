import { Injectable, Inject, InjectionToken } from '@angular/core';
import { Album } from '../model/album';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { SecurityService } from '../security/security.service';

export const SEARCH_URL = new InjectionToken("URL for albums search API");
import {map, catchError} from "rxjs/operators"
import { throwError, Subject, of } from '../../../node_modules/rxjs';

interface AlbumsResponse{
  albums:{
    items:Album[]
  }
}


@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(@Inject(SEARCH_URL) private api_url, private http:HttpClient, private security:SecurityService) { }

  queries = new Subject<string>()
  albums = new Subject<Album[]>()

  search(query){
    this.queries.next(query)
  }

  getAlbums(){
    this.queries.subscribe(query=>{
       this.http.get<AlbumsResponse>(this.api_url,{
        headers:{
          Authorization:'Bearer ' + this.security.getToken()
        },
        params:{
          type:'album',
          q: query
        }
      })
      .pipe(
          map((response)=>{
            return response.albums.items;
          }),
          catchError((err) => {
            if(err instanceof HttpErrorResponse){
            if(err.status == 401){
              this.security.authorize()
              return throwError(new Error("Access denied!"))
            }
            }
            return of([])
          })
      )
      .subscribe(albums=>{
        this.albums.next(albums)
      });
    })
    return this.albums;
   
  }
}
