import { Injectable, Inject } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { DOCUMENT } from '../../../node_modules/@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  
  private config = {
    auth_url: "https://accounts.spotify.com/authorize",
    client_id:'ea58f2cfc08f43798bced3a4572f3b83',
    response_type:'token',
    redirect_uri:'http://localhost:4200/'
  }

  constructor(
    @Inject (DOCUMENT) private document:Document,
    @Inject('Storage') private storage:Storage) { }
  
  token:string;
  
  authorize(){
    const{client_id,response_type,redirect_uri} = this.config;
    const params = new HttpParams({
      fromObject:{
        client_id,
        response_type,
        redirect_uri
      }
    });

    document.location.replace(this.config.auth_url + "?" + params.toString())
    this.storage.removeItem('token')
  }
  
  getToken(){
    this.token = JSON.parse(this.storage.getItem('token'));
    
    if(!this.token && this.document.location.hash){
      const hash = this.document.location.hash.substr(1)
      const params = new HttpParams({
        fromString:hash
      })
      this.token = params.get('access_token');
      this.storage.setItem('token',JSON.stringify(this.token))

    }
    if(!this.token){
      this.authorize();
    }
    return this.token;
  }
}
