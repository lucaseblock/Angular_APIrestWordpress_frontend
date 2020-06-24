import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class WpapiService {

  endpoint = "http://localhost/api-rest/back/wp-json/wp/v2"

  constructor( private http: HttpClient ) { }

  posts(query = null){
    return this.http.get(`${this.endpoint}/posts?${query}&_embed=true`, { observe: 'response' });
  }

  getPostsWithSearch(wordSearch, query = null){
    return this.http.get(this.endpoint+'/posts?search='+wordSearch+'&'+query+'&_embed=true', { observe: 'response' });
  }

  getCategories(){
    return this.http.get(this.endpoint+'/categories');
  }

  getPostsWithCategory(category = null, query = null){
    return this.http.get(`${this.endpoint}/posts?categories=${category}&${query}&_embed=true`, { observe: 'response' });
  }


}
