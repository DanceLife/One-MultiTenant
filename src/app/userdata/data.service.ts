import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  configObject: any;
  configObjectSubject = new Subject<{}>();


  initializeApp(){
      console.log("Step1 from data.service")
      this.configObject = JSON.parse(localStorage.getItem("firebaseConfiguration"));
      
      if(this.configObject==null){
        //  console.log("data service initializeApp: No configuration found on localStorage"); //Nothing to initialize then.
          return null;
      }else{ 
          this.configObjectSubject.next(this.configObject);             
          if(firebase.apps.length < 2 ){                         
              firebase.initializeApp({
                  apiKey: this.configObject.apiKey,           
                  authDomain: this.configObject.authDomain 
              },"userapp");
              console.log("Firebase inizialized: ", firebase.app.name);
          }else{
             // console.log("Firebase app already inizialized as: ", firebase.app.name, ". If the configuration was changed restart the application.");
          }
      }

      console.log("Current fb apps after this one :" , firebase.apps)
  }

}