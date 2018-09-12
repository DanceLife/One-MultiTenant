import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SearchResponse } from './searchResponse.model';



@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchResults: string;
  newSearchResults: Subject<any>;
  queryString: string;
  newQueryString: Subject<any>;
  baseUrl: string = 'https://api.github.com/search/code?q=';
  repoUrl: string = '+repo:DanceLife/One-'+ environment.appTitle;
  constructor(private http: HttpClient) { 
    this.newSearchResults = new Subject<any>();
    this.newQueryString = new Subject<any>(); 
    this.newQueryString
    .subscribe(
      (newQueryString)=>{
        this.queryString = newQueryString;
      });
  }
  runSearch(queryString){
    if(queryString.value){
    this.searchEntries(queryString.value)
    .subscribe(
      (response)=>{
        this.newSearchResults.next(response);
      },
      (error) =>{
        console.log("Error : ", error)
        this.newSearchResults.next(error)
      }
    );
    }
  }

  searchEntries(term) {
    return this.http
        .get<SearchResponse>(this.baseUrl + term + this.repoUrl) 
  }
}
