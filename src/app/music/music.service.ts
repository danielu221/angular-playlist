import { Injectable, Inject, InjectionToken } from '@angular/core';
import { Album } from '../model/album';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { SecurityService } from '../security/security.service';

export const SEARCH_URL = new InjectionToken("URL for albums search API");
import {map, catchError} from "rxjs/operators"
import { throwError } from '../../../node_modules/rxjs';

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

  
  // albums:Album[]=[
  //   {
  //     id:"asd123",
  //     artists:[],
  //     name:"mockup album",
  //     images:[{
  //      height:300,
  //      width:300,
  //      url:"http://placekitten.com/300/300"
  //     }]
  //   },
  //   {
  //    id:"asd1234",
  //    artists:[],
  //    name:"mockup album2",
  //    images:[{
  //     height:300,
  //     width:300,
  //     url:"http://placekitten.com/300/300"
  //    }]
  //  }
  // ];

  getAlbums(query = "batman"){
    return this.http.get<AlbumsResponse>(this.api_url,{
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
          return []
        })
    );
  }
}
