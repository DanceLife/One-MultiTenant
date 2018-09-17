import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'app-firebase-system',
  templateUrl: './firebase-system.component.html',
  styleUrls: ['./firebase-system.component.scss']
})
export class FirebaseSystemComponent implements OnInit {
  configForm: FormGroup;
  configObject: any;
  scriptBlockInformationError: string;
  firebaseConfigKeys = ['apiKey','authDomain','databaseURL','projectId','storageBucket','messagingSenderId'];
  systemapp;
  systemAppInfo:{};

  testObject = {test:'test',test2:'test2'};

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.configObjectSubject.subscribe(
      (config)=>{
        console.log("internaconfig received as :");
        console.log(config);
        this.configObject = config
      });
    this.configForm = new FormGroup({
      configInputBox: new FormControl(null)
    });
    this.systemapp = this.authService.getApp("System");
    console.log("preparing systemAppInfo with: ", this.systemapp);
    if(this.systemapp){
      this.systemAppInfo = {Application_Name:this.systemapp.name, SDK_Version: this.systemapp.firebase_.SDK_VERSION}; 
      console.log("internal environment on init system app : ", this.systemapp);
      console.log("this.systemAppInfo", this.systemAppInfo);
      console.log("this.configObject", this.configObject);
    }
  }

  saveAndInitialize(){
    const scriptBlock = this.configForm.controls['configInputBox'].value.replace(/<script>/g, "X->").replace(/<\/script>/g, "<-X");
      if(scriptBlock){
        this.configObject = this.scriptBlockToObject(scriptBlock) == null ? this.configObject : this.scriptBlockToObject(scriptBlock);
        }else{
        this.scriptBlockInformationError = "No configuration provided";
      }
      if(!this.scriptBlockInformationError){
        const configObjectStringified = JSON.stringify(this.configObject);
        const storageKeyName = environment.appTitle + "-" + "SystemApp";
        localStorage.setItem(storageKeyName,configObjectStringified);
        this.systemapp = this.authService.getApp("System");
        this.systemAppInfo = {Application_Name:this.systemapp.name, SDK_Version: this.systemapp.firebase_.SDK_VERSION}; 
      }
  }

  clearfirebaseInternalConfiguration(){
    const storageKeyName = environment.appTitle + "-" + "systemapp";
    localStorage.removeItem(storageKeyName);
    this.configObject = null;
  }

  scriptBlockToObject(scriptBlock){
    let configObject = {};
    this.scriptBlockInformationError = null;
    for( let i = 0; i < this.firebaseConfigKeys.length; i++ ){
      const key2Extract = this.firebaseConfigKeys[i];
      const keyPosition = scriptBlock.indexOf(key2Extract);
      if(keyPosition < 0){
        this.scriptBlockInformationError = "At least a key was missing from the configuration: " + key2Extract;
        configObject = {};
        return null;
      }
      const keyValueDirty = scriptBlock.substring(keyPosition  + key2Extract.length + 1).trim().replace('"','');
      const keyValue = keyValueDirty.substring(0,keyValueDirty.indexOf('"'));
      configObject[key2Extract] = keyValue;
    }
    console.log("configObject: ",configObject);
    return configObject;
  }
}
