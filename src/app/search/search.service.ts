import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';



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

  constructor(private http: Http) { 
    this.newSearchResults = new Subject<any>();
    this.newQueryString = new Subject<any>(); 
    this.newQueryString
    .subscribe(
      (newQueryString)=>{
        this.queryString = newQueryString;
      });
  }

  runSearch(queryString){
    console.log("Running search on: ", queryString.value);
    //this.searchResults = this.searchEntries(queryString);
    //this.searchResults = queryString.value;
    this.searchEntries(queryString.value)
    .subscribe(
      (response)=>{
        console.log("response");
        console.log(response.json());

        this.newSearchResults.next(response.json());
      },
      (error) =>{
        console.log("Error : ", error.json())
        this.newSearchResults.next(error.json())
      }
    );
  }


  searchEntries(term) {
    return this.http
        .get(this.baseUrl + term + this.repoUrl) 
      }


}
