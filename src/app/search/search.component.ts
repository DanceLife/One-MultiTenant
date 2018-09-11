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
        let formattedSearchResults = [];
        this.apiLimitedExceeded = false;
        const message = newSearchResults.message ? newSearchResults.message : null;
         if(message){
            this.apiLimitedExceeded = true;
          }else{
            for(let i=0; i< newSearchResults.items.length; i++){
              const thisItem = newSearchResults.items[i];
              const componentPath = thisItem.path.toString().substring(0,thisItem.path.lastIndexOf("/"));
              const componentName = componentPath.substring(componentPath.lastIndexOf("/")+1);
              const componentRoute = this.getRoute(componentName);
              const pageAddress =  "/" + componentRoute;

              if(formattedSearchResults.indexOf(pageAddress)<0 && componentRoute!=""){
                formattedSearchResults.push(pageAddress);
              }
            }
            this.searchResults = formattedSearchResults;            
          }
      });
    
  }

  getRoute(componentName: string){
    const componentname = componentName.toLowerCase();
    //only consider components related to pages
    if("home about brand gardening space dancing".indexOf(componentname)>-1){
    const componentName = componentname.charAt(0).toUpperCase() + componentname.substr(1);          
    let componentRoute: string;
    //Acting router for the example
    switch(componentName){
        case "Brand":
        componentRoute = "About";
        break;
        case "Home":
        componentRoute = "Home";
        break;
        case "About":
        componentRoute = "About";
        break;
        case "Gardening":
        componentRoute = "Articles/Gardening";
        break;
        case "Space":
        componentRoute = "Articles/Space_Traveling";
        break;
        case "Dancing":
        componentRoute = "Articles/Dancing";
        break;
        default: 
        componentRoute = "";
        break;
      }
      
      return componentRoute;
   }
   return "";
  }


}
