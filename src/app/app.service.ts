import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import * as firebase from 'firebase';


@Injectable({
    providedIn: 'root'
})
export class AppService {
    configObject: any;
    configObjectSubject = new Subject<{}>();
    initializeApp(){
        this.configObject = JSON.parse(localStorage.getItem("firebaseConfiguration"));
        if(this.configObject==null){
            console.log("initializeApp: No configuration found on localStorage"); //Nothing to initialize then.
            return null;
        }else{ 
            this.configObjectSubject.next(this.configObject);             
            if(firebase.apps.length < 1 ){                         
                firebase.initializeApp({
                    apiKey: this.configObject.apiKey,           
                    authDomain: this.configObject.authDomain 
                });
                console.log("Firebase app inizialized as: ", firebase.app.name);    
            }else{
               // console.log("Firebase app already inizialized as: ", firebase.app.name, ". If the configuration was changed restart the application.");
            }
        }
    }
}