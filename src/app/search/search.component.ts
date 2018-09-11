import { Component, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  queryString: any;
  lastQueryString: string;
  searchResults: any;
  apiLimitedExceeded: boolean; 

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.queryString = this.searchService.queryString;
    this.searchService.newQueryString
    .subscribe(
      (queryString)=>{
        this.queryString = queryString;
      });    
    this.searchResults = this.searchService.searchResults;
    this.searchService.newSearchResults
    .subscribe(
      (newSearchResults) =>
      {
        this.lastQueryString = this.queryString.value;
        let formattedSearchResults = [{}];
        this.apiLimitedExceeded = false;
        const message = newSearchResults.message ? newSearchResults.message : null;
         if(message){
            this.apiLimitedExceeded = true;
          }else{
            for(let i=0; i< newSearchResults.items.length; i++){
              const thisItem = newSearchResults.items[i];
              const componentPath = thisItem.path.substring(("src/app").length,thisItem.path.lastIndexOf("/") );
              const componentRoute = this.getRoute(componentPath);
              const itemURL = "https://dancelife.github.io/One-"+ environment.appTitle + componentRoute;
              this.searchService.getActualPage(itemURL)
              .subscribe(
                (response)=>{
                  console.log("Actual Page: ",response);
                }
              );
              if(formattedSearchResults.indexOf(componentRoute)<0 && componentRoute!=""){
                formattedSearchResults.push({name:itemURL,route:componentRoute});
              }
            }
            this.searchResults = formattedSearchResults;
            console.log("this.searchResults:",this.searchResults)
                        
          }
      });   
  }


  getRoute(componentPath: string){       
    let componentRoute: string;
    //Reversing the routes
    switch(componentPath){
        case "/core/brand":
        componentRoute = "/About";
        break;
        case "/core/home":
        componentRoute = "/Home";
        break;
        case "/articles/gardening":
        componentRoute = "/Articles/Gardening";
        break;
        case "/articles/space":
        componentRoute = "/Articles/Space_Traveling";
        break;
        case "/articles/space":
        componentRoute = "/Articles/Dancing";
        break;
        default: 
        componentRoute = "";
        break;
      }
      
      return componentRoute;
   }
  
}
