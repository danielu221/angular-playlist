import { Injectable, Inject, InjectionToken } from '@angular/core';
import { Album } from '../model/album';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { SecurityService } from '../security/security.service';

export const SEARCH_URL = new InjectionToken("URL for albums search API");
import {map, catchError, switchMap} from "rxjs/operators"
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

  queries = new Subject<string>()
  albums = new Subject<Album[]>()

  constructor(
    @Inject(SEARCH_URL) private api_url, 
  private http:HttpClient, 
  private security:SecurityService) {
    this.queries.pipe(
     map(query=>({
        type:'album',
        q: query
      })),
      switchMap(params => this.http.get<AlbumsResponse>(this.api_url,{
       headers:{
         Authorization:'Bearer ' + this.security.getToken()
       },
       params
     })),
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
   }


  search(query){
    this.queries.next(query)
  }

  getAlbums(){
    // this.queries.subscribe(query=>{
    //    this.http.get<AlbumsResponse>(this.api_url,{
    //     headers:{
    //       Authorization:'Bearer ' + this.security.getToken()
    //     },
    //     params:{
    //       type:'album',
    //       q: query
    //     }
    //   })
    //   .pipe(
    //       map((response)=>{
    //         return response.albums.items;
    //       }),
    //       catchError((err) => {
    //         if(err instanceof HttpErrorResponse){
    //         if(err.status == 401){
    //           this.security.authorize()
    //           return throwError(new Error("Access denied!"))
    //         }
    //         }
    //         return of([])
    //       })
    //   )
    //   .subscribe(albums=>{
    //     this.albums.next(albums)
    //   });
    // })
    return this.albums;
   
  }
}
