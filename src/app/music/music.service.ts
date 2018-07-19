import { Injectable, Inject, InjectionToken } from '@angular/core';
import { Album } from '../model/album';
import { HttpClient } from '@angular/common/http'

export const SEARCH_URL = new InjectionToken("URL for albums search API");

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(@Inject(SEARCH_URL) private api_url, private http:HttpClient) { }

  albums:Album[]=[
    {
      id:"asd123",
      artists:[],
      name:"mockup album",
      images:[{
       height:300,
       width:300,
       url:"http://placekitten.com/300/300"
      }]
    },
    {
     id:"asd1234",
     artists:[],
     name:"mockup album2",
     images:[{
      height:300,
      width:300,
      url:"http://placekitten.com/300/300"
     }]
   }
  ];

  getAlbums(query = "batman"){
    return this.http.get(this.api_url,{
      headers:{
        Authorization:'Bearer BQDnok0WD8t8_qvbJKwDjszGxlx_ARnsFl9jfIapV57gwNtBTOVgZjb4wtH1hxyrbpJWzKJa5JgC8XzDjp1hyzHlsvlXTPEL7eEA8Rt_BuJnBp9okNiOysCd0zQYy4z7rkmj3isUbtFYS-9UhgA7U6qmmL-zz0U'
      },
      params:{
        type:'album',
        q: query
      }
    });
  }
}
