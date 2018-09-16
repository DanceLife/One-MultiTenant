import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import { SearchService } from "../../search/search.service";
import { environment } from "../../../environments/environment"
import { AuthService } from "../../auth/auth.service";

@Component({
    selector: 'app-navigation',
    templateUrl: 'navigation.component.html',
    styleUrls: [ 'navigation.component.scss' ]
})
export class NavigationComponent implements OnInit{
    title:string = environment.appTitle;
    searchForm: FormGroup;
    queryString = new FormControl();
    displayName:string;
        
    constructor(private router: Router, private searchService: SearchService, private authService: AuthService){}

    ngOnInit(): void {
        this.searchForm = new FormGroup({
            'queryString': this.queryString
        })
        this.searchService.newQueryString.next(this.queryString) 
        this.authService.authStateSubject
        .subscribe(
            (result)=>{
                console.log("AuthStateSubject result: ", result)
                this.displayName = result != null ? result.displayName : null;
            }
        )
        
    }

    OnSearch(){
        this.searchService.runSearch(this.queryString);
      //  this.searchForm.reset();
        this.router.navigate(["/Search"]);
    }

}